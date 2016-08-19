'use strict';

angular
  .module('newsfeed', ['ngRoute'])
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
      .when('/news/view/:post', {
          templateUrl: '/app/view/view.html',
          controller: 'ViewCtrl',
          controllerAs: 'vc'
      })
      .otherwise({redirectTo:'/'})
    }])

'use strict';


angular.module('newsfeed')
.factory('dataService', function() {
  return {
    news: [],
    query: ''
  }
});

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

'use strict';

angular.module('newsfeed')
  .controller('HomeCtrl', ['$location', 'vkService', 'dataService', function($location, vkService, dataService){
    var vm = this;
    vm.load = false;
    vm.search = function(){
      vm.load = true;
      vkService.stat($.param({query: vm.query})).then(function(result){
        console.log(result);
      });
      vkService.getNewsfeed($.param({q: vm.query, extended: 1})).then(function(result){
        dataService.query = vm.query;
        dataService.news = result.data.response;
        vm.load = false;
        $location.path('/news');
    });
    }
  }])

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
      return htmlDecode(html);
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
    function htmlDecode(input)
    {
      input = input.replace("&lt;", "<");
      input = input.replace("&gt;", ">");
      var doc = new DOMParser().parseFromString(input, "text/html");
      return doc.documentElement.textContent;
    }

  }]);
