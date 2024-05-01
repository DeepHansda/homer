import subprocess
from contextlib import asynccontextmanager
import json
import os
from faster_whisper import WhisperModel
import faster_whisper

import ollama
from fastapi import FastAPI, status
from fastapi.responses import JSONResponse, StreamingResponse
from typing import Optional


from scripts.const import LLM_MODEL, WHISPER_MODEL
from services.LLMServices import LLMServices
from whisper_cpp_python import Whisper
from scripts.subprocess_executor import executor


llmServices = LLMServices()
models_path = os.path.join(os.getcwd(), "models")
whisper_model_path = os.path.join(models_path, "whisper")
print(models_path)


async def setup_ollama():
    ollama_install_cmd = "curl -fsSL https://ollama.com/install.sh | sh"
    install_returncode = executor(cmd=ollama_install_cmd, shell=True)
    os.environ["OLLAMA_MODELS"] = models_path
    if install_returncode == 0:  # Check if installation was successful
        start_cmd = ["ollama", "serve"]
        start_ollama = subprocess.Popen(start_cmd)


async def download_models():
    download_ollam_model_cmd = ["ollama", "pull", LLM_MODEL]
    ollam_model_returncode = executor(cmd=download_ollam_model_cmd)
    if ollam_model_returncode == 0:
        faster_whisper.download_model(WHISPER_MODEL, whisper_model_path)


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
    whisper = WhisperModel(whisper_model_path, device="cuda", compute_type="float16")
    segments, info = whisper.transcribe(
        "/kaggle/working/homer/src/Recording.mp3", beam_size=5, language="en"
    )
    token_list = []
    for segment in segments:
        token_list.append(segment.text)

    prompt = " ".join(token_list)
    print(prompt)

    stream = ollama.chat(
        model=LLM_MODEL,
        messages=[{"role": "user", "content": prompt}],
        stream=True,
    )
    # print(stream)
    return StreamingResponse(
        (i["message"]["content"] for i in stream),
        status_code=status.HTTP_200_OK,
        media_type="text/event-stream",
    )
