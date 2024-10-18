const canvas = document.getElementById('visualizer');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let audioContext;
let analyser;
let dataArray;
let source;
let mediaRecorder;
let recordedChunks = [];
let isRecording = false;
let silenceTimeout;

const silenceThreshold = 10; // Below this threshold is considered silence
const silenceTimeoutDuration = 3000; // Stop recording after 3 seconds of silence

const startBtn = document.getElementById('start-btn');
const stopBtn = document.getElementById('stop-btn');
const audioInput = document.getElementById('audioInput'); // Hidden input field for HTMX form
const uploadForm = document.getElementById('uploadForm'); // HTMX form
const statusText = document.getElementById('status');

// Start visualizer and recording
startBtn.addEventListener('click', async () => {
    // Get microphone input
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    source = audioContext.createMediaStreamSource(stream);
    
    // Setup audio analyzer
    analyser = audioContext.createAnalyser();
    analyser.fftSize = 256;
    const bufferLength = analyser.frequencyBinCount;
    dataArray = new Uint8Array(bufferLength);
    
    source.connect(analyser);
    drawCircleVisualizer();

    // Setup MediaRecorder for recording the audio
    mediaRecorder = new MediaRecorder(stream);
    mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
            recordedChunks.push(event.data);
        }
    };

    mediaRecorder.onstop = handleStopRecording;
    
    // Start recording
    mediaRecorder.start();
    isRecording = true;

    // Enable stop button
    stopBtn.disabled = false;
    startBtn.disabled = true;
    statusText.textContent = "Recording...";

    // Start silence detection
    detectSilence();
});

// Silence detection and auto-stop
function detectSilence() {
    const checkSilence = () => {
        analyser.getByteFrequencyData(dataArray);

        // Calculate average amplitude
        let sum = 0;
        for (let i = 0; i < dataArray.length; i++) {
            sum += dataArray[i];
        }
        const averageAmplitude = sum / dataArray.length;

        if (averageAmplitude < silenceThreshold) {
            // User is silent
            if (!silenceTimeout) {
                // Set timeout to stop recording if silence persists
                silenceTimeout = setTimeout(() => {
                    if (mediaRecorder && isRecording) {
                        mediaRecorder.stop();
                        isRecording = false;
                        statusText.textContent = "Stopped recording due to silence. Uploading...";
                    }
                }, silenceTimeoutDuration);
            }
        } else {
            // User is speaking
            clearTimeout(silenceTimeout);
            silenceTimeout = null;
        }

        // Continue checking for silence
        if (isRecording) {
            requestAnimationFrame(checkSilence);
        }
    };

    checkSilence();
}

// Draw expanding and contracting circle
function drawCircleVisualizer() {
    requestAnimationFrame(drawCircleVisualizer);

    analyser.getByteFrequencyData(dataArray);

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Calculate average amplitude
    let sum = 0;
    for (let i = 0; i < dataArray.length; i++) {
        sum += dataArray[i];
    }
    const averageAmplitude = sum / dataArray.length;
    const radius = Math.min(averageAmplitude, 150);
    
    // Draw circle
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.fill();
    ctx.closePath();
}

// Handle stop recording
function handleStopRecording() {
    const blob = new Blob(recordedChunks, { type: 'audio/webm' });

    // Convert blob to base64 and set it in the hidden form input
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = () => {
        const base64data = reader.result.split(',')[1]; // Get base64 string
        audioInput.value = base64data; // Set hidden input value
        uploadForm.submit(); // Automatically trigger the HTMX form submission
    };

    recordedChunks = [];
}
