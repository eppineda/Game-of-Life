/**
 * Game of Life. http://en.wikipedia.org/wiki/Conway%27s_Game_of_Life
 * Copyright (c) 2014 Enrique Pineda
 */

angular.module('gameoflife.controllers', [])
.controller('SimController', function($scope, $window, Game) {
    $scope.grid = { 'width':3, 'height':3 }
    $scope.seed = { 'howMany':0, 'coords':[] }
    $scope.resize = function() {
        if ('undefined' == $scope.grid.width || 'undefined' == $scope.grid.height || 3 >
            $scope.grid.width || 3 > $scope.grid.height)
            return // too small
        /*
         * The physical extent can never exceed $window.innerWidth X $window.innerHeight.
         * We need to dedicate the lower portion of the browser's client area to the
         * play field.
         */
        console.log($scope.grid.width, $scope.grid.height)
        console.log('outer window size', $window.outerWidth, 'x', $window.outerHeight)
        console.log('inner window size', $window.innerWidth, 'x', $window.innerHeight)
    }
    $scope.setRows = function() {
        if ('undefined' == $scope.seed.howMany || 1 > $scope.seed.howMany) return
        for (var i = 0, j = $scope.seed.howMany; i < j; ++i)
            $scope.seed.coords[i] = { x:-1, y:-1 } // used to create cell
        console.log($scope.seed.coords.length)
    }
    $scope.setCoordinate = function(index) {
        console.log($scope.seed.coords)
    }
    $scope.randomizeCoords = function() {
        console.log('------------randomly generated coordinates')
        for (var i = 0, j = $scope.seed.coords.length; i < j; ++i) {
            $scope.seed.coords[i].x = Math.floor(Math.random() * ($scope.grid.width))
            $scope.seed.coords[i].y = Math.floor(Math.random() * ($scope.grid.height))
            console.log($scope.seed.coords[i])
        }
    }
    $scope.beginSimulation = function() {
        console.log('BEGINNING SIMULATION')
        var seedCells = Game.seed($scope.grid.width, $scope.grid.height, $scope.seed.coords)
        var currentGen = seedCells
        var nextGen = null
        var count = 0, limit = 5 // todo: temporary, until manual stop is implemented

        // while (true) {
        while (count++ < limit) {
            console.log('current generation', currentGen)
            // todo: render currentGen cells in browser
            nextGen = Game.nextGeneration(currentGen)
            console.log('next generation', nextGen)
            currentGen = nextGen
        }
    }
    $scope.plotCells = function(cells) {
        console.log(cells.length)
    }
    $scope.clearCoordinate = function(x, y) {
    }
    $scope.clearAll = function() {
    }
});
