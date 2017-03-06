angular.module('homeModule',['ngRoute'])
.config(['$routeProvider',function($routeProvider){
	$routeProvider.when('/home',{
		templateUrl:'component/home/home.html',
		controller:'homeCtrl',
		css:'component/home/home.css'
	});
}])
.service("catearr",["$http",function($http){
	this.get=function(){
		return $http.get("https://m.douyu.com/category")
		
	}
}])
.service("homeDataArr",["$http",function($http){
	this.get=function(){
		return $http.get("https://m.douyu.com/index/getHomeData")
		
	}
}])
.service("swiper",["$timeout",function($timeout){
	this.swiper=function(){
		$timeout(function(){
			new Swiper('.swiper-container', {
            loop: true,
            autoplay:3000,
            pagination: '.swiper-pagination',
            paginationClickable :true,
            observer:true,
            observeParents:true,
            loopAdditionalSlides:0,
            autoplayDisableOnInteraction: false
      });
		},50);
	}
}])
.controller('homeCtrl',['$scope',"catearr","$rootScope","homeDataArr","swiper","$http",function($scope,catearr,$rootScope,homeDataArr,swiper,$http){
	$(".btns").css("display","flex");
	var hot=0;
	catearr.get().success(function(res){
		$scope.catearr=res.cate1Info;
		$scope.catedetailarr=res.cate2Info;
		$scope.changeall=function(){
		$scope.catedetailarr=res.cate2Info;
	}
	})
	homeDataArr.get().success(function(res){
//		console.log(res)
		$scope.slideArr=res.banner;
		$scope.hotListArr=res.hotList[hot].data;
		//切换最热直播
		$scope.changehot=function(){
			hot++;
			if(hot>3){
				hot=0
			}
			$scope.hotListArr=res.hotList[hot].data;
		}
		$scope.livecount=res.liveCount;
		$scope.liveListArr=res.liveList;
		$scope.mixListArr=res.mixList;
		$scope.yzListArr=res.yzList;
	})
	swiper.swiper();
	//分类列表切换
	$scope.changecatetab=function(obj,type){
		$rootScope.catetype=type;
		$http.get("https://m.douyu.com/category?type="+obj).success(function(res){
			$scope.catedetailarr=res.cate2Info;
		})
			$(".nav-header span").bind("touchstart",function(){
				$(".nav-header span").removeClass("cur");$(this).addClass("cur")
	})
		}
	//传值
	$scope.getroomList=function(name){
		$rootScope.roomName=name;
	}
	$scope.getroomList2=function(name){
		$rootScope.roomSlideId=name;
	}
	$scope.changehotlive=function(cateid,roomid){
		$rootScope.cateid=cateid;
		$rootScope.roomid=roomid;
	}
	$scope.changelive=function(cateid,roomid){
		$rootScope.cateid=cateid;
		$rootScope.roomid=roomid;
	}
	$scope.changeyz=function(cateid,roomid){
		$rootScope.cateid=cateid;
		$rootScope.roomid=roomid;
	}
	$scope.changemix=function(cateid,roomid){
		$rootScope.cateid=cateid;
		$rootScope.roomid=roomid;
	}
	$scope.changeslider=function(cateid,roomid){
		$rootScope.cateid=cateid;
		$rootScope.roomid=roomid;
	}
	//回到顶部
	$(".gotop span").bind("touchstart",function(){
	document.body.scrollTop =0;
	event.preventDefault();
})
	
}])

