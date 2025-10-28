// ===============================
// 🎡 CARRUSEL AUTOMÁTICO DE CANALES
// ===============================
const carousel = document.getElementById("carouselCanales");
let scrollAmount = 0;

function autoScrollCarousel() {
  if (carousel) {
    scrollAmount += 2;
    if (scrollAmount >= carousel.scrollWidth - carousel.clientWidth) {
      scrollAmount = 0;
    }
    carousel.scrollTo({
      left: scrollAmount,
      behavior: "smooth",
    });
  }
}
setInterval(autoScrollCarousel, 50);

// ===============================
// 🎥 REPRODUCTOR DE CATÁLOGO (MP4 + YouTube + Embed + Radio)
// ===============================

// 🔹 Define tus fuentes de video o audio
const videoSources = {
  1: "https://www.w3schools.com/html/mov_bbb.mp4",
  2: "https://www.youtube.com/watch?v=dQw4w9WgXcQ", // enlace normal de YouTube
  3: "https://www.youtube.com/embed/N3OW3gtleeo",    // enlace embed de YouTube
  4: "https://www.w3schools.com/html/movie.mp4",
  5: "https://www.youtube.com/watch?v=N3OW3gtleeo",
  6: "https://stream.zeno.fm/koskyrpsbpsuv",         // 🎧 Radio en directo
  7: "https://www.youtube.com/embed/TsFDZG3Nw7M",
  8: "https://www.youtube.com/watch?v=ysz5S6PUM-U",
  9: "https://www.youtube.com/embed/tgbNymZ7vqY",
  10: ""
};

// Crear modal dinámicamente
const modal = document.createElement("div");
modal.classList.add("modal");
modal.innerHTML = `
  <div class="modal-content">
    <button class="modal-close">×</button>
    <div class="player-container"></div>
  </div>
`;
document.body.appendChild(modal);

const playerContainer = modal.querySelector(".player-container");
const closeBtn = modal.querySelector(".modal-close");

// ===============================
// 🔹 Función para abrir reproductor (video o radio)
// ===============================
function openVideo(source) {
  playerContainer.innerHTML = "";

  // 🎧 Si es un stream de radio (mp3, aac, o stream.)
  if (
    source.includes("stream") ||
    source.endsWith(".mp3") ||
    source.includes(".m3u") ||
    source.includes(".aac")
  ) {
    const audio = document.createElement("audio");
    audio.src = source;
    audio.controls = true;
    audio.autoplay = true;
    audio.classList.add("audio-player");

    // Estilo del modal más pequeño para radio
    modal.querySelector(".modal-content").classList.add("audio-mode");
    playerContainer.appendChild(audio);
  }

  // 🎬 Si es un video de YouTube (normal o embed)
  else if (source.includes("youtube.com") || source.includes("youtu.be")) {
    let embedUrl;

    // Si ya viene con /embed/, lo usamos tal cual
    if (source.includes("/embed/")) {
      embedUrl = source;
    }
    // Si es un enlace watch?v= o youtu.be, lo convertimos
    else if (source.includes("watch?v=")) {
      const videoId = source.split("v=")[1]?.split("&")[0];
      embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
    } else if (source.includes("youtu.be/")) {
      const videoId = source.split("youtu.be/")[1];
      embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
    }

    const iframe = document.createElement("iframe");
    iframe.src = embedUrl;
    iframe.allow = "autoplay; encrypted-media";
    iframe.allowFullscreen = true;
    iframe.classList.add("yt-frame");
    playerContainer.appendChild(iframe);
    modal.querySelector(".modal-content").classList.remove("audio-mode");
  }

  // 🎞️ Si es un archivo de video directo (MP4, etc)
  else {
    const video = document.createElement("video");
    video.src = source;
    video.controls = true;
    video.autoplay = true;
    video.classList.add("video-player");
    playerContainer.appendChild(video);
    modal.querySelector(".modal-content").classList.remove("audio-mode");
  }

  modal.classList.add("active");
}

// ===============================
// 🖱️ Click en una tarjeta del catálogo
// ===============================
document.querySelectorAll(".video-card").forEach(card => {
  card.addEventListener("click", () => {
    const id = card.getAttribute("data-id");
    const source = videoSources[id];
    if (source) openVideo(source);
  });
});

// ===============================
// ❌ Cerrar modal
// ===============================
function closeModal() {
  modal.classList.remove("active");
  playerContainer.innerHTML = "";
  modal.querySelector(".modal-content").classList.remove("audio-mode");
}

closeBtn.addEventListener("click", closeModal);
modal.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});

// ===============================
// 🎬 Botón "Ver tráiler" del Hero
// ===============================
document.querySelector(".btn-hero")?.addEventListener("click", () => {
  openVideo("https://www.youtube.com/embed/ysz5S6PUM-U");
});
