'use strict';

angular.module('app.controllers')
    .controller('MainController', ['$scope','$rootScope', function($scope, $rootScope) {

        // request MIDI access
        if (navigator.requestMIDIAccess) {
            navigator.requestMIDIAccess({
                sysex: false // this defaults to 'false' and we won't be covering sysex in this article.
            }).then(onMIDISuccess, onMIDIFailure);
        } else {
            alert("No MIDI support in your browser.");
        }

        // midi functions
        function onMIDISuccess(midiAccess) {
            // when we get a succesful response, run this code
            console.log('MIDI Access Object', midiAccess);
        }

        function onMIDIFailure(e) {
            // when we get a failed response, run this code
            console.log("No access to MIDI devices or your browser doesn't support WebMIDI API. Please use WebMIDIAPIShim " + e);
        }

        $scope.play = function(event){
            angular.element(event.target).toggleClass('active');
            $rootScope.sequencer.play();
        };

        $scope.record = function(event){
            angular.element(event.target).toggleClass('active');
            $rootScope.sequencer.record();
        };

        $scope.restart = function(event){
            angular.element(event.target).toggleClass('active');
            $rootScope.sequencer.restart();
        };

        $scope.tempoChanged = function() {

            $scope.tempo = $scope.tempo;
            $rootScope.tempo = $scope.tempo;
        }

        $scope.tempoDown = function(){
            $rootScope.tempo--;
            $scope.tempo = $rootScope.tempo;
        }

        $scope.tempoUp = function(){

            $rootScope.tempo++;
            $scope.tempo = $rootScope.tempo;
        }

        $scope.toggleMetronome = function(){
            angular.element(event.target).toggleClass('active');
            $rootScope.sequencer.toggleMetronome();
        }

        $scope.tempo = $rootScope.tempo;
        $scope.tracks = $rootScope.sequencer.getTracks();
        $scope.stepCount = $scope.padCount = new Array($rootScope.sequencer.getStepCount());


    }])
    .controller('PadController', ['$scope', '$rootScope', function($scope, $rootScope) {

        var padsSelection = 'pads';
        var keyboardSelection = 'keyboard';

        $scope.padCount = new Array($rootScope.sequencer.getPadCount()); // How many pads on screen are drawn

        $scope.padMode = padsSelection; // Default

        $scope.selectPads = function () {
            $scope.padMode = padsSelection;
        };

        $scope.selectKeyboard = function () {
            $scope.padMode = keyboardSelection;
        };
    }]);