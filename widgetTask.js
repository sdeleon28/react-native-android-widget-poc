// @flow
import { NativeModules, ToastAndroid } from 'react-native'
import bgTimer from 'react-native-background-timer'
import type { Store } from 'redux';

const { BackgroundTaskBridge } = NativeModules

const charms = [
  {
    id: 'increment',
    name: 'First',
    cover: 'goodmorning',
  },
  {
    id: 'decrement',
    name: 'Second',
    cover: 'night',
  }
]

type TaskDependencies = {
  store: Store
};

type TaskInfo = {
  id: string,
}

export default function makeWidgetTask({ store }: TaskDependencies) {
  const increment = () => ({ type: 'INCREMENT' });
  const decrement = () => ({ type: 'DECREMENT' });
  return async function widgetTask (taskData: TaskInfo) {
    const {id} = taskData || {}
    if (id !== undefined) {
      if (id === 'increment') {
        store.dispatch(increment());
        ToastAndroid.show('Incrementing!', ToastAndroid.SHORT);
      } else if (id === 'decrement') {
        store.dispatch(decrement());
        ToastAndroid.show('Decrementing!', ToastAndroid.SHORT);
      }
    }
    bgTimer.setTimeout(() => {
      synchronizeWidget()
    }, 0)
  }
}

export function synchronizeWidget () {
  ToastAndroid.show(`Initializing ...`, ToastAndroid.SHORT);
  // This is where we pass data to the Android side. If the data depends on redux/state, it should be called on every
  // update.
  BackgroundTaskBridge.initializeWidgetBridge(charms)
}
