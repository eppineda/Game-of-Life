/**
 * Game of Life. http://en.wikipedia.org/wiki/Conway%27s_Game_of_Life
 * Copyright (c) 2014 Enrique Pineda
 */

angular.module('gameoflife.controllers', [])
.controller('SimController', function($scope, $window, Game, Plotter) {
    $scope.grid = { 'width':10, 'height':10 }
    $scope.seed = { 'howMany':0, 'coords':[] }
    $scope.continue = true
    $scope.showSeed = true
    $scope.setRows = function() {
        if ('undefined' == $scope.seed.howMany || 1 > $scope.seed.howMany) return
        for (var i = 0, j = $scope.seed.howMany; i < j; ++i)
            $scope.seed.coords[i] = { x:-1, y:-1 } // used to create cell
    }
    $scope.randomizeCoords = function() {
        for (var i = 0, j = $scope.seed.coords.length; i < j; ++i) {
            $scope.seed.coords[i].x = Math.floor(Math.random() * ($scope.grid.width))
            $scope.seed.coords[i].y = Math.floor(Math.random() * ($scope.grid.height))
        }
    }
    $scope.beginSimulation = function() {
        console.log('BEGINNING SIMULATION')
        $scope.continue = true
        $scope.showSeed = false

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
        var all = []

        for (var w = 0, wMax = PlayField.max.x; w < wMax; ++w) {
            for (var h = 0, hMax = PlayField.max.y; h < hMax; ++h) {
                var c = new Cell(w, h)

                c.state = constants.dead
                all.push(c)
            }
        }

        // Seed the simulation with live cells.
        var seedCells = Game.seed($scope.seed.coords)
        var svg = d3.select('svg')
        
        for (var s = 0, sMax = seedCells.length; s < sMax; ++s) {
            var found = findCell(all, seedCells[s].x, seedCells[s].y)

            if (found) found.state = seedCells[s].state // make the cell alive
        }
        svg.attr('width',   PlayField.extent.x)
        svg.attr('height',  PlayField.extent.y)

        var plotCells = function(cells) {
            console.log(getClockTime(), 'plotting ', cells.length, ' cells...')
            var rects = svg.selectAll('rect')

            rects.data(cells)
            .enter()
            .append('rect')
            .attr('x', function(cell) {
                return Plotter.logicalToRaster(cell.x)
            })
            .attr('y', function(cell) {
                return Plotter.logicalToRaster(cell.y)
            })
            .attr('width', function(cell) {
                return PlayField.cellSize
            })
            .attr('height', function(cell) {
                return PlayField.cellSize
            })
            .attr('class', function(cell) {
                if (constants.alive == cell.state)
                    return 'alive'
                else if (constants.dead == cell.state)
                    return 'dead'
                else
                    throw { name:'CellException', message:'Invalid cell state' }
            })
        } // plotCells
        var updateCells = function() {
            if (!$scope.continue) return // someone clicked the stop button

            var updates = Game.nextGeneration(all)
          
            if (1 > updates.length) {
                $scope.continue = false
                return
            }
            for (var u in updates) {
                svg.selectAll('rect')
                .filter(function(cell) {
                    return (updates[u].x == cell.x && updates[u].y == cell.y)
                })
                .attr('class', function(cell) {
                    if (constants.alive == cell.state) return 'alive'
                    if (constants.dead  == cell.state) return 'dead'
                    throw { name:'CellException', message:'Invalid cell state' }
                })
            }
        } // updateCells

        try {
            plotCells(all)
            setTimeout(function() {
                updateCells()
            }, 1000)
        }
        catch(CellException) {
            console.error(CellException.message)
            $scope.continue = false
        }
    } // beginSimulation
    $scope.endSimulation = function() {
        console.log('ENDING SIMULATION')
        $scope.continue = false
        $scope.showSeed = true
    }
});
