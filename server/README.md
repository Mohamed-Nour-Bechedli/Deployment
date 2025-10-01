# MERN Application Deployment on Azure

This repository contains a **MERN (MongoDB, Express, React, Node.js) application** prepared for deployment on **Microsoft Azure** using **MongoDB Atlas** as the database service.

---

## Table of Contents
- [Project Overview](#project-overview)
- [Prerequisites](#prerequisites)
- [Setup Instructions](#setup-instructions)
- [Deployment Steps](#deployment-steps)
- [Environment Variables](#environment-variables)
- [Testing](#testing)
- [Author](#author)

---

## Project Overview
This project is a full-stack MERN application that has been tested locally and is ready for deployment on Microsoft Azure. The backend uses **Node.js** and **Express**, while the frontend is built with **React**. MongoDB Atlas is used for cloud database hosting.

---

## Prerequisites
Before deploying this project, ensure you have:

- Node.js and npm installed locally
- A fully developed and tested MERN application
- A Microsoft Azure account
- A MongoDB Atlas account with a configured cluster
- Git installed for version control

---

## Setup Instructions

### 1. Prepare Your MERN Application
- Ensure your backend is connected to MongoDB.
- Verify that all features work locally.
- Use environment variables for sensitive data (like database credentials).

### 2. Build React Frontend
```bash
cd client
npm install
npm run build
