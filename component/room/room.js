angular.module('roomModule',['ngRoute'])
.config(['$routeProvider',function($routeProvider){
	$routeProvider.when('/room',{
		templateUrl:'component/room/room.html',
		controller:'roomCtrl',
		css:'component/room/room.css'
	});
}])
.controller('roomCtrl',['$scope',function($scope){
	
}])
