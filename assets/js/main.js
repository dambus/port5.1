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
const projectTitles = document.querySelectorAll(".project_boxes-project-name");
const projectWrappers = document.querySelectorAll(".project-wrapper");
const projectLinks = document.querySelectorAll(".project-links");
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

//////////////////////////////////////////////////////
////////////      REVEAL SECTIONS        /////////////
//////////////////////////////////////////////////////

const revealSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;
  entry.target.classList.remove("section--hidden");
  observer.unobserve(entry.target);
};

// const hideSections = function (entries, observer) {
//   const [entry] = entries;
//   if (!entry.isIntersecting) entry.target.classList.add("section--hidden");
//   // observer.unobserve(entry.target);
// };

// const sectionObserver2 = new IntersectionObserver(hideSections, {
//   root: null,
//   threshold: 0.26,
// });

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.25,
  rootMargin: `${1.5 * navHeight}px`,
});
// allSection.forEach(function (section) {
//   sectionObserver2.observe(section);
// });
allSection.forEach(function (section) {
  section.classList.add("section--hidden");
  sectionObserver.observe(section);
  // section.classList.add("section--hidden");
});

//////////////////////////////////////////////////////
////////////         HEADER STUFF        /////////////
//////////////////////////////////////////////////////

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
        pos * 4
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

//////////////////////////////////////////////////////
////////////      TYPEWRITER EFFECT      /////////////
//////////////////////////////////////////////////////

const typeWriterEffect = function (entries, observer) {
  const [entry] = entries;
  // console.log(entries);
  if (!entry.isIntersecting) {
    entry.target.classList.remove("typewriter");
  } else {
    entry.target.classList.add("typewriter");
  }
  // observer.unobserve(entry.target);
};

const titleObserver = new IntersectionObserver(typeWriterEffect, {
  root: null,
  treshold: 0.5,
  rootMargin: `-${navHeight}px`,
});

projectTitles.forEach(function (title) {
  titleObserver.observe(title);
});

//////////////////////////////////////////////////////
////////////        PROJECT LINKS        /////////////
//////////////////////////////////////////////////////

const showProjectOverlay = function () {
  projectWrappers.forEach((el) => {
    el.addEventListener("click", function (evt) {
      if ((evt.target.nextElementSibling.style.opacity = "0")) {
        evt.target.nextElementSibling.style.cssText = "opacity:1; height:100%";
      }
      // el.removeEventListener("click", arguments.callee);

      document.body.addEventListener("click", (evt2) => {
        if (evt !== evt2) {
          evt.target.nextElementSibling.style.cssText = "opacity:0; height:0";
        } else {
          evt.target.nextElementSibling.style.cssText =
            "opacity:1; height:100%";
        }
      });
    });
  });
};

showProjectOverlay();

//////////////////////////////////////////////////////
////////////       FINISHER HEADER       /////////////
//////////////////////////////////////////////////////
new FinisherHeader({
  count: 5,
  size: {
    min: 900,
    max: 1600,
    pulse: 0,
  },
  speed: {
    x: {
      min: 0,
      max: 0.3,
    },
    y: {
      min: 0,
      max: 0,
    },
  },
  colors: {
    background: "#1b262c",
    particles: ["#3282b8", "#0f4c75", "#bbe1fa"],
  },
  blending: "overlay",
  opacity: {
    center: 0.15,
    edge: 0.05,
  },
  skew: 0,
  shapes: ["s"],
});
