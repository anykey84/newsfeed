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
      return date.toLocaleDateString('ru-RU')+" "+date.toLocaleTimeString('ru-RU');
    };
    vm.getText = function(html){
      return htmlDecode(html).slice(0,300) + "...";
    };
    vm.getImages = function(index){
      var arr2 = [];
      if(vm.news[index].attachments !== undefined){
        var arr = vm.news[index].attachments;

        for(var att in arr){
          if (arr[att]['type'] === "photo"){
            arr2.push(arr[att]);
          }
        }
      }
      return arr2;
    }
    console.log(vm.news);

    function htmlDecode(input)
    {
      var doc = new DOMParser().parseFromString(input, "text/html");
      return doc.documentElement.textContent;
    }
    }]);
