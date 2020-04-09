(function() {
    'use strict';

    angular.module('ShoppingListApp', [])
        .controller('ShoppingListAddController', ShoppingListAddController)
        .service('ShoppingListService', ShoppingListService)
        .service('WeightLossFilterService', WeightLossFilterService);

    ShoppingListAddController.$inject=['ShoppingListService'];
    function ShoppingListAddController(ShoppingListService) { 
       var itemAdder = this;
       itemAdder.itemName="";
       itemAdder.itemQuantity="";

       itemAdder.addItem=function(){
        ShoppingListService.addItem(itemAdder.itemName, itemAdder.itemQuantity);
       }

       itemAdder.items=ShoppingListService.getItems();

       itemAdder.removeItem=function(itemIndex){
        
        ShoppingListService.removeItem(itemIndex);
       }

     
    }

    ShoppingListService.$inject=['$q', 'WeightLossFilterService'];
    function ShoppingListService($q, WeightLossFilterService){
      var service = this;
      var items=[{name:"Wfwf", quantity:"2"}];

      // service.addItem=function(name, quantity){
      //   var promise = WeightLossFilterService.checkName(name);
      //   promise.then(function(response){
      //     var nextPromise = WeightLossFilterService.checkQuantity(quantity);
      //     nextPromise.then(function(result){
      //     var item = {
      //       name:name,
      //       quantity:quantity
      //     };
      //     items.push(item);
      //     }, function(errorResponse){
      //       console.log(errorResponse.message);
      //     });
      //   }, function(errorResponse){
      //      console.log(errorResponse.message);
      //    });
      // };


      // service.addItem=function(name, quantity){
      //   var promise = WeightLossFilterService.checkName(name);

      //   promise.then(function(res){
      //     return WeightLossFilterService.checkQuantity(quantity);
      //   }).then(function(res){
      //     var item = { name:name, quantity:quantity };
      //     items.push(item);
      //   }).catch(function(err){
      //     console.log(err.message);
      //   });
      // };

       service.addItem=function(name, quantity){
        var namePromise = WeightLossFilterService.checkName(name);
        var quantityPromise = WeightLossFilterService.checkQuantity(quantity);
        
        $q.all([namePromise, quantityPromise])
        .then(function(res){
          var item = { name:name, quantity:quantity };
          items.push(item);
        }).catch(function(err){
          console.log(err.message);
        });
      };

      service.getItems=function(){
        return items;
      }
      service.removeItem=function(itemIndex){
        items.splice(itemIndex, 1);
      }
    }

    WeightLossFilterService.$inject=['$q', '$timeout'];
    function WeightLossFilterService($q, $timout){
      var service=this;
      service.checkName=function(name){
        var deferred=$q.defer();
        var result={
          message:""
        };

        $timout(function(){
          if (name.toLowerCase().indexOf('cookie')=== -1) {
            deferred.resolve(result);
          }else{
            result.message="Stay away from cookies, VT";
            deferred.reject(result);
          }
        }, 3000);

      return deferred.promise; 
      };

      service.checkQuantity=function(quantity){
        var deferred=$q.defer();
        var result={
          message:""
        };

        $timout(function(){
          if (quantity < 6) {
            deferred.resolve(result);
          }else{
            result.message="Thats too much, VT";
            deferred.reject(result);
          }
        }, 1000);

      return deferred.promise; 
      };

    }



})();



