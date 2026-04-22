#include <ESP8266WiFi.h>
#include <FirebaseESP8266.h>
#include <Servo.h>
#include "HX711.h"  // Load cell library

// =====================
// WiFi Credentials
// =====================
#define WIFI_SSID "OnePlus Nord CE 3 Lite 5G"
#define WIFI_PASSWORD "yyyyyyyyyy"

// =====================
// Firebase Credentials
// =====================
#define FIREBASE_EMAIL "your-email@example.com"
#define FIREBASE_PASSWORD "your-password"
#define FIREBASE_API_KEY "your-api-key"

// =====================
// Firebase Setup
// =====================
FirebaseData firebaseData;
FirebaseConfig config;
FirebaseAuth auth;

// =====================
// Servo Setup
// =====================
Servo myServo;
bool lastCheck = false;
float initialWeight = 0.0;
float measuredWeight = 0.0;

// =====================
// Ultrasonic Pins
// =====================
#define TRIG D6
#define ECHO D7

// =====================
// Load Cell Pins (Replaced)
// =====================
#define LOADCELL_DOUT_PIN D2
#define LOADCELL_SCK_PIN  D1

HX711 scale;

// LEDs
#define Green D8
#define Orange D4
#define Red D3


void setup() {
  Serial.begin(115200);

  // ---------------- WiFi ----------------
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("Connecting to WiFi");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\nWiFi Connected!");

  // ---------------- Firebase ----------------
  config.api_key = FIREBASE_API_KEY;
  config.database_url = "https://smart-dustbin-d4009-default-rtdb.firebaseio.com/";
  auth.user.email = FIREBASE_EMAIL;
  auth.user.password = FIREBASE_PASSWORD;
  Firebase.begin(&config, &auth);

  if (Firebase.ready()) Serial.println("Firebase Connected!");

  // ---------------- Servo ----------------
  myServo.attach(D5);
  myServo.write(0);

  // ---------------- Ultrasonic ----------------
  pinMode(TRIG, OUTPUT);
  pinMode(ECHO, INPUT);

  pinMode(Green, OUTPUT);
  pinMode(Orange, OUTPUT);
  pinMode(Red, OUTPUT);

  // ============================
  //   HX711 — REPLACED SECTION
  // ============================
  Serial.println("HX711 Demo");
  Serial.println("Initializing the scale");

  scale.begin(LOADCELL_DOUT_PIN, LOADCELL_SCK_PIN);

  Serial.println("Before setting up the scale:");
  Serial.print("read:\t\t");
  Serial.println(scale.read());

  Serial.print("read average:\t\t");
  Serial.println(scale.read_average(20));

  Serial.print("get value:\t\t");
  Serial.println(scale.get_value(5));

  Serial.print("get units:\t\t");
  Serial.println(scale.get_units(5), 1);

  scale.set_scale(-236);   // Your testing value
  scale.tare();

  Serial.println("After setting up the scale:");
  Serial.print("read:\t\t");
  Serial.println(scale.read());

  Serial.print("read average:\t\t");
  Serial.println(scale.read_average(20));

  Serial.print("get value:\t\t");
  Serial.println(scale.get_value(5));

  Serial.print("get units:\t\t");
  Serial.println(scale.get_units(5), 1);

  Serial.println("Readings:");
}

// =====================
// Ultrasonic Function
// =====================
float getDistance() {
  digitalWrite(TRIG, LOW);
  delayMicroseconds(2);

  digitalWrite(TRIG, HIGH);
  delayMicroseconds(10);
  digitalWrite(TRIG, LOW);

  long duration = pulseIn(ECHO, HIGH);
  return duration * 0.0343 / 2;
}


// =====================
//          LOOP
// =====================
void loop() {

  // ---------------- HX711 (REPLACED) ----------------
  Serial.print("one reading:\t");
  Serial.print(scale.get_units(), 1);
  Serial.print("\t| average:\t");
  Serial.println(scale.get_units(10), 5);

  scale.power_down();
  delay(100);   // Reduced to avoid affecting other sensors
  scale.power_up();


  // --------------- Ultrasonic ---------------
  float distance = getDistance();
  Serial.print("Distance: ");
  Serial.print(distance);
  Serial.println(" cm");

  if (distance < 10) {
    if (Firebase.getBool(firebaseData, "/solve")) {
      bool solve1 = firebaseData.boolData();
      solve1 = !solve1;
      Firebase.setBool(firebaseData, "/solve", solve1);
      Serial.println("solve reversed");

      if (solve1) {
        digitalWrite(Orange, HIGH);
        digitalWrite(Red, LOW);
        digitalWrite(Green, LOW);
      } else {
        digitalWrite(Red, HIGH);
        digitalWrite(Orange, LOW);
        digitalWrite(Green, LOW);
      }
    }
  }

  // --------------- Firebase Servo Logic ---------------
  if (Firebase.getBool(firebaseData, "/lastDetected/check")) {

    bool check = firebaseData.boolData();

    if (check != lastCheck) {
      if (check) {
        digitalWrite(Green, HIGH);
        digitalWrite(Orange, LOW);
        digitalWrite(Red, LOW);

        Serial.println("Check = TRUE → opening servo");
        myServo.write(0);
        delay(2000);

        initialWeight = scale.get_units(10);

        Serial.print("Initial Weight: ");
        Serial.println(initialWeight);
        Firebase.setFloat(firebaseData, "/First", initialWeight);
      }
      else {
        Serial.println("Check = FALSE → closing servo");
        myServo.write(180);
        delay(2000);
        digitalWrite(Green, LOW);

        float finalWeight = scale.get_units(10);
        Firebase.setFloat(firebaseData, "/Second", finalWeight);

        measuredWeight = abs(abs(finalWeight) - abs(initialWeight));

        Serial.print("Final Weight: ");
        Serial.println(finalWeight);

        Serial.print("Measured: ");
        Serial.println(measuredWeight);

        float w = 0;
        if(Firebase.getFloat(firebaseData, "/lastDetected/month/waste"));
        {
            w = firebaseData.floatData();
        }
        float threshold = 0;
        if(Firebase.getFloat(firebaseData, "/Threshold/value"));
        {
            threshold = firebaseData.floatData();
        }

        Firebase.setFloat(firebaseData, "/lastDetected/month/waste", measuredWeight + w);
        // Firebase.setFloat(firebaseData, "/MeasuredWeight", measuredWeight);
        // Firebase.setFloat(firebaseData, "/InitialWeight", w);

        float pendingFines = 0;
        if(Firebase.getFloat(firebaseData, "/lastDetected/month/finesPending"))
        {
            pendingFines = firebaseData.floatData();
        }
        
        // Firebase.setFloat(firebaseData, "/InitialPending", pendingFines);
        float finalPending = (measuredWeight - threshold) * 10;
        if(measuredWeight > threshold) {
          Firebase.setFloat(firebaseData, "/lastDetected/month/finesPending", finalPending + pendingFines);
          // Firebase.setFloat(firebaseData, "/FinalPending", finalPending);
        }
        else
            // Firebase.setFloat(firebaseData, "/FinalPending", 0);

        initialWeight = 0;
        measuredWeight = 0;
      }
      lastCheck = check;
    }
  }
  delay(300);
}
