angular.module('pawnGuild', ['ui.router'])
.config(function($stateProvider, $urlRouterProvider) {
   $stateProvider
   .state('home', {
      url: '/home',
      templateUrl: 'home.html'
   })
   .state('roster', {
      url: '/roster',
      templateUrl: 'roster.html',
      controller: 'membersController'
   })
   .state('aboutUs', {
      url: '/aboutUs',
      templateUrl: 'aboutUs.html'
   })
   .state('recruitment', {
      url: '/recruitment',
      templateUrl: 'recruitment.html'
   })
   .state('applications', {
      url: '/applications',
      templateUrl: 'applications.html',
      controller: 'applicationsController'
   })
   .state('apply', {
      url: '/apply',
      templateUrl: 'apply.html',
      controller: 'applyController'
   });
   $urlRouterProvider.otherwise('/home');
});
