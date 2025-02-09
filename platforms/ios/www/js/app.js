// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

    .run(function ($ionicPlatform) {
        $ionicPlatform.ready(function () {
            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);

            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }
        });
    })
    .config(['$ionicConfigProvider', function ($ionicConfigProvider) {

        $ionicConfigProvider.tabs.position('bottom'); // other values: top

    }])

    .config(function ($stateProvider, $urlRouterProvider) {

        // Ionic uses AngularUI Router which uses the concept of states
        // Learn more here: https://github.com/angular-ui/ui-router
        // Set up the various states which the app can be in.
        // Each state's controller can be found in controllers.js
        $stateProvider

            // setup an abstract state for the tabs directive
            .state('tab', {
                url: '/tab',
                abstract: true,
                templateUrl: 'templates/tabs.html'
            })

            // Each tab has its own nav history stack:

            .state('tab.search', {
                url: '/search',
                views: {
                    'tab-search': {
                        templateUrl: 'templates/tab-search.html',
                        controller: 'SearchCtrl'
                    }
                }
            })

            .state('tab.edit', {
                url: '/edit',
                views: {
                    'tab-edit': {
                        templateUrl: 'templates/tab-edit.html',
                        controller: 'EditCtrl'
                    }
                }
            })
            .state('tab.chat-detail', {
                url: '/chats/:chatId',
                views: {
                    'tab-chats': {
                        templateUrl: 'templates/chat-detail.html',
                        controller: 'ChatDetailCtrl'
                    }
                }
            })

            .state('tab.account', {
                url: '/account',
                views: {
                    'tab-account': {
                        templateUrl: 'templates/tab-account.html',
                        controller: 'AccountCtrl'
                    }
                }
            });

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/tab/search');

    })

    .factory('spotifyAPI', ['$http', function ($http) {

        var urlBase = 'https://api.spotify.com/v1/search';
        var spotifyFactory = {};

        spotifyFactory.searchAlbum = function (album) {
            return $http.get(urlBase + '?q=' + album + '&type=album');
        };

        spotifyFactory.searchTrack = function (track) {
            return $http.get(urlBase + '?q=' + track + '&type=track');
        };

        spotifyFactory.searchPlaylist = function (playlist) {
            return $http.get(urlBase + '?q=' + playlist + '&type=playlist');
        };
        return spotifyFactory;
    }])


    /*.service('nfcService', function ($rootScope, $ionicPlatform) {

     console.log("Start service");
     var tag = {};

     $ionicPlatform.ready(function () {
     });


     this.writeTag = function () {

     console.log("start Write tag function");
     nfc.addNdefListener(function (nfcEvent) {

     console.log(JSON.stringify(nfcEvent));
     console.log(JSON.stringify(nfcEvent.tag, null, 4));

     /*$rootScope.$apply(function () {
     angular.copy(nfcEvent.tag, tag);
     // if necessary $state.go('some-route')
     });*/

    /*var message = [ndef.textRecord("tutu")];

     nfc.write(message, function () {
     console.log("success");
     return ("SUCCES");
     }, function () {
     console.log("failure");
     return ("FAILURE");
     });
     }, function () {
     console.log("Listening for NDEF Tags.");
     }, function (reason) {
     alert("Error adding NFC Listener " + reason);
     });
     }
     })*/

    .factory('HelloWorld', function ($q, $timeout) {

        var getMessages = function () {
            var deferred = $q.defer();

            nfc.addNdefListener(function (nfcEvent) {

                //console.log(JSON.stringify(nfcEvent));
                console.log("Read tag : " + JSON.stringify(nfcEvent.tag.id, null, 4));
                deferred.resolve(nfcEvent);
            }, function () {
                console.log("Listening for NDEF Tags.");
            }, function (reason) {
                alert("Error adding NFC Listener " + reason);
                deferred.reject(reason);
            });

            return deferred.promise;
        };

        return {
            getMessages: getMessages
        };

    })

    .factory('nfcService', function ($q) {

        return {

            writeTag: function () {
                var deferred = $q.defer();

                nfc.addNdefListener(function (nfcEvent) {

                    //console.log(JSON.stringify(nfcEvent));
                    console.log("Read tag : " + JSON.stringify(nfcEvent.tag.id, null, 4));
                    deferred.resolve(nfcEvent);
                }, function () {
                    console.log("Listening for NDEF Tags.");
                }, function (reason) {
                    alert("Error adding NFC Listener " + reason);
                    deferred.reject(reason);
                });
            }
        }
    });
