<script>
  import {page} from '$app/stores';
  import { carrinho } from '../../stores/carrinho';
  const productId = $page.params.id;
  let product;
  async function loadProduct() {
    const res = await fetch(`http://localhost:3000/api/products/${productId}`);
    if (res.ok) {
      const json = await res.json();;
      product = json.product;
    }
  }
  async function adicionarCarrinho(product) {
    // criando um novo carrinho com os valores antigos adicionados do novo producID
    $carrinho = [...$carrinho, product];
    alert('Adicionado ao carrinho com sucesso!');
  }

  loadProduct();

</script>

<a href="/produtos">Voltar</a>

{#if product}
  Nome: {product.name}

  {product.name}<br/>
  {product.description}<br/>
  <img width="100px" alt="imagem do produto" src="http://localhost:3000/images/{product.photo}" />
  {product.categoryName || 'Sem Categoria'}<br/>
  <button  on:click={() => adicionarCarrinho(product)}>Adicionar no carrinho</button>

{/if}