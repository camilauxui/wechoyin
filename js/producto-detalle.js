// /js/producto-detalle.js

function getProductIdFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
}

function formatPriceCLP(value) {
  if (typeof value !== "number") return "";
  return "$" + value.toLocaleString("es-CL");
}

document.addEventListener("DOMContentLoaded", () => {
  const productId = getProductIdFromURL();

  const notFound = document.getElementById("product-not-found");
  const detail = document.getElementById("product-detail");

  if (!productId) {
    notFound.classList.remove("d-none");
    return;
  }

  const product = PRODUCTS.find(p => p.id === productId);

  if (!product) {
    notFound.classList.remove("d-none");
    return;
  }

  // Mostrar detalle
  detail.classList.remove("d-none");

  // Elementos DOM
  const titleHeader = document.getElementById("product-title-header");
  const nameEl = document.getElementById("product-name");
  const categoryEl = document.getElementById("product-category");
  const pricesEl = document.getElementById("product-prices");
  const imageEl = document.getElementById("product-image");
  const shortEl = document.getElementById("product-short");
  const longEl = document.getElementById("product-long");
  const whatsappLink = document.getElementById("whatsapp-link");

  // Rellenar datos
if (titleHeader) {
  titleHeader.textContent = product.nombre;
}
  nameEl.textContent = product.nombre;
  categoryEl.textContent = product.categoria ? `Categoría: ${product.categoria}` : "";

  const hasOferta = product.precioOferta && product.precioOferta < product.precio;
  pricesEl.innerHTML = hasOferta
    ? `<span class="text-muted text-decoration-line-through">${formatPriceCLP(product.precio)}</span>
       <span class="ms-2 fw-bold">${formatPriceCLP(product.precioOferta)}</span>`
    : `<span class="fw-bold">${formatPriceCLP(product.precio)}</span>`;

  imageEl.src = product.imagen;
  imageEl.alt = product.nombre;

  shortEl.textContent = product.descripcionCorta || "";
  longEl.textContent = product.descripcionLarga || "";
 
  // WhatsApp
  const numeroWhatsApp = "56958637021";
  const mensaje = product.whatsappTexto || `Hola, me interesa el producto: ${product.nombre}`;
  const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;
  whatsappLink.href = url;
  
});

