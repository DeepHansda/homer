from contextlib import asynccontextmanager

from fastapi import FastAPI, status
from fastapi.responses import StreamingResponse
from scripts.utils import download_models, setup_ollama
from services.text2text import chatting
from services.voice2text import voice2text


@asynccontextmanager
async def lifespan(app: FastAPI):
    await setup_ollama()
    await download_models()

    print("started")
    yield
    print("ended")


app = FastAPI(lifespan=lifespan)


@app.get("/")
async def root():
    return "server running!"


@app.get("/chat")
async def chat():
    prompt = await voice2text()
    stream = await chatting(prompt=prompt)

    # print(stream)
    return StreamingResponse(
        (i["message"]["content"] for i in stream),
        status_code=status.HTTP_200_OK,
        media_type="text/event-stream",
    )
