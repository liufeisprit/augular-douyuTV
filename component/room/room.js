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
.controller('roomCtrl',['$scope','$rootScope','roomInfo','$sce',function($scope,$rootScope,roomInfo,$sce){
	roomInfo.get().success(function(res){
		var v=document.querySelector('video');
		$scope.roomDetails=res.data;
			$scope.roomDetails.hls_url=$sce.trustAsResourceUrl($scope.roomDetails.hls_url);
		$scope.startPlay=function(){
			$('.play-btn').hide();
			$('#video-poster').hide()
			v.paused?v.play():v.pause();
		}
	})
}])
