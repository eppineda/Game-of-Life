/**
 * Game of Life. http://en.wikipedia.org/wiki/Conway%27s_Game_of_Life
 * Copyright (c) 2014 Enrique Pineda
 */

angular.module('gameoflife.controllers', [])
.controller('SimController', function($scope, $window, Game, Plotter) {
    $scope.grid = { 'width':5, 'height':5 }
    $scope.seed = { 'howMany':0, 'coords':[] }
    $scope.continue = true
    $scope.resize = function() {
        if ('undefined' == $scope.grid.width || 'undefined' == $scope.grid.height || 5 >
            $scope.grid.width || 5 > $scope.grid.height)
            return // too small
        /*
         * The physical extent can never exceed $window.innerWidth X $window.innerHeight.
         * We need to dedicate the lower portion of the browser's client area to the
         * play field.
         */
        console.log($scope.grid.width, $scope.grid.height)
        console.log('outer window size', $window.outerWidth, 'x', $window.outerHeight)
        console.log('inner window size', $window.innerWidth, 'x', $window.innerHeight)
        PlayField.extent.x = $window.innerWidth
        PlayField.extent.y = $window.innerHeight
        PlayField.max.x = $scope.grid.width
        PlayField.max.y = $scope.grid.height
        if (PlayField.extent.x < PlayField.extent.y)
            PlayField.extent.x = PlayField.extent.y
        else
            PlayField.extent.y = PlayField.extent.x
        PlayField.cellSize = Math.floor(PlayField.extent.x / PlayField.max.x)
        console.log("Grid spaces are now ", PlayField.cellSize, "pixels square on a field ", 
                    PlayField.max.x, " X ", PlayField.max.y)
    } // resize
    $scope.setRows = function() {
        if ('undefined' == $scope.seed.howMany || 1 > $scope.seed.howMany) return
        for (var i = 0, j = $scope.seed.howMany; i < j; ++i)
            $scope.seed.coords[i] = { x:-1, y:-1 } // used to create cell
        console.log($scope.seed.coords.length)
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
        var seedCells = Game.seed($scope.seed.coords)
        var currentGen = seedCells
        var nextGen = null
        var svg = d3.select('svg')
        var rect = svg.append('rect')
        var emptyPlayfield = function() {
            svg.attr('height',  PlayField.extent.y)
            rect.attr('width',  PlayField.extent.x)
                .attr('height', PlayField.extent.y)
                .attr('class',  'coordinate')
        } // emptyPlayfield
        var plotCells = function(cells) {
            console.log(getClockTime(), 'plotting ', cells.length, ' cells...')
            var circles = svg.selectAll('circle')
            console.log(circles)

            circles.data(cells)
                .enter()
                .append('circle')
                .attr('cx', function(cell) {
                    console.log('cx', cell)
                    return Plotter.logicalToRaster(cell.x) + Math.floor(PlayField.cellSize / 2)
                })
                .attr('cy', function(cell) {
                    console.log('cy', cell)
                    return Plotter.logicalToRaster(cell.y) + Math.floor(PlayField.cellSize / 2)
                })
                .attr('r', function(cell) {
                    console.log('r', cell)
                    return Math.floor(PlayField.cellSize / 2)
                })
                .attr('class', function(cell) {
                    console.log('setting fill class', cell.state)
                    if (constants.alive == cell.state)
                        return 'alive'
                    else if (constants.dead == cell.state)
                        return 'dead'
                    else
                        throw { name:'CellException', message:'Invalid cell state' }
                })
        } // plotCells
        var moreCellsPlease = function() {
            try {
                plotCells(currentGen)
            }
            catch(CellException) {
                console.error(CellException.message)
                $scope.continue = false
            }
            if (!$scope.continue) return // someone clicked the stop button
            console.log('current generation', getClockTime(), currentGen)
            nextGen = Game.nextGeneration(currentGen)
            console.log('next generation', nextGen)
            currentGen = nextGen
            setTimeout(function() {
                var circles = svg.selectAll('circle')

                circles.remove()
                moreCellsPlease()
            }, 1000)
        }

        emptyPlayfield()
        moreCellsPlease()
    } // beginSimulation
    $scope.endSimulation = function() {
        console.log('ENDING SIMULATION')
        $scope.continue = false
    }
/* I'm not sure that I want these here.
    $scope.setCoordinate = function(index) { // todo: what was this for??
        console.log($scope.seed.coords)
    }
    $scope.plotCells = function(cells) {
        console.log(cells.length)
    }
    $scope.clearCoordinate = function(x, y) {
    }
    $scope.clearAll = function() {
    }
*/
});
