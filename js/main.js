import data from "./data.js";

const sections = document.querySelectorAll(".sections > div");
let landing = document.querySelector(".landing");
let men = document.querySelector(".men");
let women = document.querySelector(".women");
let acc = document.querySelector(".acc");
let shoes = document.querySelector(".shoes");
let cartSec = document.querySelector(".cartSec");
let links = document.querySelectorAll("nav li");
let cartI = document.querySelector("i.cart");
let purchased = document.querySelector(".purchased");
let popup = document.querySelector(".popup");
let added = document.querySelector(".added");
let addedI = document.querySelector("i.addedI");
let addedP = document.querySelector(".addedP");
let burger = document.querySelector(".burger");
let burgerA = document.querySelector(".burger span:first-child");
let burgerB = document.querySelector(".burger span:nth-child(2)");
let burgerC = document.querySelector(".burger span:last-child");
let nav = document.querySelector("nav");
let items;

let cartJoker;

if (window.localStorage.getItem("cart")) {
  cartJoker = JSON.parse(window.localStorage.getItem("cart"));
} else {
  cartJoker = [];
}

let burgerTrigger = false;

burger.addEventListener("click", () => {
  if (burgerTrigger == false) {
    burgerB.style.opacity = "0";
    burgerA.style.translate = "0 8px";
    burgerA.style.rotate = "-45deg";
    burgerA.style.backgroundColor = "var(--main-color)";
    burgerC.style.translate = "0 -8px";
    burgerC.style.rotate = "45deg";
    burgerC.style.backgroundColor = "var(--main-color)";
    nav.style.display = "block";
    setTimeout(() => {
      nav.style.left = "0";
    }, 0);
    burgerTrigger = true;
  } else if (burgerTrigger == true) {
    burgerB.style.opacity = "1";
    burgerA.style.translate = "";
    burgerA.style.rotate = "";
    burgerA.style.backgroundColor = "";
    burgerC.style.translate = "";
    burgerC.style.rotate = "";
    burgerC.style.backgroundColor = "";
    nav.style.left = "-120%";
    setTimeout(() => {
      nav.style.display = "none";
    }, 200);
    burgerTrigger = false;
  }
});

function noning() {
  sections.forEach((sec) => {
    sec.style.display = "none";
  });
}

function addToLocalStorage(arr) {
  window.localStorage.setItem("cart", JSON.stringify(arr));
}

function deleteFromLocal(itemID) {
  cartJoker = cartJoker.filter((item) => item.id != itemID);
  addToLocalStorage(cartJoker);
}

links.forEach((link) => {
  link.addEventListener("click", (e) => {
    noning();
    sections.forEach((sec) => {
      if (sec.className == link.id) {
        if (sec.className == "landing") {
          sec.style.display = "flex";
        } else {
          sec.style.display = "grid";
        }
      }
    });

    links.forEach((li) => {
      li.classList.remove("active");
    });
    e.target.classList.add("active");
  });
});

for (let i = 0; i < data.length; i++) {
  let item = document.createElement("div");
  item.classList.add("item");
  item.innerHTML = `
  <div class="img-holder">
    <img src="./media/Images/items/${data[i].img}" id="itemImg">
  </div>
  <p id="itemTitle" title="${data[i].title}">${data[i].title}</p>
  <div class="price-holder">
    <span id="itemPrice">${data[i].price}</span>
    <span class="currency">L.E</span>
  </div>
  `;
  if (data[i].category == "men") {
    men.append(item);
  } else if (data[i].category == "women") {
    women.append(item);
  } else if (data[i].category == "acc") {
    acc.append(item);
  } else if (data[i].category == "shoes") {
    shoes.append(item);
  }
  items = document.querySelectorAll(".item");
}

items.forEach((item) => {
  item.addEventListener("click", (e) => {
    const cartItem = {
      id: Date.now(),
      img: e.target.children[0].children[0].getAttribute("src"),
      title: e.target.children[1].innerHTML,
      price: +e.target.children[2].children[0].innerHTML,
    };
    cartJoker.push(cartItem);
    addToLocalStorage(cartJoker);
    addedP.innerHTML = `${cartItem.title} <span>Added!</span>`;
    addedI.style.animation = "scaleI 1s .7s alternate forwards";
    cartI.style.animation = "added 1s .2s";
    added.style.animation = "addPop 2s ease-in-out";
    setTimeout(() => {
      addedI.style.animation = "unset";
    }, 1700);
    setTimeout(() => {
      cartI.style.animation = "unset";
    }, 1200);
    setTimeout(() => {
      added.style.animation = "unset";
    }, 2000);
  });
});

