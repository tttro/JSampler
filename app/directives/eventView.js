'use strict';

angular.module('app.directives')
    .directive('eventview', function() {
        return {
            restrict: 'E',
            templateUrl: 'templates/eventview.html',
            replace: true,
            link: function ($scope, el) {


                var click = function(e) {

                    var tdCell = angular.element(e.target);
                    var hasEvent = tdCell.hasClass('fill');

                    if(hasEvent){
                        // TODO remove sound
                        tdCell.removeClass('fill');
                    }
                }

                el.bind('click', click);
            }
        }
    });
