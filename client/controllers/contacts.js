/**
 * Created by daniel.neumann on 6/7/16.
 */
var myApp = angular.module('myApp');
var url = 'https://challenge.acstechnologies.com/api/contact/';
var urlTEST = 'https://challenge.acstechnologies.com/api/contact/4931/';

myApp.controller('ContactsController', ['$scope', '$http', '$location', '$routeParams', function($scope, $http, $location, $routeParams){
    console.log('ContactsController loaded...');

    var refresh = function () {
        $http({method: 'GET', url:url, headers: {'X-Auth-Token': '614rfnFSypmCjYeOvTJ6yhWAWpaLqqYkt8uw5yCp'}})
            .success(function(response){
                $scope.contacts = response.data;
        });
    };

    refresh();



    $scope.getContacts = function() {
        $http({method: 'GET', url:url, headers: {'X-Auth-Token': '614rfnFSypmCjYeOvTJ6yhWAWpaLqqYkt8uw5yCp'}})
            .success(function(response){
            $scope.contacts = response.data;
        });
    }

    $scope.getContact = function() {
        var id = $routeParams.id;
        console.log("getting ID = " + id);
        $http({method: 'GET', url:url+id, headers: {'X-Auth-Token': '614rfnFSypmCjYeOvTJ6yhWAWpaLqqYkt8uw5yCp'}})
            .success(function(response){
                $scope.contact = response;
            });
    }



   
    $scope.saveContact = function(contact) {
        if (contact.id > 0) {
            console.log("Save ID: "+ contact.id);

            $http({ method: 'PUT',
                url:url+contact.id,
                data:contact,
                headers: {'X-Auth-Token': '614rfnFSypmCjYeOvTJ6yhWAWpaLqqYkt8uw5yCp'}})
                .then(function successCallback(response) {

                    console.log("PUT Successfull:");
                    console.log(response);

                }, function errorCallback(response) {
                    console.log("PUT FAILED!!:");
                    console.log(response);
                })

        }
        else {
            // create a blank object to handle form data.
            console.log("New ID")
            console.log(contact);
            $http({ method: 'POST',
                    url:url,
                    data:contact,
                    headers: {'X-Auth-Token': '614rfnFSypmCjYeOvTJ6yhWAWpaLqqYkt8uw5yCp'}})
        .then(function successCallback(response) {

                    console.log("POST Successfull:");
                    console.log(response);

            }, function errorCallback(response) {
            console.log("POST FAILED!!:");
            console.log(response);
        })

        }
        console.log($scope.contact);


    }


    $scope.deleteContact = function(id) {
        console.log("Delete ID: " + id);
        $http({ method: 'DELETE',
            url:url+id,
            headers: {'X-Auth-Token': '614rfnFSypmCjYeOvTJ6yhWAWpaLqqYkt8uw5yCp'}})
            .then(function successCallback(response) {

                console.log("DELETE Successfull:");
                console.log(response);
               refresh();

            }, function errorCallback(response) {
                console.log("DELET FAILED!!:");
                console.log(response);
            })


    }


}]);