'use strict';

angular
  .module('newsfeed', ['ngRoute'])
  .config(['$routeProvider', '$locationProvider',
    function($routeProvider, $locationProvider){
      $routeProvider
      .when('/', {
          templateUrl: 'home.html',
          controller: 'HomeCtrl',
          controllerAs: 'hc'
      })
      .when('/news', {
          templateUrl: 'news.html',
          controller: 'NewsCtrl',
          controllerAs: 'nc'
      })
      .when('/news/view/:par', {
          templateUrl: 'view.html'

      })
      .otherwise({redirectTo:'/'})
    }])
