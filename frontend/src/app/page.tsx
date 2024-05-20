"use client";

import Chat from "@/componets/chat";
import { AppContext } from "@/componets/mainLayout";
import { useVoiceRecorder } from "@/lib/useVoiceRecorder";
import { Button, Chip, Spacer } from "@nextui-org/react";
import { Suspense, useContext, useEffect, useState } from "react";
import Loading from "./loading";
import Designations from "@/componets/designations";
import os from "os";
import path from "path";

export default function Home() {
  const { designations, messages, getAllDesignations, assignDesignation } =
    useContext(AppContext);
  console.log(messages);
  console.log(process.cwd());
  console.log(os.userInfo().username);
  console.log(process.env.NEXT_PUBLIC_NAME);
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

  return (
    <main className="px-8">
      {/* <Loading/> */}
      {/* <Suspense fallback={<Loading />}>
        <Designations />
      </Suspense> */}

      <div className="flex flex-col gap-y-8">
        {messages.map((message) => (
          <Chat message={message} />
        ))}
      </div>
      <Loading />
    </main>
  );
}
