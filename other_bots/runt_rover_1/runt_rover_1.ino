int IN1=8;
int IN2=9;
int ENA=10;

void setup()
{
 pinMode(IN1,OUTPUT);
 pinMode(IN2,OUTPUT);  
 analogWrite(ENA, 200);// motor speed  
 digitalWrite(IN1,LOW);// rotate forward
 digitalWrite(IN2,HIGH);

}

void loop()
{  

}
