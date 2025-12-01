#include <ESP8266WiFi.h>
#include <FirebaseESP8266.h>
#include <Servo.h>
#include "HX711.h"  // For load cell

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
#define FIREBASE_API_KEY "AIzaSyBNCtRP31RiEN9uPGOBPHdDrmN8YvnJKSY"

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
float initialWeight = 0.0;  // Weight when user logs in
float measuredWeight = 0.0; // Weight difference to be added

// =====================
// Ultrasonic Sensor Pins
// =====================
#define TRIG D6
#define ECHO D7

// =====================
// Load Cell (HX711) Pins
// =====================
#define LOADCELL_DOUT D2
#define LOADCELL_SCK  D1


// Led
#define LED1 D8   // GPIO15
#define LED2 D4   // GPIO2
#define LED3 D3   // GPIO0

HX711 scale;
float calibration_factor = -7050;  // Adjust after calibration (for 5 kg load cell)

void setup() {
  Serial.begin(115200);

  // ---------------------
  // WiFi Setup
  // ---------------------
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("Connecting to WiFi");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\n✅ WiFi Connected!");

  // ---------------------
  // Firebase Setup
  // ---------------------
  config.api_key = FIREBASE_API_KEY;
  config.database_url = "https://smart-dustbin-d4009-default-rtdb.firebaseio.com/";
  auth.user.email = FIREBASE_EMAIL;
  auth.user.password = FIREBASE_PASSWORD;
  Firebase.begin(&config, &auth);

  if (Firebase.ready())
    Serial.println("✅ Firebase Connected!");
  else
    Serial.println("❌ Firebase Connection Failed!");

  // ---------------------
  // Servo Setup
  // ---------------------
  myServo.attach(D5);
  myServo.write(0); // Initially closed

  // ---------------------
  // Ultrasonic Setup
  // ---------------------
  pinMode(TRIG, OUTPUT);
  pinMode(ECHO, INPUT);

  // ---------------------
  // HX711 Load Cell Setup
  // ---------------------
  scale.begin(LOADCELL_DOUT, LOADCELL_SCK);
  scale.set_scale(calibration_factor);
  scale.tare();  // Reset to 0
  Serial.println("✅ Load cell initialized and tared to 0.");

  pinMode(LED1, OUTPUT);
  pinMode(LED2, OUTPUT);
  pinMode(LED3, OUTPUT);

  digitalWrite(LED1, LOW);
  digitalWrite(LED2, LOW);
  digitalWrite(LED3, LOW);
}

float getDistance() {
  digitalWrite(TRIG, LOW);
  delayMicroseconds(2);

  digitalWrite(TRIG, HIGH);
  delayMicroseconds(10);
  digitalWrite(TRIG, LOW);

  long duration = pulseIn(ECHO, HIGH);
  float distance = duration * 0.0343 / 2; // Convert to cm
  return distance;
}

