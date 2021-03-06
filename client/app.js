/**
 * Created by daniel.neumann on 6/7/16.
 */
var myApp = angular.module('myApp',['ngRoute','ui.bootstrap','angular-confirm']);

myApp.config(function($routeProvider){
    $routeProvider.when('/', {
        controller:'ContactsController',
        templateUrl: 'views/contacts.html'
    })
        .when('/contacts', {
            controller:'ContactsController',
            templateUrl: 'views/contacts.html'
        })
        .when('/contacts/add',{
            controller:'ContactsController',
            templateUrl: 'views/edit_contact.html'
        })
        .when('/contacts/edit/:id',{
            controller:'ContactsController',
            templateUrl: 'views/edit_contact.html'
        })
        .otherwise({
            redirectTo: '/'
        });
});
