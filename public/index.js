let header = document.querySelector(".header");
let main = document.querySelector(".main");
let categorias = document.querySelector(".categorias");
let productos = document.querySelector(".productos");
let productosCards = document.querySelector(".productos__cards");
let footer = document.querySelector(".footer");
let loader = document.querySelector(".loader");
let productoDestacado = document.querySelector("#productoDestacado");
let productosTitle = document.querySelector(".productos__title");
let modalProductoTitle = document.querySelector(".modalProducto__title");
let modalProductoImg = document.querySelector(".modalProducto__img");
let modalProductoDesc = document.querySelector(".modalProducto__text");
let modalProductoPrice = document.querySelector(".modalProducto__price");
let modalProductoBtn = document.querySelector("#modalProductoBtn");

let categoriasArr = [
  "electronics",
  "jewelery",
  "men clothing",
  "women clothing",
];

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
      productoDestacado.innerHTML = `
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
              data-img="${res[item].image}">
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
      console.log(e.target.getAttribute("data-img"));
      modalProductoDesc.innerHTML = e.target.getAttribute("data-desc");
      modalProductoPrice.innerHTML =
        "Precio: $" + e.target.getAttribute("data-price");
      modalProductoBtn.setAttribute(
        "data-title",
        e.target.getAttribute("data-title")
      );
      modalProductoBtn.setAttribute(
        "data-img",
        e.target.getAttribute("data-img")
      );
      modalProductoBtn.setAttribute(
        "data-desc",
        e.target.getAttribute("data-desc")
      );
      modalProductoBtn.setAttribute(
        "data-price",
        e.target.getAttribute("data-price")
      );
    }
  });
}
