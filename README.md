# AIDE: Assistive & Intelligent Dementia Empowerment System

[![React](https://img.shields.io/badge/React-18.2.0-%2361DAFB?logo=react)](https://reactjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3.0-%2338B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-green?logo=node.js)](https://nodejs.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A comprehensive IoT assistive system designed to enhance the independence and safety of individuals living with dementia while providing critical support and peace of mind to their caregivers.

![AIDE Dashboard Screenshot](https://via.placeholder.com/800x400/3B82F6/FFFFFF?text=AIDE+Caregiver+Dashboard+Preview) 
*<!-- Replace with an actual screenshot of your dashboard -->*

## 🚀 Overview

Dementia patients face daily challenges with activities like medication management, personal hygiene, and navigation. Traditional monitoring solutions are often reactive, intrusive, or stigmatizing. **AIDE** is a proactive, non-stigmatizing smartwatch and dashboard system that provides:
- **Step-by-step guidance** for daily activities
- **Real-time health & safety monitoring**
- **Instant alerts** for caregivers during emergencies
- **Data-driven insights** into patient well-being

This repository contains the frontend caregiver dashboard built with React and Tailwind CSS.

## ✨ Key Features

### For the Patient (Wearable Device)
- **🔄 Activity Guidance:** Breaks down complex tasks (e.g., handwashing) into simple, audio-visual prompts.
- **⚠️ Fall Detection:** IMU-based algorithm detects falls and triggers immediate alerts.
- **❤️ Health Monitoring:** Continuous tracking of heart rate, blood oxygen (SpO₂), and skin temperature.
- **📍 Location Tracking:** GPS and indoor tracking with geofencing for wandering prevention.
- **🔊 Noise Detection:** MEMS microphone detects signs of distress or agitation.

### For the Caregiver (Web Dashboard)
- **📊 Real-time Dashboard:** Live view of patient vitals, location, and activity status.
- **🚨 Intelligent Alerts:** Instant push notifications for falls, missed medication, or wandering.
- **📈 Trend Analysis:** Historical data visualization to identify patterns in sleep and behavior.
- **🌐 Remote Management:** Ability to trigger guidance sequences and adjust care plans remotely.

## 🛠️ Technical Architecture

### System Workflow
```mermaid
graph LR
A[Wearable Sensors] --> B[ESP32 Processing];
B --> C[MQTT/HTTP Data Transmission];
C --> D[Node.js Backend];
D --> E[Real-time Alert Processing];
D --> F[(MongoDB)];
E --> G[WebSocket Push];
G --> H[React Dashboard];
F --> H;
