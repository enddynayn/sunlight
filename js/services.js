'use strict';

angular.module('politicians.services', ['ngResource']).
  factory('Politicians', function($resource) {
    var apiKey = "f6f8bab24e1941049e3362d01d919e2b";
    var page = $resource('http://congress.api.sunlightfoundation.com/legislators?apikey=', {}, {
      query: {method:'GET', params: {
        apikey: apiKey,
        party: '',
        state: '',
        chamber: ''
      }, isArray: false}
    });
    
    return page;
  });
