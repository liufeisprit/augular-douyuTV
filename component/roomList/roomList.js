angular.module('roomListModule',['ngRoute'])
.config(['$routeProvider',function($routeProvider){
	$routeProvider.when('/roomList',{
		templateUrl:'component/roomList/roomList.html',
		controller:'roomListCtrl',
		css:'component/roomList/roomList.css'
	});
}])
.controller('roomListCtrl',['$scope',function($scope){
	
}])
