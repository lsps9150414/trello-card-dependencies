import { CHROME_SYNC_ITEMS } from '../constants';

function saveState(state) {
  console.log('saveState@utils/storage:', state);
  for (let i = 0; i < CHROME_SYNC_ITEMS.length; i++) {
    const nodeName = CHROME_SYNC_ITEMS[i];
    chrome.storage.sync.set({ nodeName: state[nodeName] });
  }
  // chrome.storage.sync.set({ app: JSON.stringify(state) });
}

export default function () {
  return next => (reducer, initialState) => {
    const store = next(reducer, initialState);
    store.subscribe(() => {
      const state = store.getState();
      saveState(state);
    });
    return store;
  };
}
