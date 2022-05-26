let xns = [];
let afterCreateFrameHandlers = [];
let beforeCreateFrameHandlers = [];
let call = {};
// call extensions in the order they were received

/* start flexpanel */
export default {
  /* DailyIframe overrides
     TODO: Return a proxy object that allows for call object extension */

  createFrame: function (one, two) {
    let parentEl = one;
    let properties = two;
    console.log(
      "about to call before handlers, which are:",
      beforeCreateFrameHandlers
    );
    // your subclass should replace this if you need to do stuff
    // before the call frame is created
    for (let i = 0; i < beforeCreateFrameHandlers.length; i++) {
      let bcfh = beforeCreateFrameHandlers[i];
      // TODO: probably need to check argument count or something
      [parentEl, properties] = bcfh(parentEl, properties);
    }
    console.log(
      "about to create the frame for real, properties are ",
      properties
    );
    call = DailyIframe.createFrame(parentEl, properties);
    console.log("after create, this.call is", call);
    // now call all the after-stuff
    for (let i = 0; i < afterCreateFrameHandlers.length; i++) {
      let acfh = afterCreateFrameHandlers[i];
      acfh(call);
    }
    return call;
  },

  /* Hook stub methods
     You'll want to override these in your extension subclass */

  beforeCreateFrame: function (handler) {
    // implmement this in your subclass to do things and/or alter
    // what's about to be passed to the real createFrame.
    // make sure to return the args at the end.
    // presume we'll always have a parentEl for now
    beforeCreateFrameHandlers.push(handler);
  },

  afterCreateFrame: function (handler) {
    // you can use the dailyFrame property (from the parent class) in
    // your subclasses to do more setup here
    afterCreateFrameHandlers.push(handler);
  },
};
// foo bar test 2444444
// abcd
