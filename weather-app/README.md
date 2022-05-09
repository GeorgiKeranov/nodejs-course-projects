# Weather App

Simple terminal application that only needs city and country name and gets geographical cordinates from geocode API and then passes these cordinates to weather API in order to get current weather temperature.

## How to install

Make sure that you have installed [npm](https://www.npmjs.com/) and [node](https://nodejs.dev/) on your machine.

1. Clone the project and open 'weather-app' directory in terminal.
2. Type 'npm install' and wait till all of the packages are installed.
3. Create new folder in 'weather-app' directory with name 'config'.
4. Add new file with 'dev.env' name in the directory 'weather-app/config/'.
5. Register with free plans for [Weatherstack](https://weatherstack.com/) and [Mapbox](https://www.mapbox.com/) and generate API keys from them.
6. In the new file 'dev.env' you have to type your WEATHERSTACK_ACCESS_KEY and MAPBOX_ACCESS_TOKEN. 
7. Example of dev.env file contents:
```
WEATHERSTACK_ACCESS_KEY=TYPE_YOUR_KEY_HERE
MAPBOX_ACCESS_TOKEN=TYPE_YOUR_KEY_HERE
```

## How to use

1. Open terminal in 'weather-app' directory.
2. Type 'npm run dev (And here add city and country separated by space)', for example:
```
npm run dev London United Kingdom
```
3. Success, you will see the temperature message in the console.
