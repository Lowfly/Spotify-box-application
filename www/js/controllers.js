angular.module('starter.controllers', [])

.controller('SearchCtrl', function($scope, spotifyAPI) {


      $scope.currentSearchList = {};

      $scope.spotifysearch = function (type, content) {

        console.log("passe");
        if (type == 1) {
          spotifyAPI.searchTrack(content)
              .then(function (response) {
                $scope.currentSearchList = response.data;
                console.log($scope.currentSearchList);
              }, function (error) {
                $scope.status = 'Unable to load customer data: ' + error.message;
              });
        }
        else if  (type == 2) {
          spotifyAPI.searchAlbum(content)
              .then(function (response) {
                $scope.currentSearchList = response.data;
                console.log($scope.currentSearchList);

              }, function (error) {
                $scope.status = 'Unable to load customer data: ' + error.message;
              });
        }
        else if (type == 3) {
          spotifyAPI.searchPlaylist(content)
              .then(function (response) {
                $scope.currentSearchList = response.data;
                console.log($scope.currentSearchList);

              }, function (error) {
                $scope.status = 'Unable to load customer data: ' + error.message;
              });
        }
      }
    })

    .controller('EditCtrl', function($scope, Chats) {
      // With the new view caching in Ionic, Controllers are only called
      // when they are recreated or on app start, instead of every page change.
      // To listen for when this page is active (for example, to refresh data),
      // listen for the $ionicView.enter event:
      //
      //$scope.$on('$ionicView.enter', function(e) {
      //});

      $scope.write = function(spotify_uri){
        console.log(spotify_uri);
        alert(spotify_uri);
      };
    })

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
