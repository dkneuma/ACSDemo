/**
 * Created by daniel.neumann on 6/9/16.
 */

(function () {

    var injectParams = ['$scope', '$http', '$location', '$routeParams'];
    var SuperController = function ($scope, $http, $location, $routeParams)
    {
vm.DisplayModeEnum = {
    Card: 0,
    List: 1
};

vm.changeDisplayMode = function (displayMode) {
    switch (displayMode) {
        case vm.DisplayModeEnum.Card:
            vm.listDisplayModeEnabled = false;
            break;
        case vm.DisplayModeEnum.List:
            vm.listDisplayModeEnabled = true;
            break;
    }

}};}());