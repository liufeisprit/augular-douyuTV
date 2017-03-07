angular.module('containerModule',['ngRoute','me-lazyload'])
.config(['$routeProvider',function($routeProvider){
	$routeProvider.when('/container',{
		templateUrl:'component/container/container.html',
		controller:'containerCtrl',
		css:'component/container/container.css'
	});
}])

.controller('containerCtrl',['$scope','$http',function($scope,$http){
	var fag=true;
	$(".header").hide();
		$http.get("https://m.douyu.com/search/getTodayTopData?limit=10&isAjax=1").success(function(res){
//			console.log(res)
			$scope.getTodayTop=res
			
		})
		
	if(fag){
		$scope.search=function(){
			$(".layout-innner").show();
			$('.hot-content').hide();
			var value=$(".search-app .layout-header input").val();
			$http.get("https://m.douyu.com/search/getData?sk="+value+"&type=1&sort=1&limit=20&offset=0").success(function(res){
//				console.log(res);
				$scope.anchorArr=res.anchor;
				
				$scope.liveArr=res.live;
			})
		}
	}
			$scope.inactive=true;
			$scope.activite=false;
	$scope.changeitem=function(index){
		$(".layout-innner .layout-control .item").removeClass("cur");
		index=Number(index)
  		$(".layout-innner .layout-control .item").eq(index).addClass("cur")
		if(index==3){
			$(".layout-innner .layout-control .item").eq(index).removeClass("cur");
			$scope.inactive=!$scope.inactive;
			$scope.activite=!$scope.activite
			
		}
		if(index==0){
			$('.content-block').show();
			$('.content-inner').show();
		}
		if(index==1){
			$('.content-block').hide();
			$('.content-inner').show();
		}
		if(index==2){
			$('.content-block').show();
			$('.content-inner').hide();
		}
	}
	$scope.getname=function(name){
		$(".search-app .layout-header input").val(name);
		$scope.search();
	}
	$scope.sorttype='相关度';
	$scope.changesort=function(type,name){
		$scope.sorttype=name;
		$scope.orderByauther=type;
		$scope.orderBylive=type;
		$scope.search();
	}
	$scope.change=function(cateid,roomid){
		var obj={
			cateid:cateid,
			roomid:roomid
		}
		localStorage.setItem("live",JSON.stringify(obj))
	}
}])
