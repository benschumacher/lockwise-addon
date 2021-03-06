/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

import chai, { expect } from "chai";
import sinon from "sinon";
import sinonChai from "sinon-chai";

import * as actions from "src/list/actions";
import telemetryLogger from "src/list/telemetry";

chai.use(sinonChai);

describe("list > shared telemetryLogger middleware", () => {
  let listener;

  const item = {
    id: "b9cf5fb1-913d-4ef9-a1ff-afe39a66f660",
    title: "origin.com",
    origins: [ "https://origin.com" ],
    entry: {
      kind: "login",
      username: "username",
      password: "password",
    },
  };

  beforeEach(async () => {
    listener = sinon.spy();
    browser.runtime.onMessage.addListener(listener);
  });
  afterEach(async () => {
    browser.runtime.onMessage.removeListener(listener);
  });

  it("itemCopied", async () => {
    const action = {
      type: actions.COPIED_FIELD_COMPLETED,
      field: "username",
      item,
    };
    telemetryLogger.itemCopied(action, "itemDetailManager");
    expect(listener).to.have.been.calledWith({
      type: "telemetry_event",
      data: {
        method: "copyUsername",
        object: "itemDetailManager",
        extra: { itemid: item.id },
        value: null,
      },
    });
  });

  it("itemSelected", async () => {
    telemetryLogger.itemSelected(item.id, "manager");
    expect(listener).to.have.been.calledWith({
      type: "telemetry_event",
      data: {
        method: "itemSelected",
        object: "manager",
        extra: { itemid: item.id },
        value: null,
      },
    });
  });

  it("itemShown", async () => {
    const action = {
      type: actions.SELECT_ITEM_COMPLETED,
      actionId: 0,
      item,
    };
    telemetryLogger.itemShown(action, "itemDetailManager", item);
    expect(listener).to.have.been.calledWith({
      type: "telemetry_event",
      data: {
        method: "show",
        object: "itemDetailManager",
        extra: { itemid: item.id },
        value: null,
      },
    });
  });

  it("listShown", async () => {
    const items = [item];
    const action = {
      type: actions.LIST_ITEMS_COMPLETED,
      actionId: 0,
      items,
    };
    telemetryLogger.listShown(action, "itemListManager", items);
    expect(listener).to.have.been.calledWith({
      type: "telemetry_event",
      data: {
        method: "show",
        object: "itemListManager",
        value: "true",
        extra: null,
      },
    });
  });

  it("passwordConcealed", async () => {
    const action = {
      type: actions.CONCEAL_PASSWORD,
      id: item.id,
    };
    telemetryLogger.passwordConcealed(action, "itemDetailManager");
    expect(listener).to.have.been.calledWith({
      type: "telemetry_event",
      data: {
        method: "concealPassword",
        object: "itemDetailManager",
        extra: { itemid: item.id },
        value: null,
      },
    });
  });

  it("passwordRevealed", async () => {
    const action = {
      type: actions.REVEAL_PASSWORD,
      id: item.id,
    };
    telemetryLogger.passwordRevealed(action, "itemDetailManager");
    expect(listener).to.have.been.calledWith({
      type: "telemetry_event",
      data: {
        method: "revealPassword",
        object: "itemDetailManager",
        extra: { itemid: item.id },
        value: null,
      },
    });
  });

  it("websiteOpened", async () => {
    const action = {
      type: actions.OPEN_WEBSITE,
      item,
    };
    telemetryLogger.websiteOpened(action, "itemDetailManager");
    expect(listener).to.have.been.calledWith({
      type: "telemetry_event",
      data: {
        method: "openWebsite",
        object: "itemDetailManager",
        extra: { itemid: item.id },
        value: null,
      },
    });
  });
});
