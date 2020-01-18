var post = document.getElementById('post');

postTransform(items){
    items.onmousedown = clickStart;
    items.addEventListener('touchstart', clickStart);
    items.addEventListener('touchend', clickEnd);
    var posX1;
    function clickStart(e){
        e = e || window.event;
        e.preventDefault();
        posInitial = e.clientX;
        if (e.type == 'touchstart') {
        posX1 = e.touches[0].clientX;
        }
        items.style.transform = "none";
    }
    function clickEnd(e){
        items.style.transform = "none";
    }
}
postTransform(post);