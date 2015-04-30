(function() {
  'use strict';

  angular.module('chatter', [
    'ui.router',
    'ngAnimate',

    //foundation
    'foundation',
    'foundation.dynamicRouting',
    'foundation.dynamicRouting.animations'
  ])
    .config(config)
    .run(run)
    .controller('MainCtrl', [
      '$scope', 
      function($scope){
        $scope.test = 'Contacts';
        $scope.posts = [
          {title: 'post 1', upvotes: 5},
          {title: 'post 2', upvotes: 2},
          {title: 'post 2', upvotes: 15},
          {title: 'post 4', upvotes: 9},
          {title: 'post 5', upvotes: 4}
        ];
        $scope.addPost = function(){
          $scope.posts.push({title: 'A new post!', upvotes: 0});
        };
}]);

  config.$inject = ['$urlRouterProvider', '$locationProvider'];

  function config($urlProvider, $locationProvider) {
    $urlProvider.otherwise('/');

    $locationProvider.html5Mode({
      enabled:false,
      requireBase: false
    });

    $locationProvider.hashPrefix('!');
  }

  function run() {
    FastClick.attach(document.body);
  }

})();
