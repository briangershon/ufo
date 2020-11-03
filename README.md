# ufo

![Build Status](https://github.com/briangershon/ufo/workflows/Continuous%20Integration/badge.svg)

Animating UFOs with my VanillaJS game engine.

## Run Local Dev Server

    npm install  # install dependencies

    npm start
    # visit http://localhost:1234

## Run Tests

    npm test

## Package project up in dist folder for release to server

    npm run build

## Run lint

    npm run lint

## Build a library to use on another site

    # create `dist/ufo-widget.js`
    npm run build-library

Example usage:

```html
<canvas id="my-canvas" width="600" height="300"></canvas>
<script src="./ufo-widget.js"></script>
<script>
  const canvas = document.getElementById('my-canvas');
  ufoWidget.default({
    canvas,
    backgroundColor: '#0A9DF8',
    scale: 1,
    entityCount: 22
  });
</script>
```
