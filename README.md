# Project Title
ESP8266 Firebase Fingerprint handler API
## Getting Started

This is one way to handler when Firebase fingerprint has change.

### Prerequisites
If you don't have FirebaseArduino library, you can get it here(https://github.com/FirebaseExtended/firebase-arduino.git)
And we need to modify that library a bit
1) goto FirebaseHttpClient_Esp8266.cpp in your library directory and change this line (no.22)
```C++
  public:
  FirebaseHttpClientEsp8266() {}
```
to
```C++
public:
String fingerprint;
FirebaseHttpClientEsp8266() {
http_.begin("http://firebase-get-fingerprint.herokuapp.com/getkey");
int httpCode = http_.GET();
if (httpCode == HTTP_CODE_OK)
  fingerprint = http_.getString();
http_.end();
}
```
and from line no. 46
```C++
void begin(const std::string& url) override {
  http_.begin(url.c_str(), kFirebaseFingerprint);
}

void begin(const std::string& host, const std::string& path) override {
  http_.begin(host.c_str(), kFirebasePort, path.c_str(), kFirebaseFingerprint);
}
```
to

```C++
void begin(const std::string& url) override {
    http_.begin(url.c_str(), fingerprint);
  }

  void begin(const std::string& host, const std::string& path) override {
    http_.begin(host.c_str(), kFirebasePort, path.c_str(), fingerprint);
  }
```
Please enjoy :)
