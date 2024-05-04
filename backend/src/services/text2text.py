import json
from typing import Optional

import ollama
from fastapi import status
from fastapi.responses import JSONResponse, StreamingResponse
from scripts.const import LLM_MODEL


async def get_models_list():
    models_list = ollama.list()
    return JSONResponse(content=json.dumps(models_list), status_code=status.HTTP_200_OK)


async def chatting(prompt):
    stream = ollama.chat(
        model=LLM_MODEL,
        messages=[{"role": "user", "content": prompt}],
        stream=True,
    )
    return stream
