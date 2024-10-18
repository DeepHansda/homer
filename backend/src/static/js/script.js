const canvas = document.getElementById('visualizer');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let audioContext;
let analyser;
let dataArray;
let source;
let silenceTimeout;
let speaking = false; // To check whether user is speaking
const silenceThreshold = 10; // Below this value is considered silence
const silenceTimeoutDuration = 3000; // Duration (in ms) to wait before stopping after silence

function startVisualizer() {
    // Get the user's microphone input
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        source = audioContext.createMediaStreamSource(stream);
        
        // Set up the audio analyzer
        analyser = audioContext.createAnalyser();
        analyser.fftSize = 256; // Adjust for detail
        const bufferLength = analyser.frequencyBinCount;
        dataArray = new Uint8Array(bufferLength);
        
        source.connect(analyser);
        drawCircleVisualizer();
    });
}

function stopVisualizer() {
    if (source) {
        // Disconnect the audio source
        source.disconnect();
        analyser.disconnect();
        audioContext.close();
        console.log("Visualizer stopped due to silence.");
    }
}

function drawCircleVisualizer() {
    requestAnimationFrame(drawCircleVisualizer);
    
    analyser.getByteFrequencyData(dataArray);
    
    // Calculate average amplitude for the circle radius
    let sum = 0;
    for (let i = 0; i < dataArray.length; i++) {
        sum += dataArray[i];
    }
    const averageAmplitude = sum / dataArray.length;
    
    // Detect speaking and silence
    if (averageAmplitude > silenceThreshold) {
        // User is speaking
        if (!speaking) {
            speaking = true;
            clearTimeout(silenceTimeout);
            console.log("User started speaking.");
        }
    } else {
        // User is silent
        if (speaking) {
            speaking = false;
            // Start a timeout to stop the visualizer if silence persists
            silenceTimeout = setTimeout(stopVisualizer, silenceTimeoutDuration);
            console.log("User stopped speaking.");
        }
    }
    
    // Clear the canvas for each frame
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Set up circle properties
    const maxRadius = 150; // Max size of the circle
    const radius = averageAmplitude / 2; // Adjust size based on amplitude
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    
    // Draw the expanding/contracting circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, Math.min(radius, maxRadius), 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.fill();
    ctx.closePath();
}
