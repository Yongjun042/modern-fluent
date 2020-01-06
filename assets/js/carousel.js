var window = document.getElementById('window'),
  carousel = document.getElementById('carousel');

function slide(wrapper, items) {
  var posX1 = 0,
    posX2 = 0,
    posInitial,
    posFinal,
    threshold = 100,
    slides = items.getElementsByClassName('slide'),
    slidesLength = slides.length,
    slideSize = items.getElementsByClassName('slide')[0].offsetWidth;

  initOrder();

  // Mouse events
  items.onmousedown = dragStart;

  // Touch events
  items.addEventListener('touchstart', dragStart);
  items.addEventListener('touchend', dragEnd);
  items.addEventListener('touchmove', dragAction);

  // Transition events
  //items.addEventListener('transitionend', checkIndex);

  function dragStart(e) {
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
    posX2 = itemsX - posX2;
    items.style.transform = "translateX(" + posX2 + "px)";
  }

  function dragEnd(e) {
    if (e.type == 'touchend') {
      posFinal = e.touches[0].screenX;
    }
    else {
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
  }

  function shiftSlide(dir) {
    items.classList.add('transition');

    if (items.classList.contains('transition')) {
      items.style.transform = "translateX(" + (dir * slideSize) + "px)";
      if (dir == 1) {
        changeOrder(1);
      } else if (dir == -1) {
        changeOrder(-1);
      }
      else {
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

  function initOrder() {
    var now = window.location.href;
    var i, count = 0;
    for (i = 0; i < slidesLength; i++) {
      slides[i].style.order = i;
    }
    for (i = 0; i < slidesLength; i++) {
      if (now == slides[i].getElementsByTagName('a')[0].getAttribute('href')) {
        break;
      }
      count = count + 1;
    }
    slides[count].getElementsByTagName('a')[0].style.color = 'darkorange';
    changeOrder(-count);

  }

  function changeOrder(dir) {
    //css order로 바꾸기
    var order = [];
    var i;
    for (i = 0; i < slidesLength; i++) {
      order[i] = Number(slides[i].style.getPropertyValue('order'));
    }
    for (i = 0; i < slidesLength; i++) {
      if (dir > 0) {
        order[i] = order[i] + dir - slidesLength;
      }
      else {
        order[i] = order[i] + dir;
      }
      if (order[i] < 0) {
        order[i] = order[i] + slidesLength;
      }
    }
    console.log(order);
    for (i = 0; i < slidesLength; i++) {
      slides[i].style.order = order[i];
    }
  }
}
slide(window, carousel);


