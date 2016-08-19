int ENA=9;
int ENB=10;

int IN1=13;
int IN2=12;

int IN3=8;
int IN4=11;

int SPEED_OFF = 0;
int SPEED_MIN = 50;
int SPEED_MAX = 255;
int BURST_MIN = 50;

int A_START_DELAY = BURST_MIN/14;
int A_STOP_DELAY = BURST_MIN/5;

int ASPEED = SPEED_MAX;
int BSPEED = SPEED_MAX;

void setup()
{
 pinMode(IN1,OUTPUT);
 pinMode(IN2,OUTPUT);  
 pinMode(IN3,OUTPUT);
 pinMode(IN4,OUTPUT);  
}

void loop()
{  
 // START
 delay(BURST_MIN*3);
 analogWrite(ENB, BSPEED);// motor speed
 digitalWrite(IN3,LOW);// rotate forward
 digitalWrite(IN4,HIGH);

 delay(A_START_DELAY);
 analogWrite(ENA, ASPEED);// motor speed  
 digitalWrite(IN1,LOW);// rotate forward
 digitalWrite(IN2,HIGH);
  
 // STOP
 delay(BURST_MIN);
 digitalWrite(IN1,LOW);
 digitalWrite(IN2,LOW);
 analogWrite(ENA, SPEED_OFF);
  
 delay(A_STOP_DELAY);
 digitalWrite(IN3,LOW);
 digitalWrite(IN4,LOW);
 analogWrite(ENB, SPEED_OFF);

}
