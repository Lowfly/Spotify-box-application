angular.module('sb.services', [])

    .factory('Chats', function () {
        // Might use a resource here that returns a JSON array

        // Some fake testing data
        var chats = [{
            id: 0,
            name: 'Ben Sparrow',
            lastText: 'You on your way?',
            face: 'img/ben.png'
        }, {
            id: 1,
            name: 'Max Lynx',
            lastText: 'Hey, it\'s me',
            face: 'img/max.png'
        }, {
            id: 2,
            name: 'Adam Bradleyson',
            lastText: 'I should buy a boat',
            face: 'img/adam.jpg'
        }, {
            id: 3,
            name: 'Perry Governor',
            lastText: 'Look at my mukluks!',
            face: 'img/perry.png'
        }, {
            id: 4,
            name: 'Mike Harrington',
            lastText: 'This is wicked good ice cream.',
            face: 'img/mike.png'
        }];

        return {
            all: function () {
                return chats;
            },
            remove: function (chat) {
                chats.splice(chats.indexOf(chat), 1);
            },
            get: function (chatId) {
                for (var i = 0; i < chats.length; i++) {
                    if (chats[i].id === parseInt(chatId)) {
                        return chats[i];
                    }
                }
                return null;
            }
        };
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

    .factory('nfcService', function ($q, $timeout) {

        var writeUri = function (spotify_uri) {
            var deferred = $q.defer();

            nfc.addNdefListener(function (nfcEvent) {

                //console.log(JSON.stringify(nfcEvent));
                console.log("Read tag : " + JSON.stringify(nfcEvent.tag.id, null, 4));

                var message = [ndef.uriRecord(spotify_uri)];
                nfc.write(message, function () {
                    console.log("success");
                    deferred.resolve(nfcEvent);
                }, function () {
                    console.log("failure");
                    deferred.reject("Fail writing");
                });

            }, function () {
                console.log("Listening for NDEF Tags.");
            }, function (reason) {
                alert("Error adding NFC Listener " + reason);
            });

            return deferred.promise;
        };

        var readUri = function () {
            var deferred = $q.defer();

            nfc.addNdefListener(function (nfcEvent) {

                //console.log(JSON.stringify(nfcEvent));
                //  console.log("Read tag : " + JSON.stringify(nfcEvent.tag, null, 4));

                deferred.resolve(nfcEvent.tag);

            }, function () {
                console.log("Listening for NDEF Tags.");
            }, function (reason) {
                alert("Error adding NFC Listener " + reason);
            });

            return deferred.promise;
        };

        return {
            writeUri: writeUri,
            readUri: readUri
        };

    });

