import daily from "./core.js";

daily.afterCreateFrame((call) => {
  [
    "participant-left",
    "error",
    "camera-error",
    "started-camera",
    "recording-started",
    "recording-stopped",
    "recording-error",
    "app-message",
    "custom-button-click",
  ].forEach((e) => {
    call.on(e, (ev) => {
      console.log(`🔥 ${e}:`, ev);
    });
  });
});

export default {};
