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
.service("cateInfo",["$http",'$rootScope',function($http,$rootScope){
	this.get=function(){
		return $http.get("http://api.douyutv.com/api/v1/live/"+$rootScope.cateid);
	}
}])
.service("hot",["$http",function($http){
	this.get=function(){
		return $http.get("https://m.douyu.com/index/getHomeData")
	}
}])
.controller('roomCtrl',['$scope','$rootScope','roomInfo','homeDataArr','cateInfo','$sce',function($scope,$rootScope,roomInfo,hot,cateInfo,$sce){
	roomInfo.get().success(function(res){
		var v=document.querySelector('video');
		$scope.roomDetails=res.data;
			$scope.roomDetails.hls_url=$sce.trustAsResourceUrl($scope.roomDetails.hls_url);
		$scope.startPlay=function(){
			$('.play-btn').hide();
			$('#video-poster').hide()
			v.paused?v.play():v.pause();
		}
	});
	
	hot.get().success(function(res){
		var hot=0;
		$scope.hotListArr=res.hotList[hot].data;
		$scope.changehot=function(){
			hot++;
			if(hot>3){
				hot=0
			}
			$scope.hotListArr=res.hotList[hot].data;
		}
	});
	
	cateInfo.get().success(function(res){
		$scope.same=res.data;
	})
	
	$scope.changehotlive=function(cateid,roomid){
		$rootScope.cateid=cateid;
		$rootScope.roomid=roomid;
		console.log($rootScope.cateid);
		console.log($rootScope.roomid);
	}
}])
