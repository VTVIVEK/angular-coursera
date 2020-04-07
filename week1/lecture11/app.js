(function() {
    'use strict';

    angular.module('MsgApp', [])
        .controller('MsgController', MsgController);
        MsgController.$inject=['$scope'];
    function MsgController($scope) {
       $scope.name = "VivekVT";
       $scope.state = "";
       $scope.sayMessage=()=>{
        return "VT Likes to watch movies on netflix";
       }

       $scope.feedVT = function(){
        $scope.state = "2";
       }
    }
})();