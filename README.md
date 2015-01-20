A web-based simulation based on an article at
http://en.wikipedia.org/wiki/Conway%27s_Game_of_Life

I. Introduction

This was my first exposure to Conway's Game of Life.
- Rules governing the size of the initial cell population "seed". I left this up
to the end user, which includes both the quantity and the location of cells.

II. Files

A. Versions

v0.1 - As formally submitted for review to Jack Russell Software.

B. File Listing

* app.js - angular module definition
* controllers.js - end user interaction
* game.js - implementation of cell behavior
* index.html - user interface
* patterns.js - provides templates for patterns of self-sustaining cells
* services.js - game logic

III. Status

Functionally complete, but not really all that refined.

IV. Implementation History

First round was low-level programming for cell behavior (game.js).

Second round was UI programming wih AngularJS.

Third round was integration of game.js into the Angular application, creating controllers
and services (controllers.js and services,js, respectively) as necessary.

V. Future Design Considerations

<del>A. Whether or not to allow off-grid (i.e. off-screen) cellular creation</del> [ no. ]

<del>B. Graphical Display</del> [ done. ]

The current design uses a logical coordinate system, instead of a pixel-based 
system based on browser resolution. That is to say, for example, coordinate(50, 35) 
is not pixel-coordinate(50, 35).

I also like the grid display in use by gitHub for a user's Contribution graph. That would 
do very nicely. [ done, with d3.js, as in github. ]

C. In a future version, real-time recognition of cellular patterns would probably be a lot fun.

D. Seeding from a flat file would likely make the game easier to use.

VI. Known Defects/Shortcomings

<del>A. Limited to 5 cell generations. Because this game lacks manual control over when to 
make it stop. The loop-control for infinite iterations is commented out, for now.</del>

<del>B. Because it lacks a graphical display, the only way to observe the simulation while it
runs is by using Firefox/Firebug and watching the console messages.</del>

C. General lack of robust validation of user input. In general, operate the application's
UI controls top-to-bottom. Skipping around essentially bypasses important configuration and
will probably result in non-sensical behavior.

<del>D. Did not test thoroughly transition rules for cases where a cell was supposed to die
or be rejuvenated.</del>

<del>E. The game really should stop when all cells are dead.</del>

F. Duplicate cells are allowed/possible.

G. Off-grid cells get truncated and result in the simulator behaving as if they do not exist.
