
#define echoPin 7 // Echo Pin
#define trigPin 8 // Trigger Pin
#define LEDPin 13 // Onboard LED

int maximumRange = 200; // Maximum range needed
int minimumRange = 0; // Minimum range needed
long duration, distance; // Duration used to calculate distance

void setup() {
 Serial.begin (9600);
 pinMode(trigPin, OUTPUT);
 pinMode(echoPin, INPUT);
 pinMode(LEDPin, OUTPUT); // Use LED indicator (if required)
}

void loop() {
/* The following trigPin/echoPin cycle is used to determine the
 distance of the nearest object by bouncing soundwaves off of it. */ 
 digitalWrite(trigPin, LOW); 
 delayMicroseconds(2); 

 digitalWrite(trigPin, HIGH);
 delayMicroseconds(10); 
 
 digitalWrite(trigPin, LOW);
 duration = pulseIn(echoPin, HIGH);
 
 //Calculate the distance (in cm) based on the speed of sound.
 distance = duration/58.2;
 
 if (distance >= maximumRange || distance <= minimumRange){
 /* Send a negative number to computer and Turn LED ON 
 to indicate "out of range" */
 Serial.print("-1");
 digitalWrite(LEDPin, HIGH); 
 }
 else {
 /* Send the distance to the computer using Serial protocol, and
 turn LED OFF to indicate successful reading. */
 int mappedSonar = map(distance, -1, 100, 5, 200);
 Serial.print(mappedSonar);
 digitalWrite(LEDPin, LOW); 
 }
  int light = analogRead(A0);
  int pot = analogRead(A1);
  int button = analogRead(A2); 

  int mappedLight = map(light, 0, 200, 0, 255);
  float mappedPot = pot/157.4;
  int mappedButton = map(button, 0, 710, 0, 1);
  

  Serial.print(',');
  Serial.print(mappedLight);
    Serial.print(',');
  Serial.print(mappedPot); 
    Serial.print(',');
  Serial.println(button); 
 
 //Delay 50ms before next reading.
 delay(50);
}
