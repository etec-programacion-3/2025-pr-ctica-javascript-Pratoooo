// URL base de la API de productos
const BASE_URL = 'http://localhost:5000/api/products';

// Referencias a los elementos del DOM
const list = document.getElementById('product-list');
const form = document.getElementById('product-form');

// Obtiene y muestra la lista de productos desde la API (GET resuelto)
async function fetchProducts() {
  const res = await fetch(BASE_URL);
  const products = await res.json();
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
      deleteProduct(prod.id);
      fetchProducts(); // Refresca la lista después de eliminar
    };
    li.appendChild(btn);
    list.appendChild(li);
  });
}

// EJERCICIO: Completa la función para crear un producto usando fetch POST
async function createProduct(name, price, description) {
  // TODO: Implementa el POST a la API
  try{
    await fetch(BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, price, description })
    });
    fetchProducts();
  }
  catch (err) {
    alert('Error al crear producto');
}}

// EJERCICIO: Completa la función para eliminar un producto usando fetch DELETE
async function deleteProduct(id) {
  // TODO: Implementa el DELETE a la API
  try{
    await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' });
    fetchProducts();
  }
  catch (err) {
    alert('Error al eliminar producto');
  }
}

// EJERCICIO: Completa la función para mostrar detalles usando fetch GET /products/:id
async function showDetails(id) {
  // TODO: Implementa el GET de detalles y muestra un alert con la info
  try{
    const res = await fetch(`${BASE_URL}/${id}`);
    const prod = await res.json();
    alert(`Nombre: ${prod.name}\nPrecio: $${prod.price}\nDescripción: ${prod.description}`);
    fetchProducts();
  }
  catch (err) {
    alert('Error al obtener detalles');
}}

// Maneja el submit del formulario para crear un producto
form.onsubmit = async e => {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const price = document.getElementById('price').value;
  const description = document.getElementById('description').value;
  // TODO: Llama a createProduct y luego fetchProducts
  await createProduct(name, price, description);
  fetchProducts();
  form.reset();
};

// Render inicial
fetchProducts(); 