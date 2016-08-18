'use strict';

angular
  .module('newsfeed', ['ngRoute'])
  .config(['$routeProvider', '$locationProvider',
    function($routeProvider, $locationProvider){
      $routeProvider
      .when('/', {
          templateUrl: 'home.html',
          controller: 'HomeCtrl',
          controllerAs: 'hc'
      })
      .when('/news', {
          templateUrl: 'news.html',
          controller: 'NewsCtrl',
          controllerAs: 'nc'
      })
      .when('/news/view/:par', {
          templateUrl: 'view.html'

      })
      .otherwise({redirectTo:'/'})
    }])

'use strict';


angular.module('newsfeed')
.factory('dataService', function() {
  return {
    news: []
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
    vm.search = function(){
      vkService.getNewsfeed(encodeURI(vm.query)).then(function(result){
        dataService.news = result.data.response;
        $location.path('/news');
    });
    }
  }])

'use strict';

angular.module('newsfeed')
  .controller('NewsCtrl', ['$location', 'dataService', function($location, dataService){
    var vm = this;
    vm.news = dataService.news;
  }])
