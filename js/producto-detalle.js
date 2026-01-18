// /js/producto-detalle.js

function getProductIdFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
}

function safeText(value, fallback = "No informado") {
  if (value === null || value === undefined) return fallback;
  const str = String(value).trim();
  if (!str || str.toLowerCase() === "nan") return fallback;
  return str;
}

function formatPriceCLP(value) {
  const num = Number(value);
  if (!Number.isFinite(num)) return "Precio no disponible";
  return "$" + num.toLocaleString("es-CL");
}

function setTextById(id, value, fallback = "No informado") {
  const el = document.getElementById(id);
  if (!el) {
    console.warn(`[producto-detalle] No existe el elemento con id="${id}" en producto.html`);
    return;
  }
  el.textContent = safeText(value, fallback);
}

document.addEventListener("DOMContentLoaded", () => {
  const productId = getProductIdFromURL();

  const notFound = document.getElementById("product-not-found");
  const detail = document.getElementById("product-detail");

  if (!productId) {
    notFound?.classList.remove("d-none");
    return;
  }

  // OJO: aquí mantengo tu fuente PRODUCTS tal cual
  const product = (typeof PRODUCTS !== "undefined" && Array.isArray(PRODUCTS))
    ? PRODUCTS.find(p => String(p.id) === String(productId))
    : null;

  if (!product) {
    notFound?.classList.remove("d-none");
    return;
  }

  // Mostrar detalle
  detail?.classList.remove("d-none");

  // Elementos DOM existentes
  const nameEl = document.getElementById("product-name");
  const categoryEl = document.getElementById("product-category");
  const pricesEl = document.getElementById("product-prices");
  const imageEl = document.getElementById("product-image");
  const shortEl = document.getElementById("product-short");
  const longEl = document.getElementById("product-long");
  const whatsappLink = document.getElementById("whatsapp-link");

  // Rellenar datos principales (con fallback)
  if (nameEl) nameEl.textContent = safeText(product.nombre, "Producto sin nombre");
  if (categoryEl) categoryEl.textContent = safeText(product.categoria, "Sin categoría");

  const precioNormal = product.precio;
  const precioOferta = product.precioOferta;

  const hasOferta = Number.isFinite(Number(precioOferta)) && Number(precioOferta) < Number(precioNormal);

  if (pricesEl) {
    pricesEl.innerHTML = hasOferta
      ? `<span class="text-muted text-decoration-line-through">${formatPriceCLP(precioNormal)}</span>
         <span class="ms-2 fw-bold">${formatPriceCLP(precioOferta)}</span>`
      : `<span class="fw-bold">${formatPriceCLP(precioNormal)}</span>`;
  }

  if (imageEl) {
    imageEl.src = safeText(product.imagen, "assets/img/productos/placeholder.png");
    imageEl.alt = safeText(product.nombre, "Producto");
  }

  if (shortEl) shortEl.textContent = safeText(product.descripcionCorta, "Sin descripción breve disponible.");
  if (longEl) longEl.textContent = safeText(product.descripcionLarga, "Sin descripción disponible.");

  // ✅ FICHA DEL PRODUCTO (ESTO ES LO QUE TE FALTABA)
  // sku -> product-sku
  // tipo -> product-type
  // variedad -> product-variety
  // presentacion -> product-presentation
  setTextById("product-sku", product.sku || product.id, "No informado");
  setTextById("product-type", product.tipo, "No informado");
  setTextById("product-variety", product.variedad, "No informado");
  setTextById("product-presentation", product.presentacion, "No informado");

  // Si NO quieres mostrar stock/notas, simplemente no los seteamos.
  // (Si los dejas en el HTML, quedarán vacíos. Mejor quitarlos del HTML o poner "No informado" por defecto.)

  // WhatsApp
  const numeroWhatsApp = "56958637021";
  const mensajeDefault =
    `Hola, me interesa el producto: ${safeText(product.nombre, "este producto")}. ` +
    `Precio: ${formatPriceCLP(product.precio)}. ` +
    `Presentación: ${safeText(product.presentacion, "No informado")}.`;

  const mensaje = safeText(product.whatsappTexto, mensajeDefault);

  if (whatsappLink) {
    whatsappLink.href = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;
  }

  console.log("[producto-detalle] producto cargado:", product);
});
