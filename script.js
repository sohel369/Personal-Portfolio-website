let header = document.querySelector("header");
let navbar = document.querySelector(".navbar");
let menu = document.querySelector(".menu");
window.addEventListener("scroll", function () {
    header.classList.toggle("shadow", window.scrollY > 0)
});

document.addEventListener("DOMContentLoaded", function () {
    let images = document.querySelectorAll("#imgClick");

    images.forEach(function (image) {
        image.addEventListener("click", function () {
            let imgOpen = image.getAttribute("src");
            window.open(imgOpen, "_blank", "height=1000,width=8000");
        });
    });
});
menu.onclick = () => {
    navbar.classList.toggle("active");
};
window.onscroll = () => {
    navbar.classList.remove("active");

};
let darkmodeIcon = document.querySelector(".moon i");  // Target the <i> inside .moon
document.querySelector(".moon").addEventListener("click", function () {
    if (darkmodeIcon.classList.contains("fa-regular")) {
        darkmodeIcon.classList.replace("fa-regular", "fa-solid");
        document.body.classList.add("active");  // Activate dark mode
    } else {
        darkmodeIcon.classList.replace("fa-solid", "fa-regular");
        document.body.classList.remove("active");  // Deactivate dark mode
    }
});