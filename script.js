const bread = document.getElementById("bread");
const pigeonHitbox = document.getElementById("pigeon-hitbox");
const counterEl = document.getElementById("pigeon-counter");
const stage = document.querySelector(".stage");
const site = document.querySelector(".site");

const STORAGE_KEY = "pigeonFeedCount";
const LEGACY_STORAGE_KEYS = ["pigeonPeopleCount"];
const DEFAULT_COUNT = 9333;

function getStoredCount() {
  const keys = [STORAGE_KEY, ...LEGACY_STORAGE_KEYS];

  for (const key of keys) {
    const value = Number.parseInt(window.localStorage.getItem(key) || "", 10);

    if (Number.isFinite(value)) {
      return value;
    }
  }

  return DEFAULT_COUNT;
}

let currentCount = getStoredCount();

const state = {
  dragging: false,
  offsetX: 0,
  offsetY: 0,
  startLeft: 0,
  startTop: 0,
};

function initZoomLock() {
  const blockedKeys = new Set(["+", "=", "-", "_", "0"]);
  let lastTouchEnd = 0;

  window.addEventListener(
    "wheel",
    (event) => {
      if (event.ctrlKey || event.metaKey) {
        event.preventDefault();
      }
    },
    { passive: false }
  );

  window.addEventListener("keydown", (event) => {
    if (!(event.ctrlKey || event.metaKey)) {
      return;
    }

    if (
      blockedKeys.has(event.key) ||
      event.code === "NumpadAdd" ||
      event.code === "NumpadSubtract" ||
      event.code === "Numpad0"
    ) {
      event.preventDefault();
    }
  });

  document.addEventListener(
    "gesturestart",
    (event) => {
      event.preventDefault();
    },
    { passive: false }
  );

  document.addEventListener(
    "gesturechange",
    (event) => {
      event.preventDefault();
    },
    { passive: false }
  );

  document.addEventListener(
    "touchmove",
    (event) => {
      if (event.touches.length > 1) {
        event.preventDefault();
      }
    },
    { passive: false }
  );

  document.addEventListener(
    "touchend",
    (event) => {
      const now = Date.now();

      if (now - lastTouchEnd < 300) {
        event.preventDefault();
      }

      lastTouchEnd = now;
    },
    { passive: false }
  );
}

function renderCount() {
  if (!counterEl) {
    return;
  }

  counterEl.textContent = `Look! ${currentCount.toLocaleString("pt-BR")} nice people have fed the pigeon. Aren’t you glad you’re part of them?`;
}

function setBreadPosition(left, top) {
  bread.style.left = `${left}px`;
  bread.style.top = `${top}px`;
  bread.style.right = "auto";
  bread.style.bottom = "auto";
}

function pointerPosition(event) {
  if (event.touches && event.touches[0]) {
    return {
      x: event.touches[0].clientX,
      y: event.touches[0].clientY,
    };
  }

  if (event.changedTouches && event.changedTouches[0]) {
    return {
      x: event.changedTouches[0].clientX,
      y: event.changedTouches[0].clientY,
    };
  }

  return {
    x: event.clientX,
    y: event.clientY,
  };
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function onDragMove(event) {
  if (!state.dragging || !stage) {
    return;
  }

  event.preventDefault();
  const point = pointerPosition(event);
  const stageRect = stage.getBoundingClientRect();
  const siteHeight = Math.max(
    site?.scrollHeight || 0,
    document.documentElement.scrollHeight,
    window.innerHeight
  );
  const maxLeft = stageRect.width - bread.offsetWidth;
  const maxTop = siteHeight - bread.offsetHeight;
  const nextLeft = clamp(point.x - stageRect.left - state.offsetX, 0, maxLeft);
  const nextTop = clamp(window.scrollY + point.y - state.offsetY, 0, maxTop);

  setBreadPosition(nextLeft, nextTop);
}

function intersects() {
  const breadRect = bread.getBoundingClientRect();
  const pigeonRect = pigeonHitbox.getBoundingClientRect();

  return (
    breadRect.left < pigeonRect.right &&
    breadRect.right > pigeonRect.left &&
    breadRect.top < pigeonRect.bottom &&
    breadRect.bottom > pigeonRect.top
  );
}

function onDragEnd(event) {
  if (!state.dragging) {
    return;
  }

  event.preventDefault();
  state.dragging = false;
  bread.classList.remove("is-dragging");

  window.removeEventListener("mousemove", onDragMove);
  window.removeEventListener("mouseup", onDragEnd);
  window.removeEventListener("touchmove", onDragMove);
  window.removeEventListener("touchend", onDragEnd);

  if (!intersects()) {
    return;
  }

  window.alert("*CRUNCH*");
  currentCount += 1;
  window.localStorage.setItem(STORAGE_KEY, String(currentCount));
  renderCount();
}

function onDragStart(event) {
  if (!stage) {
    return;
  }

  event.preventDefault();
  const point = pointerPosition(event);
  const breadRect = bread.getBoundingClientRect();

  state.dragging = true;
  state.offsetX = point.x - breadRect.left;
  state.offsetY = point.y - breadRect.top;
  state.startLeft = breadRect.left;
  state.startTop = breadRect.top;

  bread.classList.add("is-dragging");

  window.addEventListener("mousemove", onDragMove);
  window.addEventListener("mouseup", onDragEnd);
  window.addEventListener("touchmove", onDragMove, { passive: false });
  window.addEventListener("touchend", onDragEnd, { passive: false });
}

bread.addEventListener("dragstart", (event) => {
  event.preventDefault();
});
bread.addEventListener("mousedown", onDragStart);
bread.addEventListener("touchstart", onDragStart, { passive: false });

initZoomLock();
renderCount();
