angular.module('sb.controllers', ['ngResource'])


    .controller('SearchCtrl', function ($scope, $resource, $ionicLoading, nfcService) {

        $scope.currentSearchList = {};

        $scope.show = function () {
            $ionicLoading.show({
                template: '<p>Browsing Spotify...</p><ion-spinner></ion-spinner>'
            });
        };

        $scope.hide = function () {
            $ionicLoading.hide();
        };

        $scope.search = function (input) {

            $scope.input = input;
            cordova.plugins.Keyboard.close();
            $scope.show($ionicLoading);


            var spotifyAPI = $resource('https://api.spotify.com/v1/search?q=:input&type=:type', {input: '@input'}, {type: '@type'});
            spotifyAPI.get({input: $scope.input, type: 'track'}).$promise.then(function (result) {

                $scope.results = result.tracks.items;
                if ($scope.results.length == 0) {

                    console.log('empty');
                    $scope.results = [{
                        'name': 'No tracks match your search',
                        'album': {
                            'images': [
                                {'url': 'https://pixabay.com/static/uploads/photo/2014/09/26/10/45/delete-462216_960_720.png'},
                                {'url': 'https://pixabay.com/static/uploads/photo/2014/09/26/10/45/delete-462216_960_720.png'},
                                {'url': 'https://pixabay.com/static/uploads/photo/2014/09/26/10/45/delete-462216_960_720.png'}
                            ]
                        }
                    }];
                }
                $scope.hide($ionicLoading);

            }, function (errResponse) {
                $scope.hide($ionicLoading);

                console.log('error');
            });
        }
    })

    .controller('SearchDetailCtrl', function ($scope, $stateParams, $resource, $ionicLoading, nfcService) {

        $scope.spotify_uri = {};
        $scope.spotify_uri.uri = $stateParams.result;
        $scope.spotify_uri.array = splitPayload($scope.spotify_uri.uri);

        var spotifyAPI = $resource($scope.uri);

        $scope.content = {};
        getContent($scope.spotify_uri.array);

        function splitPayload(spotify_uri) {
            return spotify_uri.split(':');
        }

        function getContent(spotify_array) {
            var spotifyAPI = $resource('https://api.spotify.com/v1/:type/:id', {type: '@type'}, {id: '@id'});

            console.log(spotify_array);
            spotifyAPI.get({type: spotify_array[1] + 's', id: spotify_array[2]}).$promise.then(function (content) {
                // success

                $scope.content = {};

                $scope.content.uri = $scope.spotify_uri.uri;
                $scope.content.name = content.name;
                $scope.content.artists = content.artists;
                $scope.content.album = content.album.name;
                $scope.content.cover = content.album.images[1].url;

                console.log($scope.content);
            }, function (errResponse) {
                console.log('error');
            });
        }

        $scope.show = function () {
            $ionicLoading.show({
                template: '<p>Waiting tag...</p><ion-spinner icon="ripple"></ion-spinner>'
            });
        };

        $scope.hide = function () {
            $ionicLoading.hide();
        };
        $scope.write = function (spotify_uri) {

            $scope.show($ionicLoading);

            $scope.messages = nfcService.writeUri(spotify_uri).then(function (data) {
                console.log("data : " + data);
            }).finally(function ($ionicLoading) {
                $scope.hide($ionicLoading);
                nfcService.closeHandle();
            })

        };

    })

    .controller('EditCtrl', function ($scope, $ionicLoading, nfcService) {

        $scope.show = function () {
            $ionicLoading.show({
                template: '<p>Waiting tag...</p><ion-spinner icon="ripple"></ion-spinner>'
            });
        };

        $scope.hide = function () {
            $ionicLoading.hide();
        };

        $scope.write = function (spotify_uri) {

            cordova.plugins.Keyboard.close();

            $scope.show($ionicLoading);

            $scope.messages = nfcService.writeUri(spotify_uri).then(function (data) {
                console.log("data : " + data);
            }).finally(function ($ionicLoading) {
                $scope.hide($ionicLoading);
            })

        };


    })


    .controller('ReadCtrl', function ($rootScope, $scope, $ionicLoading, $resource, nfcService, $sce) {
        $scope.spotify_uri = {};

        $rootScope.tag = {};

        $scope.tag = nfcService.readUri().then(function (data) {

            console.log("URI");
            $scope.tag = data;

            $scope.spotify_uri.uri = ndef.uriHelper.decodePayload($scope.tag.ndefMessage[0].payload);

            $scope.spotify_uri.array = splitPayload($scope.spotify_uri.uri);

            if (!isValidUri($scope.spotify_uri.array)) {
                alert("Tag ou URI non valide");
                return;
            }

            getContent($scope.spotify_uri.array);
        });

        $scope.getIframe = function() {
            return $sce.trustAsResourceUrl('https://embed.spotify.com/?uri=' + $scope.spotify_uri.uri);
        };

        $scope.readNewTag = function(){

            $scope.tag = nfcService.readUri().then(function (data) {

                console.log("URI");
                $scope.tag = data;

                $scope.spotify_uri.uri = ndef.uriHelper.decodePayload($scope.tag.ndefMessage[0].payload);

                $scope.spotify_uri.array = splitPayload($scope.spotify_uri.uri);

                if (!isValidUri($scope.spotify_uri.array)) {
                    alert("Tag ou URI non valide");
                    return;
                }

                getContent($scope.spotify_uri.array);
            });

        };

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

        $scope.clear = function(){

        };
        function getContent(spotify_array) {
            console.log("GET CONTENT");
            var spotifyAPI = $resource('https://api.spotify.com/v1/:type/:id', {type: '@type'}, {id: '@id'});

            spotifyAPI.get({type: spotify_array[1] + 's', id: spotify_array[2]}).$promise.then(function (content) {
                // success

                $scope.content = {};

                $scope.content.uri = content.uri;
                $scope.content.name = content.name;
                $scope.content.artists = content.artists;
                $scope.content.album = content.album.name;
                $scope.content.cover = content.album.images[1].url;

                if (!content.name){
                    content.cover = "https://pixabay.com/static/uploads/photo/2014/09/26/10/45/delete-462216_960_720.png"
                }
                return content;
            }, function (errResponse) {
                console.log('error');
            });
        }


    });
