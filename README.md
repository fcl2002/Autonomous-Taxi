# Vazy

## Overview

**Vazy** is a small-scale autonomous taxi project designed to simulate the complete flow of a ride request, from the mobile application to the autonomous vehicle.

The system allows a passenger to request a ride, define a pickup point and destination, and follow the ride status through a mobile app. Ride information is managed in the cloud, while MQTT is used for communication with the vehicle.

The vehicle is built around a **Raspberry Pi** and an **STM32**. The Raspberry Pi handles high-level tasks such as mission management, navigation, and ride selection, while the STM32 is responsible for low-level control, including motors, sensors, and real-time vehicle commands.

The project follows a modular architecture composed of:

- **React Native + Expo** for the mobile application
- **Firebase** for ride data and application state
- **MQTT** for event-based communication with the vehicle
- **Raspberry Pi** for high-level autonomous logic
- **STM32** for low-level vehicle control

The first version focuses on autonomous navigation along a predefined route and simulates passenger pickup and drop-off rather than physically transporting a passenger.

> **Status:** This project is currently under development. Suggestions, ideas, and contributions are very welcome. If you have any ideas for improving or expanding the project, feel free to contact me:
>
> - Email: `fcostalasmar@gmail.com`
> - LinkedIn: `https://www.linkedin.com/in/fernando-lasmar`

## Documentation

The autonomous taxi agent will be fully documented in Markdown files and accessible via the **[documentation.md](docs/documentation.md)** folder in this repository.
