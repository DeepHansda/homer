from faster_whisper import WhisperModel
from scripts.const import whisper_model_path


async def voice2text():
    whisper = WhisperModel(whisper_model_path, device="cuda", compute_type="float32")
    segments, info = whisper.transcribe(
        "/kaggle/working/homer/src/Recording.mp3", beam_size=5, language="en"
    )
    token_list = []
    for segment in segments:
        token_list.append(segment.text)

    prompt = " ".join(token_list)
    return prompt
