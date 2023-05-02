function changeFont(fontFamily) {
  const bodyElement = document.getElementsByTagName("body")[0];

  switch (fontFamily) {
    case "serif":
      bodyElement.style.fontFamily = "Times New Roman, Times, serif";
      break;
    case "sans-serif":
      bodyElement.style.fontFamily = "Arial, Helvetica, sans-serif";
      break;
    case "monospace":
      bodyElement.style.fontFamily = "Lucida Console, Courier New, monospace";
  }
}

export { changeFont };
