(function() {
    'use strict';
    var shoppingList1 = [
    "Milk", "Donuts", "Cookies", "Chocolate", "Peanut Butter",
    "Pepto Bismol", "Pepto Bismol (Choclate flavor)", 
    "Pepto Bismol (Cookie flavor)"];

    var shoppingList2=[
    {
      name:"milk",
      quantity:"2"
    },
    {
      name:"Donuts",
      quantity:"200"
    },
    {
      name:"Cookie",
      quantity:"300"
    },
    {
      name:"Choclate",
      quantity:"2"
    }
    ]


    angular.module('ShoppingListApp', [])
        .controller('ShoppingListController', ShoppingListController)

    ShoppingListController.$inject=['$scope'];
    function ShoppingListController($scope) { 

       $scope.shoppingList1 = shoppingList1;
       $scope.shoppingList2 = shoppingList2;
       $scope.addToList = function(){
        var newItem = {
          name:$scope.newItemName,
          quantity:$scope.newItemQuantity
        };
        $scope.shoppingList2.push(newItem);
       }
    }



})();