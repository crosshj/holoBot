const INNER_RADIUS = 31.55/2;
const INNER_HEIGHT = 55.62;
const LIP_HEIGHT = 4.47;
const LIP_RADIUS = 29.74;

const INSERT_HEIGHT = INNER_HEIGHT - (LIP_HEIGHT*2);

const BATTERY_RADIUS = 14.03/2;
const BATTERY_HEIGHT = 50.40;

const CHIP_WIDTH = 25.9;
const CHIP_HEIGHT = 5.27;

function lower() {
    const OFFSET = 3.9;
    const SPREAD = 7.25;
   const HEIGHT = INSERT_HEIGHT;
   return difference(
         cylinder({r: INNER_RADIUS, h: HEIGHT, fn: 80}),
         union(
             cylinder(
                {r: BATTERY_RADIUS, h: HEIGHT, fn: 80}
             ).translate([SPREAD,-1*OFFSET,0]),
             cylinder(
                {r: BATTERY_RADIUS, h: HEIGHT, fn: 80}
             ).translate([-1*SPREAD,-1*OFFSET,0])
         )
   ).translate([0,0,0]).scale(1);
}

function wide() {
    const SPREAD = 9;
    const HEIGHT = INSERT_HEIGHT;
   return difference(
         cylinder({r: INNER_RADIUS, h: HEIGHT, fn: 80}),
         union(
             cylinder(
                {r: BATTERY_RADIUS, h: HEIGHT, fn: 80}
             ).translate([SPREAD,0,0]),
             cylinder(
                {r: BATTERY_RADIUS, h: HEIGHT, fn: 80}
             ).translate([-1*SPREAD,0,0])
         )
   ).translate([0,0,0]).scale(1);
}

function chip() {
   const HEIGHT = INSERT_HEIGHT;
   return cube({
       size: [CHIP_WIDTH,CHIP_HEIGHT+20,HEIGHT],
       center: [true, false, false]
   }).translate([0,3.8,0]).scale(1);
}

function otherCuts(){
    return union(
        cube({
            size: [2,30,30],
            center: [true, false, false]
        }).translate([0,-20,45]),
        cube({
            size: [2,30,2.5],
            center: [true, false, false]
        }).translate([0,-20,0])
    );
}

function cutouts(){
    const HEIGHT = INSERT_HEIGHT;
    return union(
        cube({
            size: [2,3.75,HEIGHT],
            center: [true, false, false]
        }).translate([0,0.75,0]),
        cube({
            size: [2,6,HEIGHT],
            center: [true, false, false]
        }).translate([0,-16,0]),
        cube({
            size: [2,2,HEIGHT],
            center: [true, false, false]
        }).translate([-5,1.1,0]),
        cube({
            size: [2,2.75,HEIGHT],
            center: [true, false, false]
        }).translate([-5,-16,0]),
        cube({
            size: [2,2,HEIGHT],
            center: [true, false, false]
        }).translate([5,1.1,0]),
        cube({
            size: [2,2.75,HEIGHT],
            center: [true, false, false]
        }).translate([5,-16,0]),
        otherCuts(),
        otherCuts().translate([5,0,0]),
        otherCuts().translate([-5,0,0]),
        otherCuts().translate([-11.9,0,0]),
        otherCuts().translate([11.9,0,0])
    );
}

function main(){
    return difference(
        lower(),
        chip(),
        cutouts()
    ).setColor([0.5,1,0.5]);
}


