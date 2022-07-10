
<script>
    let products = [];
  
    async function loadProducts() {
      const res = await fetch('http://localhost:3000/api/products/search');
      if (res.ok) {
        const json = await res.json()
        products = json.products;
      } else {
        products = [];
      }
    }
    loadProducts();
  
  </script>
  
  <style>
    .produto {
      border: 2px solid #ddd;
      margin: 10px;
      height: 100px;
      display: flex;
    }
    .produto .info {
      display: flex;
      flex-direction: column;
      margin: 10px;
    }
    .produto .detalhe {
      margin-left: auto;
      margin-top: 20px;
    }
    .produto .detalhe a {
      background-color: cadetblue;
      color: white;
      font-weight: bold;
      text-decoration: none;
      padding: 5px;
    }
  
  </style>
  
  <h1>Produtos</h1>
  
  <div>
    {#each products as product}
      <div class="produto">
        <div class="image">
          <img width="100px" alt="imagem do produto" src="http://localhost:3000/images/{product.photo}" />  
        </div>
        <div class="info">
          <div class="nome">
            {product.name}
          </div>
          <div class="descricao">
            {product.description}
          </div>
          <div class="categoria">
            Categoria:
            {product.categoryName || 'Sem Categoria'}<br/>
          </div>
        </div>
  
        <div class="detalhe">
          <a href="/produtos/{product.id}">Detalhar produto</a>
        </div>
      </div>
    {/each}
  
  </div>