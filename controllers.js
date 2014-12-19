/**
 * Game of Life. http://en.wikipedia.org/wiki/Conway%27s_Game_of_Life
 * Copyright (c) 2014 Enrique Pineda
 */

angular.module('gameoflife.controllers', [])
.controller('GridController', function($scope) {
    $scope.resize = function() {
        if ('undefined' == $scope.grid.width || 'undefined' == $scope.grid.height || 3 >
            $scope.grid.width || 3 > $scope.grid.height)
            return // too small
        console.log($scope.grid.width, $scope.grid.height)
    }
})
.controller('SeedController', function($scope) {
})
