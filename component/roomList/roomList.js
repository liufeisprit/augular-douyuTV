angular.module('roomListModule',['ngRoute','me-lazyload'])
.config(['$routeProvider',function($routeProvider){
	$routeProvider.when('/roomList',{
		templateUrl:'component/roomList/roomList.html',
		controller:'roomListCtrl',
		css:'component/roomList/roomList.css'
	});
}])

//.service("category",["$http",'$rootScope',function($http,){
//	console.log($rootScope.roomName)
//	this.get=function(){
//		return $http.get("https://m.douyu.com/category?type="+url)
//		
//	}
//}])

.controller('roomListCtrl',['$scope','$rootScope','$http',function($scope,$rootScope,$http){
	
//	console.log($rootScope.roomSlideId);
	/*
	if($rootScope.roomName==undefined){
		$rootScope.roomName='wzry'
		console.log($rootScope.roomName)
		var url=$rootScope.roomName;
		$.getJSON("http://api.douyutv.com/api/v1/live/"+url,function(res){
			$scope.categoryAll=res.data;
			console.log(res.data)
		})
	}
	*/
	if($rootScope.roomSlideId==undefined){

			$rootScope.roomSlideId='wzry'
	//		$rootScope.catetype
			var url=$rootScope.roomSlideId;
			var cate1InfoAll=[];
			var j=0;
		$http.get("http://api.douyutv.com/api/v1/live/"+url).success(function(res){
				
				$scope.categoryAll=res.data;
				for (var i = 0; i < res.data.length; i++) {
					res.data[i]
	//				console.log(res.data[i].cate_id)
					var	cate1Id=res.data[i].cate_id
				}
			$http.get("https://m.douyu.com/category?type=").success(function(res){
	//			console.log(res.cate1Info);
	//			console.log(cate1Id);
				for (var i = 0; i < res.cate2Info.length; i++) {
	//				console.log(res.cate2Info[i].cate2Id)
					if(res.cate2Info[i].cate2Id==cate1Id){
						var cate2Id=res.cate2Info[i].cate1Id;
					}
				}
	//			console.log(cate2Id)
				for (var i = 0; i < res.cate1Info.length; i++) {
	//				console.log(res.cate1Info[i])
					if(res.cate1Info[i].cate1Id==cate2Id){
						$scope.categoryName=res.cate1Info[i].cate1Name;
	//					console.log($scope.categoryName)
					}
				}
				
			})
			
//			console.log(res.data)
			for (var i = 0; i < res.data.length; i++) {
				var gameName=res.data[i].game_name
			}
//			console.log(gameName);
			$scope.gameName=gameName;
			
			$scope.categoryAll=res.data
			
		})
		
		
	}else{
//		console.log("123")
		$(function(){
			var URL=$rootScope.roomSlideId;
//			console.log(URL)
			var cate1InfoAll=[];
			var j=0;
		$http.get("http://api.douyutv.com/api/v1/live/"+URL).success(function(res){
				
//				console.log(res)
				$scope.categoryAll=res.data;
				for (var i = 0; i < res.data.length; i++) {
					res.data[i]
	//				console.log(res.data[i].cate_id)
					var	cate1Id=res.data[i].cate_id
				}
			$http.get("https://m.douyu.com/category?type=").success(function(res){
//				console.log(res.cate1Info);
	//			console.log(cate1Id);
				for (var i = 0; i < res.cate2Info.length; i++) {
//					console.log(res.cate2Info[i].cate2Id)
					if(res.cate2Info[i].cate2Id==cate1Id){
						var cate2Id=res.cate2Info[i].cate1Id;
					}
				}
//				console.log(cate2Id)
				for (var i = 0; i < res.cate1Info.length; i++) {
	//				console.log(res.cate1Info[i])
					if(res.cate1Info[i].cate1Id==cate2Id){
						$scope.categoryName=res.cate1Info[i].cate1Name;
	//					console.log($scope.categoryName)
					}
				}
				
			})
			
			for (var i = 0; i < res.data.length; i++) {
				var gameName=res.data[i].game_name
			}
//			console.log(gameName);
			$scope.gameName=gameName;
			
//			console.log(res.data)
			$scope.categoryAll=res.data
			
		})
		
		})
	}
	
	var num=1;
	$scope.cont=num*8;
	$scope.upload=function(){
		num++;
		$scope.cont=num*8;
	}
	
//	Byval()
	$scope.Byval=function(cateid,roomid){
		$rootScope.cateid=cateid;
		$rootScope.roomid=roomid;
	}
	
	$(".btns").hide();
	
}])
