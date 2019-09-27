# Change Log

## v1.3.0
 - [New] `display`: add `contents` (#34)
 - [New] `display`: add `inline` (#28)
 - [Refactor] Replace `componentWillReceiveProps` with `componentDidUpdate` for a side effect (#36)
 - [Deps] update `airbnb-prop-types`
 - [Dev Deps] update `enzyme-adapter-react-helper`, `eslint`, `eslint-config-airbnb`, `eslint-plugin-import`, `eslint-plugin-react`, `eslint-plugin-react-with-styles`, `rimraf`, `safe-publish-latest`, `sinon-sandbox`; add `eslint-plugin-react-hooks`

## v1.2.4
 - [Fix] prevent memory leak if `mousedown` is fired, but `mouseup` isn’t (#20)
 - [Deps] update `airbnb-prop-types`, `document.contains`
 - [Dev Deps] update `airbnb-js-shims`, `babel-preset-airbnb`, `enzyme`, `enzyme-adapter-react-helper`, `eslint`, `eslint-plugin-import`, `eslint-plugin-react`, `eslint-config-airbnb`, `eslint-plugin-jsx-a11y`, `sinon-sandbox`

## v1.2.3
 - [Fix] use `document.contains` instead of implicitly requiring polyfills
 - [Deps] update `object.values`, `prop-types`, `airbnb-prop-types`
 - [Dev Deps] update `airbnb-js-shims`, `chai`, `enzyme`, `enzyme-adapter-react-helper`, `eslint`, `eslint-config-airbnb`, `eslint-plugin-import`, `eslint-plugin-jsx-a11y`, `eslint-plugin-react`, `eslint-plugin-react-with-styles`, `react`, `react-dom`, `rimraf`, `safe-publish-latest`

## v1.2.2
 - Add .npmignore, fixes ([#6](https://github.com/airbnb/react-outside-click-handler/issues/6))

## v1.2.1
 - [Fix] use `object.values` instead of `Object.values`

## v1.2.0
 - Allow consolidated-events ^2.0.0 ([#5](https://github.com/airbnb/react-outside-click-handler/pull/5))

## v1.1.0
 - Add `flex` as a display prop option ([#4](https://github.com/airbnb/react-outside-click-handler/pull/4))

## v1.0.0
 - Initial commit
