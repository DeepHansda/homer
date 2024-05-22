import os
import subprocess
import shutil

import faster_whisper
from scripts.const import LLM_MODEL, WHISPER_MODEL, models_path, whisper_model_path
from scripts.subprocess_executor import executor
from fastapi import UploadFile


async def setup_ollama():
    ollama_install_cmd = "curl -fsSL https://ollama.com/install.sh | sh"
    install_returncode = executor(cmd=ollama_install_cmd, shell=True)
    os.environ["OLLAMA_MODELS"] = models_path
    if install_returncode == 0:  # Check if installation was successful
        start_cmd = ["ollama", "serve"]
        start_ollama = subprocess.Popen(start_cmd)
        start_ollama = subprocess.Popen(start_cmd)



async def download_models():
    download_ollam_model_cmd = ["ollama", "pull", LLM_MODEL]
    ollam_model_returncode = executor(cmd=download_ollam_model_cmd)
    if ollam_model_returncode == 0:
        faster_whisper.download_model(WHISPER_MODEL, whisper_model_path)


async def audio_to_path(audio_file: UploadFile):
    cwd_path = os.getcwd()
    temp_dir = os.path.join(cwd_path, "temp")
    os.makedirs(temp_dir, exist_ok=True)
    temp_file_path = os.path.join(temp_dir, audio_file.filename)

    with open(temp_file_path, "wb") as buffer:
        shutil.copyfileobj(audio_file.file, buffer)
    return temp_file_path
