'use strict';

angular
  .module('newsfeed', ['ngRoute', 'ui.bootstrap'])
  .config(['$routeProvider', '$locationProvider',
    function($routeProvider, $locationProvider){
      $routeProvider
      .when('/', {
          templateUrl: '/app/home/home.html',
          controller: 'HomeCtrl',
          controllerAs: 'hc'
      })
      .when('/news', {
          templateUrl: '/app/news/news.html',
          controller: 'NewsCtrl',
          controllerAs: 'nc'
      })
      .when('/news/view/:par', {
          templateUrl: '/app/view/view.html'

      })
      .otherwise({redirectTo:'/'})
    }])
