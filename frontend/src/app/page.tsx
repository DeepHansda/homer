"use client";

import { useVoiceRecorder } from "@/lib/useVoiceRecorder";
import { useState } from "react";

export default function Home() {
  const [streamingData, setStreamingData] = useState("");

  const { recording, previewAudio, startRecording, stopRecording } =
    useVoiceRecorder({ setStreamingData });

  console.log(streamingData);

  // const msg = new SpeechSynthesisUtterance();
  // const speak = (msg) => {
  //   stopRecording();
  //   msg.text = text;
  //   window.speechSynthesis.speak(msg);
  // };

  // const stopVoice = () => {
  //   window.speechSynthesis.cancel();
  // }
  // useEffect(() => {
  //   speak(msg);
  // }, [text]);

  console.log(previewAudio);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {recording && <p>recording.......</p>}
      <div>
        <button onClick={() => startRecording()}>start recording</button>
      </div>
      <div>
        <button onClick={() => stopRecording()}>stop recording</button>
      </div>
      <video controls autoPlay name="media">
        {previewAudio && <source src={previewAudio} type="audio/wav" />}
      </video>
      <p>{streamingData}</p>

      {/* <button onClick={()=>stopVoice()}>
        stop voice
      </button> */}
    </main>
  );
}
