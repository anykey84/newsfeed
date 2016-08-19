'use strict';

angular.module('newsfeed')
  .factory('vkService', ['$http', function($http){
    return {
      getNewsfeed: function(query){
        return $http.jsonp(
          "https://api.vk.com/method/newsfeed.search?q="+query+"&callback=JSON_CALLBACK"
        ).success(function(data){
          return;
        });
      },
      stat: function(querydata){
        return $http.post('http://ft.dev.hismith.ru/stat/create/', querydata).success(function(data){
          return;
        });
      }
    };
  }]);
