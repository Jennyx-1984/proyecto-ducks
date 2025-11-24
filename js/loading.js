export function startLoading() {
  const bar = document.getElementById("loading-bar");
  const text = document.getElementById("loading-text");
  const loadingScreen = document.getElementById("loading-screen");
  const pageContent = document.getElementById("page-content");

  if (sessionStorage.getItem("indexCargado")) {
    if (loadingScreen) loadingScreen.style.display = "none";
    if (pageContent) pageContent.style.display = "block";
    return;
  }

  let progress = 0;
  const messages = [
    "Preparando patitos...",
    "Inflando flotadores...",
    "Limpiando código...",
    "Ordenando el corral...",
    "Compilando patitos...",
    "Casi listo..."
  ];

  const interval = setInterval(() => {
    progress += 5;
    if (bar) bar.style.width = progress + "%";

    if (text) {
      if (progress < 20) text.textContent = messages[0];
      else if (progress < 40) text.textContent = messages[1];
      else if (progress < 60) text.textContent = messages[2];
      else if (progress < 80) text.textContent = messages[3];
      else if (progress < 95) text.textContent = messages[4];
      else text.textContent = messages[5];
    }

    if (progress >= 100) {
      clearInterval(interval);
      if (loadingScreen) loadingScreen.style.display = "none";
      if (pageContent) pageContent.style.display = "block";
      sessionStorage.setItem("indexCargado", "true");
    }
  }, 150);
}

