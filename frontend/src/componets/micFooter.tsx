import { useVoiceRecorder } from "@/lib/useVoiceRecorder";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import React from "react";
import { FaMicrophoneAlt, FaRegStopCircle } from "react-icons/fa";
import Siriwave from "react-siriwave";
export default function MicFooter() {
  const { startRecording, stopRecording, recording } = useVoiceRecorder();
  return (
    <div className=" sticky bottom-0 text-center z-10">
      <Card isHoverable shadow="lg" fullWidth>
        <CardHeader>
          <p className="text-md font-bold">Ask me Something.</p>
        </CardHeader>
        <CardBody className="flex items-center justify-center">

        <div>{recording && <Siriwave theme="ios9" />}</div>
        <div>
          {recording ? (
            <FaRegStopCircle
              size={60}
              cursor="pointer"
              onClick={() => stopRecording()}
            />
          ) : (
            <FaMicrophoneAlt
              size={60}
              cursor="pointer"
              onClick={() => startRecording()}
            />
          )}
        </div>
        </CardBody>
      </Card>
    </div>
  );
}
