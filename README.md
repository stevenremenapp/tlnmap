# Map of libraries in metro-Detroit's The Library Network cooperative

## See it Now

[Click here to see the map!](https://stevenremenapp.github.io/tlnmap/)

## Introduction

This is a resource that I wish existed when I started working in [The Library Network (TLN) libraries](https://tln.lib.mi.us/md/). It is a map application that allows users to see all libraries within the TLN cooperative and search for them by name and/or filter based on services/policies at the library (reciprocal borrower, [shared system](https://catalog.tln.lib.mi.us), [MILibraryCard](http://www.milibrarycard.org/partcipating.html), [MeL](https://mel.org)) in the sidebar. Data is collected in the libraries.json and displayed/manipulated based on app state. This project is built in React and was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). I decided to use the Mapbox API to display the map and Uber's React-map-gl library to help use the Mapbox service within React.

## Instructions to Access this Project

- Download or clone this repository
- Install all project dependencies with npm install
- Start the development local server with npm start
- This map requires a Mapbox API token to function. If you find it's not working for you, please place your own Mapbox token on line 10 of Map.js.

## Feedback!

In an effort to make sure this project is useful to its intended audience (public library employees in The Library Network) I have been soliciting feedback through both pointed and open-ended questions to people who do that work. After the first round of feedback I've learned that the map is useful, but there are some features to be added by request that would make it better (a locate the user feature, placing library addresses in the infowindow, and making reciprocal borrower libraries a different color on the map).

> I would find this useful. When a book isn't available, the first thing a patron asks is if it's available at another library. I have a fair assessment of what libraries are nearby, but your map shows me libraries I might not have thought of. Reciprocal borrowing is the most important information. Maybe important enough to code the pins to be a different color if the library is reciprocal or not. I would like if there was a "find me" option. I don't automatically know where a city is just staring at a map.
-- Liz, Youth Services Librarian

> I think it could be useful. I can never remember which libraries are not reciprocal, and I find it difficult looking through the long list of places, but with this I can quickly search the library I am looking for in the search bar and tell at a glance, or see a shorter list of just those that are reciprocal. I found it very easy and intuitive. You could put the addresses there, but there are links to the websites, so I don't think it is necessary, especially if you want it cleaner, with just the necessities.
-- Karen, Youth Services Librarian

> I think it's great and SO USEFUL to me because I know nothing! (She is very new to libraries 🙂).
-- Hillary, Adult Services Associate

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


