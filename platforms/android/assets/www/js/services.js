angular.module('sb.services', [])

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

