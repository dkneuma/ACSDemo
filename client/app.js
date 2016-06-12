/**
 * Created by daniel.neumann on 6/7/16.
 */

var url = 'https://challenge.acstechnologies.com/api/contact/';
var myApp = angular.module('myApp',['ngRoute','ui.bootstrap','angular-confirm'])

.config(function($routeProvider){
    $routeProvider.when('/', {
        controller:'ContactsFactoryController',
        templateUrl: 'views/contacts.html'
    })
        .when('/home', {
            controller:'ContactsFactoryController',
            templateUrl: 'views/contacts.html'
        })
        .when('/Add',{
            controller:'ContactFactoryController',
            templateUrl: 'views/edit_contact.html'
        })
        .when('/About', {
            controller:'AboutController',
            templateUrl: 'views/about.html'
        })
        .when('/contacts/edit/:id',{
            controller:'ContactFactoryController',
            templateUrl: 'views/edit_contact.html'
        })
        .otherwise({
            redirectTo: '/'
        });
})

    .factory('dataFactory', ['$http', '$confirm', function($http, $confirm) {

        var urlBase = 'https://challenge.acstechnologies.com/api/contact/';
        var headerObject = {headers: {'X-Auth-Token': '614rfnFSypmCjYeOvTJ6yhWAWpaLqqYkt8uw5yCp'}};
        var dataFactory = {};

        dataFactory.getContacts = function () {
            return $http.get(urlBase, headerObject);
        };

        dataFactory.getContact = function (id) {
            return $http.get(urlBase + id, headerObject);
        };

        dataFactory.saveContact = function(contact) {
            return $http.put(urlBase+contact.id, contact, headerObject);
        };

        dataFactory.addContact = function(contact) {
            return $http.post(urlBase, contact, headerObject);
        };

        dataFactory.deleteContact = function (id) {
            return $http.delete(urlBase + id, headerObject);
        };


        return dataFactory;
    }])
    
    .controller('ContactsFactoryController', ['$scope', 'dataFactory',
        function ($scope, dataFactory) {

            console.log("ContactsFactoryController loaded");
     $scope.contacts;
            
            getContacts();

            function getContacts() {
                dataFactory.getContacts()
                    .then(function (response) {
                        $scope.contacts = response.data.data;
                    }, function (error) {
                        $scope.status = 'Unable to load contact data: ' + error.message;
                    });
            }

        }])

    .controller('ContactFactoryController', ['$scope', '$routeParams', '$location', '$confirm', 'dataFactory',
        function ($scope, $routeParams, $location, $confirm, dataFactory) {

            console.log("ContactFactoryController loaded");

            $scope.contact;

            getContact();

            function getContact() {
                var id = $routeParams.id;
                if (id) {
                    dataFactory.getContact(id)
                        .then(function (response) {
                            $scope.contact = response.data;
                        }, function (error) {
                            $scope.status = 'Unable to load contact data: ' + error.message;
                        });
                }
            }

            $scope.saveContact = function(contact) {
                if (contact.id > 0) {
                    dataFactory.saveContact(contact)
                        .then(function (response) {
                            $scope.status = "Contact updated";
                            $location.path('/#');
                        }, function (error) {
                            $scope.status = "unable to save contact data: " + error.message;
                        })
                }
                else {
                    dataFactory.addContact(contact)
                        .then(function (response) {
                            $scope.status = "New Contact saved";
                            $location.path('/#');
                        }, function(error) {
                            $scope.status = "unable to save new contact: " + error.message;
                        })
                }
            }

            $scope.deleteConfirm = function(id) {
                $confirm({text: 'HEY? Are you sure you want to delete?'})
                    .then(function() {
                        console.log("Go ahead and delete ID " + id);
                        deleteContact(id);
                    });
            }

            function deleteContact(id) {
                console.log("Deleting Contact " + id);
                dataFactory.deleteContact(id)
                    .then(function (response) {
                        console.log("DELETE Successful:");
                        console.log(response);
                        $location.path('/#');
                    }, function (error) {
                        $scope.status = "unable to delete contact: " + error.message;
                    })
            }



        }])


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
});

