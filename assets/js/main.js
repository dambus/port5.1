// selecting components
const nav = document.querySelector(".nav");
const navitem = document.querySelectorAll(".nav_item");
const navLink = document.querySelectorAll(".nav_link");
const header = document.querySelector("header");
const section1 = document.querySelector("#work");

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
console.log(navHeight);
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
const allSection = document.querySelectorAll("section");
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
  threshold: 0.45,
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
