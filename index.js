// @flow
import React, { Component } from 'react';
import { AppState, AppRegistry } from 'react-native';
import { createStore } from 'redux';
import App from './App';
import makeWidgetTask from './widgetTask';
import reducer from './reducer';

const store = createStore(reducer);

class AppWithStore extends Component {
  componentDidMount = () => {
    // Make sure to update the state of the UI to the changes in the store when the app comes into the foreground
    // again.
    // Do not refactor `() => this.forceUpdate()` to `this.forceUpdate`. It looks like `this.forceUpdate` is undefined
    // in `componentDidMount`.
    AppState.addEventListener('change', () => this.forceUpdate());
  }
  render() {
    return (
      <App counter={store.getState()} />
    );
  }
}

AppRegistry.registerComponent('androidWidgetPoc', () => AppWithStore);
AppRegistry.registerHeadlessTask('WidgetTask', () => makeWidgetTask({ store }));
