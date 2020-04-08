(function() {
    'use strict';

    angular.module('ShoppingListCheckOff', [])
        .controller('ToBuyController', ToBuyController)
        .controller('AlreadyBoughtController', AlreadyBoughtController)
        .service('ShoppingListCheckOffService', ShoppingListCheckOffService)

    ToBuyController.$inject=['ShoppingListCheckOffService'];
    function ToBuyController(ShoppingListCheckOffService) { 
       var itemBuy = this;
       itemBuy.name="";
       itemBuy.itemName="";
       itemBuy.itemQuantity="";
       itemBuy.items=ShoppingListCheckOffService.getItems("toBuy");
       itemBuy.addItem=function(){
        ShoppingListCheckOffService.addItem(itemBuy.itemName, itemBuy.itemQuantity);
       }
       itemBuy.removeItem=function(itemIndex){
        
        ShoppingListCheckOffService.removeItem(itemIndex);
       }
     
    }

    AlreadyBoughtController.$inject=['ShoppingListCheckOffService'];
    function AlreadyBoughtController(ShoppingListCheckOffService) {

       var itemBought = this;
       itemBought.items=ShoppingListCheckOffService.getItems();

    }

    function ShoppingListCheckOffService(){
      var service = this;
      var itemsToBuy=[{ name:"Coke",
          quantity:"5"},
          { name:"Cake",
          quantity:"1"},
          { name:"Noddles",
          quantity:"2"},
          { name:"Chips",
          quantity:"2"},
          { name:"CreamRoll",
          quantity:"10"}];

      var itemsBought=[];    

      service.addItem=function(itemName, quantity){
        var item = {
          name:itemName,
          quantity:quantity
        };
        itemsToBuy.push(item);
      };
      service.getItems=function(type){
        if (type == "toBuy") {
            return itemsToBuy;
        }else{
            return itemsBought;
        }
        
      }
      service.removeItem=function(itemIndex){
        // itemsToBuy.splice(itemIndex, 1);
        var moveItem = itemsToBuy[itemIndex];
        itemsToBuy.splice(itemIndex, 1);
        itemsBought.push(moveItem);
      }
    }


})();