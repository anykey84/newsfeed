'use strict';

angular.module('newsfeed')
  .controller('HomeCtrl', ['$location', 'vkService', 'dataService', function($location, vkService, dataService){
    var vm = this;
    vm.search = function(){
      vkService.getNewsfeed(encodeURI(vm.query)).then(function(result){
        dataService.news = result.data.response;
        $location.path('/news');
    });
    }
  }])
