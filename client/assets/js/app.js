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
    .factory('posts', [function(){
      var o = {
        posts: []
      };
      return o;
    }])
    .config(config)
    .run(run)
    
    // inject posts service into main controller
    .controller('MainCtrl', [
      '$scope', 'posts',
      function($scope, posts){
        // bind $scope.posts to posts array in factory
        $scope.posts = posts.posts;
        $scope.body = posts.body;
        $scope.test = 'Comments';
        $scope.comments = posts.comments;
        
        $scope.addPost = function(post){
          if(!post.title || post.title === '') { return; }
          if(!post.upvotes) { post.upvotes = 0 } 
          $scope.posts.push({
            title: post.title, 
            link: post.link,
            upvotes: post.upvotes,
            comments: post.comments,
            comments: [
              {author: 'Joe', body: 'Cool post!', upvotes: 0},
              {author: 'Todd', body: 'This is a crappy post!', upvotes: 2}
            ]
          });
          post.title = '';
          post.link = '';
        };
        $scope.incrementUpvotes = function(post) {
          post.upvotes += 1;
        };
    }])

    .controller('slide', function(
        $window
      ){
        this.items = [+new $window.Date];
        
        this.push = function() {
          this.items.push(+new $window.Date);
        };
        
        this.pop = function() {
          this.items.pop();
        };
        
        this.moveLast = function() {
          this.items.splice(+new $window.Date % (this.items.length - 1), 0, this.items.splice(this.items.length - 1, 1)[0]);
        };
      })

    // Posts controller
    .controller('PostsCtrl', [
      '$scope',
      '$stateParams',
      'posts',
      function($scope, $stateParams, posts){
        $scope.post = posts.posts[$stateParams.id];
        $scope.comments = [];
        $scope.comments.body

        $scope.addComment = function(comment){
          if(!this.comment.body === '') { return; }
          $scope.comments.push({
            body: comment.body,
            author: 'user',
            upvotes: 0
          });
          comment.body = '';
        };
    }])

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



















