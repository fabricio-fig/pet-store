import './Sale.css';
import { useState, useEffect } from 'react';
import AddClient from './AddClient';

function Sale(props) {
  const [clients, setClients] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedClientID, setSelectedClientID] = useState('');
  const [selectedProductID, setSelectedProductID] = useState('');
  const [insertProductIDs, setInsertProductIDs] = useState([]);

  const [addClient, setAddClient] = useState(false);

  function clearForm() {
    setSelectedClientID('');
    setSelectedProductID('');
    setInsertProductIDs([]);
  }

  function loadClients() {
    return fetch('http://localhost:3000/api/clients', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${props.employee.token}`
      }
    }).then( (res) => {
      res.json().then(json => {
        console.log('json', json);
        setClients(json.clients);
      });
    });
  }

  function loadProducts() {
    fetch('http://localhost:3000/api/products/search', {
      method: 'GET', 
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${props.employee.token}`
      }
    }).then(res => {
      if (res.ok) {
        res.json().then(json => {
          setProducts(json.products);
        })
      }
    })
  }

  function clientCreated(clientID) {
    loadClients()
    .then(() => {
      setSelectedClientID(clientID);
      setAddClient(false);
    }); 
  }

  function cancelCreateClient() {
    setAddClient(false);
  }

  useEffect( () => {
    loadClients();

    loadProducts();
  }, [addClient]);

  if (addClient) {
    return <AddClient employee={props.employee} clientCreated={clientCreated} cancelCreateClient={cancelCreateClient} />
  }
  
  return (
    <div className="Sale">
      <h1>PetTopStore - PDV</h1>
      <div className="UserBox">
        <div>
          Logado como {props.employee.name}
        </div>
        <button
          className="logoutButton"
          onClick={e => props.setEmployee(null)}
        >
          Sair do sistema
        </button>
      </div>

      <h2>Nova venda</h2>
      <div>
        Selecione um cliente
        <select value={selectedClientID} onChange={(e) => {
            setSelectedClientID(e.target.value);
          }}>
          <option value="">Escolha um cliente</option>
          {clients.map((client) => 
            <option key={client.id} value={client.id}>{client.name}</option>
          )}
        </select>

        <button
          className="success"
          onClick={() => {
            setAddClient(true);
          }}
        >
          Cadastrar um novo cliente
        </button>

        <h3>Inserir item na venda</h3>
        <div>
          Selecione um produto 
          <select value={selectedProductID} onChange={(e) => {
            setSelectedProductID(e.target.value);
          }}>
            <option value="">Escolha um produto</option>
            {products.map((product) => 
              <option key={product.id} value={product.id}>{product.name}</option>
            )}
          </select>

          <button
            className="success"
            onClick={() => {
              if (selectedProductID) {
                setInsertProductIDs([
                  ...insertProductIDs,
                  selectedProductID
                ]);
                setSelectedProductID('');
              }
          }}>
            [+] Inserir
          </button>
          <br/>

          <h4>Produtos inseridos</h4>
          <ul>
            {insertProductIDs.map((productID) => {
              const product = products.find(p => p.id === parseInt(productID));
              return <li key={product.id}>{product.name}</li>
            })}
          </ul>

          <button
            className="success"
            onClick={() => {
            if (selectedClientID === '') {
              alert('Selecione um cliente');
              return;
            }
            if (insertProductIDs.length === 0){
              alert('Adicione pelo menos um produto');
              return;
            }

            fetch('http://localhost:3000/api/sales',{
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${props.employee.token}`
              },
              body: JSON.stringify({
                client_id: selectedClientID,
                productIDs: insertProductIDs
              })
            }).then(res => {
              if (res.ok) {
                res.json().then(json => {
                  alert('venda ok!');
                })
              } else {
                alert('venda not ok');
              }
              clearForm();
            })
          }}>
            Finalizar vendas
          </button>
        </div>

      </div>
    </div>
  );
}

export default Sale;
