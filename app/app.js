'use strict';

// Declare main app
angular
    .module('app', [
        'app.models',
        'app.controllers',
        'app.directives'
    ])
    .config( function() {
        //Configs here
    })
    .run(['Sequencer', '$q', '$rootScope', function(Sequencer, $q,$rootScope) {
        // Globals
        $rootScope.tempo = 90;
        $rootScope.sequencer = new Sequencer;
    }]);

// Declare modules
angular.module('app.models', []);
angular.module('app.controllers', []);
angular.module('app.directives', []);
