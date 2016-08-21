#include <Servo.h>

Servo myservo;

int pinA0 = 14;

void setup() {
  myservo.attach(pinA0);
}

void loop() {
    myservo.write(0);
    delay(2000);
    myservo.write(45);
    delay(2000);
}

