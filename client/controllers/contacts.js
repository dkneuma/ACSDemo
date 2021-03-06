/**
 * Created by daniel.neumann on 6/7/16.
 */
//var myApp = angular.module('myApp');
var url = 'https://challenge.acstechnologies.com/api/contact/';

myApp.controller('ContactsController', ['$scope', '$confirm', '$http', '$location', '$routeParams', function($scope, $confirm, $http, $location, $routeParams){
    console.log('ContactsController loaded...');

    var refresh = function () {
        $http({method: 'GET', url:url, headers: {'X-Auth-Token': '614rfnFSypmCjYeOvTJ6yhWAWpaLqqYkt8uw5yCp'}})
            .success(function(response){
                $scope.contacts = response.data;
        });
    };

    refresh();

    $scope.deleteConfirm = function(id) {
        $confirm({text: 'HEY? Are you sure you want to delete?'})
            .then(function() {
                console.log("Go ahead and delete ID " + id);
                $scope.deleteContact(id);
            });
    }
    

    $scope.getContacts = function() {
        $http({method: 'GET', url:url, headers: {'X-Auth-Token': '614rfnFSypmCjYeOvTJ6yhWAWpaLqqYkt8uw5yCp'}})
            .success(function(response){
            $scope.contacts = response.data;
        });
    }

    $scope.getContact = function() {
        var id = $routeParams.id;
        if (id) {
            console.log("getting ID = " + id);
            $http({method: 'GET', url: url + id, headers: {'X-Auth-Token': '614rfnFSypmCjYeOvTJ6yhWAWpaLqqYkt8uw5yCp'}})
                .success(function (response) {
                    $scope.contact = response;
                });
        }
    }



   
    $scope.saveContact = function(contact) {
        if (contact.id > 0) {
            console.log("Save ID: "+ contact.id);

            $http({ method: 'PUT',
                url:url+contact.id,
                data:contact,
                headers: {'X-Auth-Token': '614rfnFSypmCjYeOvTJ6yhWAWpaLqqYkt8uw5yCp'}})
                .then(function successCallback(response) {

                    console.log("PUT Successful:");
                    console.log(response);
                    $location.path('/#');


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

                    console.log("POST Successful:");
                    console.log(response);
                    $location.path('/#');


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
                $location.path('/#');

            }, function errorCallback(response) {
                console.log("DELETE FAILED!!:");
                console.log(response);
            })


    }


}]);