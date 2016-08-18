'use strict';

angular.module('newsfeed')
  .controller('ViewCtrl', ['$routeParams', '$location', 'dataService',
  function($routeParams, $location, dataService){
    var vm = this;
    console.log($routeParams);
    if($routeParams.post && dataService.news.length){
      vm.query = dataService.query;
      vm.news = dataService.news.slice(1);
      vm.post = vm.news[$routeParams.post];
    } else {
      $location.path('/#');
    }
    vm.getDate = function(timestamp){
      var date = new Date();
      date.setTime(timestamp*1000);
      return date.toUTCString();
    }
    vm.getText = function(html){
      return html;
    }
  }])
