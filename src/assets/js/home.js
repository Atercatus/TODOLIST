const container = document.getElementById("jsHomeContainer");
const imgs = document.querySelectorAll("#jsImage");
const leftArrow = document.getElementById("jsLeftArrow");
const rightArrow = document.getElementById("jsRightArrow");
let imgIdx = 0;

const rightSlide = () => {
  imgIdx = (imgIdx + 1) % 2;
  slide();
};

const leftSlide = () => {
  imgIdx--;
  if (imgIdx <= 0) imgIdx = 1;
  slide();
};

// const setSlider = () => {
//   setInterval(() => {
//     imgIdx = (imgIdx + 1) % 2;
//     slide(imgIdx);
//   }, 10000);
// };

const slide = () => {
  imgs.forEach(img => {
    img.classList.remove("img-show");
    img.classList.add("img-none");
  });

  imgs[imgIdx].classList.add("img-show");
};

const init = () => {
  leftArrow.addEventListener("click", leftSlide);
  rightArrow.addEventListener("click", rightSlide);
};

if (container) {
  init();
}
