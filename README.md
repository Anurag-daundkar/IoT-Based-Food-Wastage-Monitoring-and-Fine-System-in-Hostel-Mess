# 📦 IoT-Based Food Wastage Monitoring and Fine System in Hostel Mess

An IoT-based system to **monitor and reduce food wastage** in hostel mess environments by tracking leftover food, calculating fines for excess waste, and storing data in the cloud for real-time analysis. The goal is to promote responsible consumption and reduce unnecessary food waste among students.

---

## 💡 Features

- 🚮 **Automatic Dustbin Lid Control** using a Servo Motor  
- ⚖️ **Load Cell Sensor (HX711)** for Precise Food Waste Measurement  
- 💰 **Fine Calculation** for Wastage Above 20 Grams (`₹10` per extra gram)  
- ☁️ **Real-Time Data Storage** and Monitoring via Firebase  
- 📱 **Mobile App Interface** using MIT App Inventor for User Interaction  
- 📊 **Student-wise Waste Tracking** and Analytics  

---

## 🧰 Technologies Used

| Component                | Purpose                                                        |
|--------------------------|----------------------------------------------------------------|
| **NodeMCU (ESP8266)**    | Wi-Fi-enabled microcontroller for hardware control and Firebase sync |
| **HX711 + 5kg Load Cell**| Measures the amount of leftover food                          |
| **Servo Motor**          | Controls automatic opening and closing of the dustbin lid     |
| **Firebase Realtime DB** | Stores user data, waste data, and fine information in real-time |
| **MIT App Inventor**     | Builds a user-friendly Android mobile app                     |
| **Arduino IDE**          | Used for coding and uploading firmware to NodeMCU             |

---

## 📲 How It Works

1. 🧑‍🎓 **Student logs in** via the mobile app.
2. 🤖 **Dustbin lid opens automatically** using the servo motor.
3. 🍽️ Student **disposes of leftover food** into the smart dustbin.
4. ⚖️ Load cell **measures the weight** of the waste.
5. 🛑 If weight > 20g:
   - Fine = `(weight - 20) * ₹10`
6. ☁️ Data (waste + fine) is **uploaded to Firebase**.
7. 📱 Data is **displayed on the mobile app** for user awareness.
8. 🔒 Lid **closes automatically** after disposal.

---

## 🖼️ System Architecture

