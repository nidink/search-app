var myApp = angular.module('srch-app', []);

myApp.controller('mainController', ['$scope', '$http', '$q', 
    function ($scope, $http, $q) {
        
        $scope.srchTxt = "Search";
        $scope.firstName = $scope.lastName = '';
        $scope.displayLoading = false;

        $scope.searchUserRecords = function() {
            $scope.userData = null;
            $scope.displayLoading = true;

           var deferred = $q.defer();
           var url = getRequestURL();

           $http.get(url)
           .then(function(data){
                deferred.resolve(data);
                $scope.userData = data.data;
                $scope.displayLoading = false;
                }
               , function(msg, code) {
                    deferred.reject(msg);
                    $scope.displayLoading = false;
               }
           );
           return deferred.promise; 

        };

        var getRequestURL = function () {
            var url = "https://data.cityofnewyork.us/resource/5scm-b38n.json";
            var queryStringArr = [];

            if($scope.firstName){
                queryStringArr.push("first_name="+$scope.firstName.toUpperCase()); 
            }
            if($scope.lastName) {
                queryStringArr.push("last_name="+$scope.lastName.toUpperCase()); 
            }

            if(queryStringArr.length > 0) {
                url = url + "?" + queryStringArr.join("&");
                return url;
            }
            return url;
        };
        
}]);

myApp.filter('myFormat', function() {
  return function(dateString) {
    var date = new Date(dateString);
     dateString = date.getDate()   
        + "/" + date.getMonth() 
        + "/" + date.getFullYear(); 
    return dateString;
  };
});
