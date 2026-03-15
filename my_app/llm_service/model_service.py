import torch
import json
import re
import numpy as np

from fastapi import FastAPI
from pydantic import BaseModel
import uvicorn

from transformers import AutoTokenizer, AutoModelForCausalLM, BitsAndBytesConfig
from peft import PeftModel
from sentence_transformers import SentenceTransformer


# -------------------------------
# MODEL CONFIG
# -------------------------------

BASE_MODEL = "TinyLlama/TinyLlama-1.1B-Chat-v1.0"
ADAPTER_REPO = "raashidbashir/tinyllama-java-js-qa"

print("Loading tokenizer...")
tokenizer = AutoTokenizer.from_pretrained(BASE_MODEL, use_fast=False)

print("Loading model in 4-bit...")

bnb_config = BitsAndBytesConfig(
    load_in_4bit=True,
    bnb_4bit_compute_dtype=torch.float16,
    bnb_4bit_use_double_quant=True,
    bnb_4bit_quant_type="nf4"
)

model = AutoModelForCausalLM.from_pretrained(
    BASE_MODEL,
    quantization_config=bnb_config,
    device_map="auto"
)

print("Applying LoRA adapter...")
model = PeftModel.from_pretrained(model, ADAPTER_REPO)

model.eval()

device = next(model.parameters()).device

print("Model ready on:", device)


# -------------------------------
# EMBEDDING MODEL
# -------------------------------

print("Loading embedding model...")

embedder = SentenceTransformer("all-MiniLM-L6-v2")


# -------------------------------
# FASTAPI APP
# -------------------------------

app = FastAPI(title="AI Mock Interview LLM Service")


# -------------------------------
# REQUEST MODELS
# -------------------------------

class GenRequest(BaseModel):
    resume_text: str
    n_questions: int = 10
    max_new_tokens: int = 300
    do_sample: bool = True


class EvalRequest(BaseModel):
    question: str
    candidate_answer: str
    reference_answer: str


# -------------------------------
# QUESTION GENERATION
# -------------------------------

def build_prompt(resume_text: str, n: int):

    prompt = f"""
Candidate Resume:
{resume_text}

Task:
Generate {n} interview questions based on the candidate resume.

Return output ONLY as JSON array with fields:
question, difficulty, topic, type
"""

    return prompt


def generate_from_model(prompt, max_new_tokens=300, do_sample=True):

    inputs = tokenizer(prompt, return_tensors="pt").to(device)

    with torch.no_grad():

        outputs = model.generate(
            **inputs,
            max_new_tokens=max_new_tokens,
            do_sample=do_sample,
            repetition_penalty=1.15,
            no_repeat_ngram_size=3,
            pad_token_id=tokenizer.pad_token_id,
            eos_token_id=tokenizer.eos_token_id
        )

    text = tokenizer.decode(outputs[0], skip_special_tokens=True)

    if text.startswith(prompt):
        text = text[len(prompt):]

    return text.strip()


def extract_json_array(text):

    try:
        parsed = json.loads(text)
        if isinstance(parsed, list):
            return parsed
    except:
        pass

    start = text.find("[")
    end = text.rfind("]")

    if start == -1 or end == -1:
        return []

    try:
        return json.loads(text[start:end+1])
    except:
        return []


# -------------------------------
# API ENDPOINT
# -------------------------------

@app.post("/generate_questions")
async def generate_questions(req: GenRequest):

    prompt = build_prompt(req.resume_text, req.n_questions)

    raw = generate_from_model(
        prompt,
        req.max_new_tokens,
        req.do_sample
    )

    questions = extract_json_array(raw)

    return {
        "ok": True,
        "questions": questions,
        "count": len(questions)
    }


# -------------------------------
# ANSWER EVALUATION
# -------------------------------

@app.post("/evaluate_answer")
async def evaluate_answer(req: EvalRequest):

    q_emb = embedder.encode(req.question)
    c_emb = embedder.encode(req.candidate_answer)
    r_emb = embedder.encode(req.reference_answer)

    def cosine(a, b):
        return float(
            np.dot(a, b) /
            (np.linalg.norm(a) * np.linalg.norm(b) + 1e-8)
        )

    sim_q = cosine(c_emb, q_emb)
    sim_ref = cosine(c_emb, r_emb)

    if req.candidate_answer.lower() == req.reference_answer.lower():
        score = 10.0
    else:
        score = (sim_q * 0.4 + sim_ref * 0.6) * 10
        score = max(0, min(score, 10))

    return {
        "ok": True,
        "similarity_question": round(sim_q, 4),
        "similarity_reference": round(sim_ref, 4),
        "final_score_0_to_10": round(score, 2)
    }


# -------------------------------
# RUN SERVER
# -------------------------------

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)