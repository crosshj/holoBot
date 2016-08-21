#include <Servo.h>

Servo myservo;

int pinA0 = 14;

void setup() {
  myservo.attach(pinA0);
}

int offset = -9;
void loop() {
    myservo.write(42+offset);
    delay(2000);
    myservo.write(90+offset);
    delay(2000);
}

