# Scratch-TM-Audio-Model


## Introduction

The **TM Audio Model Extension** introduces audio-based machine learning capabilities to Scratch. This extension allows users to integrate Teachable Machine audio classification models into their Scratch projects. By leveraging speech and sound recognition, it provides endless opportunities for creating interactive and educational experiences. From voice-activated games to real-time sound-based projects, the TM Audio Model Extension enhances the creative possibilities in Scratch.


## Features and Capabilities

### Load and Use Audio Models
The extension supports loading pre-trained audio models from [Teachable Machine](https://teachablemachine.withgoogle.com/). Users can train their models to recognize specific sounds, words, or noise patterns and seamlessly integrate them into Scratch.

- **Flexible Integration**: Load models directly using their URL.
- **Real-Time Recognition**: Detect sounds and classify them in real time.

### Audio Recognition Blocks
- **Command Blocks**: Load models, set parameters, and start or stop listening.
- **Event Blocks**: Trigger actions when specific sounds are detected.
- **Reporter Blocks**: Retrieve the current sound class and its probability.


## Example Project: Interactive Music Game

### Project Overview
Imagine creating a game where students clap their hands or play musical instruments to control characters in Scratch. This project demonstrates the power of audio recognition by combining it with Scratch's visual programming interface.

### Steps to Create the Game

1. **Train the Model**:
   - Collect audio samples of clapping, guitar strumming, and drum beats.
   - Train a Teachable Machine model to classify these sounds.

2. **Load the Model**:
   - Copy the URL of your trained model.
   - Use the `load audio model from url [URL]` block to load the model.

3. **Set Up Scratch Logic**:
   - Use the `start listening` block to activate audio recognition.
   - Add logic to move characters or trigger animations based on detected sounds.

### Example Code
```plaintext
when green flag clicked
load audio model from url [https://teachablemachine.withgoogle.com/models/audioModelID/]
start listening

when model hears [Clap]
move [10] steps
say [You clapped!]

when model hears [Guitar]
play sound [Guitar Sound]
say [You played the guitar!]
```

This simple project lets users interact with Scratch using real-world sounds, making learning both fun and engaging.


## Blocks in Detail

### 1. Load Audio Model
**Block**: `load audio model from url [URL]`  
**Description**: Loads a Teachable Machine audio model from a specified URL.  
**Example**: Load a model trained to recognize clapping and other sounds.

### 2. Set Overlap Factor
**Block**: `set overlap factor [FACTOR]`  
**Description**: Adjusts how often the recognizer checks for audio. Higher values result in more frequent checks.

### 3. Start Listening
**Block**: `start listening`  
**Description**: Activates the audio recognizer to begin detecting sounds.

### 4. Stop Listening
**Block**: `stop listening`  
**Description**: Stops the audio recognizer and resets the current sound class and probability.

### 5. When Model Hears
**Block**: `when model hears [CLASSNAME]`  
**Description**: Triggers events when a specified sound class is detected.

### 6. Sound is Class
**Block**: `sound is [CLASSNAME]`  
**Description**: Returns true if the detected sound matches the specified class.

### 7. Get Current Sound
**Block**: `sound`  
**Description**: Reports the current sound class detected.

### 8. Get Current Sound Probability
**Block**: `probability`  
**Description**: Reports the probability of the detected sound class.


## Technical Details

### Audio Recognition
The extension uses [TensorFlow.js](https://www.tensorflow.org/js) and the [Speech Commands](https://github.com/tensorflow/tfjs-models/tree/master/speech-commands) library to perform real-time audio recognition. The recognizer processes audio data and classifies it based on the trained model.

### Overlap Factor
The `overlapFactor` determines how much of the audio window overlaps between predictions. A higher factor enables faster predictions but requires more processing power.


## Applications

1. **Education**: Create interactive lessons that respond to students' voices or sounds.
2. **Games**: Develop voice-activated games where players control characters using sound.
3. **Art Installations**: Build sound-responsive art projects.
4. **Accessibility**: Enable voice commands for Scratch projects to improve accessibility.


## How to Use

### Step 1: Install the Extension
Clone or download this repository and follow Scratch's instructions to add unsandboxed extensions.

### Step 2: Train a Model
Train an audio model using Teachable Machine. Export the model and copy its URL.

### Step 3: Create a Scratch Project
- Load the model using the `load audio model from url` block.
- Start listening with the `start listening` block.
- Use event-driven blocks to respond to sounds.

### Step 4: Debug and Optimize
Test the project to ensure the model correctly detects sounds. Adjust the `overlapFactor` if needed.


## Example Use Case: Musical Instrument Quiz

### Project Flow
1. Ask the user to play a specific instrument (e.g., "Play a guitar sound!").
2. Wait for the audio model to detect the correct sound.
3. Provide feedback, such as playing an animation or sound.

### Implementation
```plaintext
when green flag clicked
load audio model from url [https://teachablemachine.withgoogle.com/models/audioModelID/]
start listening
say [Play a guitar sound!]

when model hears [Guitar]
say [Correct!]
play sound [Guitar Sound]
```


## Limitations

1. **Environment Sensitivity**: Background noise can affect model accuracy.
2. **Device Requirements**: Requires a microphone and modern browser.
3. **Model Quality**: Accuracy depends on the quality of training data.


## Future Enhancements
- Add support for offline model loading.
- Optimize performance for lower-end devices.
- Include pre-trained models for common applications.


## License
This extension is licensed under the MIT License. You are free to use, modify, and distribute it.


## Support and Contributions
For support, open an issue on GitHub. Contributions are welcome—feel free to submit a pull request to improve this extension!
