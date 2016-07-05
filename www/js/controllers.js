angular.module('starter.controllers', [])

    .controller('SearchCtrl', function ($scope, spotifyAPI) {


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
            else if (type == 2) {
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

    .controller('EditCtrl', function ($scope, $ionicLoading, nfcService) {
        // With the new view caching in Ionic, Controllers are only called
        // when they are recreated or on app start, instead of every page change.
        // To listen for when this page is active (for example, to refresh data),
        // listen for the $ionicView.enter event:
        //
        //$scope.$on('$ionicView.enter', function(e) {
        //});
        $scope.show = function () {
            $ionicLoading.show({
                template: '<p>Loading...</p><ion-spinner></ion-spinner>'
            });
        };

        $scope.hide = function () {
            $ionicLoading.hide();
        };

        $scope.write = function (spotify_uri) {
            /*console.log(spotify_uri);
             nfcService.writeTag(spotify_uri).then(function (data) {
             console.log("Writing success : " + data)
             }, function (error) {
             console.log("Writing error : " + error)
             })*/

            cordova.plugins.Keyboard.close();

            $scope.show($ionicLoading);

            $scope.messages = nfcService.writeUri(spotify_uri).then(function (data) {
                console.log("data : " + data);
            }).finally(function ($ionicLoading) {
                $scope.hide($ionicLoading);
            })

        };


    })


    .controller('ChatDetailCtrl', function ($scope, $stateParams, Chats) {
        $scope.chat = Chats.get($stateParams.chatId);
    })

    .controller('ReadCtrl', function ($scope) {
        $scope.settings = {
            enableFriends: true
        };
    });
