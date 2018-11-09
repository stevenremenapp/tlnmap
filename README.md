# Udacity FEND Project 7: Map of (selected) libraries in metro-Detroit's The Library Network cooperative

## See it Now

[Click here to see the map!](https://stevenremenapp.github.io/tlnmap/)

## Introduction

This is the beginning (middle?) of a thing that I wish existed when I started working in [The Library Network (TLN) libraries](https://tln.lib.mi.us/md/). It is a map application that allows users to see selected (for now) libraries within the TLN cooperative. I will expand this map to include all locations and further filtering limiters that would be helpful for library employees to quickly be able to use. This project is built in React and was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). I decided to use the Mapbox API to display the map and Uber's React-map-gl library to help use the Mapbox service within React. I couldn't find an API that would reliably provide the data I wanted (libraries are not super popular on foursquare) so I gathered the data in a JSON file, and used the [myjson API](http://myjson.com/api) to serve it in the app.

## Instructions to Access this Project

- Download or clone this repository
- Install all project dependencies with npm install
- Start the development local server with npm start
- This map requires a Mapbox API token to function. If you find it's not working for you, please place your own Mapbox token on line 10 of Map.js.

## Main Resources Used

Constant referencing of [facebook's deeply helpful React documentation.](https://reactjs.org/docs/getting-started.html)

Excellent documentation and tutorials from Uber on how to use their React-map-gl library:

- [https://github.com/uber/react-map-gl](https://github.com/uber/react-map-gl)
- [https://uber.github.io/react-map-gl/#/](https://uber.github.io/react-map-gl/#/)
- [http://vis.academy/#/building-a-geospatial-app/setup](http://vis.academy/#/building-a-geospatial-app/setup)

Others:

- [React Burger Menu](https://github.com/negomi/react-burger-menu)
- [Environment variables in JS apps](https://dev.to/deammer/loading-environment-variables-in-js-apps-1p7p)
- [Deploy React app to Github Pages](https://medium.freecodecamp.org/surge-vs-github-pages-deploying-a-create-react-app-project-c0ecbf317089)
- [This walkthrough helped me understand filtering](https://github.com/thefinitemonkey/fend-maps-walkthrough)
- [Helpful codepen to move me toward understanding conditional styling in React](https://codepen.io/tylermadison/pen/NqaBxy?editors=1010)

Not pertinent to this project, but cool mapping resources:

- [Excellent talk from a developer who made a library similar to Uber's, more-or-less on his own](https://pusher.com/sessions/meetup/the-js-roundabout/webgl-map-with-mapbox-and-react)
- [How the Financial Times Mapped 1.3m Data Points Using Mapbox](https://source.opennews.org/articles/how-we-made-our-broadband-map-using-mapbox/)


