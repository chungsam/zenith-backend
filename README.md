# Events and Activities Management App

### By Sam Chung

### To view the deployed website, visit https://fierce-waters-46645.herokuapp.com.

### Introduction

This is a simple MEAN app that allows you to manage events and activities for a fictional non-profit.

The client-facing part has two sections:

1.  An "Admin Portal" view that allows users to view, add and delete events and activities.
2.  A "Weekly Listings" view that only shows listings for the current week.

## Front-End

The app uses Angular as the presentation layer. The UI is quite bare as the focus for the app was more on the back-end features.

## Back-End

A Node/Express server serves the app and all required assets. For data storage, it connects to a mLab MongoDB database stored in the cloud. Internal API endpoints were defined and developed to allow data to be passed from the front and back-end.

## Deployment

The app was deployed via Heroku, using Heroku-cli. It is currently actively running at https://fierce-waters-46645.herokuapp.com.

## Getting Started

To get started, first install dependencies using npm:

```
> npm install
```

Next, run the app:

```
> npm start
```
