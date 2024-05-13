import { useVoiceRecorder } from "@/lib/useVoiceRecorder";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import React from "react";
import { FaMicrophoneAlt, FaRegStopCircle } from "react-icons/fa";
import Siriwave from "react-siriwave";
export default function MicFooter() {
  const { startRecording, stopRecording, recording } = useVoiceRecorder();
  return (
    <div className=" fixed w-auto bottom-0 text-center z-10">
      <Card isHoverable shadow="lg" fullWidth>
        <CardBody className="flex items-center justify-center">
          <div className="w-[200px] h-[90px]">
            {recording && <Siriwave cover theme="ios9" />}
          </div>
          <div>
            {recording ? (
              <div className="w-full flex flex-grow flex-col justify-center items-center gap-y-4">
                <FaRegStopCircle
                  size={60}
                  cursor="pointer"
                  onClick={() => stopRecording()}
                />
                <p className="text-sm text capitalize">Stop Recording.</p>
              </div>
            ) : (
              <div className="w-full flex flex-grow flex-col justify-center items-center gap-y-4">
                <FaMicrophoneAlt
                  size={60}
                  cursor="pointer"
                  onClick={() => startRecording()}
                />
                <p className="text-sm text capitalize">Ask Me Anything.</p>
              </div>
            )}
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
