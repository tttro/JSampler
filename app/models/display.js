'use strict';

angular.module('app.models')
    .factory('Display', function(){

        var Display = {};
        var _canvas, _ctx;

        var init = function(){
            _canvas = document.getElementById("waveFormDisplay");
            _ctx = _canvas.getContext("2d");
        };

        init();

        Display.drawWaveForm  = function(buffer) {

            var channelData, float, frameInterval, i, posX;
            var self = this;

            self.clear();

            channelData = buffer.getChannelData(0);
            frameInterval = Math.floor(buffer.length / _canvas.width);
            posX = 0;
            i = 0;

            _ctx.lineTo(_canvas.width, 0);
            _ctx.beginPath();
            _ctx.moveTo(posX, _canvas.height / 2);

            while (i < buffer.length) {
                float = channelData[i];
                i += frameInterval;
                _ctx.lineTo(++posX, (float * 40) + (_canvas.height / 2));
                _ctx.lineTo(posX, -(float * 40) + (_canvas.height / 2));
            }
            _ctx.strokeStyle = '#ff6437';
            return _ctx.stroke();
        };

        Display.clear = function() {
            return _ctx.clearRect(0, 0, _canvas.width, _canvas.height);
        };

        Display.setSoundName = function (name) {
            _ctx.font = '12pt Roboto';
            _ctx.fillStyle = '#ff6437';
            _ctx.fillText("name: "+name, 0, 10);
        };

        return Display;

    });