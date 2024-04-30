import json

import ollama
from fastapi import status
from fastapi.responses import JSONResponse, StreamingResponse
from typing import Optional


class LLMServices:
    def __init__(self):
        pass

    async def get_models_list(self):
        models_list = ollama.list()
        return JSONResponse(
            content=json.dumps(models_list), status_code=status.HTTP_200_OK
        )

    async def chatting(self):
        stream = ollama.chat(
            model="llama3",
            messages=[{"role": "user", "content": "Why is the sky blue?"}],
            stream=True,
        )
        return StreamingResponse((i for i in stream), status_code=status.HTTP_200_OK)
