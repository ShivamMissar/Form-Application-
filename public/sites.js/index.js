let slide = 0;
startSlideShow();

function startSlideShow() {
    let slides = document.getElementsByClassName("slide");
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slide++;

    if (slide > slides.length) {
        slide = 1;
    }
    slides[slide - 1].style.display = "block";
    setTimeout(startSlideShow, 5000);
}

