// /js/catalogo.js

function createProductCard(product) {
  const col = document.createElement("div");
  col.className = "col mb-1";

  const hasOferta =
    Number.isFinite(product.precioOferta) &&
    product.precioOferta < product.precio;

  const presentacion = product.presentacion || "";
  const categoria = product.categoria || "";
  const descripcionCorta = product.descripcionCorta || "";

  col.innerHTML = `
    <div class="card h-100 position-relative">

      <img class="card-img-top" src="${product.imagen}" alt="${product.nombre}">

      <div class="card-body p-2 text-center">
        <h4 class="fw-bolder mb-1">${product.nombre}</h4>

        ${
          presentacion
            ? `<p class="small text-muted mb-1">${presentacion}</p>`
            : ""
        }

        ${
          categoria
            ? `<p class="small text-secondary mb-1">${categoria}</p>`
            : ""
        }

        ${
          descripcionCorta
            ? `<p class="small text-muted mb-2 product-card-desc">${descripcionCorta}</p>`
            : ""
        }

        <div class="fs-6">
          ${
            hasOferta
              ? `<span class="text-muted text-decoration-line-through">$${product.precio.toLocaleString("es-CL")}</span>
                 <span class="ms-2 fw-bold">$${product.precioOferta.toLocaleString("es-CL")}</span>`
              : `<span class="fw-bold">$${product.precio.toLocaleString("es-CL")}</span>`
          }
        </div>
      </div>

      <div class="card-footer p-4 pt-0 border-top-0 bg-transparent text-center">
        <a class="btn btn-outline-dark mt-auto" href="producto.html?id=${encodeURIComponent(product.id)}">
          Ver detalle
        </a>
      </div>
    </div>
  `;

  return col;
}

function renderGrid(productsToRender) {
  const grid = document.getElementById("product-grid");
  if (!grid) return;

  grid.innerHTML = "";

  if (!productsToRender.length) {
    grid.innerHTML = `
      <div class="col-12 text-center text-muted py-5">
        No se encontraron productos para esta categoría.
      </div>`;
    return;
  }

  productsToRender.forEach((p) => {
    grid.appendChild(createProductCard(p));
  });
}

function applyFilters() {
  const categorySelect = document.getElementById("filter-category");
  const titleEl = document.getElementById("product-page-title");

  const category = (categorySelect?.value || "").trim();

  let filtered = PRODUCTS.slice();

  if (category) {
    filtered = filtered.filter(
      (p) => (p.categoria || "").toLowerCase() === category.toLowerCase()
    );

    if (titleEl) titleEl.textContent = category;
  } else {
    if (titleEl) titleEl.textContent = "Todos los productos";
  }

  renderGrid(filtered);
}

document.addEventListener("DOMContentLoaded", () => {
  if (typeof PRODUCTS === "undefined") {
    console.error(
      "PRODUCTS no está definido. Revisa que data/products.js se cargue antes de catalogo.js"
    );
    return;
  }

  // Render inicial
  renderGrid(PRODUCTS);

  // Evento de filtro por categoría
  const categorySelect = document.getElementById("filter-category");
  if (categorySelect) {
    categorySelect.addEventListener("change", applyFilters);
  }
});


