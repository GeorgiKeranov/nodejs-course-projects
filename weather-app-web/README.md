# Weather App Web

Simple web application that uses geocode and weather API functionalities from [Weather App](https://github.com/GeorgiKeranov/nodejs-course-exercises/tree/master/weather-app) built with Express and Handlebars.js.

## Table of Contents

- [Technologies Used](#technologies-used)
- [How to Install](#how-to-install)
- [How to Use](#how-to-use)

## Technologies Used

- Express - to change colors in the terminal
- [hbs](https://www.npmjs.com/package/hbs) - Express view engine for Handlebars.js
- [request](https://www.npmjs.com/package/request) - to make HTTP requests easily
- [env-cmd](https://www.npmjs.com/package/env-cmd) - program for executing commands using an environment from an env file

## How to Install

Make sure that you have installed [npm](https://www.npmjs.com/) and [node](https://nodejs.dev/) on your machine.

1. Clone the project and open 'weather-app-web' directory in terminal.
2. Type 'npm install' and wait till all of the packages are installed.
3. Create new folder in 'weather-app-web' directory with name 'config'.
4. Add new file with 'dev.env' name in the directory 'weather-app-web/config/'.
5. Register with free plans for [Weatherstack](https://weatherstack.com/) and [Mapbox](https://www.mapbox.com/) and generate API keys from them.
6. In the new file 'dev.env' you have to type your WEATHERSTACK_ACCESS_KEY and MAPBOX_ACCESS_TOKEN. 
7. Example of dev.env file contents:
```
WEATHERSTACK_ACCESS_KEY=TYPE_YOUR_KEY_HERE
MAPBOX_ACCESS_TOKEN=TYPE_YOUR_KEY_HERE
```

## How to Use

1. Open terminal in 'weather-app' directory.
2. Type 'npm run dev'
3. You can view the web application from your browser at this link 'http://localhost:3000'