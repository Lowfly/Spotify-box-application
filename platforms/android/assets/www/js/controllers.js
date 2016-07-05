angular.module('sb.controllers', ['ngResource'])

    .controller('SearchCtrl', function ($scope, spotifyAPI, Chats, $resource) {

        $scope.currentSearchList = {};

        $scope.search = function (input) {
            $scope.encodedInput = encodeURI(input);

            var spotifyAPI = $resource('https://api.spotify.com/v1/search?q=:encodedInput&type=:type', {encodedInput: '@encodedInput'}, {type: '@type'});

            spotifyAPI.get({encodedInput: $scope.encodedInput, type: 'track'}).$promise.then(function (result) {

                cordova.plugins.Keyboard.close();
                $scope.results = result.tracks.items;

            }, function (errResponse) {
                console.log('error');
            });
        }
    })

    .controller('SearchDetailCtrl', function ($scope, spotifyAPI, Chats, $resource) {

        $scope.currentSearchList = {};

        $scope.search = function (input) {
            $scope.encodedInput = encodeURI(input);

            var spotifyAPI = $resource('https://api.spotify.com/v1/search?q=:encodedInput&type=:type', {encodedInput: '@encodedInput'}, {type: '@type'});

            spotifyAPI.get({encodedInput: $scope.encodedInput, type: 'track'}).$promise.then(function (result) {

                cordova.plugins.Keyboard.close();
                $scope.results = result.tracks.items;

            }, function (errResponse) {
                console.log('error');
            });
        }
    })

    .controller('ChatsCtrl', function($scope, Chats, $resource) {

        $scope.currentSearchList = {};

        $scope.search = function (input) {
            $scope.encodedInput = encodeURI(input);

            var spotifyAPI = $resource('https://api.spotify.com/v1/search?q=:encodedInput&type=:type', {encodedInput: '@encodedInput'}, {type: '@type'});

            spotifyAPI.get({encodedInput: $scope.encodedInput, type: 'track'}).$promise.then(function (result) {

                cordova.plugins.Keyboard.close();
                $scope.results = result.tracks.items;

            }, function (errResponse) {
                console.log('error');
            });
        }
    })

    .controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
        $scope.chat = Chats.get($stateParams.chatId);
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



    .controller('ReadCtrl', function ($scope, $ionicLoading, $resource, nfcService) {
        $scope.spotify_uri = {};

        $scope.tag = nfcService.readUri().then(function (data) {
            $scope.tag = data;

            $scope.spotify_uri.uri = ndef.uriHelper.decodePayload($scope.tag.ndefMessage[0].payload);

            $scope.spotify_uri.array = splitPayload($scope.spotify_uri.uri);

            if (!isValidUri($scope.spotify_uri.array)) {
                alert("Tag ou URI non valide");
                return;
            }

            getContent($scope.spotify_uri.array);
        });


        function isValidUri(spotify_array) {
            console.log(spotify_array.length);
            if (spotify_array.length == 3) {
                if (spotify_array[0] == 'spotify' && spotify_array[1] == 'track' ||
                    spotify_array[1] == 'album') {
                    return true
                }
                return false
            }
        }

        function splitPayload(spotify_uri) {
            return spotify_uri.split(':');
        }

        function getContent(spotify_array) {
            var spotifyAPI = $resource('https://api.spotify.com/v1/:type/:id', {type: '@type'}, {id: '@id'});

            spotifyAPI.get({type: spotify_array[1] + 's', id: spotify_array[2]}).$promise.then(function (content) {
                // success

                $scope.content = {};

                $scope.content.name = content.name;
                $scope.content.artists = content.artists;
                $scope.content.album = content.album.name;
                $scope.content.cover = content.album.images[1].url;

                console.log($scope.content);
            }, function (errResponse) {
                console.log('error');
            });
        }


    });
