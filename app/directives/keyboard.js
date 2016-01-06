'use strict';

angular.module('app.directives')
    .directive('keyboard', function() {
        return {
            restrict: 'E',
            templateUrl: 'templates/keyboard.html',
            replace: true,
            link: function (scope, el) {

            }
        }
    });