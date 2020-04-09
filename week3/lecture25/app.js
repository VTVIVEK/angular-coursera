(function() {
    'use strict';

    angular.module('MenuCategoriesApp', [])
        .controller('MenuCategoriesController', MenuCategoriesController)
        .service('MenuCategoriesService', MenuCategoriesService)
        .constant('ApiBasePath', "http://davids-restaurant.herokuapp.com");

    MenuCategoriesController.$inject=['MenuCategoriesService'];
    function MenuCategoriesController(MenuCategoriesService) { 
       var menu = this;
       menu.name="vivekvtmenu";

       var promise=MenuCategoriesService.getMenuCategories();
       promise.then(function(res){
        menu.categories=res.data;
       }).catch(function(err){
        console.log("error - something went wrong");
       });

       menu.logMenuitems=function(shortName){
        var promise=MenuCategoriesService.getMenuForCategories(shortName);
        promise.then(function(res){
          console.log(res.data);
        }).catch(function(err){
          console.log("Error Something went Wrong!!");
        });     
       }

    }

    MenuCategoriesService.$inject=['$http', 'ApiBasePath'];
    function MenuCategoriesService($http, ApiBasePath){
      var service = this;

      service.getMenuCategories=function(){

        var response=$http({
          method:"GET", 
          url: ApiBasePath+"/categories.json"
        });
        return response;
      };

      service.getMenuForCategories=function(shortName){
        var response=$http({
          method:"GET", 
          url:ApiBasePath+"/menu_items.json",
          params:{
            category:shortName
          }
        });
        return response;
      };
    }


})();



