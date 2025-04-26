document.addEventListener('DOMContentLoaded', () => {
    const video = document.getElementById('webcam');
    const moodDisplay = document.getElementById('moodDisplay');
    const recordMoodButton = document.getElementById('recordMood');
  
    // Load face-api.js models
    Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri('/public/models'),
      faceapi.nets.faceExpressionNet.loadFromUri('/public/models')
    ]).then(startWebcam).catch((err) => console.error('Error loading models:', err));
  
    // Start webcam
    async function startWebcam() {
        console.log("startWebcam() is being called");
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        video.srcObject = stream;
        video.addEventListener('play', detectMood);
      } catch (err) {
        console.error('Error accessing webcam:', err);
        moodDisplay.textContent = "Error accessing webcam. Please check permissions.";
      }
    }
    
  
    // Detect Mood
    async function detectMood() {
      if (video.paused || video.ended) return;
      const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceExpressions();
      if (detections.length > 0) {
        const emotions = detections[0].expressions;
        const dominantEmotion = Object.keys(emotions).reduce((a, b) => emotions[a] > emotions[b] ? a : b);
        moodDisplay.textContent = `Mood: ${dominantEmotion}`;
      } else {
        moodDisplay.textContent = "No face detected.";
      }
  
      requestAnimationFrame(detectMood);
    }
  
    // Record Mood
    recordMoodButton.addEventListener('click', async () => {
      const currentMood = moodDisplay.textContent.replace('Mood: ', '');
      const userId = getUserId(); // Get user ID from your account system
      if (userId && currentMood) {
        const moodData = {
          userId,
          timestamp: Date.now(),
          mood: currentMood
        };
        saveMoodToLocalStorage(moodData);
        console.log('Mood recorded:', moodData);
      } else {
        console.error("User ID or mood not available.")
      }
    });
  
    // Local Storage Functions
    function getUserId() {
      let userId = localStorage.getItem('userID');
      if (!userId) {
        userId = 'defaultUser-' + Math.random().toString(36).substring(2, 9); // Generate a random default ID
        localStorage.setItem('userID', userId);
      }
      return userId;
    }
  
    function saveMoodToLocalStorage(moodData) {
      const existingMoods = JSON.parse(localStorage.getItem('moods')) || [];
      existingMoods.push(moodData);
      localStorage.setItem('moods', JSON.stringify(existingMoods));
    }
  });
