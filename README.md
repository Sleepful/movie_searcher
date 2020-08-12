# A little front-end for ["The Open Movie Database"](http://www.omdbapi.com/) *- search for movie titles and info! -*

Run with `yarn start`, remember to `yarn install`

Built with:

* [TailwindCSS](https://tailwindcss.com/)
* [TypeScript](https://www.typescriptlang.org/)
* [Create React App](https://create-react-app.dev/)
* [Jest](https://jestjs.io/) (there's a couple of simple tests to showcase how to do them, run them with `yarn test`)
* [React Helmet](https://github.com/nfl/react-helmet)
* [React Query](https://react-query.tanstack.com/) (handles data-fetching cache, very useful for pagination requests and the like!)

If you want to run this project remember to get an API key from [omdbapi](http://www.omdbapi.com/) and add it to the configuration (`src/config.ts` in `master`)

# What it looks like

![screenshot of program](/public/screenshot.png)
---

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.
