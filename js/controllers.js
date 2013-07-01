'use strict';

function DashboardCtrl($scope, Politicians) {
  $scope.init = function() {
    $scope.page = 1;
    $scope.totalCount = 0;
    $scope.totalPages = 0;

    $scope.politicians = [];
  }
  $scope.parties = ["", "D", "R", "I"]
  $scope.party = "";

  $scope.states = ["", "RI", "CT", "NH", "CA"]
  $scope.state = "";

  $scope.chambers = ["", "house", "sentate"]
  $scope.chamber = "";

  var data = Politicians.query(function(){
    console.log(data);
    $scope.page = data.page.page;
    $scope.totalCount = data.count;
    $scope.totalPages = Math.floor(data.count / data.page.per_page);
    
    angular.forEach(data.results, function(value, index){
      value.image_path = "images/headshots/" + value.bioguide_id +".jpg"
      $scope.politicians.push(value);
    });
  });

}
