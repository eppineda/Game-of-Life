/**
 * Game of Life. http://en.wikipedia.org/wiki/Conway%27s_Game_of_Life
 * Copyright (c) 2014 Enrique Pineda
 */

// plotting

var constants = {
    "nw":"nw",
    "n":"n",
    "ne":"ne",
    "e":"e",
    "se":"se",
    "s":"s",
    "sw":"sw",
    "w":"w"
}

function nwOf(x, y) {
    return { "x":x - 1, "y":y + 1 }
}

function nOf(x, y) {
    return { "x":x, "y":y + 1 }
}

function neOf(x, y) {
    return { "x":x + 1, "y":y + 1 } 
}

function eOf(x, y) {
    return { "x":x + 1, "y":y }
}

function seOf(x, y) {
    return { "x":x + 1, "y":y - 1 }
}

function sOf(x, y) {
    return { "x":x, "y":y - 1 }
}

function swOf(x, y) {
    return { "x":x - 1, "y":y - 1 }
}

function wOf(x, y) {
    return { "x":x - 1, "y":y }
}

// cells

var Cell = function(x, y) {
    this.x = x
    this.y = y
    this.neighbors = { 
        "nw":null, 
        "n":null, 
        "ne":null, 
        "e":null,
        "se":null,
        "s":null,
        "sw":null,
        "w":null
    } // no neighboring cells by default
}

Cell.prototype.addNeighbor = function(position) {
    var cell = null
    if (constants.nw != position &&
        constants.n  != position &&
        constants.ne != position &&
        constants.e  != position &&
        constants.se != position &&
        constants.sw != position &&
        constants.w)
        return null // not a valid position for a new cell
    cell = new Cell(position.x, position.y)
    this.neighbors[positon] = cell
    return cell
}

var Pattern = function() {
    this.cells = []
}
