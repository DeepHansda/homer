"use client";

import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { blobToBase64 } from './utils';

export const useVoiceRecorder = ({setStreamingData}:{
    setStreamingData: Dispatch<SetStateAction<string>>
}) => {
    const [recording, setRecording] = useState(false);
    const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder>(undefined);
    const [previewAudio, setPreviewAudio] = useState("");
    const chunks = useRef("");
   

  
    const startRecording = () => {
        if (mediaRecorder) {
            console.log("fired start")
            mediaRecorder.start();
            setRecording(true);
        }
    };

    const stopRecording = () => {
        if (mediaRecorder) {
            console.log("fired stop")
            mediaRecorder.stop();
            setRecording(false);
        }
    };

    const getText = async (blobData) => {
        try {
            const formData = new FormData()
            formData.append("audio", blobData)
            const fetchOptions = {
                method: "POST",
                body: formData,
                headers: {
                    "ngrok-skip-browser-warning": "true",
                },
            };
            setStreamingData("")
            const response = await fetch("https://ideally-popular-dove.ngrok-free.app/proxy/8000/chat", fetchOptions);

            const reader = response.body?.getReader()

            const pump = async () => {
                const { done, value } = await reader?.read();
                if (done) {
                    console.log('Streaming completed');
                    return;
                }
                const chunk = new TextDecoder().decode(value)
                // Update state with the new chunk of data
               
                console.log('Received chunk:', chunk);
                setStreamingData(prevData => prevData + chunk);
                // Continue reading the stream
                await pump();
            };

            await pump();
        } catch (error) {
            console.log(error);
        }
    };

    const initMediaListeners = (stream: MediaStream) => {
        const mediaRecorderInstance = new MediaRecorder(stream);
        mediaRecorderInstance.onstart = () => {
            chunks.current = [];
        };
        mediaRecorderInstance.ondataavailable = (ev: BlobEvent) => {
            chunks.current.push(ev.data);
        };
        mediaRecorderInstance.onstop = () => {
            const blobData = new Blob(chunks.current, { type: "audio/wav" });
            console.log(blobData)
            const previewAudioURL = window.URL.createObjectURL(blobData);
            getText(blobData)
            setPreviewAudio(previewAudioURL)
        };
        setMediaRecorder(mediaRecorderInstance);
    };

    useEffect(() => {
        if (typeof window !== "undefined") {
            navigator.mediaDevices.getUserMedia({ audio: true }).then(initMediaListeners);
        }
    }, []);

    return { recording, previewAudio, startRecording, stopRecording };
};
