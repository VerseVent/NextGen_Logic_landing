const popupLinks = document.querySelectorAll('.popup-link');
const lockPadding = document.querySelectorAll(".lock-padding");

let unlock = true;

const timeout = 800;

if(popupLinks.length > 0){
  for(let index = 0; index < popupLinks.length; index++){
    const popupLink = popupLinks[index];
    popupLink.addEventListener("click", function(e) {
      const popupName = popupLink.getAttribute('href').replace('#','');
      const curentPopup = document.getElementById(popupName);
      popupOpen(curentPopup);
      e.preventDefault();
    });
  }
}
const popupCloseIcon = document.querySelectorAll('.close-popup');
if(popupCloseIcon.length>0) {
  for(let index = 0; index < popupCloseIcon.length; index++){
    const el = popupCloseIcon[index];
    el.addEventListener('click', function(e) {
      popupClose(el.closest('.popup'));
      e.preventDefault();
    });
  }
}
function popupOpen(curentPopup){
  if(curentPopup && unlock){
    const popupActive = document.querySelector(".popup.open");
    if(popupActive) {
      popupClose(popupActive, false);
    }
    curentPopup.classList.add('open');
    curentPopup.addEventListener("click", function(e) {
      if(!e.target.closest('.popup__content')) {
        popupClose(e.target.closest('.popup'));
      }
    });
  }
}
function popupClose(popupActive, doUnlock = true){
  if(unlock) {
    popupActive.classList.remove('open');
  }
}

document.addEventListener('keydown', function(e){
  if(e.which === 27) {
    const popupActive = document.querySelector('.popup.open');
    popupClose(popupActive);
  }
});
