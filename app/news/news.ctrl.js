'use strict';

angular.module('newsfeed')
  .controller('NewsCtrl', ['$location', 'dataService', function($location, dataService){
    var vm = this;
    if(dataService.query){
      vm.news = dataService.news.slice(1);
      vm.query = dataService.query;
    } else {
      $location.path('/#');
    }
    vm.getDate = function(timestamp){
      var date = new Date();
      date.setTime(timestamp*1000);
      return date.toUTCString();
    }
    vm.getText = function(html){
      return html.slice(0,100) + "...";
    }
    console.log(vm.news);
  }])
