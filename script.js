const bread = document.getElementById("bread");
const pigeonHitbox = document.getElementById("pigeon-hitbox");
const counterEl = document.getElementById("pigeon-counter");

const STORAGE_KEY = "pigeonPeopleCount";
const DEFAULT_COUNT = 0;

let currentCount = Number.parseInt(
  window.localStorage.getItem(STORAGE_KEY) || String(DEFAULT_COUNT),
  10
);

const state = {
  dragging: false,
  offsetX: 0,
  offsetY: 0,
  startLeft: 0,
  startTop: 0,
};

function renderCount() {
  counterEl.textContent = `Look! ${currentCount.toLocaleString()} nice people have fed the pigeon. Aren’t you glad you’re part of them?`;
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
  if (!state.dragging) {
    return;
  }

  event.preventDefault();
  const point = pointerPosition(event);
  const maxLeft = window.innerWidth - bread.offsetWidth;
  const maxTop = window.innerHeight - bread.offsetHeight;
  const nextLeft = clamp(point.x - state.offsetX, 0, maxLeft);
  const nextTop = clamp(point.y - state.offsetY, 0, maxTop);

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

bread.addEventListener("mousedown", onDragStart);
bread.addEventListener("touchstart", onDragStart, { passive: false });

renderCount();
