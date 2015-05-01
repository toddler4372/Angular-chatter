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
        {title: 'test post', upvotes: 5}
        ];
        $scope.addPost = function(post){
          if(!post.title || post.title === '') { return; } 
          if(!post.upvotes) { post.upvotes = 0 } 
          $scope.posts.push({
            title: post.title, 
            link: post.link,
            upvotes: post.upvotes
          });
          post.title = '';
          post.link = '';
        };
        $scope.incrementUpvotes = function(post) {
          post.upvotes += 1;
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



















