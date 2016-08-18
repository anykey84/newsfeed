'use strict';

angular.module('newsfeed')
  .controller('HomeCtrl', ['$location', 'vkService', 'dataService', function($location, vkService, dataService){
    var vm = this;
    vm.load = false;
    vm.search = function(){
      vm.load = true;
      vkService.getNewsfeed(encodeURI(vm.query)).then(function(result){
        dataService.query = vm.query;
        dataService.news = result.data.response;
        vm.load = false;
        $location.path('/news');
    });
    }
  }])
