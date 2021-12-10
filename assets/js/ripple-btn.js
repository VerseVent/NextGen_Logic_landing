const rippleBtn = document.getElementById("ripple");
let ripples = document.createElement("span");
let cleartimeout;

rippleBtn.addEventListener("mouseover", function (e) {
  let x = e.clientX - e.target.offsetLeft;
  let y = e.clientY - e.target.offsetTop;
  ripples.style.left = x + "px";
  ripples.style.top = y + "px";
  this.appendChild(ripples);

  cleartimeout = setTimeout(() => {
    ripples.remove();
  }, 800);
});

rippleBtn.addEventListener("mouseout", function () {
  ripples.remove(cleartimeout);
});
