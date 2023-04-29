function setTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
}

function getTheme() {
  return (
    localStorage.getItem("theme") ||
    (window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light")
  );
}

function toggleTheme() {
  let currentTheme = document.documentElement.getAttribute("data-theme");

  var targetTheme = "light";

  if (currentTheme === "light") {
    targetTheme = "dark";
  }

  document.documentElement.setAttribute("data-theme", targetTheme);

  localStorage.setItem("theme", targetTheme);

  toggleIcon();
}

function toggleIcon() {
    let themeIcon = document.getElementById("theme-icon");
    if (themeIcon.classList.contains("fa-sun")) {
      themeIcon.classList.remove("fa-sun");
      themeIcon.classList.add("fa-moon");
    } else if (themeIcon.classList.contains("fa-moon")) {
      themeIcon.classList.remove("fa-moon");
      themeIcon.classList.add("fa-sun");
    }
  }

export { setTheme, getTheme, toggleTheme, toggleIcon };
