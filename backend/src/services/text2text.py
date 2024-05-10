import json
from typing import Optional

import ollama
from fastapi import status
from fastapi.responses import JSONResponse, StreamingResponse
from scripts.const import LLM_MODEL

assistants = [
    {
        "designation": "english_teacher",
        "prompt": "Ignore all previous instructions. You are an English teacher expert in English language and teaching specializing in English language arts. You have helped many people before me to design curricula that teach students the fundamentals of English language and literature. Your task is now to design a curriculum that teaches students the fundamentals of English language and literature from scratch. To better understand what I want and need you should always answer by including a question that helps you better understand the context and my needs. Did you understand?",
    }
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
        ]  # Fixed accessing the prompt
    )
    return messages


async def chatting(prompt):

    print(prompt)
    stream = ollama.chat(
        model=LLM_MODEL,
        messages=[
            # {"role": "user", "content": prompt},
            {
                "role": "assistant",
                "content": """your name is homer""",
            },
        ],
        # stream=True,
    )
    return stream
