(function () {
  console.log("%cCode by @vudovn", "color: red; font-size: 40px;");
  // Chặn F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U
  document.addEventListener("keydown", function (event) {
    if (
      event.keyCode === 123 || // F12
      (event.ctrlKey &&
        event.shiftKey &&
        (event.keyCode === 73 || event.keyCode === 74)) || // Ctrl+Shift+I/J
      (event.ctrlKey && event.keyCode === 85) // Ctrl+U
    ) {
      event.preventDefault();
    }
  });

  // Chặn chuột phải
  document.addEventListener("contextmenu", function (event) {
    event.preventDefault();
  });

  // Phát hiện DevTools đang mở
  setInterval(function () {
    const before = new Date().getTime();
    debugger;
    const after = new Date().getTime();
    if (after - before > 100) {
      console.clear();
      alert("Adu hacker!");
      window.location.href = "/";
    }
  }, 1000);
})();
