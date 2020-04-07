(function() {
    'use strict';

    angular.module('MsgApp', [])
        .controller('MsgController', MsgController)
        .filter('loves', LovesFilter)
        .filter('truth', TruthFilter);

    MsgController.$inject=['$scope', 'lovesFilter'];

    function MsgController($scope, lovesFilter) { 

       $scope.name = "VivekVT";
       $scope.state = "";
       $scope.biryaniCost = ".70";

       $scope.sayMessage=function(){
        var msg = "VT likes to eat Biryani!";
        return msg;
       } 

       $scope.sayLovesMessage=function(){
        var msg = "VT likes to eat Biryani!";
        msg = lovesFilter(msg);
        return msg;
       }

       $scope.feedVT = function(){
        $scope.state = "2";
       }
    }

    function LovesFilter(){
      return function(input){
        input = input || "";
        input = input.replace("likes", "loves");
        return input;
      }
    }
    function TruthFilter(){
      return function(input, target, replace){
        input = input || "";
        input = input.replace(target, replace);
        return input;
      }
    }


})();