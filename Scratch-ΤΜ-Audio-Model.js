(function (Scratch) {
    'use strict';

    // Έλεγχος αν τρέχουμε σε μη-sandboxed περιβάλλον
    if (!Scratch.extensions.unsandboxed) {
        throw new Error('Αυτό το extension πρέπει να τρέξει σε unsandboxed περιβάλλον!');
    }

    // URLs για τις βιβλιοθήκες: TensorFlow.js και speech-commands
    const TFJS_SCRIPT = 'https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@1.3.1/dist/tf.min.js';
    const SPEECH_COMMANDS_SCRIPT = 'https://cdn.jsdelivr.net/npm/@tensorflow-models/speech-commands@0.4.0/dist/speech-commands.min.js';

    // Εικόνα icon (base64) — ίδια με πριν
    const EXTENSION_ICON = 'data:image/jpeg;base64,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';

    class TMAudioModelExtension {
        constructor() {
            this.recognizer = null;          // speechCommands.Recognizer
            this.currentClass = '(none)';    // Ποια κλάση αναγνωρίζεται
            this.currentProbability = 0.0;   // Πιθανότητα αναγνωρισμένης κλάσης

            this.isModelLoaded = false;
            this.isListening = false;        // Έχουμε ξεκινήσει το recognizer.listen;

            // default τιμή για overlapFactor
            this.overlapFactor = 0.50;
        }

        getInfo() {
            return {
                // Όνομα του extension
                id: 'tmAudioModelExtension',
                name: 'TM Audio Model',

                // Χρώματα & εικονίδιο (πράσινα)
                color1: '#5CB85C',
                color2: '#4CAE4C',
                menuIconURI: EXTENSION_ICON,
                blockIconURI: EXTENSION_ICON,

                blocks: [
                    {
                        opcode: 'loadAudioModel',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'load audio model from url [URL]',
                        arguments: {
                            URL: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'https://teachablemachine.withgoogle.com/models/modelID/'
                            }
                        }
                    },
                    {
                        opcode: 'setOverlapFactor',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'set overlap factor [FACTOR]',
                        arguments: {
                            FACTOR: {
                                type: Scratch.ArgumentType.NUMBER,
                                defaultValue: 0.50
                            }
                        }
                    },
                    {
                        opcode: 'startListening',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'start listening'
                    },
                    {
                        opcode: 'stopListening',
                        blockType: Scratch.BlockType.COMMAND,
                        text: 'stop listening'
                    },
                    {
                        opcode: 'whenModelHears',
                        blockType: Scratch.BlockType.HAT,
                        text: 'when model hears [CLASSNAME]',
                        arguments: {
                            CLASSNAME: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'Class 1'
                            }
                        }
                    },
                    {
                        opcode: 'soundIsClass',
                        blockType: Scratch.BlockType.BOOLEAN,
                        text: 'sound is [CLASSNAME]',
                        arguments: {
                            CLASSNAME: {
                                type: Scratch.ArgumentType.STRING,
                                defaultValue: 'Class 1'
                            }
                        }
                    },
                    {
                        opcode: 'getCurrentSound',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'sound'
                    },
                    {
                        opcode: 'getCurrentSoundProbability',
                        blockType: Scratch.BlockType.REPORTER,
                        text: 'probability'
                    }
                ]
            };
        }

        /**
         * Συνάρτηση φόρτωσης script με Promise
         */
        async _loadScript(url) {
            return new Promise((resolve, reject) => {
                const script = document.createElement('script');
                script.src = url;
                script.onload = () => resolve();
                script.onerror = () => reject(new Error(`Failed to load script: ${url}`));
                document.head.appendChild(script);
            });
        }

        /**
         * Βοηθητική συνάρτηση: Φορτώνει TFJS & speech-commands αν δεν έχουν ήδη φορτωθεί.
         */
        async _ensureScriptsLoaded() {
            if (typeof tf === 'undefined') {
                await this._loadScript(TFJS_SCRIPT);
            }
            if (typeof speechCommands === 'undefined') {
                await this._loadScript(SPEECH_COMMANDS_SCRIPT);
            }
        }

        /**
         * Block: load audio model from url [URL]
         * Παράδειγμα: "https://teachablemachine.withgoogle.com/models/Lm-L8KJ-5/"
         */
        async loadAudioModel(args) {
            let baseURL = args.URL.trim();
            if (!baseURL) {
                console.warn('No audio model URL provided.');
                return;
            }

            await this._ensureScriptsLoaded();

            if (!baseURL.endsWith('/')) {
                baseURL += '/';
            }

            const checkpointURL = baseURL + 'model.json';
            const metadataURL = baseURL + 'metadata.json';

            try {
                // Δημιουργία recognizer
                this.recognizer = speechCommands.create(
                    'BROWSER_FFT',
                    undefined, // (προεπιλογή)
                    checkpointURL,
                    metadataURL
                );
                // Φόρτωση μοντέλου
                await this.recognizer.ensureModelLoaded();

                this.isModelLoaded = true;
                console.log('Audio model loaded from:', checkpointURL, metadataURL);
            } catch (err) {
                console.error('Failed to load audio model:', err);
            }
        }

        /**
         * Block: set overlap factor [FACTOR]
         * Ορίζει την παράμετρο overlapFactor (0~1).
         */
        setOverlapFactor(args) {
            const value = parseFloat(args.FACTOR);
            // κάνουμε μια βασική επικύρωση
            if (isNaN(value) || value < 0 || value > 1) {
                console.warn('Invalid overlap factor, must be between 0 and 1. Received:', value);
                return;
            }
            this.overlapFactor = value;
            console.log('Set overlapFactor to:', this.overlapFactor);
        }

        /**
         * Block: start listening
         */
        async startListening() {
            if (!this.isModelLoaded || !this.recognizer) {
                console.warn('Audio model is not loaded yet!');
                return;
            }
            if (this.isListening) {
                console.warn('Already listening.');
                return;
            }

            try {
                const callback = (result) => {
                    // result.scores είναι array με πιθανότητες για κάθε κλάση
                    const scores = result.scores;
                    const labels = this.recognizer.wordLabels();

                    let bestClass = '(none)';
                    let bestProb = 0;
                    for (let i = 0; i < labels.length; i++) {
                        if (scores[i] > bestProb) {
                            bestProb = scores[i];
                            bestClass = labels[i];
                        }
                    }
                    this.currentClass = bestClass;
                    this.currentProbability = bestProb;
                };

                // Ακρόαση: χρησιμοποιούμε το overlapFactor που όρισε ο χρήστης
                this.recognizer.listen(callback, {
                    includeSpectrogram: false,
                    probabilityThreshold: 0.75,
                    invokeCallbackOnNoiseAndUnknown: true,
                    overlapFactor: this.overlapFactor
                });

                this.isListening = true;
                console.log('Started listening. Overlap factor =', this.overlapFactor);
            } catch (err) {
                console.error('Failed to start listening:', err);
            }
        }

        /**
         * Block: stop listening
         */
        stopListening() {
            if (!this.isListening) {
                console.warn('Not currently listening or already stopped.');
                return;
            }
            if (this.recognizer && typeof this.recognizer.stopListening === 'function') {
                this.recognizer.stopListening();
            }
            this.isListening = false;
            console.log('Stopped listening.');
        }

        /**
         * Hat block: "when model hears [CLASSNAME]"
         */
        whenModelHears(args) {
            const wantedClass = args.CLASSNAME.trim();
            return this.currentClass === wantedClass;
        }

        /**
         * Boolean block: "sound is [CLASSNAME]"
         */
        soundIsClass(args) {
            const wantedClass = args.CLASSNAME.trim();
            return (this.currentClass === wantedClass);
        }

        /**
         * Reporter: "sound"
         */
        getCurrentSound() {
            return this.currentClass;
        }

        /**
         * Reporter: "probability"
         */
        getCurrentSoundProbability() {
            return this.currentProbability.toFixed(2);
        }
    }

    // Δήλωση του extension στο Scratch
    Scratch.extensions.register(new TMAudioModelExtension());
})(Scratch);
