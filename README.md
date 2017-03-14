# Simple Boilerplate app

just run `npm install` then `npm start`. The Gulp script will copy all files in the `/src` to the `/build` folder, compiling all the SCSS and ES6 needed. It supports Foundation 6 [<http://foundation.zurb.com/>]

# Configuration:

By default the entry points for the JS and SCSS are `app.js` and `app.scss`. You can configure this and add extra files to watch in the `gulpfile.js`.

# Features:

- ESLint (Airbnb Preset)
- Sass
- Foundation
- Webpack / Babel:

  - Presets: ES2015, React
  - Plugins: object-transform-rest-spread, transform-class-properties
