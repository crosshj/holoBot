const INNER_RADIUS = 31.55/2;
const INNER_HEIGHT = 55.62;
const LIP_HEIGHT = 4.47;
const LIP_RADIUS = 29.74;

const INSERT_HEIGHT = INNER_HEIGHT - (LIP_HEIGHT*2);

const BATTERY_RADIUS = 12.88/2;
const BATTERY_HEIGHT = 50.40;

const CHIP_WIDTH = 25.9;
const CHIP_HEIGHT = 7.27;

function lower() {
    const OFFSET = 6.0;
    const SPREAD = 7;
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
   }).translate([0,2.1,0]).scale(1);
}



function main(){
    return difference(
        lower(),
        chip()
    ).setColor([0.5,0.5,0.5]);
}


