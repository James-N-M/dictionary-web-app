import {
  setTheme,
  getTheme,
  toggleTheme,
  toggleIcon,
} from "./modules/theme.mjs";

import { changeFont } from "./modules/font.mjs";

const fontSelect = document.getElementById("font-select");
fontSelect.addEventListener("change", (event) => {
  changeFont(event.target.value);
});

const themeToggle = document.getElementById("theme-toggle");
themeToggle.onchange = toggleTheme;

let theme = getTheme();

setTheme(theme);

if (theme === "dark") {
  themeToggle.checked = true;
  toggleIcon();
}
