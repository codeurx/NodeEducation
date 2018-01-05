app.controller('LoginController',function($scope,$http){
$scope.login = {};
$scope.SendLogin = function(e){
    $http.post('/Administration/Auth',$scope.login).success(function(response) {
        console.log(response)
      });
    e.preventDefault();
};
});