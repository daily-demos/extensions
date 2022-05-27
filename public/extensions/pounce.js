import Socket from "./socketiostate.js";
let state, props, socket;
let pounced = false;
let callback, soloCallback;
let key = "pounce";

function go() {
  pounced = true;
  callback();
}

function stop() {
  pounced = false;
  soloCallback();
}

let self;
export default self = {
  connect: function (p) {
    props = p;
    let key = `${p.domain}/${p.room}/pounce`;
    socket = new Socket({ key });
    socket.onStateUpdate((s) => {
      state = s;
      if (state.clients > 1 && pounced === false) {
        go();
      }

      if (state.clients == 1 && pounced === true) {
        stop();
      }
    });
    socket.connect();
  },
  onJoin: function (cb) {
    callback = cb;
  },
  onSolo: function (cb) {
    soloCallback = cb;
  },
};
