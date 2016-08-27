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

    $rootScope.cart = {
        count: 0
    };

    $scope.login = function(userEmail, userPassword){
        var    email    = userEmail;
        var    password = userPassword;
        firebase.auth().signInWithEmailAndPassword(email, password).then(function(user) {
            console.log('Auth data after login', firebase.auth())
            console.log('Current user is ', firebase.auth().currentUser)
        }).catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log("ERROR CODE: ", errorCode);
            console.log("ERROR MESSAGE: ", errorMessage);
        });
    }; //end of login()
}]);

// appModule.controller('FooterCtrl', ['', function() {
//     console.log('footer' + ": In Footer Controller.");
// }
// ]);

appModule.controller('HomeCtrl', ['$location', '$rootScope', '$scope', '$firebaseArray', '$firebaseAuth', function($location, $rootScope, $scope, $firebaseArray, $firebaseAuth) {

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

    $scope.addToCart = function(productId) {
        console.log("Inside addToCart(). ", productId);

        var auth = firebase.auth();
        console.log('Auth data ', auth)
        var provider = new firebase.auth.EmailAuthProvider();
        console.log('Current user is ', auth.currentUser);
        auth.signInWithPopup(provider).then(function(result) {
            console.log("User signed in!");
            var uid = result.user.uid;
        }).catch(function(error) {
            console.log("User NOT signed in!");
        });
        var uid = 'yC0Az3hkRJNkAyinScMhvNz5Dst1';
        var newPostKey = firebase.database().ref().child('users/' + uid + '/cart/' + productId).set({
            pid: productId,
            price: 100.12,
            qty: 1,
            status: "processing"
        });
        $rootScope.cart.count++;

    }; //end addToCart()
}]);

appModule.controller('PreviewCtrl', ['$rootScope', '$scope', '$routeParams', '$firebaseObject', function($rootScope, $scope, $routeParams, $firebaseObject) {
    $rootScope.header.bottom = false;
    $rootScope.$broadcast('changeHeader', {key: "abc"});
    $scope.productId = $routeParams.productId;

    var ref = $firebaseObject(firebase.database().ref('products/' + $scope.productId));
    $scope.previewProduct = ref;
}
]);
