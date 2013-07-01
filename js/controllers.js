'use strict';

function DashboardCtrl($scope, $http, $location) {

  $scope.criteria = {};
  $scope.parties = ["D", "R", "I"]
  $scope.criteria.party = "D";

  $scope.states = ["AK","AL","AR","AS","AZ","CA","CO","CT","DC","DE","FL","GA","GU","HI","IA","ID","IL","IN","KS","KY","LA","MA","MD","ME","MH","MI","MN","MO","MS","MT","NC","ND","NE","NH","NJ","NM","NV","NY","OH","OK","OR","PA","PR","PW","RI","SC","SD","TN","TX","UT","VA","VI","VT","WA","WI","WV","WY"];
  $scope.criteria.state = "CA";

  $scope.chambers = ["house", "senate"]
  $scope.criteria.chamber = "house";

  $scope.criteria.apikey = "f6f8bab24e1941049e3362d01d919e2b";

  $scope.criteria.page = 1;
  $scope.totalCount = 0;
  $scope.totalPages = 0;
  $scope.perPage = 20;
  $scope.rangeBottom = 1;
  $scope.rangeTop = 1;

  $scope.politicians = [];

  $scope.$watch("criteria.page", function(newValue, oldValue) {
    $scope.refreshPoliticians(newValue, oldValue);
  });

  $scope.$watch("criteria.party", function(newValue, oldValue){
    $scope.criteria.page = 1;
    $scope.refreshPoliticians(newValue, oldValue);
  });

  $scope.$watch("criteria.state", function(newValue, oldValue){
    $scope.criteria.page = 1;
    $scope.refreshPoliticians(newValue, oldValue);
  });

  $scope.$watch("criteria.chamber", function(newValue, oldValue){
    $scope.criteria.page = 1;
    $scope.refreshPoliticians(newValue, oldValue);
  });


  var apiUrl = "http://congress.api.sunlightfoundation.com/legislators";
  
  $scope.refreshPoliticians = function(oldValue, newValue) {
    if(oldValue != newValue) {
      $scope.getPoliticians();
    }
  }

  $scope.getPoliticians = function() {
    $http({ url: apiUrl, method: "GET", params: $scope.criteria }).success(function(data){
      console.log(data);
      $scope.criteria.page = data.page.page;
      $scope.totalCount = data.count;
      $scope.perPage = data.page.per_page;
      $scope.totalPages = Math.floor(data.count / data.page.per_page) +1;
      $scope.rangeBottom = $scope.criteria.page * $scope.perPage - $scope.perPage + 1;

      if($scope.totalCount >= ($scope.criteria.page * $scope.perPage)) {
        $scope.rangeTop = $scope.criteria.page * $scope.perPage;
      } else {
        $scope.rangeTop = $scope.totalCount;
      }

      $scope.politicians = [];
      
      angular.forEach(data.results, function(value, index){
        value.image_path = "images/headshots/" + value.bioguide_id +".jpg"
        $scope.politicians.push(value);
      });
    });
  };

}
