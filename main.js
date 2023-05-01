import {
  setTheme,
  getTheme,
  toggleTheme,
  toggleIcon,
} from "./modules/theme.mjs";

const themeToggle = document.getElementById("theme-toggle");
themeToggle.onchange = toggleTheme;

let theme = getTheme();

setTheme(theme);

if (theme === "dark") {
  themeToggle.checked = true;
  toggleIcon();
}
