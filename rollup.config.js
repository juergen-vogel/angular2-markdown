import nodeResolve from 'rollup-plugin-node-resolve'
import commonjs    from 'rollup-plugin-commonjs';
import uglify      from 'rollup-plugin-uglify'

export default {
  entry: 'bundles/index.js',
  format: 'umd',
  targets: [
   {
     format: 'umd',
     dest: 'bundles/markdown.umd.js'
   }
  ],
  sourceMap: false,
  plugins: [
    nodeResolve({
      jsnext: true,
      module: true
    }),
    commonjs({
       include: 'node_modules/**',
       include: 'node_modules/marked/**'
    }),
    uglify()
  ],

  onwarn: function(warning) {
    // Skip certain warnings
    // should intercept ... but doesn't in some rollup versions
    if ( warning.code === 'THIS_IS_UNDEFINED' ) { return; }
    // intercepts in some rollup versions
    if ( warning.indexOf("The 'this' keyword is equivalent to 'undefined'") > -1 ) { return; }
    // console.warn everything else
    console.warn( warning.message );
  },

  globals: {
    '@angular/core': 'ng.core',
    '@angular/compiler': 'ng.compiler',
    '@angular/platform-browser': 'ng.platformBrowser',
    'rxjs/Observable': 'Rx',
    'rxjs/Subject': 'Rx'
  }

};
