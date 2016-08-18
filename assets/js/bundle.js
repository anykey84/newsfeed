'use strict';

angular
  .module('newsfeed', ['ngRoute', 'ui.bootstrap'])
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
        })
      }
    }
  }])

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
