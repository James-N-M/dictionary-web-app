import {
  setTheme,
  getTheme,
  toggleTheme,
  toggleIcon,
} from "./modules/theme.mjs";

import { changeFont } from "./modules/font.mjs";

const bodyElement = document.getElementsByTagName("body")[0];

const fontSelect = document.getElementById("font-select");
// todo on change broken 
fontSelect.onchange = changeFont(bodyElement, fontSelect.value);

const themeToggle = document.getElementById("theme-toggle");
themeToggle.onchange = toggleTheme;

let theme = getTheme();

setTheme(theme);

if (theme === "dark") {
  themeToggle.checked = true;
  toggleIcon();
}
