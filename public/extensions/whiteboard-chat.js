import iframe from "./iframe.js";
import callstate from "./callstate.js";

let fp, iframeEl, call;

let props = {};

/* Extension configuration */
// don't use the iframe extension's button
iframe.configure({ url: "about:blank", buttons: {}, showUrl: false });

/* Public interface */

export function configure(p) {
  console.log("[whiteboard] configure", p);
  Object.assign(props, p);
}

/* Private implementation */

async function iframeUrl(e, call) {
  let src = "https://www.whiteboard.chat/apiaccess/createjoin/";
  // use a per-room whiteboard for now
  const participant = e.participants.local;
  const sessionId = participant.session_id;
  const userId = participant.user_id;
  const roomInfo = await call.room();
  src += roomInfo.id; // use the room's GUID as the whiteboard ID
  src += `?key=${props.key}&disableNav=true`; // add some other useful things
  if (props.teacher === "true") {
    src += "&teacher=true&deleteOldUsers=180";
  }
  src += "&username=" + encodeURIComponent(participant.user_name);
  src += "&boardName=" + encodeURIComponent(roomInfo.name);
  console.log("whiteboard URL:", src);
  return src;
}

function handleWcButton() {
  callstate.updateCallState(
    "iframe",
    {
      open: !callstate.state.iframe?.open,
    },
    true,
    call
  );
}

export function beforeCreateFrame(parentEl, properties) {
  // TODO: maybe namespace shared resources like tray buttons?
  if (props.teacher) {
    if (!properties.customTrayButtons) {
      properties.customTrayButtons = {};
    }
    properties.customTrayButtons.wc = {
      iconPath: "https://www.svgrepo.com/show/123519/whiteboard.svg",
      label: "Boards",
      tooltip: "Boards",
    };
  }

  return [parentEl, properties];
}

export async function afterCreateFrame(c) {
  call = c;
  call.on("joined-meeting", async (e) => {
    // let the teacher set the whiteboard URL
    // for everybody
    let url = await iframeUrl(e, call);
    callstate.updateCallState("iframe", { url }, true, call);
  });

  call.on("custom-button-click", (e) => {
    switch (e.button_id) {
      case "wc":
        handleWcButton();
        break;
    }
  });
}

export default {
  beforeCreateFrame,
  afterCreateFrame,
  configure,
};
