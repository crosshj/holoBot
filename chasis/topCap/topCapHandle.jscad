// title      : OpenJSCAD.org Logo
// author     : Rene K. Mueller
// license    : MIT License
// revision   : 0.003
// tags       : Logo,Intersection,Sphere,Cube
// file       : logo.jscad


function main() {
   return topCap();
}

function topCap(){ return difference([
        union([
            polygonPlate({ size: 53.34/2, height: 6}),
            polygonPlate({ size: 63.34/2, height: 6}).translate([0,0,6]),
            cube({ size: [59/2,88,6], center: [true,true,false]}).translate([0,0,6]),
        ]),
        screw(3.65/2,15).translate([0,76/2,0]),
        screw(3.65/2,15).translate([0,-1*76/2,0]),
    ]);
    
}

// ----- LIBRARY ----
function polygonPlate(x){
    x = x || {
        Xcenter: 0,
        Ycenter: 0,
        size: 10, // some radius
        numSides: 8,
        height: 10
    }
    x.Xcenter = x.Xcenter || 0;
    x.Ycenter = x.Ycenter || 0;
    x.size = x.size || 10;
    x.numSides = x.numSides || 8;
    x.height = x.height || 10;

    var points = [];
    for (var i = 0; i < x.numSides;i += 1) {
        points.push([
            x.Xcenter + x.size * Math.cos(i * 2 * Math.PI / x.numSides), 
            x.Ycenter + x.size * Math.sin(i * 2 * Math.PI / x.numSides)
        ]);
    }
    return new CSG.Polygon2D(points)
            .extrude({offset: [0, 0, x.height]})
            .rotateZ(45/2);
}

function wedge(height, width, length){
    height = height || 10;
    width = width || 10;
    length = length || 10;

    return difference([
        cube([height,length,width]),
        cube([height,length,width]).scale(3).rotateY(45)
    ]).setColor(1,0,0);
}

function screw(radius,height){
    height = height || 7;
    return cylinder({h:height, r1:radius, r2:radius}).setColor([1,0,0.5]);
};