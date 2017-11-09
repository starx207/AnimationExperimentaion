// This example taken from: https://css-tricks.com/emulating-css-timing-functions-javascript/

const NF = 50,
      S  = document.body.style;

let rID = null, f = 0, type = 0;

function stopAni() {
  cancelAnimationFrame(rID);
  rID = null;  
};

function update() {	
	let k = ++f/NF;
  
  S.setProperty('--stop',
    `${+(k*100).toFixed(2)}%`);
  
  if(!(f%NF)) {
    f = 0;
    S.setProperty('--gc1', `var(--c${type})`);
    type = 1 - type;
    S.setProperty('--gc0', `var(--c${type})`);
    S.setProperty('--stop', `0%`);
    stopAni();
    return;
  }
  
  rID = requestAnimationFrame(update);
};

addEventListener('click', e => {
  if(!rID) {
    S.setProperty('--x', `${e.clientX}px`);
    S.setProperty('--y', `${e.clientY}px`);
    update();
  }
}, false);