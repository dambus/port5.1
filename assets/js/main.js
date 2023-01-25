// selecting components
const allSection = document.querySelectorAll("section");
const nav = document.getElementById("navigation");
const logo = document.querySelector(".logo");
const navitem = document.querySelectorAll(".nav_item");
const navLink = document.querySelectorAll(".nav_link");
const header = document.querySelector(".header");
const headerTitle = document.querySelector(".header_title");
// const section1 = document.querySelector("#work");
const designBtn = document.querySelector(".design");
const designContent = document.querySelector(".design_content");
const overlay = document.querySelector(".overlay");
const allDataButtons = document.querySelectorAll("[data-color]");
const projectTitles = document.querySelectorAll(".project_boxes-project-name");
const projectWrappers = document.querySelectorAll(".project-wrapper");
const projectLinks = document.querySelectorAll(".project-links-lg");
const projectCards = document.querySelectorAll(".project-card");

//////////////////////////////////////////////////////
//////////       PAGE NAVIGATION       ///////////////
//////////////////////////////////////////////////////
document.querySelector(".nav_item").addEventListener("click", function (e) {
  e.preventDefault();
  if (e.target.classList.contains("nav_link")) {
    const id = e.target.getAttribute("href");
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

//////////////////////////////////////////////////////
////////////      STICKY NAVIGATION      /////////////
//////////////////////////////////////////////////////
const vw = Math.max(
  document.documentElement.clientWidth || 0,
  window.innerWidth || 0
);

const navHeight = nav.getBoundingClientRect().height;
console.log(navHeight);

const stickyNav = function (entries) {
  const [entry] = entries;
  // console.log(entry);
  console.log(vw);
  if (vw >= 992) {
    if (!entry.isIntersecting) {
      nav.classList.add("fixed-style");
      logo.classList.add("smaller-logo");
    } else {
      nav.style.position = "";
      nav.classList.remove("fixed-style");
    }
  }
};
const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0.1,
  rootMargin: `-${navHeight}px`,
  // rootMargin: "128px",
});
headerObserver.observe(header);

//////////////////////////////////////////////////////
////////////         ACTIVE LINKS        /////////////
//////////////////////////////////////////////////////
const sections = document.querySelectorAll("section");
console.log(navLink.innerHTML);
window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (scrollY > sectionTop - 200) {
      current = section.getAttribute("id");
    }
  });
  // console.log(current);
  navLink.forEach((link) => {
    link.classList.remove("active");

    if (link.classList.contains(current)) {
      link.classList.add("active");
    }
  });
});
//////////////////////////////////////////////////////
////////////      REVEAL SECTIONS        /////////////
//////////////////////////////////////////////////////

const revealSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) {
    entry.target.classList.remove("inview");
  } else {
    entry.target.classList.add("inview");
    // observer.unobserve(entry.target);
  }
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
  threshold: 0.4,
  // rootMargin: `${1.6 * navHeight}px`,
  rootMargin: "300px",
});

var viewport_width = window.innerWidth;
allSection.forEach(function (section) {
  if (viewport_width > 1024) {
    section.classList.add("appear");
    sectionObserver.observe(section);
  }
  // section.classList.add("section--hidden");
});

//////////////////////////////////////////////////////
////////////         HEADER STUFF        /////////////
//////////////////////////////////////////////////////

// const showOverlay = function (color) {
//   overlay.style.opacity = 0.9;
//   overlay.style.backgroundColor = color;
// };

// const hideOverlay = function () {
//   overlay.style.opacity = 0;
// };

// const callDataByLink = function () {
//   allDataButtons.forEach((el, pos) => {
//     el.addEventListener("mouseover", function () {
//       let overlayColor = el.getAttribute("data-color");
//       let calledElement = document.querySelector(
//         "." + `${el.getAttribute("data-calldiv")}`
//       );
//       calledElement.style.cssText = `opacity:1;transform:rotate(5deg) scale(1.2);top:${
//         pos * 2
//       }rem;`;
//       showOverlay(overlayColor);
//     });
//   });
// };

// const hideDataOut = function () {
//   allDataButtons.forEach((el) => {
//     el.addEventListener("mouseout", function () {
//       hideOverlay();
//       let calledElement = document.querySelector(
//         "." + `${el.getAttribute("data-calldiv")}`
//       );
//       calledElement.style.cssText =
//         "opacity:0;transform:scale(1) rotate(-5deg);";
//     });
//   });
// };

// callDataByLink();
// hideDataOut();

// headerTitle.addEventListener("mouseover", function () {
//   headerTitle.classList.remove("vibrate-1");
//   allDataButtons.forEach((el) => {
//     el.classList.add("underline");
//     el.style.cssText = "text-decoration: underline;";
//   });
// });

//////////////////////////////////////////////////////
////////////       FINISHER HEADER       /////////////
//////////////////////////////////////////////////////
// new FinisherHeader({
//   count: 5,
//   size: {
//     min: 376,
//     max: 1600,
//     pulse: 0,
//   },
//   speed: {
//     x: {
//       min: 0,
//       max: 0.3,
//     },
//     y: {
//       min: 0,
//       max: 0,
//     },
//   },
//   colors: {
//     background: "#1b262c",
//     particles: ["#3282b8", "#0f4c75", "#bbe1fa"],
//   },
//   blending: "overlay",
//   opacity: {
//     center: 0.15,
//     edge: 0.05,
//   },
//   skew: 0,
//   shapes: ["s"],
// });

//////////////////////////////////////////////////////
////////////      PROJECT SHOWCASE       /////////////
//////////////////////////////////////////////////////
const projectHoverIn = function () {
  projectCards.forEach((el) => {
    el.addEventListener("mouseover", function () {
      const targetDiv = el.querySelector(".project-links-lg");
      targetDiv.classList.add("moveUp");
      targetDiv.parentElement.classList.remove("goMiddle");
      targetDiv.parentElement.classList.add("goRight");
    });
  });
};
projectHoverIn();

const projectHoverOut = function () {
  projectCards.forEach((el) => {
    el.addEventListener("mouseout", function () {
      const targetDiv = el.querySelector(".project-links-lg");
      targetDiv.classList.remove("moveUp");
      targetDiv.parentElement.classList.add("goMiddle");
      targetDiv.parentElement.classList.remove("goRight");
    });
  });
};
projectHoverOut();

//////////////////////////////////////////////////////
////////////     VENDOR TYPE EFFECT      /////////////
//////////////////////////////////////////////////////
const typed = document.querySelector(".typed");
if (typed) {
  let typed_strings = typed.getAttribute("data-typed-items");
  typed_strings = typed_strings.split(",");
  new Typed(".typed", {
    strings: typed_strings,
    loop: true,
    typeSpeed: 50,
    backSpeed: 50,
    backDelay: 1600,
  });
}

const typedAlso = document.querySelector(".typed-also");
if (typed) {
  let typed_strings = typedAlso.getAttribute("data-typed-items");
  typed_strings = typed_strings.split(",");
  new Typed(".typed-also", {
    strings: typed_strings,
    loop: true,
    typeSpeed: 66,
    backSpeed: 50,
    backDelay: 2000,
  });
}
