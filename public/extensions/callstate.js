let state = {};
let updateHandlers = [];
let waitingForSync = false;
let call = null;
const SYNC_MAX_WAITING_TIME = 7000;
const UPDATE_MSG = "update-call-state";
const REQUEST_MSG = "request-call-state";

/* Public interface */
export default {
  onCallStateUpdate: function (key, callback) {
    if (!updateHandlers[key]) {
      updateHandlers[key] = [];
    }
    updateHandlers[key].push(callback);
  },

  updateCallState: function (key, newState, broadcast = true, call = call) {
    // used for an extension to request a state update,
    // which will also get broadcast to everybody else on the call.
    applyStateUpdate(key, newState);
    if (broadcast) {
      broadcastStateUpdate(key, newState, call);
    }
  },

  state,
};

/* Private implementation */

export function afterCreateFrame(c) {
  call = c;
  // listen for requests for state from new peers
  call.on("app-message", (e) => {
    switch (e.data.message) {
      case REQUEST_MSG:
        // only send state if I'm not waiting for it myself
        if (waitingForSync === false) {
          call.sendAppMessage({ message: UPDATE_MSG, state }, e.fromId);
        }
        break;

      case UPDATE_MSG:
        waitingForSync = false;
        applyStateUpdates(e.data.state);
        break;
    }
  });
  // listen for general state updates
  // ask a peer for the existing state
  call.on("joined-meeting", async (e) => {
    waitingForSync = true;

    let overallTimeout = setTimeout(() => {
      waitingForSync = false;
    }, SYNC_MAX_WAITING_TIME);

    // Use an interval timer to request state from different
    // peers until we eventually get a response. Randomize the delay
    // to increase the chance of lowering overall network traffic
    const requestDelay = 1000 + Math.ceil(1000 * Math.random());
    let interval = setInterval(() => {
      if (waitingForSync === false) {
        clearInterval(interval);
        return;
      }
      requestState();
    }, requestDelay);
  });
}

function applyStateUpdates(newState) {
  // internal handler that applies all state updates
  Object.keys(newState).forEach((k) => {
    applyStateUpdate(k, newState[k]);
  });
}

function applyStateUpdate(key = "", newState) {
  // also used internally when we receive a state update
  // from the messaging channel.
  if (!state[key]) {
    state[key] = {};
  }
  Object.assign(state[key], newState);
  if (!updateHandlers[key]) {
    updateHandlers[key] = [];
  }
  const handlers = updateHandlers[key];
  for (let i = 0; i < handlers.length; i++) {
    // try calling handlers with just the updated state
    // to make change detection logic easier
    handlers[i](newState);
  }
}

function broadcastStateUpdate(key, newState, call) {
  const ns = {};
  ns[key] = newState;
  call.sendAppMessage({ message: UPDATE_MSG, state: ns });
}

async function requestState() {
  const friends = await call.participants();
  // find someone that joined before us and ask for state
  const joinedDate = friends.local.joined_at;
  const mentors = Object.entries(friends)
    .filter(([id, f]) => id !== "local" && f.joined_at < joinedDate)
    .map(([id]) => id);
  if (mentors.length === 0) {
    // then we're the first one here
    // skip this for now; I think I'd rather hit the global
    // timeout because participants are slow to show up
    // in the list
    /*
    console.log("no mentors, i should quit looking");
    waitingForSync = false;
    return;
    */
  }

  const randomIdx = Math.floor(mentors.length * Math.random());
  const randomId = mentors[randomIdx];
  console.log("requesting call state from", randomId);
  call.sendAppMessage(
    {
      message: "request-call-state",
    },
    randomId
  );
}
