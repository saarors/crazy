(() => {
  if (window.__CHAOS__) {
    console.log("😈");
    return;
  }

  window.__CHAOS__ = true;

  const original = {
    title: document.title,
    bodyTransform: document.body.style.transform,
    bodyFilter: document.body.style.filter,
    overflow: document.body.style.overflow
  };

  const state = {
    running: true,
    timers: [],
    intervals: [],
    nodes: []
  };

  const messages = [
    "SYSTEM FAILURE",
    "YOU SHOULDN'T BE HERE",
    "STOP CLICKING",
    "ACCESS DENIED",
    "WHAT DID YOU DO?!",
    "CRITICAL ERROR",
    "BROWSER COMPROMISED",
    "ARE YOU SURE?",
    "01001000 01000101 01001100 01010000",
    "RUNNING DIAGNOSTICS...",
    "MEMORY CORRUPTED",
    "DELETING SYSTEM32...",
    "JUST KIDDING 😈",
    "WARNING ⚠️",
    "NO ESCAPE",
    "HELLO, HUMAN",
    "404: REALITY NOT FOUND",
    "CHAOS LEVEL: 9999",
    "████████████████",
    "REBOOTING..."
  ];

  // =========================
  // STYLE
  // =========================

  const style = document.createElement("style");
  style.id = "__chaos_style";

  style.textContent = `
    @keyframes chaosGlitch {
      0%   { transform: translate(0); filter:hue-rotate(0deg); }
      20%  { transform: translate(-8px, 4px); }
      40%  { transform: translate(8px, -4px); }
      60%  { transform: translate(-4px, -7px); }
      80%  { transform: translate(7px, 5px); }
      100% { transform: translate(0); }
    }

    @keyframes chaosFlash {
      0%,100% { opacity:0; }
      10% { opacity:.8; }
      20% { opacity:0; }
      30% { opacity:.5; }
    }

    @keyframes chaosText {
      0% {
        opacity:0;
        transform:scale(.1) rotate(-30deg);
      }
      25% {
        opacity:1;
        transform:scale(1.4) rotate(10deg);
      }
      100% {
        opacity:0;
        transform:scale(.7) translateY(-120px) rotate(30deg);
      }
    }

    @keyframes chaosSpin {
      from { transform:rotate(0deg); }
      to   { transform:rotate(360deg); }
    }

    @keyframes chaosPulse {
      0%,100% { box-shadow:0 0 10px red; }
      50% { box-shadow:0 0 60px red, 0 0 100px #f00; }
    }

    #__chaos_root {
      position:fixed;
      inset:0;
      z-index:2147483647;
      pointer-events:none;
      overflow:hidden;
      font-family:monospace;
    }

    #__chaos_flash {
      position:absolute;
      inset:0;
      background:red;
      opacity:0;
      mix-blend-mode:screen;
      pointer-events:none;
    }

    .__chaos_msg {
      position:absolute;
      color:#0f0;
      font-size:clamp(16px,4vw,52px);
      font-weight:900;
      white-space:nowrap;
      text-shadow:
        0 0 5px currentColor,
        0 0 15px currentColor,
        0 0 30px currentColor;
      animation:chaosText .8s forwards;
    }

    .__chaos_error {
      position:absolute;
      width:min(430px,80vw);
      background:#080808;
      color:#fff;
      border:2px solid #f00;
      box-shadow:0 0 30px red;
      padding:20px;
      pointer-events:auto;
      animation:chaosPulse .5s infinite;
      font-family:monospace;
    }

    .__chaos_error h2 {
      color:red;
      margin-top:0;
    }

    .__chaos_error button {
      background:#d00;
      color:white;
      border:0;
      padding:8px 20px;
      font-weight:bold;
      cursor:pointer;
    }

    #__chaos_terminal {
      position:absolute;
      left:3vw;
      bottom:3vh;
      width:min(600px,90vw);
      height:180px;
      padding:15px;
      box-sizing:border-box;
      background:rgba(0,0,0,.9);
      color:#00ff55;
      border:1px solid #00ff55;
      box-shadow:0 0 30px #00ff55;
      font-size:13px;
      overflow:hidden;
      pointer-events:none;
    }

    #__chaos_matrix {
      position:absolute;
      inset:0;
      width:100%;
      height:100%;
      opacity:.18;
      pointer-events:none;
    }

    .__chaos_warning {
      position:absolute;
      color:#000;
      background:#ffe600;
      padding:7px 15px;
      font-weight:bold;
      border:2px solid #000;
      box-shadow:4px 4px 0 #000;
      transform:rotate(-3deg);
      pointer-events:none;
    }
  `;

  document.head.appendChild(style);
  state.nodes.push(style);

  // =========================
  // ROOT
  // =========================

  const root = document.createElement("div");
  root.id = "__chaos_root";

  root.innerHTML = `
    <canvas id="__chaos_matrix"></canvas>
    <div id="__chaos_flash"></div>

    <div id="__chaos_terminal">
      <div>root@chaos:~$ ./diagnostics</div>
      <div id="__chaos_logs"></div>
    </div>
  `;

  document.body.appendChild(root);
  state.nodes.push(root);

  const flash = root.querySelector("#__chaos_flash");
  const canvas = root.querySelector("#__chaos_matrix");
  const ctx = canvas.getContext("2d");
  const logs = root.querySelector("#__chaos_logs");

  // =========================
  // MATRIX
  // =========================

  let matrixAnimation;

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  resizeCanvas();

  window.addEventListener("resize", resizeCanvas);

  const chars =
    "01アイウエオカキクケコサシスセソABCDEFGHIJKLMNOPQRSTUVWXYZ#$%@";

  let fontSize = 14;
  let columns = Math.ceil(canvas.width / fontSize);
  let drops = Array(columns).fill(1);

  function matrix() {
    if (!state.running) return;

    ctx.fillStyle = "rgba(0,0,0,.08)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#0f0";
    ctx.font = `${fontSize}px monospace`;

    columns = Math.ceil(canvas.width / fontSize);

    if (drops.length !== columns) {
      drops = Array(columns).fill(1);
    }

    for (let i = 0; i < drops.length; i++) {
      const text = chars[Math.floor(Math.random() * chars.length)];

      ctx.fillText(
        text,
        i * fontSize,
        drops[i] * fontSize
      );

      if (
        drops[i] * fontSize > canvas.height &&
        Math.random() > .975
      ) {
        drops[i] = 0;
      }

      drops[i]++;
    }

    matrixAnimation = requestAnimationFrame(matrix);
  }

  matrix();

  // =========================
  // HELPERS
  // =========================

  function random(min, max) {
    return Math.random() * (max - min) + min;
  }

  function pick(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function addTimer(fn, delay) {
    const id = setTimeout(fn, delay);
    state.timers.push(id);
    return id;
  }

  function addInterval(fn, delay) {
    const id = setInterval(fn, delay);
    state.intervals.push(id);
    return id;
  }

  function createMessage() {
    if (!state.running) return;

    const msg = document.createElement("div");

    msg.className = "__chaos_msg";
    msg.textContent = pick(messages);

    msg.style.left = random(2, 85) + "vw";
    msg.style.top = random(5, 85) + "vh";
    msg.style.color =
      `hsl(${random(0, 360)},100%,55%)`;

    root.appendChild(msg);

    addTimer(() => msg.remove(), 900);
  }

  function flashScreen() {
    flash.style.background = pick([
      "#f00",
      "#00f",
      "#0ff",
      "#f0f",
      "#fff"
    ]);

    flash.style.opacity = random(.1, .5);

    addTimer(() => {
      flash.style.opacity = 0;
    }, random(30, 120));
  }

  // =========================
  // FAKE ERRORS
  // =========================

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

  // =========================
  // TERMINAL
  // =========================

  const terminalMessages = [
    "Scanning memory...",
    "Analyzing browser...",
    "Accessing /dev/null...",
    "Searching for sanity...",
    "Sanity not found.",
    "Injecting chaos...",
    "Bypassing reality...",
    "ERROR: reality.exe stopped responding",
    "Trying again...",
    "Failed successfully.",
    "Everything is completely fine.",
    "Probably."
  ];

  addInterval(() => {
    const line = document.createElement("div");

    line.textContent =
      `[${new Date().toLocaleTimeString()}] ${pick(terminalMessages)}`;

    logs.appendChild(line);

    while (logs.children.length > 7) {
      logs.firstChild.remove();
    }
  }, 350);

  // =========================
  // BODY CHAOS
  // =========================

  let rotation = 0;

  addInterval(() => {
    if (!state.running) return;

    rotation += random(-2.5, 2.5);

    document.body.style.transform = `
      rotate(${rotation}deg)
      scale(${random(.985, 1.02)})
    `;

    document.body.style.filter = `
      hue-rotate(${random(0, 360)}deg)
      contrast(${random(1, 1.5)})
      saturate(${random(1, 3)})
    `;

    document.title = pick(messages);

    if (Math.random() < .4) {
      flashScreen();
    }

    if (Math.random() < .25) {
      createError();
    }

    if (Math.random() < .8) {
      createMessage();
    }
  }, 140);

  // =========================
  // RANDOM WARNINGS
  // =========================

  addInterval(() => {
    const warning = document.createElement("div");

    warning.className = "__chaos_warning";

    warning.textContent = pick([
      "⚠ WARNING",
      "⚠ DO NOT PANIC",
      "⚠ SYSTEM UNSTABLE",
      "⚠ USER DETECTED",
      "⚠ CHAOS ACTIVE"
    ]);

    warning.style.left = random(0, 85) + "vw";
    warning.style.top = random(0, 90) + "vh";
    warning.style.transform =
      `rotate(${random(-15, 15)}deg)`;

    root.appendChild(warning);

    addTimer(() => warning.remove(), 1200);
  }, 700);

  // =========================
  // ESC = CLEAN EXIT
  // =========================

  function stopChaos(event) {
    if (event.key !== "Escape") return;

    state.running = false;

    state.intervals.forEach(clearInterval);
    state.timers.forEach(clearTimeout);

    cancelAnimationFrame(matrixAnimation);

    window.removeEventListener("resize", resizeCanvas);
    document.removeEventListener("keydown", stopChaos);

    document.body.style.transform =
      original.bodyTransform;

    document.body.style.filter =
      original.bodyFilter;

    document.body.style.overflow =
      original.overflow;

    document.title = original.title;

    state.nodes.forEach(node => {
      if (node && node.remove) node.remove();
    });

    delete window.__CHAOS__;

    console.clear();

    console.log(
      "%c😇 CHAOS TERMINATED",
      "color:#0f0;font-size:25px;font-weight:bold"
    );

    console.log(
      "Everything is fine. Probably."
    );
  }

  document.addEventListener("keydown", stopChaos);

  console.clear();

  console.log(
    "%c☠ CHAOS MODE 2.0 ACTIVATED ☠",
    "color:red;font-size:30px;font-weight:900"
  );

  console.log(
    "%cPress ESC to escape the chaos.",
    "color:#0f0;font-size:16px"
  );
})();
