'use strict';

var appModule = angular.module('myApp', ['ngRoute']).
config(['$routeProvider',function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'partials/home.tpl.html',
            controller: 'HomeCtrl'
        })
        .when('/Contact', {
            templateUrl: 'partials/contact.tpl.html',
            controller: 'HomeCtrl'
        })
        .when('/Preview', {
            templateUrl: 'partials/preview.tpl.html',
            controller: 'HomeCtrl'
        })
        .otherwise({redirectTo: '/'});
}]);

appModule.controller('HeaderCtrl', ['$location', '$rootScope', '$scope', function($location, $rootScope, $scope) {
    $rootScope.curLoc = $location.path();
    $rootScope.header = {
        bottom : false,
        categories: ['all', 'hindi', 'telugu', 'english', 'tamil', 'malyalam', 'kannada', 'bengali', 'assami', 'kids', 'animation', 'games']
    };
    console.log($rootScope.curLoc + ": In Header Controller.");
    $rootScope.$on('changeHeader', function (event, params) {
        console.log("Came back to Header Controller with value: " + params.key);
});
}]);

appModule.controller('FooterCtrl', [, function() {
    console.log('footer' + ": In Footer Controller.");
}
]);

appModule.controller('HomeCtrl', ['$location', '$rootScope', '$scope', function($location, $rootScope, $scope) {
    console.log($rootScope.curLoc + ": In Home Controller.");
    $rootScope.curLoc = $location.path();
    if ($rootScope.curLoc === '/') {
        $rootScope.header.bottom = true;
    } else {
        $rootScope.header.bottom = false;
    }
    var name = "AMRESH KADIAN";
    $rootScope.$broadcast('changeHeader', {key: name});
}]);
