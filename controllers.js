/**
 * Game of Life. http://en.wikipedia.org/wiki/Conway%27s_Game_of_Life
 * Copyright (c) 2014 Enrique Pineda
 */

angular.module('gameoflife.controllers', [])
.controller('SimController', function($scope) {
    $scope.grid = { 'width':3, 'height':3 }
    $scope.seed = { 'howMany':0, 'cells':[] }
    $scope.resize = function() {
        if ('undefined' == $scope.grid.width || 'undefined' == $scope.grid.height || 3 >
            $scope.grid.width || 3 > $scope.grid.height)
            return // too small
        console.log($scope.grid.width, $scope.grid.height)
    }
    $scope.setRows = function() {
        if ('undefined' == $scope.seed.howMany || 1 > $scope.seed.howMany) return
        for (var i = 0, j = $scope.seed.howMany; i < j; ++i)
            $scope.seed.cells[i] = { x:-1, y:-1 } // temporary. will become a cell later.
        console.log($scope.seed.cells.length)
    }
    $scope.setCoordinate = function(index) {
        console.log($scope.seed.cells)
    }
    $scope.randomizeCoords = function() {
        console.log('------------randomly generated coordinates')
        for (var i = 0, j = $scope.seed.cells.length; i < j; ++i) {
            $scope.seed.cells[i].x = Math.floor(Math.random() * ($scope.grid.width + 1))
            $scope.seed.cells[i].y = Math.floor(Math.random() * ($scope.grid.height + 1))
            console.log($scope.seed.cells[i])
        }
    }
    $scope.beginSimulation = function() {
        console.log('BEGINNING SIMULATION')
    }
})
