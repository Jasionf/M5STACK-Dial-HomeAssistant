<div align="center">

<img src="src/assets/images/logo.png" width="96" alt="logo" />

# M5Stack Dial · Smart Controller

**A full-featured smart home controller firmware for the M5Stack Dial**  
Built on ESPHome · Powered by LVGL · Integrated with Home Assistant

<br/>

[![ESPHome](https://img.shields.io/badge/ESPHome-≥2024.6-blue?style=flat-square&logo=esphome)](https://esphome.io/)
[![Platform](https://img.shields.io/badge/Platform-ESP32--S3-red?style=flat-square&logo=espressif)](https://www.espressif.com/)
[![Display](https://img.shields.io/badge/Display-GC9A01A%20240×240-purple?style=flat-square)](#)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](#license)

</div>

---

## Overview

M5Stack Dial Smart Controller turns the compact **M5Stack Dial** into a premium smart home interface. Seven purpose-built pages — each with fluid LVGL animations, per-page color themes, and real-time Home Assistant sync — all controlled through a rotary encoder, capacitive touch, and physical buttons.

```
┌─────────────────────────────────────────────────────────────┐
│  Clock & Weather  →  Arc Menu  →  Lights / AC / Music       │
│                                   Fridge Tracker / Timer    │
│                                                             │
│  Rotary Encoder · Touch · NFC · IMU · LED Strip · Buzzer    │
└─────────────────────────────────────────────────────────────┘
```

---

## Pages

| | Page | Highlights |
|---|------|-----------|
| 🕐 | **Clock** | PCF8563 RTC · HA time sync · Live weather (temp / humidity / AQI / pressure / wind) |
| ☰ | **Menu** | Arc-curve infinite scroll · Per-item accent colors · Animated pill transitions |
| 💡 | **Lights** | 270° gradient brightness arc · RGB color picker · Live HA brightness sync |
| ❄️ | **AC** | Circular temperature dial · Fan speed segments · Power / swing toggle |
| 🎵 | **Music** | Streamed album art (SendSpin) · Playback controls · Volume via encoder |
| 🧊 | **Fridge** | Food freshness tracker · SAFE / SOON / EXPIRED status · Swipe navigation |
| ⏱ | **Timer** | Countdown timer · HR / MIN / SEC encoder adjust · Color-coded arc progress |

---

## Hardware

```
M5Stack Dial
├── MCU          ESP32-S3 (M5Stack StampS3)
├── Display      GC9A01A  240×240 round  (SPI · MIPI)
├── Touch        FT5x06   capacitive     (I²C 0x38)
├── RTC          PCF8563                 (I²C 0x51)
├── IMU          MPU6886  6-axis         (I²C 0x68)
├── NFC          RC522                   (I²C 0x28)
├── Encoder      GPIO40 / GPIO41
├── Buttons      Front GPIO42 · Hold GPIO46
├── LED Strip    SK6812  30 LEDs         (GPIO2)
└── Buzzer       LEDC                    (GPIO3)
```

---

## Project Structure

```
M5Stack-Dial-Smart-Button/
├── dial.yaml                    ← Entry point
├── secrets.yaml                 ← Credentials (git-ignored)
├── src/
│   ├── main/
│   │   └── hardware.yaml        ← All peripheral drivers
│   ├── pages/
│   │   ├── load.yaml            ← Boot splash
│   │   ├── main.yaml            ← Clock + weather
│   │   ├── menu.yaml            ← Navigation menu
│   │   ├── light.yaml           ← Light control
│   │   ├── air.yaml             ← AC control
│   │   ├── music.yaml           ← Music player
│   │   ├── fridge.yaml          ← Freshness tracker
│   │   └── timer.yaml           ← Kitchen timer
│   └── assets/
│       ├── fonts/
│       └── images/
└── components/
    └── sendspin/                ← WebSocket media streaming
```

---

## Quick Start

### 1 · Prerequisites

- [ESPHome](https://esphome.io/guides/installing_esphome) **≥ 2024.6**
- Python **3.11+**
- A running **Home Assistant** instance

### 2 · Configure Secrets

```yaml
# secrets.yaml
wifi_ssid:          "YOUR_WIFI_SSID"
wifi_password:      "YOUR_WIFI_PASSWORD"
ap_ssid:            "Dial Fallback Hotspot"
ap_password:        "YOUR_AP_PASSWORD"
api_encryption_key: "YOUR_API_ENCRYPTION_KEY"   # esphome generate-api-key
ota_password:       "YOUR_OTA_PASSWORD"
```

> ⚠️ `secrets.yaml` is git-ignored. Never commit credentials.

### 3 · Flash

```bash
# Initial flash via USB
esphome run dial.yaml

# OTA updates
esphome upload dial.yaml
```

### 4 · Wire Up Home Assistant Entities

| File | Entity ID |
|------|-----------|
| `src/pages/main.yaml` | `weather.YOUR_LOCATION` |
| `src/pages/air.yaml` | `climate.YOUR_AC_ENTITY` |
| `src/pages/light.yaml` | `light.YOUR_LIGHT_ENTITY` |
| `src/pages/music.yaml` | `media_player.YOUR_PLAYER` |

---

## Interaction Model

```
Physical Input          Action
─────────────────────────────────────────────────────
Swipe left              Open menu
Swipe right             Close / go back
Rotate encoder          Adjust active value
Single click            Confirm / toggle on-off
Double click            Open menu (from clock page)
Hold button             Return to previous page
```

---

## SendSpin Component

`components/sendspin/` is a custom ESPHome external component that opens a **WebSocket connection** to a companion service, streaming album art and media state directly to the device in real time — no polling, no lag.

---

## License

MIT © 2026
