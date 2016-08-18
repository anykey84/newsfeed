'use strict';

angular.module('newsfeed')
  .controller('ViewCtrl', ['$routeParams', '$location', 'dataService',
  function($routeParams, $location, dataService){
    var vm = this;
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
      return date.toLocaleDateString('ru-RU')+" "+date.toLocaleTimeString('ru-RU');
    };
    vm.getText = function(html){
      return html;
    };
    vm.getImages = function(){
      var arr2 = [];
      if(vm.news[$routeParams.post].attachments !== undefined){
        var arr = vm.news[$routeParams.post].attachments;

        for(var att in arr){
          if (arr[att]['type'] === "photo"){
            arr2.push(arr[att]);
          }
        }
      }
      return arr2;
    }

  }]);
