angular.module('homeModule',['ngRoute'])
.config(['$routeProvider',function($routeProvider){
	$routeProvider.when('/home',{
		templateUrl:'component/home/home.html',
		controller:'homeCtrl',
		css:'component/home/home.css'
	});
}])
.controller('homeCtrl',['$scope',function($scope){
	
}])
