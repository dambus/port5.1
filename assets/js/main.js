// selecting components
const allSection = document.querySelectorAll("section");
const nav = document.querySelector(".nav");
const navitem = document.querySelectorAll(".nav_item");
const navLink = document.querySelectorAll(".nav_link");
const header = document.querySelector("header");
const headerTitle = document.querySelector(".header_title");
const section1 = document.querySelector("#work");
const designBtn = document.querySelector(".design");
const designContent = document.querySelector(".design_content");
const overlay = document.querySelector(".overlay");
const allDataButtons = document.querySelectorAll("[data-color]");
const projectTitles = document.querySelectorAll("project_boxes-project-name");
//////////////////////////////////////////////////////
////////////     MENU FADE ANIMATION     /////////////
//////////////////////////////////////////////////////
const handleHover = function (e, opacity) {
  if (e.target.classList.contains("nav_link")) {
    const link = e.target;
    const siblings = link.closest("nav").querySelectorAll(".nav_link");
    const logo = link.closest("nav").querySelector("img");

    siblings.forEach((el) => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

nav.addEventListener("mouseover", handleHover.bind(0.5));
nav.addEventListener("mouseout", handleHover.bind(1));

//////////////////////////////////////////////////////
//////////       PAGE NAVIGATION       ///////////////
//////////////////////////////////////////////////////
document.querySelector(".nav_links").addEventListener("click", function (e) {
  e.preventDefault();
  if (e.target.classList.contains("nav_link")) {
    const id = e.target.getAttribute("href");
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

//////////////////////////////////////////////////////
////////////      STICKY NAVIGATION      /////////////
//////////////////////////////////////////////////////
// const initialCoords = section1.getBoundingClientRect();

// window.addEventListener("scroll", function () {
//   if (window.scrollY > initialCoords.top) {
//     nav.classList.add("sticky");
//   } else {
//     nav.classList.remove("sticky");
//   }
// });
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;
  // console.log(entry);
  if (!entry.isIntersecting) nav.style.position = "fixed";
  else nav.style.position = "";
};
const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0.1,
  rootMargin: `-${navHeight}px`,
  // rootMargin: "128px",
});
headerObserver.observe(header);

// REVEAL SECTIONS

const revealSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;
  entry.target.classList.remove("section--hidden");
  // observer.unobserve(entry.target);
};

const hideSections = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) entry.target.classList.add("section--hidden");
  // observer.unobserve(entry.target);
};

const sectionObserver2 = new IntersectionObserver(hideSections, {
  root: null,
  threshold: 0.26,
});

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.25,
});
allSection.forEach(function (section) {
  sectionObserver2.observe(section);
});
allSection.forEach(function (section) {
  sectionObserver.observe(section);
  // section.classList.add("section--hidden");
});

const showOverlay = function (color) {
  overlay.style.opacity = 0.9;
  overlay.style.backgroundColor = color;
};

const hideOverlay = function () {
  overlay.style.opacity = 0;
};

const callDataByLink = function () {
  allDataButtons.forEach((el, pos) => {
    el.addEventListener("mouseover", function () {
      let overlayColor = el.getAttribute("data-color");
      let calledElement = document.querySelector(
        "." + `${el.getAttribute("data-calldiv")}`
      );
      calledElement.style.cssText = `opacity:1;transform:rotate(5deg) scale(1.2);top:${
        pos * 6
      }rem;`;
      showOverlay(overlayColor);
    });
  });
};

const hideDataOut = function () {
  allDataButtons.forEach((el) => {
    el.addEventListener("mouseout", function () {
      hideOverlay();
      let calledElement = document.querySelector(
        "." + `${el.getAttribute("data-calldiv")}`
      );
      calledElement.style.cssText =
        "opacity:0;transform:scale(1) rotate(-5deg);";
    });
  });
};

callDataByLink();
hideDataOut();

headerTitle.addEventListener("mouseover", function () {
  headerTitle.classList.remove("vibrate-1");
  allDataButtons.forEach((el) => {
    el.classList.add("underline");
    el.style.cssText = "text-decoration: underline;";
  });
});
