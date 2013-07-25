'use strict';

angular.module('politicians', []).
  config(['$routeProvider', function($routeProvider) {
  $routeProvider.
      when('/dashboard', {templateUrl: 'partials/dashboard.html',   controller: DashboardCtrl}).
      when('/politicians/:name', {templateUrl: 'partials/politician.html', controller: PoliticianCtrl}).
      otherwise({redirectTo: '/dashboard'});
}]);