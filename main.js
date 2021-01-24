// Particles Background setup
var homeParticles = Particles();
var illustrationParticles = Particles();

function ParticlesInit(mode) {
  var color = mode === "dark" ? "rgb(150, 65, 255)" : "rgb(255, 92, 92)";
  var params = { maxParticles: 500, color };

  homeParticles.init({
    selector: "#home canvas",
    ...params,
  });

  illustrationParticles.init({
    // script

    selector: "#illustration canvas",
    ...params,
  });
}

const toggle = document.querySelector('input[type="checkbox"]');
const themeIcon = document.querySelector("#mode-switcher i");
const themeText = document.querySelector("#mode-switcher span");
const illustrations = document.getElementsByTagName("img");

function changeIllustrations(mode) {
  var currentMode = mode === "dark" ? "light" : "dark";
  for (let i = 0; i < illustrations.length; i++) {
    illustrations[i].src = illustrations[i].src.replace(currentMode, mode);
  }
}

function changeMode(mode) {
  var remove, add;
  if (mode === "light") {
    remove = "fa-moon";
    add = "fa-sun";
  } else {
    remove = "fa-sun";
    add = "fa-moon";
  }
  changeIllustrations(mode);
  ParticlesInit(mode);
  document.documentElement.setAttribute("data-theme", mode);
  themeIcon.classList.replace(remove, add);
  themeText.textContent = mode;
  localStorage.setItem("mode", mode);
}

function switchMode(event) {
  if (event.target.checked) {
    changeMode("dark");
  } else {
    changeMode("light");
  }
}

// event listners
toggle.addEventListener("change", switchMode);

// on Load
// local stoage
var currentMode = localStorage.getItem("mode")
  ? localStorage.getItem("mode")
  : "light";
if (currentMode === "light") {
  ParticlesInit(currentMode);
} else {
  toggle.checked = true;
  changeMode(currentMode);
}
