/**
 * Game of Life. http://en.wikipedia.org/wiki/Conway%27s_Game_of_Life
 * Copyright (c) 2014 Enrique Pineda
 */

angular.module('gameoflife.controllers', [])
.controller('SimController', function($scope, $window, Game, Plotter) {
    $scope.grid = { 'width':10, 'height':10 }
    $scope.seed = { 'howMany':0, 'coords':[] }
    $scope.continue = true
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
        $scope.continue = true

        // How many pixels are available?
        PlayField.extent.x = $window.innerWidth
        PlayField.extent.y = $window.innerHeight

        // Make the grid square.
        if (PlayField.extent.x > PlayField.extent.y)
            PlayField.extent.x = PlayField.extent.y
        else
            PlayField.extent.y = PlayField.extent.x
        PlayField.max.x = 10
        PlayField.max.y = 10

        // Determine size of each grid cell.
        PlayField.cellSize = Math.floor(PlayField.extent.x / PlayField.max.x)
        console.log("Grid spaces are now ", PlayField.cellSize, "pixels square on a field ", 
                    PlayField.max.x, " X ", PlayField.max.y)

        // Capture all grid spaces. The bigger the grid, the longer this takes.
        var currentGen = []

        for (var w = 0, wMax = PlayField.max.x; w < wMax; ++w) {
            for (var h = 0, hMax = PlayField.max.y; h < hMax; ++h) {
                var c = new Cell(w, h)

                c.state = constants.dead
                currentGen.push(c)
            }
        }

        // Seed the simulation with live cells.
        var seedCells = Game.seed($scope.seed.coords)
        var svg = d3.select('svg')
        
        for (var s = 0, sMax = seedCells.length; s < sMax; ++s) {
            var found = findCell(currentGen, seedCells[s].x, seedCells[s].y)

            if (found) found.state = seedCells[s].state // make the cell alive
        }
        console.log('the grid: ', currentGen)
        svg.attr('width',   PlayField.extent.x)
        svg.attr('height',  PlayField.extent.y)

        var emptyPlayfield = function() {
            svg.selectAll('rect.alive').remove()
        } // emptyPlayfield
        var plotCells = function(cells) {
            console.log(getClockTime(), 'plotting ', cells.length, ' cells...')
            var rects = svg.selectAll('rect')

            rects.data(cells)
            .enter()
            .append('rect')
            .attr('x', function(cell) {
                console.log('x', cell)
                return Plotter.logicalToRaster(cell.x)
            })
            .attr('y', function(cell) {
                console.log('y', cell)
                return Plotter.logicalToRaster(cell.y)
            })
            .attr('width', function(cell) {
                console.log('width', cell)
                return PlayField.cellSize
            })
            .attr('height', function(cell) {
                console.log('height', cell)
                return PlayField.cellSize
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

            var nextGen = Game.nextGeneration(currentGen)

            console.log('next generation', nextGen)
            currentGen = nextGen
            setTimeout(function() {
                svg.selectAll('rect.alive').remove()
                moreCellsPlease()
            }, 1000)
        } // moreCellsPlease

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
