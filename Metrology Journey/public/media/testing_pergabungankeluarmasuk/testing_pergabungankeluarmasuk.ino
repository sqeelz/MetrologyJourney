#include <Wire.h> 
#include <LiquidCrystal_I2C.h>
LiquidCrystal_I2C lcd(0x27,16,2);
#include <Servo.h>

Servo myservo;
// inialisasi masing2 pin
const int pinSensor = 13;
const int pinSensor2 = 12;
const int pinReset = 11;
const int pinBuzzer = 10;

// inialisasi masing2 variabel
int hitung = 0;
int kondisi1 = 0;
int kondisi2 = 0;
int status1;
int status2;

void setup()
{
  // inialisasi status pin reset
 pinMode(pinReset, INPUT);
 // mengaktifkan pull up resistor pin reset sebagai INPUT
 digitalWrite(pinReset, HIGH);
  // buzzer
  pinMode(pinBuzzer, OUTPUT);
  //servo
  myservo.attach(9);
// inialisasi jumlah baris-kolom lcd
 lcd.begin(16,2);
 lcd.backlight();
 lcd.init();
 lcd.clear();
 lcd.setCursor(0,0);
 lcd.print("Alat hitung");
 lcd.setCursor(0, 1);
 lcd.print("Jumlah Barang");
 delay(3000);
 
 lcd.clear();
 lcd.setCursor(0, 0);
 lcd.print("Ready....");
 delay(4000);
 lcd.setCursor(0, 1);
 lcd.print("Go..!!!");
 delay(400);
}
void loop()
{
  // setting range pembacaan jumlah barang
 hitung = constrain(hitung, 0, 200); // ==> Jumlah maks barang
// status1 adalah hasil pembacaan pin sensor
 status1 = digitalRead(pinSensor);
// jika pin sensor bernilai logic HIGH
 if (status1 == HIGH )
 {
 // hasil hitung tetap
 digitalWrite(pinBuzzer, LOW);
 delay(300);
 hitung = hitung;
 kondisi1 = 0;
 }
 // jika pin sensor bernilai LOW dan kondisi1 bernilai = 0
 else if (status1 == LOW && kondisi1 == 0)
 {
  digitalWrite(pinBuzzer, HIGH);
  delay(200);
 // jumlah barang bertambah 1
 hitung += 1;
 // kondisi1 menjadi bernilai = 1
 kondisi1 = 1;
 }
 // jika pin sensor bernilai LOW dan kondisi bernilai = 1
 else if (status1 == LOW && kondisi1 == 1)
 {
 // hasil hitung tetap
 hitung = hitung;
 kondisi2 = 1;
 }

// KELUAR
hitung = constrain(hitung, 0, 200);
status2 = digitalRead(pinSensor2);

// jika pin sensor bernilai logic HIGH
 if (status2 == HIGH )
 {
 // hasil hitung tetap
 digitalWrite(pinBuzzer, LOW);
 delay(100);
 myservo.write(50);
 hitung = hitung;
 kondisi2 = 0;
 }
 // jika pin sensor bernilai LOW dan kondisi1 bernilai = 0
 else if (status2 == LOW && kondisi2 == 0)
 {
  digitalWrite(pinBuzzer, HIGH);
  delay(50);
  myservo.write(150);
  delay(1000);
 // jumlah barang bertambah 1
 hitung -= 1;
 // kondisi1 menjadi bernilai = 1
 kondisi1 = 1;
 }
 // jika pin sensor bernilai LOW dan kondisi bernilai = 1
 else if (status1 == LOW && kondisi1 == 1)
 {
 // hasil hitung tetap
 hitung = hitung;
 kondisi1 = 1;
 }



// KELUAR

 if (digitalRead(pinReset) == LOW)
 {
 // jumlah barang kembali menjadi = 0
 hitung = 0;
 }
 else
 {
 // jumlah barang tetap
 hitung = hitung;
 }
 lcd.init();
 lcd.backlight();
 lcd.setCursor(0, 0);
 lcd.print("Jumlah Barang : ");
 lcd.setCursor(0, 1);
 lcd.print(hitung);
 delay(100); // delay update tulisan pada lcd
}
