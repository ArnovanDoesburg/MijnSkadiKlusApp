// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'starter.database'])

  .config(function($ionicConfigProvider) {
    $ionicConfigProvider.tabs.position('bottom');
  })

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
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

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

    // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
      controller: 'TabsCtrl',
    templateUrl: 'templates/tabs.html'
  })
    .state('login', {
      url: '/login',
      templateUrl: 'templates/login.html',
      controller: 'LoginCtrl'
    })

  // Each tab has its own nav history stack:

  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  })

  .state('tab.tasks', {
      url: '/tasks',
      views: {
        'tab-tasks': {
          templateUrl: 'templates/tab-tasks.html',
          controller: 'TasksCtrl'
        }
      }
    })
    .state('tab.task-detail', {
      url: '/tasks/:taskId',
      views: {
        'tab-tasks': {
          templateUrl: 'templates/task-detail.html',
          controller: 'TaskDetailCtrl'
        }
      }
    })

  .state('tab.scoreboard', {
    url: '/scoreboard',
    views: {
      'tab-scoreboard': {
        templateUrl: 'templates/tab-scoreboard.html',
        controller: 'ScoreboardCtrl'
      }
    }
  })

    .state('tab.admin', {
      url: '/admin',
      views: {
        'tab-admin': {
          templateUrl: 'templates/tab-admin.html',
          controller: 'AdminCtrl'
        }
      }
    });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');

});
