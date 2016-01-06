'use strict';

angular.module('app.models')
    .factory('AudioContext', function(){

        var _audioContext;

        var init = function(){

            try {

                if (typeof AudioContext !== 'undefined') {
                    _audioContext = new AudioContext();
                }
                else if (typeof webkitAudioContext !== 'undefined') {
                    _audioContext = new webkitAudioContext();
                }
                else {
                    _audioContext = null;
                }

            }
            catch(e) {
                alert('Web Audio API is not supported in this browser');
                console.error(e);
            }

        };

        init();

        return (_audioContext);

    });