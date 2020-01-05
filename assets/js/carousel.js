var window = document.getElementById('window'),
  carousel = document.getElementById('carousel'),
  prev = document.getElementById('prev'),
  next = document.getElementById('next');



function slide(wrapper, items, prev, next) {
  console.log("slide");
  var posX1 = 0,
    posX2 = 0,
    posInitial,
    posFinal,
    threshold = 100,
    slides = items.getElementsByClassName('slide'),
    slidesLength = slides.length,
    slideSize = items.getElementsByClassName('slide')[0].offsetWidth,
    firstSlide = slides[0],
    lastSlide = slides[slidesLength - 1],
    cloneFirst = firstSlide.cloneNode(true),
    cloneLast = lastSlide.cloneNode(true);

  items.insertBefore(cloneLast, firstSlide);
  //wrapper.classList.add('loaded');
  // Mouse events
  items.onmousedown = dragStart;

  // Touch events
  items.addEventListener('touchstart', dragStart);
  items.addEventListener('touchend', dragEnd);
  items.addEventListener('touchmove', dragAction);

  // Transition events
  //items.addEventListener('transitionend', checkIndex);

  function dragStart(e) {
    console.log("dragStart");
    e = e || window.event;
    e.preventDefault();
    posInitial = e.screenX;

    if (e.type == 'touchstart') {
      posX1 = e.touches[0].screenX;
    } else {
      posX1 = e.screenX;
      document.onmousemove = dragAction;
      document.onmouseup = dragEnd;
    }
  }

  function dragAction(e) {
    e = e || window.event;

    if (e.type == 'touchmove') {
      posX2 = posX1 - e.touches[0].screenX;
      posX1 = e.touches[0].screenX;
    } else {
      posX2 = posX1 - e.screenX;
      posX1 = e.screenX;
    }
    var itemsX = Number(getTranslateX(items));
    posX2 =  itemsX - posX2;
    items.style.transform = "translateX("+ posX2 + "px)";
  }

  function dragEnd(e) {
    if (e.type == 'touchend') {
      posFinal = e.touches[0].screenX;
    }
    else{
      posFinal = e.screenX;
    }
    if (posFinal - posInitial < -threshold) {
      shiftSlide(-1);
    } else if (posFinal - posInitial > threshold) {
      shiftSlide(1);
    } else {
      shiftSlide(0);
    }

    document.onmouseup = null;
    document.onmousemove = null;
    console.log("dragEnd");
  }

  function shiftSlide(dir) {
    items.classList.add('transition');

    if (items.classList.contains('transition')) {
      items.style.transform = "translateX("+(dir * slideSize)+"px)";
      if (dir == 1) {
        console.log("dir1");
        items.removeChild(slides[slidesLength]);
        items.insertBefore(slides[slidesLength -1].cloneNode(true), slides[0]);
      } else if (dir == -1) {
        items.appendChild(slides[1].cloneNode(true));
        items.removeChild(slides[0]);
      }
      else{

      }
      items.classList.remove('transition');
      items.style.transform = "translateX(0px)";
    }

    allowShift = false;
  }

  function getTranslateX(element) {
    // Suppose the transformed element is called "cover".
    computedStyle = window.getComputedStyle(element, null); // "null" means this is not a pesudo style.
    // You can retrieve the CSS3 matrix string by the following method.
    var matrix = computedStyle.getPropertyValue('transform');

    // Parse this string to obtain different attributes of the matrix.
    // This regexp matches anything looks like this: anything(1, 2, 3, 4, 5, 6);
    // Hence it matches both matrix strings:
    // 2d: matrix(1,2,3,4,5,6)
    // 3d: matrix3d(1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16);
    var matrixPattern = /^\w*\((((-?\d+)|(-?\d*\.-?\d+)),\s*)*((-?\d+)|(-?\d*\.-?\d+))\)/i;
    var matrixValue = [];
    if (matrixPattern.test(matrix)) { // When it satisfy the pattern.
      var matrixCopy = matrix.replace(/^\w*\(/, '').replace(')', '');
      matrixValue = matrixCopy.split(/\s*,\s*/);
    }
    return matrixValue[4];
  }
}
slide(window, carousel, prev, next);


