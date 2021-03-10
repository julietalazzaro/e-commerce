let header = document.querySelector(".header");
let main = document.querySelector(".main");
let categorias = document.querySelector(".categorias");
let productos = document.querySelector(".productos");
let productosCards = document.querySelector(".productos__cards");
let footer = document.querySelector(".footer");
let carrito = document.querySelector(".carrito");
let loader = document.querySelector(".loader");
let productoDestacado = document.querySelector("#productoDestacado");
let productosTitle = document.querySelector(".productos__title");
let modalProductoTitle = document.querySelector(".modalProducto__title");
let modalProductoImg = document.querySelector(".modalProducto__img");
let modalProductoDesc = document.querySelector(".modalProducto__text");
let modalProductoPrice = document.querySelector(".modalProducto__price");
let modalProductoBtn = document.querySelector("#modalProductoBtn");
let btnCarritoModal = document.querySelector("#btnCarritoModal");
let btnCarrito = document.querySelector(".header__cart");
let btnAgregarCarrito = document.querySelector("#btnAgregarCarrito");
let btnAgregarCarritoModal = document.querySelector("#btnAgregarCarritoModal");

let categoriasArr = [
  "electronics",
  "jewelery",
  "men clothing",
  "women clothing",
];

let carritoItems = new Array();

if (localStorage.getItem("carritoStorage")) {
  let local = localStorage.getItem("carritoStorage");
  carritoItems = local.split("$$$$$,");
}

if (main) {
  loader.style.display = "flex";
  header.style.display = "none";
  footer.style.display = "none";
  main.style.display = "none";
  categorias.style.display = "none";
  let rand = Math.floor(Math.random() * 4);
  fetch(
    `https://fakestoreapi.com/products/category/${categoriasArr[rand]}?limit=1`
  )
    .then((res) => res.json())
    .then((res) => {
      let item = res[0];
      item.productoDestacado.innerHTML = `
      <img class="main__producto-img" src="${item.image}" alt="img" />
        <h4 class="main__producto-title">${item.title}</h4>
        <p class="main__producto-text" >${item.description}</p>
        <small>Precio: $ ${item.price}</small>
        <br />
        <a href="productos.html/electronics" class="btn btn-primary">Comprar</a>
      `;

      main.style.display = "flex";
      categorias.style.display = "flex";
      header.style.display = "block";
      footer.style.display = "flex";
      loader.style.display = "none";
    });
} else if (productos) {
  loader.style.display = "flex";
  header.style.display = "none";
  footer.style.display = "none";
  productos.style.display = "none";
  var url_string = window.location.href;
  var url = new URL(url_string);
  var category = url.searchParams.get("category");

  if (categoriasArr.includes(category)) {
    productosTitle.innerHTML = `Nuestros productos de <span class="negrita">${category}</span>`;
    fetch(`https://fakestoreapi.com/products/category/${category}`)
      .then((res) => res.json())
      .then((res) => {
        for (item in res) {
          let productCard = `
        <div class="card" style="width: 18rem">
          <img src="${res[item].image}" class="card-img-top productos__cards-img" alt="Imagen producto" />
          <div class="card-body">
            <h5 class="card-title negrita productos__cards-title">${res[item].title}</h5>
            <p class="productos__cards-text">${res[item].description}</p>
            <small>Precio: $ ${res[item].price}</small>
            <br />
            <!-- Button trigger modal -->
            <button
              id="modalTrigger"
              type="button"
              class="btn btn-secondary"
              data-bs-toggle="modal"
              data-bs-target="#modalProducto"
              data-title="${res[item].title}" data-price="${res[item].price}" 
              data-desc="${res[item].description}" data-img="${res[item].image}"
            >
            Info
            </button>
            <button type="button" class="btn btn-primary"
              data-title="${res[item].title}" 
              data-price="${res[item].price}" 
              data-desc="${res[item].description}" 
              data-img="${res[item].image}"
              id="btnAgregarCarrito">
              Agregar al carrito
            </button>
          </div>
        </div>`;

          productosCards.innerHTML += productCard;
        }

        productos.style.display = "block";
        header.style.display = "block";
        footer.style.display = "flex";
        loader.style.display = "none";
      });
  } else {
    productosTitle.innerHTML = "No se encontro la categoria seleccionada";
    productos.style.display = "block";
    header.style.display = "block";
    footer.style.display = "flex";
    loader.style.display = "none";
  }

  productos.addEventListener("click", function (e) {
    if (e.target.getAttribute("id") == "modalTrigger") {
      modalProductoTitle.innerHTML = e.target.getAttribute("data-title");
      modalProductoImg.setAttribute("src", e.target.getAttribute("data-img"));
      modalProductoDesc.innerHTML = e.target.getAttribute("data-desc");
      modalProductoPrice.innerHTML =
        "Precio: $" + e.target.getAttribute("data-price");
      btnAgregarCarritoModal.setAttribute(
        "data-title",
        e.target.getAttribute("data-title")
      );
      btnAgregarCarritoModal.setAttribute(
        "data-img",
        e.target.getAttribute("data-img")
      );
      btnAgregarCarritoModal.setAttribute(
        "data-desc",
        e.target.getAttribute("data-desc")
      );
      btnAgregarCarritoModal.setAttribute(
        "data-price",
        e.target.getAttribute("data-price")
      );
    } else if (e.target.getAttribute("id") == "btnAgregarCarrito") {
      let item = `<div class="carrito__item">
        <div class="carrito__item-cabecera">
          <h3 class="carrito__item-titulo">${e.target.getAttribute(
            "data-title"
          )}</h3>
          <p class="carrito__item-desc">
            ${e.target.getAttribute("data-desc")}
          </p>
        </div>
        <p class="carrito__precio">$ ${e.target.getAttribute("data-price")}</p>
      </div>$$$$$`;
      // e.target.getAttribute("data-img"),
      // carrito = carrito + localStorage.getItem("carritoStorage");
      carritoItems.push(item);
      localStorage.setItem("carritoStorage", carritoItems);
    }
  });

  btnAgregarCarritoModal.addEventListener("click", function (e) {
    let item = new ItemCarrito(
      e.target.getAttribute("data-title"),
      e.target.getAttribute("data-img"),
      e.target.getAttribute("data-desc"),
      e.target.getAttribute("data-price")
    );
    carritoItems.push(item);
    localStorage.setItem("carritoStorage", carritoItems);
  });
} else if (carrito) {
  let total = 0;
  if (carritoItems.length > 0) {
    for (item in carritoItems) {
      // total += preciosCarrito[item];
      carritoItems[item] = carritoItems[item].replace("$$$$$", "");
      carrito.innerHTML += carritoItems[item];
    }

    let preciosCarrito = document.getElementsByClassName("carrito__precio");
    for (precio in preciosCarrito) {
      let i = preciosCarrito[precio].innerHTML;
      if (i) {
        i = i.replace("$ ", "");
        total += parseInt(i);
      }
    }
    carrito.innerHTML += `<p class="carrito__precio-total">$ ${total}</p>
      `;
  } else {
    carrito.innerHTML = `
      <h2 class="productos__title">Aún no hay items en tu carrito..<h2>`;
  }
}
