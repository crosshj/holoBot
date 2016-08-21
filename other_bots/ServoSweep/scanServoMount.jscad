// title      : Sonar Scanner Servo Mount
// author     : Harrison Cross
// license    : MIT License
// description: mount servo for sonar scan
// file       : scanServoMount.jscad

var DEPTH = 36;
var WIDTH = 36;
var INSET = 6.3;
var HEIGHT = 24;
var HOLEWIDTH = 12.5;
var HOLEDEPTH = 22.5;

function base(){
    return polyhedron({
        points: [
            [0,0+INSET,0], 
            [0,WIDTH-INSET,0], 
            [0,WIDTH/2,HEIGHT*3],
            [DEPTH,0+INSET,0],
            [DEPTH,WIDTH-INSET,0],
            [DEPTH,WIDTH/2,HEIGHT*3]
        ],
        triangles: [
            [0,1,2], //front
            [0,5,3], //slope right 1
            [0,2,5], //slope right 2
            [3,5,4], //back
            [0,3,4], //bottom 1
            [1,0,4], //bottom 2
            [1,4,5], //slope left 1
            [1,5,2]  //slope left 2
        ]
    }).subtract(
        // trim triangle top
        cube({size: [DEPTH,WIDTH,50]})
            .translate([0,0,HEIGHT])
    ).union(
        // add base platform
        cube({size: [DEPTH,WIDTH,3]})
    ).subtract(servoHole()
    ).subtract(accessHole()
    ).subtract(screwHoles()
    );
}

function servoHole() {
    return cube({size: [
        HOLEDEPTH,
        HOLEWIDTH,
        HEIGHT
    ]}).translate([
        (DEPTH-HOLEDEPTH)/2,
        (WIDTH-HOLEWIDTH)/2,
        0
    ]);
}

function accessHole(){
    return cube({size: [
        DEPTH,
        HOLEWIDTH-2,
        HEIGHT-(INSET)
    ]}).translate([
        0,
        (WIDTH-HOLEWIDTH+2)/2,
        INSET/2
    ]);
}

function screwHoles(){
    var radius = 1;
    return union([
        cylinder({r:radius,h:HEIGHT,fn:20})
            .translate([INSET/2+radius/2,INSET/2+radius/2,0]),
        cylinder({r:radius,h:HEIGHT,fn:20})
            .translate([DEPTH-(INSET/2+radius/2),INSET/2+radius/2,0]),
        cylinder({r:radius,h:HEIGHT,fn:20})
            .translate([DEPTH-(INSET/2+radius/2),WIDTH-(INSET/2+radius/2),0]),
        cylinder({r:radius,h:HEIGHT,fn:20})
            .translate([INSET/2+radius/2,WIDTH-(INSET/2+radius/2),0]),
        cylinder({r:radius,h:HEIGHT,fn:20})
            .translate([INSET/2+radius/2,WIDTH/2,0]),
        cylinder({r:radius,h:HEIGHT,fn:20})
            .translate([DEPTH-(INSET/2+radius/2),WIDTH/2,0]),
    ]);
}


function main() {
    return base().translate([
        DEPTH/-2,
        WIDTH/-2,
        0
    ]);
}

