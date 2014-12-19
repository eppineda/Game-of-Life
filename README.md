A web-based simulation based on an article at
http://en.wikipedia.org/wiki/Conway%27s_Game_of_Life

I. Introduction

This was my first exposure to Conway's Game of Life. I'm not confident that I fully 
understand the game's rules, so I'm not certain that the implementation is an accurate
representation of cell behavior as defined by the game.  In particular,
- "simulataneous" application of transition rules -- need to think more about what the
implications are as each rule is applied to each cell.
- rules governing the size of the initial cell population "seed". So, I left this up
to the end user, which includes both the quantity and the location of cells.
- rules governing the size of the play "field", which appears to be up to the implementor and,
therefore, configurable here.

II. Files

app.js - angular module definition
controllers.js - end user interaction
game.js - implementation of cell behavior
index.html - user interface
seed.js - a test script
services.js - game logic

III. Status

Not complete. Lacks a graphical display of cell generations as they occur.

IV. Implementation History

First round was low-level programming for cell behavior (game.js and seed.js, with index.html
acting as the entry point for a static test script, which is now disabled but still in the markup.

Second round was UI programming wih AngularJS, primarly making configurable to the end user 
what was previously hard-coded simulation parameters.

Third round was integration of game.js into the Angular application, creating controllers
and services (controllers.js and services,js, respectively) as necessary.

V. Future Design Considerations

A. Whether or not to allow off-grid (i.e. off-screen cellular creation)

B. Graphical Display

I'm not yet skilled in animation with AngularJS. The current design uses a logical coordinate
system, instead of actual pixel-based system based on browser resolution. That is to say,
coordinate(50, 35) is not pixel-coordinate(50, 35).

I also like the grid display in use by gitHub in a user's Contribution graph. That would 
do very nicely.

C. In a future version, real-time recognition of celluar patterns would probably be a lot fun.

D. Seeding from a flat file would likely make the game easier to use.

VI. Known Defects/Shortcomings

A. Limited to 5 cell generations. Because this game lacks manual control over when to 
make it stop. The loop-control for inifinite iterations is commented out, for now.

B. Because it lacks a graphical display, the only way to observe the simulation while it
runs is by using Firefox/Firebug and watching the console messages.

C. General lack of robust validation of user input. In general, operate the application's
UI controls top-to-bottom. Skipping around essentially bypasses important configuration and
will probably result in non-sensical behavior.

D. Did not test thoroughly transition rules for cases where a cell was supposed to die
or be rejuvenated.

E. The game really should stop when all cells are dead.
