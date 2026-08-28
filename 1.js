(() => {
  if (window.__CHAOS__) {
    console.log("😈 Chaos!");
    return;
  }

  window.__CHAOS__ = true;

  const state = {
    running: true,
    timers: [],
    intervals: [],
    nodes: []
  };

  const style = document.createElement("style");
  style.id = "__chaos_style";

  style.textContent = `
    @keyframes chaosPulse {
      0%,100% {
        box-shadow: 0 0 10px red;
      }
      50% {
        box-shadow: 0 0 60px red, 0 0 100px #f00;
      }
    }

    #__chaos_root {
      position: fixed;
      inset: 0;
      z-index: 2147483647;
      pointer-events: none;
      overflow: hidden;
      font-family: monospace;
    }

    .__chaos_error {
      position: absolute;
      width: min(430px, 80vw);
      background: #080808;
      color: #fff;
      border: 2px solid #f00;
      box-shadow: 0 0 30px red;
      padding: 20px;
      pointer-events: auto;
      animation: chaosPulse .5s infinite;
      font-family: monospace;
    }

    .__chaos_error h2 {
      color: red;
      margin-top: 0;
    }

    .__chaos_error button {
      background: #d00;
      color: white;
      border: 0;
      padding: 8px 20px;
      font-weight: bold;
      cursor: pointer;
    }
  `;

  document.head.appendChild(style);
  state.nodes.push(style);

  const root = document.createElement("div");
  root.id = "__chaos_root";

  document.body.appendChild(root);
  state.nodes.push(root);

  function random(min, max) {
    return Math.random() * (max - min) + min;
  }

  function addTimer(fn, delay) {
    const id = setTimeout(fn, delay);
    state.timers.push(id);
    return id;
  }

  function createError() {
    if (!state.running) return;

    const error = document.createElement("div");

    error.className = "__chaos_error";

    error.style.left = random(5, 65) + "vw";
    error.style.top = random(5, 70) + "vh";

    const code =
      Math.floor(Math.random() * 0xffffffff)
        .toString(16)
        .toUpperCase();

    error.innerHTML = `
      <h2>☠ CRITICAL ERROR</h2>

      <p>
        An unexpected problem has occurred.
      </p>

      <p>
        Error code:
        <strong>0x${code}</strong>
      </p>

      <p style="color:#777">
        Attempting recovery...
      </p>

      <button>DISMISS</button>
    `;

    error.querySelector("button").onclick = () => {
      error.remove();
    };

    root.appendChild(error);

    addTimer(() => {
      if (error.isConnected) {
        error.remove();
      }
    }, random(5000, 9000));
  }

  // יצירת שגיאות בלבד
  state.intervals.push(
    setInterval(() => {
      createError();
    }, 1000)
  );

  // ESC = יציאה נקייה
  function stopChaos(event) {
    if (event.key !== "Escape") return;

    state.running = false;

    state.intervals.forEach(clearInterval);
    state.timers.forEach(clearTimeout);

    document.removeEventListener("keydown", stopChaos);

    state.nodes.forEach(node => {
      if (node && node.remove) node.remove();
    });

    delete window.__CHAOS__;

    console.log("😇 CHAOS TERMINATED");
  }

  document.addEventListener("keydown", stopChaos);

  console.log(
    "%c☠ ERROR MODE ACTIVATED ☠",
    "color:red;font-size:25px;font-weight:bold"
  );

  console.log(
    "%cPress ESC to stop.",
    "color:#0f0;font-size:16px"
  );
})();
