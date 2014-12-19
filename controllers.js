/**
 * Game of Life. http://en.wikipedia.org/wiki/Conway%27s_Game_of_Life
 * Copyright (c) 2014 Enrique Pineda
 */

angular.module('gameoflife.controllers', [])
.controller('GridController', function($scope) {
    $scope.grid = { 'width':3, 'height':3 }
    $scope.resize = function() {
        if ('undefined' == $scope.grid.width || 'undefined' == $scope.grid.height || 3 >
            $scope.grid.width || 3 > $scope.grid.height)
            return // too small
        console.log($scope.grid.width, $scope.grid.height)
    }
})
.controller('SeedController', function($scope) {
    $scope.seed = { 'howMany':0, 'cells':[] }
    $scope.setRows = function() {
        if ('undefined' == $scope.seed.howMany || 1 > $scope.seed.howMany) return
        for (var i = 0, j = $scope.seed.howMany; i < j; ++i)
            $scope.seed.cells[i] = { x:-1, y:-1 } // temporary. will become a cell later.
        console.log($scope.seed.cells.length)
    }
    $scope.setCoordinate = function(index) {
        console.log($scope.seed.cells)
    }
    $scope.createCells = function() {
        console.log('randomly creating cells')
    }
})
