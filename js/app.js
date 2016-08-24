'use strict';

var appModule = angular.module('myApp', ['ngRoute', 'firebase']).
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
        categories: ['all', 'hindi', 'telugu', 'english', 'tamil', 'malyalam', 'kannada', 'bengali', 'assami', 'kids', 'animation', 'games']
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


    var name = "AMRESH KADIAN";
    $rootScope.$broadcast('changeHeader', {key: $scope.data.name});
}]);

appModule.controller('PreviewCtrl', ['$scope', '$routeParams', '$firebaseObject', function($scope, $routeParams, $firebaseObject) {
    $scope.model = $routeParams.mdl;
    console.log($scope.model + ": In Preview Controller.");
    var ref = new Firebase('https://mystore-f6c12.firebaseio.com/products/');
    // $scope.previewProduct = firebase.database().ref('user-posts/' + myUserId)

    // new Firebase("https://mystore-f6c12.firebaseio.com/products/")
    // .startAt(1)
    // .endAt(1)
    // .once('value', function(snap) {
    //    console.log('accounts matching email address', snap.val())
    // });

   // ref.orderByChild("mdl").equalTo($scope.model).on("child_added", function(snapshot) {
    ref.once('value', function(snapshot) {
        var productsData = snapshot.val()
       
        let productId = productsData.findIndex(function(product) {
            console.log('Scope model ', $scope.model)
            return product.mdl === $scope.model
        })

        console.log('Inside the firebase event handler ', productId)
        $scope.previewProduct = productId;
        console.log($scope.previewProduct + ": In Preview Controller.");
    });
}
]);
