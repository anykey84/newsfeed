'use strict';

angular.module('newsfeed')
  .controller('HomeCtrl', ['$location', 'vkService', function($location, vkService){
    var vm = this;
    vm.text = 'Google';
    vm.search = function(){
      vkService.getNewsfeed(encodeURI(vm.query)).then(function(result){
        console.log(result.data.response);
      });
      // $location.path('/news');
    }
  }])
