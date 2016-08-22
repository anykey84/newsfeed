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
        console.log(querydata);
        return  $http({
          method  : 'POST',
          url     : 'http://ft.dev.hismith.ru/stat/create/',
          data    : querydata,
          headers : {'Accept': 'application/json', 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'}
         })
         .success(function(data){
          return;
        });
      }
    };
  }]);
