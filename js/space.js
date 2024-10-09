
const inputBuscar = document.getElementById('inputBuscar');
const btnBuscar = document.getElementById('btnBuscar');
const contenedor = document.getElementById('contenedor');

btnBuscar.addEventListener('click', () => {
  const search = inputBuscar.value.trim();

  if (search) {
    buscarImagenes(search);
  }
});

function buscarImagenes(search) {
  const url = `https://images-api.nasa.gov/search?q=${search}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      mostrarImagenes(data.collection.items);
    })
    .catch(error => {
      console.error('Error al obtener los datos:', error);
      contenedor.innerHTML = '<p>Hubo un error al obtener los datos. Por favor, intenta nuevamente.</p>';
    });
}

function mostrarImagenes(items) {
    contenedor.innerHTML = ''; 
  
    if (items.length === 0) {
      contenedor.innerHTML = '<p>No se encontraron resultados para esta búsqueda.</p>';
      return;
    }
  
    items.forEach(item => {
      const { data, links } = item;
      const titulo = data[0].title || 'Sin título';
      const descripcion = data[0].description || 'Sin descripción';
      const fecha = new Date(data[0].date_created).toLocaleDateString() || 'Fecha no disponible';
      const imagenUrl = links && links[0] && links[0].href ? links[0].href : 'https://via.placeholder.com/300';

      
    const cardHTML = `
        <div class="col-lg-4 col-md-6 mb-4">
        <div class="card">
            <img src="${imagenUrl}" class="card-img-top" alt="${titulo}">
            <div class="card-body">
            <h5 class="card-title">${titulo}</h5>
            <p class="card-text">${descripcion}</p>
            </div>
            <div class="card-footer text-muted">
            ${fecha}
            </div>
        </div>
    </div>
    `;

    contenedor.innerHTML += cardHTML;
    });
}
  
