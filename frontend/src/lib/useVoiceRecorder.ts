"use client";

import React, { Dispatch, SetStateAction, useContext, useEffect, useRef, useState } from 'react';
import { blobToBase64 } from './utils';
import { AppContext } from '@/componets/mainLayout';

export const useVoiceRecorder = () => {
    const [recording, setRecording] = useState(false);
    const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder>(undefined);
    const [previewAudio, setPreviewAudio] = useState("");
    const chunks = useRef("");
    const { getMessages } = useContext(AppContext)



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
            getMessages(blobData)
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
