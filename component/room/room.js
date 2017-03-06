angular.module('roomModule',['ngRoute'])
.config(['$routeProvider',function($routeProvider){
	$routeProvider.when('/room',{
		templateUrl:'component/room/room.html',
		controller:'roomCtrl',
		css:'component/room/room.css'
	});
}])

.controller('roomCtrl',['$scope','$rootScope','$http','$sce',function($scope,$rootScope,$http,$sce){
	var roomid=JSON.parse(localStorage.getItem('live')).roomid;
	var  cateid=JSON.parse(localStorage.getItem('live')).cateid;
	
	$http.get("https://m.douyu.com/html5/live?roomId="+roomid).success(function(res){
		var v=document.querySelector('video');
		$scope.roomDetails=res.data;
			$scope.roomDetails.hls_url=$sce.trustAsResourceUrl($scope.roomDetails.hls_url);
		$scope.startPlay=function(){
			$('.play-btn').hide();
			$('#video-poster').hide();
			v.paused?v.play():v.pause();
		}
	});
	
	$http.get("https://m.douyu.com/index/getHomeData").success(function(res){
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
	
	$http.get("http://api.douyutv.com/api/v1/live/"+cateid).success(function(res){
		$scope.same=res.data;
	})
	
	$scope.changehotlive=function(cateid,roomid){
		var obj={
			cateid:cateid,
			roomid:roomid
		}
		localStorage.setItem("live",JSON.stringify(obj));
		location.reload(true);
	}
}])
