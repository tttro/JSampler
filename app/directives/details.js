'use strict';

angular.module('app.directives')
    .directive('details', function() {
        return {
            restrict: 'E',
            templateUrl: 'templates/details.html',
            replace: true,
            link: function ($scope, el) {
                $scope.name = "Jee";
            }
        }
    });