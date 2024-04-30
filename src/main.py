import subprocess
from contextlib import asynccontextmanager

import ollama
from fastapi import FastAPI
from scripts.const import MODEL
from services.LLMServices import LLMServices
from typing import Optional

llmServices = LLMServices()
async def setup_ollama():
    ollama_install_cmd = "curl -fsSL https://ollama.com/install.sh | sh"
    install_res = subprocess.run(
        ollama_install_cmd, shell=True, stdout=subprocess.PIPE, stderr=subprocess.STDOUT
    )
    for line in install_res.stdout.decode().split("\n"):
        print(line)

    if install_res.returncode == 0:  # Check if installation was successful
        start_cmd = ["ollama", "serve"]
        start_ollama = subprocess.Popen(start_cmd)


@asynccontextmanager
async def lifespan(app: FastAPI):
    await setup_ollama()
    ollama.pull(MODEL)

    print("started")
    yield
    print("ended")


app = FastAPI(lifespan=lifespan)


@app.get("/")
async def root():
    return "server running!"
@app.get("/chat")
async def chat():
    res = llmServices.chatting()
    return res