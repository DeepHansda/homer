import json
from typing import Optional

import ollama
from fastapi import status
from fastapi.responses import JSONResponse, StreamingResponse
from scripts.const import LLM_MODEL


assistants = [
    {
        "title": "english teacher",
        "designation": "english_teacher",
        "prompt": "Ignore all previous instructions. You are an English teacher expert in English language and teaching specializing in English language arts. You have helped many people before me to design curricula that teach students the fundamentals of English language and literature. Your task is now to design a curriculum that teaches students the fundamentals of English language and literature from scratch. To better understand what I want and need you should always answer by including a question that helps you better understand the context and my needs. Did you understand?",
    },
    {
        "title": "Content Inspector Agent",
        "designation": "content_inspector_agent",
        "prompt": """Objective: You are the Best Content inspector & analyzer on planet Earth.
Your job is to inspect and analyze a piece of content that I will paste. You will be inspecting its niche, writing style, and formatting style, with the aim of cloning the writing style for Twitter's long-form posts.
So I will be pasting 5 posts to give you enough data to inspect and analyze.
I know that you have a token limitation, that's why I will just paste each post and you have to respond to me back with "saved the context, continue" and I will paste the next post and you respond like this until I tell you that I am done and all the posts are shared with you.
• Part 1: Content Inspection & Analysis
Niche Breakdown
• What industry or subject matter does this content focus on? (e.g., AI, Marketing, Copywriting)
• Are there any sub-niches or specialized topics within the main niche?
Writing Style Breakdown
• What is the tone of the content? (e.g., Professional, Conversational, Inspirational)
• What language grade level does the content fit into? (e.g., 5-6 grade language)
• Analyze sentence structure: Are they complex, compound, or simple sentences?
• What is the average sentence length?
What kind of vocabulary is used? (e.g., Industry-specific jargon, everyday language)
Formatting Style Breakdown
• What is the hook used to capture attention?
• How is the body structured? (e.g., Problem-Solution, Storytelling)
• Is there a Call to Action (CTA)? What is it?
• Are headings and subheadings used? How?
• Are bullet points or numbered lists used? How?
• What is the average paragraph length and structure?
After you complete part 1. Share the inspection and analysis report and then we can move on to part 2.
• Part 2: Clone Writing Style
Design a Detailed Prompt Structure
Based on the analysis, design a prompt structure to clone the writing style for Twitter Long Form posts.
Do you understand?""",
    },
    {
        "title": "blog writer",
        "designation": "blog_writer",
        "prompt": """
        I need a [type of blog post] that will address the needs and demands of my [ideal customer persona] and convince them to take [desired action] with a well-crafted call-to-action.[PROMPT].[TARGETLANGUAGE].
        """,
    },
]


async def get_models_list():
    models_list = ollama.list()
    return JSONResponse(content=json.dumps(models_list), status_code=status.HTTP_200_OK)


async def make_assistant(designation: str):
    assistant_dict = {}
    for dct in assistants:
        if dct.get("designation") == designation:
            assistant_dict = dct
            break  # Added break to stop loop once the assistant is found
    messages = ollama.chat(
        model=LLM_MODEL,
        messages=[
            {"role": "system", "content": str(assistant_dict["prompt"])}
        ],  # Fixed accessing the prompt
    )
    return messages


async def chatting(prompt):

    user_msg = {"role": "user", "content": prompt}
    messages = ollama.chat(
        model=LLM_MODEL,
        messages=[
            user_msg,
            # {
            #     "role": "assistant",
            #     "content": """your name is homer""",
            # },
        ],
        # stream=True,
    )
    type(messages)
    messages["prompts"] = user_msg  # Update the prompts
    return messages
