// Card interface
class Card {
    constructor(node, position) {
      this.node = node;
      this.position = position;
    }
  
    nextPosition() {
      let nextPosition = 1;
  
      if (this.position != 5) {
        nextPosition = this.position + 1;
      }
  
      return nextPosition;
    }
  
    prevPosition() {
      let prevPosition = 5;
  
      if (this.position != 1) {
        prevPosition = this.position - 1;
      }
  
      return prevPosition;
    }
  
    moveNext() {
      this.node.classList.replace(
        `position${this.position}`,
        `position${this.nextPosition()}`
      );
  
      this.position = this.nextPosition();
    }
  
    movePrev() {
      this.node.classList.replace(
        `position${this.position}`,
        `position${this.prevPosition()}`
      );
  
      this.position = this.prevPosition();
    }
  }
  
  // Initializations
  const [prevSlideCard, nextSlideCard] = document.querySelectorAll(".slide-container i");
  const slideContainer = document.querySelector('.slideContainer');
  const slideCards = [];
  let start;
  let allCards = document.querySelectorAll('.slide-card')

  for(let i = 0; i<allCards.length; i++){
    allCards[i].addEventListener("click", () => {
        slideCards.forEach((c) => {
          c.moveNext();
        });
      });
  }
  
  // Instantiate slideCards and populate slideCards array 
  document.querySelectorAll(".slide-card").forEach((e, pos = 0) => {
    pos += 1;
    slideCards.push(new Card(e, pos));
  });
  
  // Handle click events
  nextSlideCard.addEventListener("click", () => {
    slideCards.forEach((c) => {
      c.moveNext();
    });
  });
  
  prevSlideCard.addEventListener("click", () => {
    slideCards.forEach((c) => {
      c.movePrev();
    });
  });
  
  // Handle slide events
  slideContainer.addEventListener('touchstart', s => {
    start = s.targetTouches[0].screenX
  });
  
  slideContainer.addEventListener('touchend', e => {
    let end = e.changedTouches[0].screenX
  
    if(start < end) {
      slideCards.forEach((c) => {
        c.moveNext();
      });
    }
  
    if(start > end) {
      slideCards.forEach((c) => {
        c.movePrev();
      });
    }
  });