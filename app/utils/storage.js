function saveState(state) {
  console.log('saveState@utils/storage:', state);
  chrome.storage.sync.set({ options: JSON.stringify(state) });
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
