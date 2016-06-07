/**
 * Created by daniel.neumann on 6/7/16.
 */
var myApp = angular.module('myApp');

myApp.controller('ContactsController', ['$scope', '$http', '$location', '$routeParams', function($scope, $http, $location, $routeParams){
    console.log('ContactsController loaded...');



    var url = 'https://challenge.acstechnologies.com/api/contact/';
    var urlTEST = 'https://challenge.acstechnologies.com/api/contact/4931/';

    $scope.getContacts = function() {
        $http({method: 'GET', url, headers: {'X-Auth-Token': '614rfnFSypmCjYeOvTJ6yhWAWpaLqqYkt8uw5yCp'}})
            .success(function(response){
            $scope.contacts = response.data;
        });
    }

    $scope.getContact = function() {
        var id = $routeParams.id;
        var urlID = url + id;
        $http({
            method: 'GET', url:urlID, headers: {'X-Auth-Token': '614rfnFSypmCjYeOvTJ6yhWAWpaLqqYkt8uw5yCp'}})
            .success(function(response){
                $scope.contact = response;
                console.log(response);
            });

    }


    $scope.addBook = function(){
        console.log($scope.book);
        $http.post('/api/books/', $scope.book).success(function(response){
            window.location.href='#/books';
        });
    }

    $scope.updateBook = function(){
        var id = $routeParams.id;
        $http.put('/api/books/'+id, $scope.book).success(function(response){
            window.location.href='#/books';
        });
    }

    $scope.removeBook = function(id){
        $http.delete('/api/books/'+id).success(function(response){
            window.location.href='#/books';
        });
    }
}]);