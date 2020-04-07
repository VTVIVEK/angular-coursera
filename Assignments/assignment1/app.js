(function() {
    'use strict';
    angular.module('LunchCheck', [])
        .controller('LunchCheckController', LunchCheckController);
        LunchCheckController.$inject=['$scope'];
        function LunchCheckController($scope) {
            $scope.message = '';
            $scope.items="";
            $scope.border="";
            $scope.checkTooMuch = function(){
                if ($scope.items) {
                    var words = $scope.items.split(',');
                    var whitespace=0;
                     for (var i = 0; i < words.length; i++) {
                        var vt = words[i].replace(/\s/g, "")
                       if (vt=="") {
                        whitespace=whitespace+1;
                       }
                    }
                var totalitems = words.length - whitespace;
                if (totalitems<=3){
                    $scope.message = 'Enjoy!';
                }else{
                    $scope.message = 'Too much!';
                }
                $scope.border="border border-success";
                }else{
                $scope.message = 'Please enter data first';
                $scope.border="border border-danger";
                }
            }
        }
})();