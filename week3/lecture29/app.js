(function() {
    'use strict';

    angular.module('ShoppingListDirectiveApp', [])
        .controller('ShoppingListController1', ShoppingListController1)
        .factory('ShoppingListFactory', ShoppingListFactory)
        .directive('shoppingList', ShoppingListDirective);

    function ShoppingListDirective(){
      var ddo={
        templateUrl:'shoppingList.html',
        scope:{
          items:'<',
          title:'@'
        },
        controller: ShoppingListDirectiveController,
        controllerAs:'list',
        bindToController:true
      };
      return ddo;
    }   

    function ShoppingListDirectiveController(){
      var list =this;
      console.log(list.items);
      list.cookiesInList=function(){
        for (var i = 0; i < list.items.length; i++) {
          var name = list.items[i].name;
          if (name.toLowerCase().indexOf('cookie')!==-1) {
            return true;
          }
        }
        return false;
      };
    }


    function ListItemDescription(){
      var ddo={
        template:'{{item.quantity}} of {{item.name}}'
      }
      return ddo;
    }  

    ShoppingListController1.$inject=['ShoppingListFactory'];
    function ShoppingListController1(ShoppingListFactory) {

       var list1 = this;
      
       var shoppingList = ShoppingListFactory();
       list1.items=shoppingList.getItems();
       var origTitle='Shopping List 1';
        list1.title= origTitle+ " ( "+list1.items.length+" items )";
       list1.itemName="";
       list1.itemQuantity="";

       list1.addItem=function(){
        shoppingList.addItem(list1.itemName, list1.itemQuantity);
        list1.title= origTitle+ " ( "+list1.items.length+" items )";
       }
      
      list1.removeItem=function(itemIndex){
        shoppingList.removeItem(itemIndex);
        list1.title= origTitle+ " ( "+list1.items.length+" items )";
       }

    }

    function ShoppingListService(maxItems){
      var service = this;
      var items=[];

      service.addItem=function(itemName, quantity){
        if ((maxItems === undefined) || 
          (maxItems !== undefined) && (items.length < maxItems)) 
        {
          var item = {
          name:itemName,
          quantity:quantity};
          items.push(item);
        }else{
          throw new Error("Max items (" + maxItems + ") reached");
        }
        
      };
      service.getItems=function(){
        return items
      }
      service.removeItem=function(itemIndex){
        items.splice(itemIndex, 1);
      }
    }

    function ShoppingListFactory(){
      var factory = function(maxItems){
        return new ShoppingListService(maxItems);
      }
      return factory;
    }

    



})();