void loop() 
{
  // --------------------------
  // 🔹 Read Ultrasonic Sensor
  // --------------------------
  float distance = getDistance();
  Serial.print("Distance: ");
  Serial.print(distance);
  Serial.println(" cm");

  // --------------------------
  // 🔹 Update Firebase /solve
  // --------------------------

  if(distance < 10)
  {
      if (Firebase.getBool(firebaseData, "/solve"))
      {
          bool solve1 = firebaseData.boolData();
          solve1 = !solve1;
          Firebase.setBool(firebaseData, "/solve", (solve1));
          Serial.println("🟢 Object detected (<10 cm) and solve revresed");

          if(solve1)
          {
              digitalWrite(LED2, HIGH);
              digitalWrite(LED3, LOW);
          }
          else
          {
              digitalWrite(LED3, HIGH);
              digitalWrite(LED2, LOW);
          }
      }
  }
  // --------------------------
  // 🔹 Servo control from Firebase
  // --------------------------
  if(Firebase.getBool(firebaseData, "/lastDetected/check")) 
  {
        bool check = firebaseData.boolData();
        if(check != lastCheck) 
        {
            if (check) 
            {
                digitalWrite(LED1, HIGH);
                digitalWrite(LED2, LOW);
                digitalWrite(LED3, LOW);

                // LOGIN: User detected, open servo and record initial weight
                Serial.println("✅ Check = TRUE → Servo opening (180°)");
                myServo.write(180);
            
               // Record initial weight
                initialWeight = scale.get_units(10);  // Average of 10 readings for accuracy
                if (initialWeight < 0) initialWeight = 0;
                
                Serial.print("📊 Initial Weight Recorded: ");
                Serial.print(initialWeight, 2);
                Serial.println(" g");
            } 
            else 
            {
                // LOGOUT: User left, close servo and calculate waste added
                Serial.println("❌ Check = FALSE → Servo closing (0°)");
                myServo.write(0);

                digitalWrite(LED1, LOW);
                
                // Calculate measured waste
                float finalWeight = scale.get_units(10);  // Average of 10 readings
                if (finalWeight < 0) 
                    finalWeight = 0;
                
                measuredWeight = finalWeight - initialWeight;
                if (measuredWeight < 0) 
                    measuredWeight = 0;  // Avoid negative
                
                Serial.print("📊 Final Weight: ");
                Serial.print(finalWeight, 2);
                Serial.println(" g");
                
                Serial.print("📊 Measured Waste Added: ");
                Serial.print(measuredWeight, 2);
                Serial.println(" g");
                
                // Upload measured weight to Firebase
                if (measuredWeight > 0) 
                {
                    if (Firebase.setFloat(firebaseData, "/lastDetected/month/weight", measuredWeight)) 
                    {
                        Serial.println("✅ Waste weight uploaded to Firebase!");
                    } 
                    else 
                    {
                        Serial.println("❌ Failed to upload waste weight!");
                    }
                }
                
                // Reset for next user
                initialWeight = 0.0;
                measuredWeight = 0.0;
            }
            lastCheck = check;
        }
  } 
  else 
  {
    Serial.println("⚠️ Error reading /lastDetected/check from Firebase!");
  }

  // --------------------------
  // 🔹 Read Weight from Load Cell
  // --------------------------
  float weight = scale.get_units(5);  // Average of 5 readings
  if (weight < 0) weight = 0;         // Avoid negative values

  Serial.print("Weight: ");
  Serial.print(weight, 2);
  Serial.println(" g");

  // Optional: Upload weight to Firebase (uncomment to enable)
  // Firebase.setFloat(firebaseData, "/weight", weight);

  delay(500); // Poll every second
}





// #include <ESP8266WiFi.h>
// #include <FirebaseESP8266.h>
// #include <Servo.h>
// #include "HX711.h"  // For load cell

// // =====================
// // WiFi Credentials
// // =====================
// #define WIFI_SSID "OnePlus Nord CE 3 Lite 5G"
// #define WIFI_PASSWORD "yyyyyyyyyy"

// // =====================
// // Firebase Credentials
// // =====================
// #define FIREBASE_EMAIL "your-email@example.com"
// #define FIREBASE_PASSWORD "your-password"
// #define FIREBASE_API_KEY "AIzaSyBNCtRP31RiEN9uPGOBPHdDrmN8YvnJKSY"

// // =====================
// // Firebase Setup
// // =====================
// FirebaseData firebaseData;
// FirebaseConfig config;
// FirebaseAuth auth;

// // =====================
// // Servo Setup
// // =====================
// Servo myServo;
// bool lastCheck = false;
// float initialWeight = 0.0;  // Weight when user logs in
// float measuredWeight = 0.0; // Weight difference to be added

// // =====================
// // Ultrasonic Sensor Pins
// // =====================
// #define TRIG D6
// #define ECHO D7

// // =====================
// // Load Cell (HX711) Pins
// // =====================
// #define LOADCELL_DOUT D2
// #define LOADCELL_SCK  D1


// // Led
// #define LED1 D8   // GPIO15
// #define LED2 D4   // GPIO2
// #define LED3 D3   // GPIO0

// HX711 scale;
// float calibration_factor = -7050;  // Adjust after calibration (for 5 kg load cell)

// void setup() {
//   Serial.begin(115200);

//   // ---------------------
//   // WiFi Setup
//   // ---------------------
//   WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
//   Serial.print("Connecting to WiFi");
//   while (WiFi.status() != WL_CONNECTED) {
//     delay(500);
//     Serial.print(".");
//   }
//   Serial.println("\n✅ WiFi Connected!");

//   // ---------------------
//   // Firebase Setup
//   // ---------------------
//   config.api_key = FIREBASE_API_KEY;
//   config.database_url = "https://smart-dustbin-d4009-default-rtdb.firebaseio.com/";
//   auth.user.email = FIREBASE_EMAIL;
//   auth.user.password = FIREBASE_PASSWORD;
//   Firebase.begin(&config, &auth);

//   if (Firebase.ready())
//     Serial.println("✅ Firebase Connected!");
//   else
//     Serial.println("❌ Firebase Connection Failed!");

//   // ---------------------
//   // Servo Setup
//   // ---------------------
//   myServo.attach(D5);
//   myServo.write(0); // Initially closed

//   // ---------------------
//   // Ultrasonic Setup
//   // ---------------------
//   pinMode(TRIG, OUTPUT);
//   pinMode(ECHO, INPUT);

