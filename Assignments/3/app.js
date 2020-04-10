(function() {
    'use strict';

    angular.module('NarrowItDownApp', [])
        .controller('NarrowItDownController', NarrowItDownController)
        .service('MenuSearchService', MenuSearchService)
        .directive('foundItems', FoundItems);

    function FoundItems(){
      var ddo={
        templateUrl:'foundItems.html',
        scope:{
          error:'<',
          found:'<',
          goodRemove:'&'
        },
        controller: NarrowItDownDirectiveController,
        controllerAs:'menu',
        bindToController:true
      }
      return ddo;
    }


    function NarrowItDownDirectiveController(){
      var list =this;
    }


    NarrowItDownController.$inject=['MenuSearchService'];
    function NarrowItDownController(MenuSearchService) { 
       var menu = this;
       menu.searchBoxValue="";
       menu.error="";
       menu.searchResult = function(){
          if (menu.searchBoxValue == "" || menu.searchBoxValue == undefined) {
            menu.found=[];
            menu.error="Nothing found";
          }else{
           var promise = MenuSearchService.getMatchedMenuItems(menu.searchBoxValue);
           menu.found=promise;
           menu.error="";
          }
      }

       menu.removeItem=function(itemIndex){
        MenuSearchService.removeItem(itemIndex);
       }

     
    }
    MenuSearchService.$inject=['$http'];
    function MenuSearchService($http){
      var service = this;       
      var foundItems = [];
       service.getMatchedMenuItems=function(searchBoxValue){
        foundItems = [];
          $http({
          method:"GET", 
          url:"https://davids-restaurant.herokuapp.com/menu_items.json"
            }).then(function(res){
              for (var i = 0; i < res.data.menu_items.length ; i++) {
                var forItem=res.data.menu_items[i];
                var keyword=searchBoxValue.toLowerCase()
                if (forItem.description.toString().toLowerCase().indexOf(keyword) >= 0) {
                  foundItems.push(forItem);
                }
              }
            });
            return foundItems;
        }

        service.removeItem=function(itemIndex){
        foundItems.splice(itemIndex, 1);
        } 

    }


})();