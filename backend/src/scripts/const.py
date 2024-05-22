import os

LLM_MODEL = "llava"
WHISPER_MODEL = "distil-medium.en"

models_path = os.path.join(os.getcwd(), "models")
print(models_path)
whisper_model_path = os.path.join(models_path, "whisper")
print(models_path)