//   // ---------------------
//   // HX711 Load Cell Setup
//   // ---------------------
//   scale.begin(LOADCELL_DOUT, LOADCELL_SCK);
//   scale.set_scale(calibration_factor);
//   scale.tare();  // Reset to 0
//   Serial.println("✅ Load cell initialized and tared to 0.");

//   pinMode(LED1, OUTPUT);
//   pinMode(LED2, OUTPUT);
//   pinMode(LED3, OUTPUT);

//   digitalWrite(LED1, LOW);
//   digitalWrite(LED2, LOW);
//   digitalWrite(LED3, LOW);
// }

// float getDistance() {
//   digitalWrite(TRIG, LOW);
//   delayMicroseconds(2);

//   digitalWrite(TRIG, HIGH);
//   delayMicroseconds(10);
//   digitalWrite(TRIG, LOW);

//   long duration = pulseIn(ECHO, HIGH);
//   float distance = duration * 0.0343 / 2; // Convert to cm
//   return distance;
// }

// void loop() {
//   // --------------------------
//   // 🔹 Read Ultrasonic Sensor
//   // --------------------------
//   float distance = getDistance();
//   Serial.print("Distance: ");
//   Serial.print(distance);
//   Serial.println(" cm");

//   // --------------------------
//   // 🔹 Update Firebase /solve
//   // --------------------------
//   if (distance < 10) {
//     Firebase.setBool(firebaseData, "/solve", true);
//     Serial.println("🟢 Object detected (<10 cm) → solve = true");
//   } else {
//     Firebase.setBool(firebaseData, "/solve", false);
//     Serial.println("🔴 No object nearby → solve = false");
//   }

//   // --------------------------
//   // 🔹 Servo control from Firebase
//   // --------------------------
//   if (Firebase.getBool(firebaseData, "/lastDetected/check")) {
//     bool check = firebaseData.boolData();


//     if(Firebase.getBool(firebaseData, "/solve"))
//     {
//         bool solve = firebaseData.boolData();
//         if (check != lastCheck) {
//           if (check && solve) {
//             // LOGIN: User detected, open servo and record initial weight
//             Serial.println("✅ Check = TRUE → Servo opening (180°)");
//             myServo.write(180);
            
//             // Record initial weight
//             initialWeight = scale.get_units(10);  // Average of 10 readings for accuracy
//             if (initialWeight < 0) initialWeight = 0;
            
//             Serial.print("📊 Initial Weight Recorded: ");
//             Serial.print(initialWeight, 2);
//             Serial.println(" g");
            
//           } 
//           else {
//             // LOGOUT: User left, close servo and calculate waste added
//             Serial.println("❌ Check = FALSE → Servo closing (0°)");
//             myServo.write(0);
            
//             // Calculate measured waste
//             float finalWeight = scale.get_units(10);  // Average of 10 readings
//             if (finalWeight < 0) finalWeight = 0;
            
//             measuredWeight = finalWeight - initialWeight;
//             if (measuredWeight < 0) measuredWeight = 0;  // Avoid negative
            
//             Serial.print("📊 Final Weight: ");
//             Serial.print(finalWeight, 2);
//             Serial.println(" g");
            
//             Serial.print("📊 Measured Waste Added: ");
//             Serial.print(measuredWeight, 2);
//             Serial.println(" g");
            
//             // Upload measured weight to Firebase
//             if (measuredWeight > 0) {
//               if (Firebase.setFloat(firebaseData, "/lastDetected/month/weight", measuredWeight)) {
//                 Serial.println("✅ Waste weight uploaded to Firebase!");
//               } else {
//                 Serial.println("❌ Failed to upload waste weight!");
//               }
//             }
            
//             // Reset for next user
//             initialWeight = 0.0;
//             measuredWeight = 0.0;
//           }
//           lastCheck = check;
//         }

//         else 
//         {
//           Serial.println("⚠️ Error reading /lastDetected/check from Firebase!");
//         }
//     }
//   } 
//   else {
//     Serial.println("⚠️ Error reading /lastDetected/check from Firebase!");
//   }

//   // --------------------------
//   // 🔹 Read Weight from Load Cell
//   // --------------------------
//   float weight = scale.get_units(5);  // Average of 5 readings
//   if (weight < 0) weight = 0;         // Avoid negative values

//   Serial.print("Weight: ");
//   Serial.print(weight, 2);
//   Serial.println(" g");

//   // Optional: Upload weight to Firebase (uncomment to enable)
//   // Firebase.setFloat(firebaseData, "/weight", weight);

//   delay(1000); // Poll every second
// }
