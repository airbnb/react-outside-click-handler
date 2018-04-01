# react-outside-click-handler [![Build Status](https://travis-ci.org/taehwanno/react-outside-click-handler.svg?branch=master)](https://travis-ci.org/taehwanno/react-outside-click-handler) [![Coverage Status](https://coveralls.io/repos/github/taehwanno/react-outside-click-handler/badge.svg)](https://coveralls.io/github/taehwanno/react-outside-click-handler) [![npm version](https://badge.fury.io/js/react-outside-click-handler.svg)](https://badge.fury.io/js/react-outside-click-handler)

React Component for handling click events outside a specific component.

**Table of contents**

- [Installation](#installation)
- [API](#api)
  - [`<OutsideClickHandler children useCapture onOutsideClick />`](#api)
- [Credits](#credits)
- [License](#license)

## Installation

`react-outside-click-handler` requires **React >= 0.14.**

```bash
$ npm install --save react-outside-click-handler
```

Alternatively, using yarn:

```bash
$ yarn add react-outside-click-handler
```

## API

- `<OutsideClickHandler children useCapture onOutsideClick />`

### props

- `children` (*ReactNode*): The specific inner react node that not trigger `onOutsideClick` handler.
- `useCapture` (*Boolean*): See [link's useCapture section](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#Parameters) (Default: `true`)
- `onOutsideClick` (*Function*): Click event handler outside `children` react node.

### Usage

```jsx
<OutsideClickHandler useCapture onOutsideClick={Function}>
  <p>The specific inner react node.</p>
  <p>When this nodes are clicked, "onOutsideClick" is not triggered.</p>
</OutsideClickHandler>
```

## Credits

This component is inspired by [airbnb/react-dates's OutsideClickHandler](https://github.com/airbnb/react-dates/blob/master/src/components/OutsideClickHandler.jsx).

## License

MIT © [Taehwan, Noh (taehwanno)](https://github.com/taehwanno)
