import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const SaveInterviewQuestion = mutation({
  args: {
    questions: v.optional(v.array(v.any())),   // ✅ always array
    resumeUrl: v.optional(v.string()),
    uid: v.id('UserTable'),
    jobTitle: v.optional(v.string()),
    jobDescription: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const result = await ctx.db.insert('InterviewSessionTable', {
      interviewQuestions: Array.isArray(args.questions) ? args.questions : [], 
      resumeUrl: args.resumeUrl ?? "",
      userId: args.uid,      
      status: "draft",   
      jobTitle: args.jobTitle ?? "",
      jobDescription: args.jobDescription ?? ""   
    });
    return result;
  }
})

export const GetInterviewQuestions = query({
  args: {
    interviewRecordId: v.id('InterviewSessionTable'),
  },
  handler: async (ctx, args) => {
    const result = await ctx.db.query("InterviewSessionTable")
      .filter(q => q.eq(q.field("_id"), args.interviewRecordId))
      .collect();
    return result[0]; 
  }
});

export const UpdateFeedback=mutation({
  args:{
    recordId:v.id('InterviewSessionTable'),
    feedback:v.any()
  },
  handler:async(ctx,args)=>{
    const result = await ctx.db.patch(args.recordId,{
      feedback:args.feedback,
      status:'complete'
    });
    return result;
  }
})
export const GetInterviewList=query({
  args:{
    uid:v.id('UserTable')
  },
  handler:async(ctx,args)=>{
    const result=await ctx.db.query('InterviewSessionTable')
    .filter(q=>q.eq(q.field('userId'),args.uid))
    .order('desc')
    .collect();
    return result;
  }
})