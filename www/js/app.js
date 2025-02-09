// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('sb', ['ionic', 'sb.controllers', 'sb.services', 'sb.filters', 'ngResource'])

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



            .state('tab.edit', {
                url: '/edit',
                views: {
                    'tab-edit': {
                        templateUrl: 'templates/tab-edit.html',
                        controller: 'EditCtrl'
                    }
                }
            })

            .state('tab.search', {
                url: '/search',
                views: {
                    'tab-search': {
                        templateUrl: 'templates/tab-search.html',
                        controller: 'SearchCtrl'
                    }
                }
            })

            .state('tab.search-detail', {
                url: '/search/:result',
                views: {
                    'tab-search': {
                        templateUrl: 'templates/search-detail.html',
                        controller: 'SearchDetailCtrl'
                    }
                }
            })

            .state('tab.read', {
                url: '/read',
                views: {
                    'tab-read': {
                        templateUrl: 'templates/tab-read.html',
                        controller: 'ReadCtrl'
                    }
                }
            });

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/tab/search');

    });
