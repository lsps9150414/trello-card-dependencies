const bluebird = require('bluebird');
global.Promise = bluebird;

function promisifier(method) {
  // return a function
  return function promisified(...args) {
    // which returns a promise
    return new Promise(resolve => {
      args.push(resolve);
      method.apply(this, args);
    });
  };
}

function promisifyAll(obj, list) {
  list.forEach(api => bluebird.promisifyAll(obj[api], { promisifier }));
}

// let chrome extension api support Promise
promisifyAll(chrome, [
  'tabs',
  'windows',
  'browserAction',
  'contextMenus'
]);
promisifyAll(chrome.storage, [
  'local',
]);

chrome.runtime.onMessage.addListener(
  (request, sender, sendResponse) => {
    // alert(sender.tab ? `from a content script: ${sender.tab.url}` : 'from the extension');
    if (request.action === 'CREATE_WINDOW') {
      chrome.windows.create(request.options, sendResponse({ msg: 'popup opened!' }));
    }
  }
);

require('./background/contextMenus');
require('./background/inject');
require('./background/badge');
