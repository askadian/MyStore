'use strict';

var appModule = angular.module('myApp', ['ngRoute', 'firebase']).
config(['$routeProvider',function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'partials/home.tpl.html',
            controller: 'HomeCtrl'
        })
        .when('/Login', {
            templateUrl: 'partials/login.tpl.html',
            controller: 'HomeCtrl'
        })
        .when('/Register', {
            templateUrl: 'partials/register.tpl.html',
            controller: 'HomeCtrl'
        })
        .when('/Contact', {
            templateUrl: 'partials/contact.tpl.html',
            controller: 'HomeCtrl'
        })
        .when('/Preview/:mdl', {
            templateUrl: 'partials/preview.tpl.html',
            controller: 'PreviewCtrl'
        })
        .otherwise({redirectTo: '/'});
}]);

appModule.controller('HeaderCtrl', ['$location', '$rootScope', '$scope', function($location, $rootScope, $scope) {
    $rootScope.curLoc = $location.path();
    $rootScope.header = {
        bottom : false,
        categories: ['all', 'hindi', 'telugu', 'english', 
        'tamil', 'malyalam', 'kannada', 'bengali', 'assami', 
        'kids', 'animation', 'games']
    };
    console.log($rootScope.curLoc + ": In Header Controller.");
    $rootScope.$on('changeHeader', function (event, params) {
        console.log("Came back to Header Controller with value: " + params.key);
});
}]);

appModule.controller('FooterCtrl', ['', function() {
    console.log('footer' + ": In Footer Controller.");
}
]);

appModule.controller('HomeCtrl', ['$location', '$rootScope', '$scope', '$firebaseArray', function($location, $rootScope, $scope, $firebaseArray) {
    console.log($rootScope.curLoc + ": In Home Controller.");
    $rootScope.curLoc = $location.path();
    var ref = new Firebase('https://mystore-f6c12.firebaseio.com/products/');
    if ($rootScope.curLoc === '/') {
        $rootScope.header.bottom = true;

    } else {
        $rootScope.header.bottom = false;
    }

    $scope.data = $firebaseArray(ref);

    $rootScope.$broadcast('changeHeader', {key: "abc"});
}]);

appModule.controller('PreviewCtrl', ['$rootScope', '$scope', '$routeParams', '$firebaseObject', function($rootScope, $scope, $routeParams, $firebaseObject) {
    $rootScope.header.bottom = false;
    $rootScope.$broadcast('changeHeader', {key: "abc"});
    $scope.model = +$routeParams.mdl;
    console.log($scope.model + ": In Preview Controller.");
    var ref = new Firebase('https://mystore-f6c12.firebaseio.com/products/');
    ref.orderByChild("mdl").startAt($scope.model).endAt($scope.model).on("child_added", function(snapshot) {
      console.log(snapshot.key() + " was " + snapshot.val().mdl + " meters tall");
      $scope.previewProduct = snapshot.val();
    });
    //ref.off();
}
]);
