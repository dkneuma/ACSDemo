/**
 * Created by daniel.neumann on 6/7/16.
 */

var url = 'https://challenge.acstechnologies.com/api/contact/';
var myApp = angular.module('myApp',['ngRoute','ui.bootstrap','angular-confirm'])

.config(function($routeProvider){
    $routeProvider.when('/', {
        controller:'ContactsController',
        templateUrl: 'views/contacts.html'
    })
        .when('/home', {
            controller:'ContactsController',
            templateUrl: 'views/contacts.html'
        })
        .when('/Add',{
            controller:'ContactsController',
            templateUrl: 'views/edit_contact.html'
        })
        .when('/About', {
            controller:'AboutController',
            templateUrl: 'views/about.html'
        })
        .when('/contacts/edit/:id',{
            controller:'ContactsController',
            templateUrl: 'views/edit_contact.html'
        })
        .otherwise({
            redirectTo: '/'
        });
})
.controller('navController', function ($scope) {
        $scope.nav = {
            navItems: ['Home', 'Add', 'About'],
            selectedIndex: 0,
            navClick: function ($index) {
                $scope.nav.selectedIndex = $index;
            }
        };
    })

.controller('AboutController', function($scope){
    console.log('AboutController loaded...');
})

.controller('ContactsController', function($scope, $confirm, $http, $location, $routeParams){
    console.log('ContactsController loaded...');

    $scope.deleteConfirm = function(id) {
        $confirm({text: 'HEY? Are you sure you want to delete?'})
            .then(function() {
                console.log("Go ahead and delete ID " + id);
                $scope.deleteContact(id);
            });
    }

    $scope.getContacts = function() {
        $http({method: 'GET', url:url, headers: {'X-Auth-Token': '614rfnFSypmCjYeOvTJ6yhWAWpaLqqYkt8uw5yCp'}})
            .then(function successCallback(response) {
                console.log("GET Successful:");
                $scope.contacts = response.data.data;
            }, function errorCallback(response) {
                console.log("GET FAILED!!:");
                console.log("Error:" + response);
            })
    }

    $scope.getContact = function() {
        var id = $routeParams.id;
        if (id) {
            console.log("getting ID = " + id);
            $http({method: 'GET', url: url + id, headers: {'X-Auth-Token': '614rfnFSypmCjYeOvTJ6yhWAWpaLqqYkt8uw5yCp'}})
                .then(function successCallback(response) {
                    console.log("GET Successful:");
                    console.log(response.status);
                    $scope.contact = response.data;
                }, function errorCallback(response) {
                    console.log("GET FAILED!!:");
                    console.log("Error:" + response);
                })
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

                console.log("DELETE Successful:");
                console.log(response);
                $location.path('/#');

            }, function errorCallback(response) {
                console.log("DELETE FAILED!!:");
                console.log(response);
            })


    }


});

