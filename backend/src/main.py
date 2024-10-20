from contextlib import asynccontextmanager

from fastapi import FastAPI, status, UploadFile, File
from fastapi.responses import StreamingResponse, JSONResponse
from fastapi.requests import Request
from scripts.utils import download_models, setup_ollama
from services.text2text import chatting, make_assistant, assistants
from services.voice2text import voice2text
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates

import json


@asynccontextmanager
async def lifespan(app: FastAPI):
    await setup_ollama()
    await download_models()

    print("started")
    yield
    print("ended")


app = FastAPI(lifespan=lifespan)
app.mount("/static", StaticFiles(directory="static"), name="static")
templates = Jinja2Templates("./templates")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root(request: Request):
    return templates.TemplateResponse("base.html", {"request": request})


@app.get("/get_designations")
async def get_designations():
    return JSONResponse(content=assistants, status_code=status.HTTP_200_OK)


@app.post("/make_assistant")
async def make_assistan_ctrl(req: dict):
    messages = await make_assistant(req["designation"])
    return JSONResponse(content=messages, status_code=status.HTTP_200_OK)


@app.post("/chat")
async def chat(audio: UploadFile = File(...)):
    print(audio.filename)
    prompt = await voice2text(audio)
    messages = await chatting(prompt=prompt)

    # print(stream)
    # return StreamingResponse(
    #     (i["message"]["content"] for i in stream),
    #     status_code=status.HTTP_200_OK,
    #     media_type="text/event-stream",
    # )
    return JSONResponse(content=messages, status_code=status.HTTP_200_OK)
