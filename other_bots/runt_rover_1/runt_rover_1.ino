int ENA=6;
int ENB=9;
int IN1=10;
int IN2=11;
int IN3=12;
int IN4=13;


int ASPEED = 100;
int BSPEED = 98;

void setup()
{
 pinMode(IN1,OUTPUT);
 pinMode(IN2,OUTPUT);  
 pinMode(IN3,OUTPUT);
 pinMode(IN4,OUTPUT);  

 analogWrite(ENA, ASPEED);// motor speed  
 digitalWrite(IN1,LOW);// rotate forward
 digitalWrite(IN2,HIGH);

 analogWrite(ENB, BSPEED);// motor speed  
 digitalWrite(IN3,LOW);// rotate forward
 digitalWrite(IN4,HIGH);

}

void loop()
{  

}
