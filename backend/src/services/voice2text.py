from faster_whisper import WhisperModel
from scripts.const import whisper_model_path
from scripts.utils import audio_to_path


async def voice2text(audio: UploadFile):
    audio_path = await audio_to_path(audio)
    print(audio_path)
    whisper = WhisperModel(whisper_model_path, device="cuda", compute_type="float32")
    segments, info = whisper.transcribe(audio_path, beam_size=5, language="en")
    token_list = []
    for segment in segments:
        token_list.append(segment.text)

    prompt = " ".join(token_list)
    os.remove(audio_path)
    return prompt
