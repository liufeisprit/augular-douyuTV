var app=angular.module('douyuTV',['ngRoute','angularCSS','homeModule','roomListModule','roomModule',"containerModule","me-lazyload"])
.config(['$routeProvider',function($routeProvider){
	$routeProvider.otherwise({redirectTo:'/home'});
}]);

document.documentElement.style.fontSize = innerWidth/10+ 'px';
window.onresize = function(){
	document.documentElement.style.fontSize = innerWidth/10 + 'px';
}
