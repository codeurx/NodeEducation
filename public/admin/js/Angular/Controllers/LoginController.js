app.controller('LoginController',function($scope,$http,$timeout){
$scope.login = {};
$scope.SendLogin = function(e){
    $http.post('/Administration/Auth',$scope.login).success(function(response) {
        if(response == 'verif'){
            $('#error').html('Vérifiez vos Cordonnées');
            $("#error").slideDown(500, function() {
                $("#error").delay(500).slideUp(500);
             }); 
        }else{
            window.location.href = '/Administration/';
        }
      });
    e.preventDefault();
};
});