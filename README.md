🌿 Catálogo Web – Biocosmética Wechoyin

Un catálogo online desarrollado en HTML, CSS y JavaScript para visualizar productos de cosmética natural.

📌 Descripción del Proyecto

Este proyecto consiste en un catálogo web estático que permite:

Visualizar todos los productos disponibles.

Filtrar por categoría.

Ver el detalle de cada producto con imagen, descripción, precio y presentación.

Consultar o comprar directamente por WhatsApp.

Incluir términos y condiciones de envío en el footer.


🗂 Estructura de Archivos
📁 /assets
   └── 📁 img
       └── (imágenes de productos y logo)

📁 /css
   └── styles.css

📁 /js
   ├── catalogo.js
   └── producto-detalle.js

📁 /data
   └── products.js

index.html
producto.html
README.md

🧩 Archivos Clave
index.html

Página principal del catálogo.
Contiene:

Banner superior con logo

Filtro por categoría

Grid dinámico de productos

producto.html

Vista de detalle de un producto.
Muestra:

Imagen grande

Nombre, categoría

Descripción corta y larga

Precio

Botón para comprar por WhatsApp

products.js

Base de datos en formato JSON con todos los productos, proveniente de tu Google Sheet.

catalogo.js

Genera las tarjetas de producto y maneja el filtrado por categoría.

producto-detalle.js

Carga dinámicamente la información de un producto según el parámetro id en la URL.

🧰 Tecnologías Utilizadas

HTML5

CSS3 + estilos personalizados

JavaScript vanilla (sin frameworks)

Bootstrap 5 (layout base)

Google Sheets → conversión a JSON

WhatsApp API para ventas

🚀 Cómo Ejecutar el Proyecto

Descarga o clona el repositorio:

git clone https://github.com/TU-USUARIO/TU-REPO.git


Abre el archivo:

index.html


Eso es todo: el catálogo funciona completamente sin backend.