cartI.addEventListener("click", () => {
  noning();
  links.forEach((li) => {
    li.classList.remove("active");
  });
  cartSec.style.display = "block";
  if (cartJoker.length > 0) {
    let total = 0;
    if (cartJoker.length > 1) {
      cartSec.style.minHeight = "fit-content";
      cartSec.style.paddingTop = "";
    }
    if (cartJoker.length == 1) {
      cartSec.style.minHeight = "calc(100vh - 450px)";
      cartSec.style.paddingTop = "80px";
    }
    cartSec.innerHTML = "";
    cartJoker.forEach((item) => {
      let itemRow = document.createElement("div");
      itemRow.classList.add("itemRow");
      itemRow.id = `${item.id}`;
      itemRow.innerHTML = `
      <div class="img-holder">
          <img src=".${item.img}">
        </div>
        <p class="title">${item.title}</p>
        <div class="price-holder">
          <span class="cartPrice">${item.price}</span>
          <span class="cartCurrency">L.E</span>
        </div>
        <i class="fa-solid fa-trash-can delI"></i>
      `;
      cartSec.append(itemRow);
      total += item.price;
    });

    let checkout = document.createElement("div");
    checkout.classList.add("checkout");
    checkout.innerHTML = `
    <div class="inps">
      <input type="text" placeholder="YOUR ADDRESS" id="address">
      <input type="number" placeholder="YOUR NUMBER" id="number">
    </div>
    <div class="check">
      <span class="total"><b>TOTAL: </b> ${total} L.E</span>
      <button class="checkout-btn">checkout</button>
    </div>
    `;
    let warnP = document.createElement("p");
    warnP.classList.add("warnP");
    warnP.innerHTML = "This isn't a Real store, DON'T put sensitive data in!";
    cartSec.append(warnP);
    cartSec.append(checkout);

    let address = document.getElementById("address");
    let number = document.getElementById("number");
    let checkoutBtn = document.querySelector(".checkout-btn");
    checkoutBtn.addEventListener("click", () => {
      if (address.value.length < 1 || address.value == "") {
        address.style.borderColor = "red";
        number.style.borderColor = "white";
      } else if (number.value.length < 1 || number.value == "") {
        number.style.borderColor = "red";
        address.style.borderColor = "white";
      } else {
        noning();
        landing.style.display = "flex";
        purchased.style.display = "block";
        purchased.style.opacity = "1";
        popup.style.animation = "pop 3s ease-in-out";
        window.localStorage.removeItem("cart");
        cartSec.innerHTML = `
        <span class="it">No Items In Cart</span>
        `;
        cartJoker = [];
        setTimeout(() => {
          purchased.style.opacity = "0";
          setTimeout(() => {
            purchased.style.display = "none";
          }, 200);
        }, 3000);
      }
    });

    let delI = document.querySelectorAll("i.delI");
    delI.forEach((i) => {
      i.addEventListener("click", () => {
        i.parentElement.remove();
        deleteFromLocal(i.parentElement.id);
        total = 0;
        cartJoker.forEach((item) => {
          total += item.price;
        });
        document.querySelector(
          "span.total"
        ).innerHTML = `<b>TOTAL: </b> ${total} L.E`;
        if (cartJoker.length < 1) {
          cartSec.innerHTML = `
          <span class="it">No Items In Cart</span>
          `;
          cartSec.style.minHeight = "calc(100vh - 300px)";
        }
      });
    });
  }
});

let addI = document.querySelector("i.addI");

items.forEach((item) => {
  item.onmouseover = () => {
    item.onpointermove = (event) => {
      const { clientX, clientY } = event;
      addI.style.display = "block";
      addI.style.left = `${clientX}px`;
      addI.style.top = `${clientY}px`;
    };
  };
  item.onmouseout = () => {
    addI.style.display = "none";
  };
});

particlesJS("particles-js", {
  particles: {
    number: { value: 80, density: { enable: true, value_area: 800 } },
    color: { value: "#ffffff" },
    shape: {
      type: "circle",
      stroke: { width: 0, color: "#000000" },
      polygon: { nb_sides: 5 },
      image: { src: "img/github.svg", width: 100, height: 100 },
    },
    opacity: {
      value: 0.5,
      random: false,
      anim: { enable: false, speed: 1, opacity_min: 0.1, sync: false },
    },
    size: {
      value: 3,
      random: true,
      anim: { enable: false, speed: 40, size_min: 0.1, sync: false },
    },
    line_linked: {
      enable: true,
      distance: 150,
      color: "#ffffff",
      opacity: 0.4,
      width: 1,
    },
    move: {
      enable: true,
      speed: 6,
      direction: "none",
      random: false,
      straight: false,
      out_mode: "out",
      bounce: false,
      attract: { enable: false, rotateX: 600, rotateY: 1200 },
    },
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: { enable: true, mode: "repulse" },
      onclick: { enable: true, mode: "push" },
      resize: true,
    },
    modes: {
      grab: { distance: 400, line_linked: { opacity: 1 } },
      bubble: { distance: 400, size: 40, duration: 2, opacity: 8, speed: 3 },
      repulse: { distance: 200, duration: 0.4 },
      push: { particles_nb: 4 },
      remove: { particles_nb: 2 },
    },
  },
  retina_detect: true,
});
