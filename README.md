# OBK Chatbot
Floating FAQ Assistant for Our Big Kitchen (OBK), Australia

## Overview

This project is a floating chatbot designed to help visitors get quick answers about OBK programs, volunteering, events, and general information. The chatbot appears as a small button in the lower-right corner of the website. When clicked, a chat window opens and responds using a predefined FAQ dataset.


## Purpose

1) Reducing browsing time
2) Making common information easy to access
3) Helping users understand volunteering and programs options
4) Improving website engagement and accessibility

## Technologies Used

1. React + Vite
2. JSON dataset
3. Netlify (hosting and automated deployment)
4. Wix Custom Code (embedding on live website)
5. chatbot-widget.js (loader script)

## How the System Works

1. The chatbot operates through the following structure:
2. React Application: Handles UI and message logic
3. Dataset JSON File: Stores OBK FAQs
4. Netlify Deployment: Automatically updates when code is pushed
5. Widget Script: Displays the chatbot on Wix across all pages

## Features

1. Floating widget visible across the OBK website
2. Exact match, keyword matching, and fuzzy search
3. Three-step fallback logic for unanswered questions
4. Guided responses with clickable options
5. Fully responsive UI
6. Easy content updates via dataset JSON
7. No code needed for regular content changes

## Important files and descriptions

`src/ChatWindow.jsx`         : Main chatbot logic and interface   
`src/App.jsx`                : Root component wrapper             
`src/main.jsx`               : Mounting logic for external sites  
`public/chatbot-widget.js`   : Script used by Wix to load chatbot 
`BigKitchenOBK_dataset.json` : FAQ dataset file                   

## Local Development instructions 

1. Install Dependencies 
   npm install