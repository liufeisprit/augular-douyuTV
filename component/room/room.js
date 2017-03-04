angular.module('roomModule',['ngRoute'])
.config(['$routeProvider',function($routeProvider){
	$routeProvider.when('/room',{
		templateUrl:'component/room/room.html',
		controller:'roomCtrl',
		css:'component/room/room.css'
	});
}])
.service("roomInfo",["$http",'$rootScope',function($http,$rootScope){
	this.get=function(){
		return $http.get("https://m.douyu.com/html5/live?roomId="+$rootScope.roomid);
		
	}
}])
.controller('roomCtrl',['$scope','$rootScope','roomInfo',function($scope,$rootScope,roomInfo){
	roomInfo.get().success(function(res){
		$scope.roomDetails=res.data;
		console.log($scope.roomDetails.nickname)
	})
}])
