import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import replace from 'rollup-plugin-replace';
import uglify from 'rollup-plugin-uglify';

const config = {
  output: {
    format: 'umd',
    name: 'ReactOutsideClickHandler',
    exports: 'named',
    globals: {
      'react': 'React',
      'prop-types': 'PropTypes'
    },
  },
  plugins: [
    nodeResolve({ jsnext: true, main: true }),
    commonjs(),
    babel({ exclude: 'node_modules/**', }),
    replace({ 'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV) }),
  ],
  external: ['react', 'prop-types'],
};

if (process.env.NODE_ENV === 'production') {
  config.plugins.push(uglify());
}

export default config;
