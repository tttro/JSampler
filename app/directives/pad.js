'use strict';

angular.module('app.directives')
    .directive('pad', function(Display, SoundEngine, $rootScope, $timeout) {
        return {
            restrict: 'A',
            link: function ($scope, el) {

                var _soundEngine = new SoundEngine;
                var file;
                var padLightTime = 200;

                el.bind('dragenter', dragenter);
                el.bind('dragover', dragover);
                el.bind('dragleave', dragleave);
                el.bind('drop', drop);
                el.bind('click', click);


                function dragenter(e) {
                    e.stopPropagation();
                    e.preventDefault();
                    el.addClass('dropping');
                };
                function dragover(e) {
                    e.stopPropagation();
                    e.preventDefault();
                };
                function dragleave(e) {
                    e.stopPropagation();
                    e.preventDefault();
                    el.removeClass('dropping');
                };
                function drop(e) {
                    e.stopPropagation();
                    e.preventDefault();
                    el.removeClass('dropping');
                    var files = e.dataTransfer.files;
                    file = files[0];
                    el.text(file.name);
                    _soundEngine.loadFile(file);
                };
                function click(e) {

                    e.stopPropagation();
                    e.preventDefault();
                    el.removeClass('active');
                    el.addClass('active');

                    if(file) {
                        console.log("Hit " + file.name);
                        _soundEngine.play();
                    }

                    // Should be record true and click event click = 0
                    if($rootScope.sequencer.isRecording() && e.button == 0){
                        $rootScope.sequencer.addEvent(e.target);
                    }

                    $timeout(function(){
                        el.removeClass('active');
                    }, padLightTime);

                };




            }
        }
    });