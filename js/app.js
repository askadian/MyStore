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
        .when('/Preview/:productId', {
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
        //...
    });

    $scope.login = function(userEmail, userPassword){
        var    email    = userEmail;
        var    password = userPassword;
        firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log("ERROR CODE: ", errorCode);
            console.log("ERROR MESSAGE: ", errorMessage);
        });
    };
}]);

appModule.controller('FooterCtrl', ['', function() {
    console.log('footer' + ": In Footer Controller.");
}
]);

appModule.controller('HomeCtrl', ['$location', '$rootScope', '$scope', '$firebaseArray', function($location, $rootScope, $scope, $firebaseArray) {

    $rootScope.curLoc = $location.path();
    if ($rootScope.curLoc === '/') {
        $rootScope.header.bottom = true;

    } else {
        $rootScope.header.bottom = false;
    }
    var ref = firebase.database().ref("products");
    
    var list = $firebaseArray(ref);
    $scope.data = list;

    $rootScope.$broadcast('changeHeader', {key: "abc"});
}]);

appModule.controller('PreviewCtrl', ['$rootScope', '$scope', '$routeParams', '$firebaseObject', function($rootScope, $scope, $routeParams, $firebaseObject) {
    $rootScope.header.bottom = false;
    $rootScope.$broadcast('changeHeader', {key: "abc"});
    $scope.productId = $routeParams.productId;

    var ref = $firebaseObject(firebase.database().ref('products/' + $scope.productId));
    $scope.previewProduct = ref;
}
]);
