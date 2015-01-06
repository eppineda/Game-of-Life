/**
 * Game of Life. http://en.wikipedia.org/wiki/Conway%27s_Game_of_Life
 * Copyright (c) 2014 Enrique Pineda
 */

angular.module('gameoflife.services', [])
.factory('Game', function() {
    return {
        seed:function(coordinates) {
            var howMany = coordinates.length
            var newCells = []
            for (var i = 0, j = howMany; i < j; ++i) {
                var c = null
                
                try { c = new Cell(coordinates[i].x, coordinates[i].y) }
                catch (CellException) { console.error(CellException.message) }

                var numFound = c.findLiveNeighbors(newCells)

                console.log(numFound, ' neighbors located.', c)
                newCells[i] = c
            } // for: i
            return newCells
        }, // seed
        nextGeneration:function(currentGen) {
            console.log('----Transitioning current generation of cells')
            // apply each rule to each cell, dead or alive

            var nextGen = [] // births + deaths
            for (var a = 0, aMax = currentGen.length; a < aMax; ++a) {
                currentGen[a].findLiveNeighbors(currentGen)
                for (var t = 0, tMax = transitions.length; t < tMax; ++t) {
                    var afterTransition = transitions[t](currentGen[a])

                    if (null != afterTransition) {
                        nextGen.push(afterTransition)
                        break // state change, continue to next cell
                    }
                } // for: t
            } // for: a
            return nextGen
        } // nextGeneration
    } // return
})
.factory('Plotter', function() {
    return {
        rasterToLogical:function(r) {
            return Math.ceiling(r / PlayField.cellSize)
        },
        logicalToRaster:function(l) {
            return l * PlayField.cellSize
        },
        xScaler:function(cells) {
            var max = d3.max(cells, function(cell) {
                return cell.x
            })
            var f = d3.scale.linear().domain([0, max])
                .range([0, PlayField.extent.x])

            return f // a function that returns a scaled x-coordinate, given a domain value
        },
        yScaler:function(cells) {
            var max = d3.max(cells, function(cell) {
                return cell.y
            })
            var f = d3.scale.linear().domain([0, max])
                .range([0, PlayField.extent.y])

            return f // a function that returns a scaled y-coordinate, given a domain value
        }
    }
})
