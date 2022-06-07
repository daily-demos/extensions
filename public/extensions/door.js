import daily from "./core.js";
import Socket from "./socketiostate.js";

let state, call;
let socket;
let pounced = false;
let openCallback, closeCallback, onceOpenCallback;
let openCallbacks = [];
let closeCallbacks = [];

/* Defaults */
let props = {
  room: "", // used to build the presence socket namespace key.
  domain: "", // used to build the presence socket namespace key.
};
let key = "door";

let buttons = {
  closeDoor: {
    iconPath: "https://www.svgrepo.com/show/344140/door-open-fill.svg",
    label: "Close Door",
    tooltip: "Close Door",
  },
  openDoor: {
    iconPath: "https://www.svgrepo.com/show/344139/door-closed-fill.svg",
    label: "Open Door",
    tooltip: "Open Door",
  },
  toggleDoor: {
    iconPath: "https://www.svgrepo.com/show/344139/door-closed-fill.svg",
    label: "Toggle Door",
    tooltip: "Toggle Door",
  },
};

/* Public interface */
let self;
export default self = {
  connect: function (p) {
    props = p;
    let key = `${p.domain}/${p.room}/door`;
    socket = new Socket({ key });
    socket.onStateUpdate((s) => {
      state = s;
      if (state.clients == 1 && !state["doorState"]) {
        // nobody's here yet; open the door
        self.open();
      } else if (state["doorState"] === "open") {
        handleOpen();
      } else if (state["doorState"] === "closed") {
        handleClosed();
      }
    });
    socket.connect();
  },
  onOpen: function (cb) {
    openCallbacks.unshift({ cb, once: false });
  },
  onceOpen: function (cb) {
    openCallbacks.unshift({ cb, once: true });
  },
  onClose: function (cb) {
    closeCallbacks.unshift({ cb, once: false });
  },
  onceClose: function (cb) {
    closeCallbacks.unshift({ cb, once: true });
  },
  open: function () {
    socket.updateState({ doorState: "open" });
  },
  close: function () {
    socket.updateState({ doorState: "closed" });
  },
};

/* Private implementation */

function handleOpen() {
  // switch button here when bug is fixed
  for (var i = openCallbacks.length - 1; i >= 0; i--) {
    openCallbacks[i]["cb"]();
    if (openCallbacks[i].once === true) {
      openCallbacks.splice(1, i);
    }
  }
}

function handleClosed() {
  // switch button here when bug is fixed
  for (var i = closeCallbacks.length - 1; i >= 0; i--) {
    closeCallbacks[i]();
    if (closeCallbacks[i].once === true) {
      closeCallbacks.splice(1, i);
    }
  }
}

daily.beforeCreateFrame((parentEl, properties) => {
  if (!properties.customTrayButtons) {
    properties.customTrayButtons = {};
  }
  let button =
    state.doorState === "closed"
      ? { openDoor: buttons.openDoor }
      : { closeDoor: buttons.closeDoor };
  Object.assign(properties.customTrayButtons, {
    toggleDoor: buttons.toggleDoor,
  }); // use button when bug is fixed
  return [parentEl, properties];
});

daily.afterCreateFrame(async (c) => {
  call = c;
  call.on("custom-button-click", (e) => {
    switch (e.button_id) {
      case "openDoor":
        self.open();
        break;
      case "closeDoor":
        self.close();
        break;
      case "toggleDoor":
        state.doorState === "closed" ? self.open() : self.close();
        break;
    }
  });
});
