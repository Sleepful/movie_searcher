
Online at: [https://movie-searcher-site.netlify.app](https://movie-searcher-site.netlify.app)


# A little front-end for ["The Open Movie Database"](http://www.omdbapi.com/) 


Run with `yarn start`, remember to `yarn install`

Built with:

* [TailwindCSS](https://tailwindcss.com/)
* [TypeScript](https://www.typescriptlang.org/)
* [Create React App](https://create-react-app.dev/)
* [Jest](https://jestjs.io/) There's a couple of simple tests to showcase how to do them, run them with `yarn test`
* [React Helmet](https://github.com/nfl/react-helmet)
* [React Query](https://react-query.tanstack.com/) Handles data-fetching cache, very useful for pagination requests and the like!
* [React Router](https://reactrouter.com/)
* ***Bonus*** [Using Tailwind CSS with Create React App](https://daveceddia.com/tailwind-create-react-app/) Tutorial to watch for changes on `tailwind.config.js` and automatically re-build

If you want to run this project remember to get an API key from [omdbapi](http://www.omdbapi.com/) and add it to the configuration (`src/config.ts` in `master`)

# Netlify

This project has been deployed to netlify at [movie-searcher-site.netlify.app](https://movie-searcher-site.netlify.app), it uses [Netlify's lambda functions](https://www.netlify.com/products/functions/) for the API calls, they are like AWS lambdas.

You can find the `netlify` build files in the `netlify` branch of this project.

# What it looks like

![screenshot of program](/public/screenshot.png)
---

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
