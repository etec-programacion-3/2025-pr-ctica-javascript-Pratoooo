// URL base de la API de productos
const BASE_URL = 'http://localhost:5000/api/products';

// Referencias a los elementos del DOM
const list = document.getElementById('product-list');
const form = document.getElementById('product-form');

// Obtiene y muestra la lista de productos desde la API usando axios (GET resuelto)
async function fetchProducts() {
  try {
    const res = await axios.get(BASE_URL);
    const products = res.data;
    list.innerHTML = '';
    products.forEach(prod => {
      const li = document.createElement('li');
      li.textContent = `${prod.name} - $${prod.price}`;
      // Llama a showDetails al hacer clic en el nombre del producto
      li.onclick = () => showDetails(prod.id);
      // Botón para eliminar (completar en el ejercicio)
      const btn = document.createElement('button');
      btn.textContent = 'Eliminar';
      btn.onclick = e => {
        e.stopPropagation();
        // TODO: Llama a deleteProduct y luego fetchProducts
        deleteProduct(prod.id);
        fetchProducts();
      };
      li.appendChild(btn);
      list.appendChild(li);
    });
  } catch (err) {
    alert('Error al obtener productos');
  }
}

// EJERCICIO: Completa la función para crear un producto usando axios POST
async function createProduct(name, price, description) {
  // TODO: Implementa el POST a la API
  try{
    await axios.post(BASE_URL, { name, price, description });
    fetchProducts();
  }
  catch (err) {
    alert('Error al crear producto');
  }
}

// EJERCICIO: Completa la función para eliminar un producto usando axios DELETE
async function deleteProduct(id) {
  // TODO: Implementa el DELETE a la API
  try{
    await axios.delete(`${BASE_URL}/${id}`);
    fetchProducts();
  }
  catch (err) {
    alert('Error al eliminar producto');
  }
}

// EJERCICIO: Completa la función para mostrar detalles usando axios GET /products/:id
async function showDetails(id) {
  // TODO: Implementa el GET de detalles y muestra un alert con la info
  try {
    const res = await axios.get(`${BASE_URL}/${id}`);
    const prod = res.data;
    alert(`Nombre: ${prod.name}\nPrecio: $${prod.price}\nDescripción: ${prod.description}`);
  } catch (err) {
    alert('Error al obtener detalles');
  }
}

// Maneja el submit del formulario para crear un producto
form.onsubmit = async e => {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const price = document.getElementById('price').value;
  const description = document.getElementById('description').value;
  // TODO: Llama a createProduct y luego fetchProducts
  createProduct(name, price, description);
  fetchProducts();
  form.reset();
};

// Render inicial
fetchProducts(); 