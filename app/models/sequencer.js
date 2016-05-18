'use strict';

angular.module('app.models')
    .factory('Sequencer', function($timeout, $rootScope, AudioContext){

        // Private stuff

        var _timeoutId;
        var _nextStepTime = 0.0;
        var _scheduleAheadTime = 0.200;
        var _startTime = 0.0;
        var _metronomeBeepTime = 0.05;
        var _metronomeOn = true;

        var _currentStep = 0;
        var _patternLenght = 1;
        var _isPlaying = false;
        var _isRecording = false;

        var _audioContext = AudioContext || null;
        var _tracks = [];
        var _padCount = 8;
        var _stepCount = 16;


        var setNextStep = function(){
            var secondsPerBeat = 60.0 / $rootScope.tempo;
            _nextStepTime += 0.25  * secondsPerBeat;

            _currentStep++;

            if(_currentStep === _stepCount){
                _currentStep = 0;
            }
        };

        var drawPlayHead = function() {

            for(var i=0; i<_stepCount; i++){

                if(_currentStep==0){
                    angular.element(document.querySelector( '.step'+(i+1) )).removeClass('active');
                }

                if(_currentStep == i){
                    angular.element(document.querySelector( '.step'+(i+1) )).addClass('active');
                }
            }

        }

        var playSound = function() {
            // Loop through every sound from the tracks
            // TODO: play current step sounds
            _.each(_tracks, function(sound, row){
                if( sound[_currentStep].note ) {
                    angular.element(sound[_currentStep].note).triggerHandler('click');
                }
            });


        }

        var playMetronome = function(time) {

            if(_isRecording || _metronomeOn){

               if(_currentStep%2)
               {
                   return;
               }
                var gainNode = _audioContext.createGain();
                var osc = _audioContext.createOscillator();

                gainNode.gain.value = 0.1; // Metronome volume
                osc.connect( gainNode );
                gainNode.connect( _audioContext.destination );

                if (_currentStep % 16 === 0)    // beat 0 == low pitch
                    osc.frequency.value = 880.0;
                else if (_currentStep % 4 === 0 )    // quarter notes = medium pitch
                    osc.frequency.value = 440.0;
                else                        // other 16th notes = high pitch
                    osc.frequency.value = 220.0;


                osc.start(time);
                osc.stop(time + _metronomeBeepTime);

            }
        }

        var scheduler = function() {
            var currentTime = _audioContext.currentTime;

            // The sequence starts at startTime, so normalize currentTime so that it's 0 at the start of the sequence.
            currentTime -= _startTime;
            while (_nextStepTime < currentTime + _scheduleAheadTime ) {

                playSound();

                drawPlayHead();
                playMetronome(currentTime );

                setNextStep();

            }

            _timeoutId = $timeout(scheduler, 0);
        };

        // Constructor
        function Sequencer() {
            console.log("Constructor Sequencer");

            _tracks = _.range(_padCount).map(function () {
                // Create one row
                return _.range(_stepCount).map(function () {
                    return {note: null} ;
                });
            });



        }

        // Public stuff
        Sequencer.prototype.play = function() {

            if (!_isPlaying) {
                console.log('Play');
                _isPlaying = true;

                _nextStepTime = _audioContext.currentTime;
                //_startTime = _audioContext.currentTime + 0.005;

                scheduler(); // Start loop scheduler

            }
            else {
                return this.stop();
            }

        };

        Sequencer.prototype.stop = function() {
            console.log('Stop');
            _isPlaying = false;
            $timeout.cancel( _timeoutId );
        };

        Sequencer.prototype.record = function() {
            _isRecording = !_isRecording;
            console.log('Record:'+_isRecording);


        };

        Sequencer.prototype.restart = function() {
            console.log('Restart');
            _currentStep = 0;
            _isPlaying = true;
            _nextStepTime = _audioContext.currentTime;
            _startTime = _audioContext.currentTime + 0.005;
            scheduler();
            if (!_isPlaying) {

                _isPlaying = true;

                _nextStepTime = _audioContext.currentTime;
                _startTime = _audioContext.currentTime + 0.005;

                scheduler(); // Start loop scheduler

            }
            else {
                return this.stop();
            }
        };

        Sequencer.prototype.addEvent = function(target){

            var curStep = _currentStep;

            if(curStep == 0)
                curStep = 15;
            else {
                curStep--;;
            }

            _tracks[target.value][curStep].note = target;
        }

        Sequencer.prototype.undo = function() {
            var lastEvent = this._tracks.pop();
            this._eventHistory.append(lastEvent);
        };

        Sequencer.prototype.setTempo = function(tempo){
            $rootScope.tempo = tempo;
        };

        Sequencer.prototype.isPlaying = function () {
            return _isPlaying;
        }

        Sequencer.prototype.isRecording = function () {
            return _isRecording;
        }

        Sequencer.prototype.getPadCount = function () {
            return _padCount;
        }

        Sequencer.prototype.getTracks = function () {
            return _tracks;
        }

        Sequencer.prototype.getStepCount = function () {
            return _stepCount;
        }

        Sequencer.prototype.toggleMetronome = function(){
            _metronomeOn = !_metronomeOn;
        }




        return Sequencer;
});