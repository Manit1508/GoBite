# GoBite 🍔

### Smart Pre-Ordering System for Campus Food Outlets

GoBite is a campus food pre-ordering platform designed to reduce the time students spend waiting in queues at food outlets.

The system allows students to **browse food outlets, view digital menus, place orders in advance, make online payments through Razorpay, and collect their food once it is ready**. At the same time, restaurants receive and manage incoming orders through a dedicated dashboard, while administrators can manage and monitor the overall platform.

> **Order Early. Skip the Queue. Pick Up & Go.**

---

## 📌 Table of Contents

- [Overview](#-overview)
- [Problem Statement](#-problem-statement)
- [Our Solution](#-our-solution)
- [How GoBite Works](#-how-gobite-works)
- [System Architecture](#-system-architecture)
- [Technology Stack](#-technology-stack)
- [Key Features](#-key-features)
- [User Roles](#-user-roles)
- [Order Workflow](#-order-workflow)
- [Project Development Plan](#-project-development-plan)
- [Expected Outcomes](#-expected-outcomes)
- [Future Scope](#-future-scope)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Team](#-team)

---

## 🚀 Overview

GoBite is a **campus-focused food ordering and pre-ordering system** that connects students, food outlets, and administrators through a single platform.

The primary idea is simple:

**Students shouldn't have to spend most of their short breaks standing in food queues.**

Instead, a student can place an order before reaching the outlet. The restaurant receives the order through its dashboard, prepares the food, updates its status, and the student picks it up when ready.

The core flow is:

```text
Choose Outlet
      ↓
Browse Menu
      ↓
Place Order
      ↓
Razorpay Payment
      ↓
Restaurant Prepares Order
      ↓
Order Ready
      ↓
Student Picks Up
```

---

# ❗ Problem Statement

Food outlets on college campuses can become extremely crowded during lunch breaks and short breaks between classes.

Students commonly experience:

- Long queues at popular food outlets
- Valuable break time being spent waiting
- Crowding around food counters
- Rushing to reach the next class
- Skipping meals when there isn't enough time

The existing experience can be represented as:

```text
Class
  ↓
Break
  ↓
Queue
  ↓
Wait
  ↓
Eat
  ↓
Rush Back
```

The central problem GoBite addresses is:

> **Students spend too much of their limited break time waiting for food.**

---

# 💡 Our Solution

GoBite changes the traditional food-ordering process from:

```text
Reach Outlet
      ↓
Stand in Queue
      ↓
Place Order
      ↓
Wait
      ↓
Collect Food
```

to:

```text
Browse Menu
      ↓
Order in Advance
      ↓
Pay Online
      ↓
Restaurant Prepares Food
      ↓
Arrive at Outlet
      ↓
Pick Up
```

This allows food preparation to happen while the student is on the way to the outlet or attending other activities.

The objective is to make the **campus food experience faster and more convenient**.

---

# 🔄 How GoBite Works

The system consists of three primary interfaces:

### 1. Student Mobile App

Students use the mobile application to:

- Select a food outlet
- Browse its digital menu
- Add items to their cart
- Place an order
- Make payment
- Track order status
- Pick up the completed order
- View order history

### 2. Restaurant Dashboard

Food outlets use their dashboard to:

- View incoming orders
- Accept orders
- View order details
- Update order status
- Manage the preparation workflow
- Access previous orders

### 3. Admin Dashboard

Administrators manage the overall platform through a separate dashboard.

The administrator can:

- Manage outlets
- Manage users
- Monitor orders
- Manage the platform
- View overall activity

These three interfaces communicate with the central backend, which handles the application's business logic and data.

---

# 🏗️ System Architecture

The high-level architecture of GoBite consists of three frontend applications/interfaces connected to a common backend.

```text
                 ┌─────────────────────────┐
                 │      Student App        │
                 │      React Native       │
                 └────────────┬────────────┘
                              │
                              │
                 ┌────────────▼────────────┐
                 │                         │
                 │   Node.js + Express.js  │
                 │        Backend          │
                 │                         │
                 └────────────┬────────────┘
                              │
                ┌─────────────┴─────────────┐
                │                           │
        ┌───────▼────────┐        ┌────────▼───────┐
        │   Restaurant   │        │     Admin      │
        │    Dashboard   │        │    Dashboard   │
        │ Vite + React   │        │ Vite + React   │
        └────────────────┘        └────────────────┘
                              │
                       ┌──────▼──────┐
                       │ MongoDB     │
                       │   Atlas     │
                       └─────────────┘
```

---

# 🛠️ Technology Stack

## Frontend

| Technology | Purpose |
|---|---|
| React Native | Student mobile application |
| React | Dashboard interfaces |
| Vite | Development/build tooling for dashboards |

## Backend

| Technology | Purpose |
|---|---|
| Node.js | Backend runtime |
| Express.js | REST API and server framework |

## Database

| Technology | Purpose |
|---|---|
| MongoDB Atlas | Application data storage |

## Payments

| Technology | Purpose |
|---|---|
| Razorpay | Online payment processing |

## Communication

| Technology | Purpose |
|---|---|
| REST APIs | Communication between applications and backend |

## Development

| Technology | Purpose |
|---|---|
| Git | Version control |
| GitHub | Source code collaboration and repository management |

---

# ✨ Key Features

## 👨‍🎓 Student Features

### Outlet Selection

Students can choose the food outlet they want to order from.

### Digital Menus

Each outlet can provide its menu digitally, allowing students to browse available food items before ordering.

### Cart

Students can select multiple food items and review their order before placing it.

### Pre-Ordering

Students can place their order before reaching the food outlet.

### Online Payment

Orders can be paid for through **Razorpay**.

### Order Status

Students can follow the progress of their order through its status.

### Order History

Previous orders can be accessed through the student application.

### Quick Pickup

Once the order is prepared, the student can go directly to the outlet and collect it.

---

## 🏪 Restaurant Features

The restaurant dashboard provides the outlet with tools to manage incoming orders.

Features include:

- Incoming order management
- Order acceptance
- Order details
- Order status updates
- Order history

This allows restaurants to process orders digitally instead of relying entirely on manual order handling.

---

## 👨‍💼 Administrator Features

The administrator interface provides platform-level management functionality.

Features include:

- Outlet management
- User management
- Order monitoring
- Platform management
- Activity overview

The administrator therefore acts as the management layer across the student and restaurant sides of the platform.

---

# 🔁 Order Workflow

A typical GoBite order follows this process:

### Step 1 — Select Outlet

The student opens GoBite and selects the food outlet.

### Step 2 — Browse Menu

The student views the available food items and chooses what they want.

### Step 3 — Place Order

The selected items are added to the cart and the order is submitted.

### Step 4 — Make Payment

The student completes payment through Razorpay.

### Step 5 — Restaurant Receives Order

The order reaches the restaurant dashboard through the backend.

### Step 6 — Restaurant Processes Order

The restaurant accepts the order and begins preparing the food.

### Step 7 — Order Status Update

The restaurant updates the order once preparation is complete.

### Step 8 — Pickup

The student reaches the outlet and collects the prepared order.

---

# 👥 User Roles

GoBite is designed around three main user groups.

| Role | Main Responsibilities |
|---|---|
| **Student** | Browse, order, pay and collect food |
| **Restaurant** | Receive, accept and prepare orders |
| **Administrator** | Manage and monitor the platform |

This separation allows each user type to interact with the functionality relevant to their role.

---

# 📋 Project Development Plan

Development is divided into five major phases.

## Phase 1 — Planning

Focus:

- Requirements
- User flow
- Database design

## Phase 2 — UI & Application Development

Focus:

- Student mobile application
- Restaurant dashboard
- Admin dashboard

## Phase 3 — Backend Development

Focus:

- Express.js APIs
- MongoDB integration
- Authentication

## Phase 4 — Integration

Focus:

- Connecting applications with backend
- Razorpay integration
- Payment workflow

## Phase 5 — Testing & Deployment

Focus:

- End-to-end testing
- Bug fixing
- Deployment
- Project evaluation

---

# 🎯 Expected Outcomes

GoBite is intended to improve the campus food ordering experience by providing:

- **Reduced waiting time**
- **Reduced crowding at food outlets**
- **Faster food collection**
- **Better restaurant order management**
- **A more convenient student experience**

The intended experience can be summarized as:

```text
Order
  ↓
Pay
  ↓
Wait for Preparation
  ↓
Pick Up
```

Rather than spending the majority of the break waiting in a physical queue, students can use that time more efficiently.

---

# 🔮 Future Scope

Potential future improvements identified for GoBite include:

### 🏫 Multiple Campus Support

Expand the platform beyond a single campus and support multiple campuses.

### 🚚 In-Campus Food Delivery

Introduce delivery within the campus in addition to pickup.

### 🔔 Push Notifications

Notify students about important changes to their orders.

### ⭐ Loyalty & Reward System

Introduce rewards and incentives for regular users.

### 🎯 Personalized Recommendations

Recommend food based on user preferences and ordering history.

### 📊 Restaurant Analytics

Provide restaurants with deeper insights into their orders and activity.

### ⏱️ Queue Prediction

Use historical and real-time information to estimate queue conditions.

### 🍳 Preparation-Time Estimation

Estimate how long an order may take to become ready.

---

# 📁 Project Structure

A possible repository organization for the system is:

```text
GoBite/
│
├── student-app/
│   ├── src/
│   ├── assets/
│   ├── components/
│   ├── screens/
│   └── ...
│
├── restaurant-dashboard/
│   ├── src/
│   ├── components/
│   ├── pages/
│   └── ...
│
├── admin-dashboard/
│   ├── src/
│   ├── components/
│   ├── pages/
│   └── ...
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── services/
│   └── server.js
│
├── README.md
└── ...
```

> **Note:** This is a suggested repository organization. The project presentation defines the system components and technologies but does not specify an exact folder structure.

---

# ⚙️ Getting Started

The exact setup commands and environment variables should be added once the implementation is finalized.

## Prerequisites

- Node.js
- npm
- MongoDB Atlas account/database
- Razorpay account/API credentials
- Git
- GitHub

## Application Components

The project consists of:

```text
Student Mobile App
        +
Restaurant Dashboard
        +
Admin Dashboard
        +
Node.js / Express Backend
        +
MongoDB Atlas
        +
Razorpay
```

Environment-specific configuration such as database URLs, Razorpay credentials, API URLs, and authentication settings should be stored using environment variables rather than committed directly to the repository.

---

# 🧩 Core Concept

The central design philosophy behind GoBite is:

```text
Traditional Campus Food

Student → Outlet → Queue → Wait → Food


GoBite

Student → App → Order → Payment
                    ↓
                Restaurant
                    ↓
              Food Prepared
                    ↓
               Quick Pickup
```

The system moves the ordering process **before the physical visit to the outlet**, allowing food preparation and student travel to happen more efficiently.

---

# 📈 Project Vision

GoBite aims to create a more efficient campus food ecosystem by connecting:

```text
                 ┌─────────────┐
                 │   Students  │
                 └──────┬──────┘
                        │
                        │ Orders
                        ▼
                 ┌─────────────┐
                 │   GoBite    │
                 │   Platform  │
                 └──────┬──────┘
                        │
                        │ Order Management
                        ▼
                 ┌─────────────┐
                 │  Outlets    │
                 └─────────────┘
                        ▲
                        │
                 ┌──────┴──────┐
                 │    Admin    │
                 └─────────────┘
```

The ultimate goal is to make campus food ordering **faster, simpler, and more convenient** while giving food outlets a structured system for managing orders.

---

# 👨‍💻 Team

| Name | Student ID |
|---|---|
| **Kapish Tickoo** | 24BBS0163 |
| **Manit Gauba** | 24BBS0148 |
| **Deepujjwal Singh** | 24BBS0213 |

---

## 📌 Project Summary

**GoBite** is a smart campus food pre-ordering system built around one simple idea:

> **Why wait in a queue when your food can be ready before you arrive?**

It combines a **React Native student application**, **restaurant dashboard**, **admin dashboard**, **Node.js/Express backend**, **MongoDB Atlas**, and **Razorpay payments** into one platform.

The intended result is a campus ordering experience where students can **order early, skip the queue, and pick up their food when it's ready**.

---

> **Order Early. Skip the Queue. Pick Up & Go.**
