'use strict';

angular.module('app.models')
    .factory('SoundEngine', function(AudioContext, Display){


        function SoundEngine(){
            this.audioContext = AudioContext;
            console.log("Constructor SoundEngine");
        }

        SoundEngine.prototype.play = function() {

            if( this.buffer ) {

                this.source = this.audioContext.createBufferSource(); // Create buffer source
                this.gainNode = this.audioContext.createGain();
                this.source.buffer = this.buffer; // Set buffer
                this.source.connect(this.gainNode); // Set gain
                this.gainNode.connect(this.audioContext.destination); // Set sound
                this.source.start(0); // Play

                Display.drawWaveForm(this.buffer);
                Display.setSoundName(this.fileName);

            }

        }

        SoundEngine.prototype.stop = function() {
            if(this.buffer && this.source){
                if(!this.source.stop){
                    this.source.stop = source.noteOff;
                }

                this.source.stop(0);

            }
        }

        SoundEngine.prototype.clear = function() {
            // Remove sound
        }

        SoundEngine.prototype.setGain = function(gainValue){
            var self = this;

            if(self.gainNode) {
                self.gainNode.gain.value = gainValue;
                console.log(self.gainNode.gain.value);
            }
        }

        SoundEngine.prototype.getBuffer = function(){
            var self = this;

            if(!self.buffer)
                return null;

            return self.buffer;
        }

        SoundEngine.prototype.loadFile = function(file) {
            var fileReader,self;
            fileReader = new FileReader;
            self = this;

            fileReader.onload = function(event) {

                var onerror, onsuccess;
                onsuccess = function(buffer) {
                    self.buffer = buffer;
                    self.fileName = file.name;
                    Display.drawWaveForm(buffer);
                    Display.setSoundName(file.name);
                    console.log("File loaded: " +file.name);
                };
                onerror = function() {
                    return alert('Unsupported file format');
                };

                return self.audioContext.decodeAudioData(event.target.result, onsuccess, onerror);
            };

            return fileReader.readAsArrayBuffer(file);
        }

        return (SoundEngine);

    });