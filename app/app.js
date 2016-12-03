var MyApp=angular.module("MyApp",["ngRoute", "firebase",'ngCookies','720kb.socialshare']);

MyApp.config(function($routeProvider){
  $routeProvider.when('/',{
     templateUrl:'views/list.html',
      controller:'listController',
      
  }).when('/view2',{
     templateUrl:'views/view2.html',
      controller:'listController'
      
 }).when('/view1',{
     templateUrl:'views/list.html',
      controller:'listController'
      
  }).when('/product/:prodid',{
     templateUrl:'views/product.html',
      controller:'listController',
 })

    });