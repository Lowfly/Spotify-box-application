angular.module('sb.controllers', [])

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

    .controller('ReadCtrl', function ($scope, $ionicLoading, nfcService) {
        $scope.spotify_uri = {};

        $scope.tag = nfcService.readUri().then(function (data) {
            $scope.tag = data;

            $scope.spotify_uri.uri = ndef.uriHelper.decodePayload($scope.tag.ndefMessage[0].payload);

            $scope.spotify_uri.array = splitPayload($scope.spotify_uri.uri);

            if (!isValidUri($scope.spotify_uri.array)){
                alert("Tag ou URI non valide");
                return;
            }

            getContent($scope.spotify_uri.array);
        });


        function isValidUri(spotify_array) {
            console.log(spotify_array.length);
            if (spotify_array.length == 3) {
                if (spotify_array[0] == 'spotify' && spotify_array[1] == 'track' ||
                    spotify_array[1] == 'album' || spotify_array[1] == 'playlist') {
                    return true
                }
                return false
            }
        }

        function splitPayload(spotify_uri) {
            return spotify_uri.split(':');
        }

        function getContent(spotify_array) {
            if (spotify_array[1] == 'track'){
                console.log("it's a track");
            }
            else if (spotify_array[1] == 'album'){
                console.log("it's an album");

            }
            else if (spotify_array[1] == 'playlist'){
                console.log("it's a playlist");

            }
        }


    })
;
