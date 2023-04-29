import { setTheme, getTheme, toggleTheme, toggleIcon } from "./modules/theme.mjs";

let theme = getTheme();

setTheme(theme);

if (theme === "dark") {
  document.getElementById("theme-toggle").checked = true;
  toggleIcon();
}

document.getElementById('theme-toggle').onchange = toggleTheme; 
