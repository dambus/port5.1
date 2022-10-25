const bodyBlock = function () {
  // document.body.style.position = "fixed";
  document.body.style.overflow = "hidden";
  nav.style.display = "none";
};

const bodyUnblock = function () {
  // document.body.style.position = "auto";
  document.body.style.overflow = "auto";
  if (vw >= 992) nav.style.display = "flex";
};

function loadModData(modlink) {
  var con = document.getElementById("ext-content"),
    xhr = new XMLHttpRequest();

  xhr.onreadystatechange = function (e) {
    if (xhr.readyState == 4 && xhr.status == 200) {
      con.innerHTML = xhr.responseText;
    } else {
      con.innerHTML = `<div class="container">
      <div class="row">
        <img class="img img-fluid w-25" src="assets/img/illustrations/Blue-Robot.svg" alt="">
        <h3>Current project has no showcase</h3>
        <p>Sorty for letting you down</p>
      </div>
    </div>`;
    }
  };

  xhr.open("GET", `${modlink}.html`, true);
  xhr.setRequestHeader("Content-type", "text/html");
  xhr.send();
}

const modalBtns = document.querySelectorAll(".mod-btn");
modalBtns.forEach((el) => {
  el.addEventListener("click", function () {
    let modal = document.getElementById("myModal");
    let link = el.getAttribute("data-modLink");
    modal.style.display = "block";
    bodyBlock();
    const span = modal.getElementsByClassName("close")[0];
    const emptyModal = function () {
      modal.innerHTML = "";
    };
    span.onclick = function () {
      modal.style.display = "none";
      bodyUnblock();
    };

    window.onclick = function (event) {
      if (!event.target.isSameNode(modal)) return;
      modal.style.display = "none";
      bodyUnblock();
    };
    loadModData(link);
  });
});
