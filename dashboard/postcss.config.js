var tailwindcss = require('tailwindcss')

module.exports = {
  plugins: [
    /*
      This plugin can consume local files, node modules or web_modules. To resolve path of an @import rule, it can look into root directory (by default process.cwd()), web_modules, node_modules or local modules. When importing a module, it will look for index.css or file referenced in package.json in the style or main fields. You can also provide manually multiples paths where to look at.
     */
    require('postcss-import'),

    /*
      PostCSS plugin for mixins.
      Note, that you must set this plugin before postcss-simple-vars and postcss-nested.

      Example
        @mixin icon twitter {
          background: url(twt.png);
        }
     */
    require('postcss-mixins'),

    /*
      PostCSS plugin to reference any parent ancestor selector in nested CSS.

      When writing modular nested CSS, & current parent selector is often not enough.

      PostCSS Nested ancestors introduces ^& selector which let you reference any parent ancestor selector with an easy and customizable interface.
     */
    // require('postcss-nested-ancestors'),

    /*
      PostCSS plugin to unwrap nested rules like how Sass does it.
     */
    require('postcss-nested'),

    /*
      PostCSS Preset Env lets you convert modern CSS into something most browsers can understand, determining the polyfills you need based on your targeted browsers or runtime environments.

      For more options read: https://github.com/csstools/postcss-preset-env#options
     */
    require('postcss-preset-env')({
      stage: 1
    }),

    /*
      PostCSS plugin that tries to fix all of flexbug's issues
     */
    require('postcss-flexbugs-fixes'),

    /*
      Tailwind configuration
    */
    tailwindcss('./tailwind.js'),

    /*
      PostCSS plugin to parse CSS and add vendor prefixes to CSS rules using values from Can I Use.

      Write your CSS rules without vendor prefixes (in fact, forget about them entirely). Autoprefixer will use the data based on current browser popularity and property support to apply prefixes for you.
     */
    require('autoprefixer')
  ]
}
