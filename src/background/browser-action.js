/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

function handleToolbarClicked() {
  browser.sidebarAction.open();
}

function installListener() {
  browser.browserAction.onClicked.addListener(handleToolbarClicked);
}

function uninstallListener() {
  browser.browserAction.onClicked.removeListener(handleToolbarClicked);
}

export default async function updateBrowserAction() {
  // clear listener
  // XXXX: be more efficient with this?
  uninstallListener();

  return installListener();
}
