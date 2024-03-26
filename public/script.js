// Obtém a referência ao elemento tbody da tabela de produtos
const productTableBody = document.getElementById("productTableBody");
// Obtém a referência ao formulário de adição de produto
const addProductForm = document.getElementById("addProductForm");


// Função assíncrona para filtar produtos por ID
async function searchProduct() {
  const productId = document.getElementById("searchProductId").value; // Obtém o valor do campo de busca por ID
  // Verific se o campo busca esta com alguma informação
  if (productId === "") {
    alert("Campo de busca não pode estar vazio")
    document.getElementById("searchProductId").focus()
  } else {
    try {
      const response = await fetch(`/produtos/${productId}`); // Faz uma requisição assíncrona para obter os detalhes do produto com o ID fornecido
      if (response.ok) {
        const product = await response.json(); // Converte a resposta para JSON
        updateTable([product]); // Atualiza a tabela na página com os detalhes do produto encontrado
      } else if (response.status === 404) {
        console.log("Nenhum produto encontrado."); // Exibe uma mensagem de aviso no console
        alert("Nenhum produto encontrado."); // Exibe um alerta na página
      } else {
        console.error("Erro ao buscar produto:", response.statusText); // Exibe um erro caso ocorra outro tipo de erro na requisição
      }
    } catch (error) {
      console.error("Erro ao buscar produto:", error.message); // Exibe um erro caso ocorra algum problema na requisição
    }
  }
}

// Função assíncrona para atualizar produtos
async function updateTable(products) {
  const productTableBody = document.getElementById("productTableBody"); // Obtém a referência ao elemento tbody da tabela de produtos
  productTableBody.innerHTML = ""; // Limpa o conteúdo atual da tabela

  if (products.length === 0) {
    console.log("Nenhum produto encontrado."); // Exibe uma mensagem de aviso no console
    alert("Nenhum produto encontrado."); // Exibe um alerta na página
  } else {
    products.forEach((product) => { // Itera sobre os produtos encontrados
      const row = `
              <tr>
                  <td>${product.id}</td>
                  <td>${product.name}</td>
                  <td>${product.price}</td>
                  <td>${product.quantity}</td>
                  <td>${product.description}</td>
                  <td>
                      <button class="edit-button" onclick="editProduct(${product.id},'${product.name}',${product.price},${product.quantity},'${product.description}')">Editar</button>
                      <button class="delete-button" onclick="deleteProduct(${product.id})">Excluir</button>
                  </td>
              </tr>
          `;
      productTableBody.innerHTML += row; // Adiciona a linha à tabela
    });
  }
}


// Função assíncrona para carregar os produtos
async function loadProducts() {
  try {
    const response = await fetch("/produtos"); // Faz uma requisição assíncrona para obter os produtos
    const products = await response.json(); // Converte a resposta para JSON
    productTableBody.innerHTML = ""; // Limpa o conteúdo do elemento tbody antes de adicionar os novos produtos
    products.forEach((product) => {
      // Itera sobre cada produto retornado
      const row = ` <!-- Cria uma string de template para representar uma linha da tabela com os dados do produto -->
                  <tr>
                    <!-- Coluna com o ID do produto -->
                    <td>${product.id}</td>
                    <!-- Coluna com o nome do produto -->
                    <td>${product.name}</td>
                    <!-- Coluna com o preço do produto -->
                    <td>${product.price}</td>
                    <!-- Coluna com a quantidade do produto -->
                    <td>${product.quantity}</td> 
                    <!-- Coluna com a descrição do produto -->
                    <td>${product.description}</td> 
                    <td>
                          <!-- Botão para editar o produto -->
                          <button class="edit-button" onclick="editProduct(${product.id},'${product.name}',${product.price},${product.quantity},'${product.description}')">Editar</button> 
                          <!-- Botão para excluir o produto -->
                          <button class="delete-button" onclick="deleteProduct(${product.id})">Excluir</button> 
                      </td>
                  </tr>
              `;
      // Adiciona a linha à tabela
      productTableBody.innerHTML += row;
    });
  } catch (error) {
    // Exibe um erro caso ocorra algum problema no carregamento dos produtos
    console.error("Erro ao carregar produtos:", error.message);
  }
}


// Função assíncrona para adicionar um novo produto
async function addProduct(event) {
  event.preventDefault(); // Previne o comportamento padrão de envio do formulário
  const productName = document.getElementById("productName").value; // Obtém o valor do campo de nome do produto
  const productPrice = document.getElementById("productPrice").value; // Obtém o valor do campo de preço do produto
  const productQuantity = document.getElementById("productQuantity").value; // Obtém o valor do campo de quantidade do produto
  const productDescription =
    document.getElementById("productDescription").value; // Obtém o valor do campo de descrição do produto
  const productId = document.getElementById("productId").value; // Obtém o ID do produto (se existir)

  try {
    let response; // Declara uma variável para armazenar a resposta da requisição
    // Verifica se existe um ID de produto, indicando que é uma edição
    if (productId) {
      // Se existe um ID, trata-se de uma edição
      response = await fetch(`/produtos/${productId}`, {
        // Faz uma requisição assíncrona para atualizar o produto com o ID fornecido
        method: "PUT", // Método HTTP PUT para atualizar o recurso
        headers: { // Define os cabeçalhos da requisição
          "Content-Type": "application/json", // Define o cabeçalho Content-Type como JSON
        },
        body: JSON.stringify({ // Converte os dados do produto para JSON e envia no corpo da requisição
          name: productName, // Define o nome do produto no corpo da requisição
          price: productPrice, // Define o preço do produto no corpo da requisição
          quantity: productQuantity, // Define a quantidade do produto no corpo da requisição
          description: productDescription, // Define a descrição do produto no corpo da requisição
        }),
      });
    } else {
      // Caso contrário, é uma adição de novo produto
      response = await fetch("/produtos", {
        // Faz uma requisição assíncrona para adicionar um novo produto
        method: "POST", // Método HTTP POST para criar um novo recurso
        headers: {
          "Content-Type": "application/json", // Define o cabeçalho Content-Type como JSON
        },
        body: JSON.stringify({
          // Converte os dados do novo produto para JSON e envia no corpo da requisição
          name: productName, // Define o nome do novo produto
          price: productPrice, // Define o preço do novo produto
          quantity: productQuantity, // Define a quantidade do novo produto
          description: productDescription, // Define a descrição do novo produto
        }), // Finaliza a criação do objeto JSON e passa como corpo da requisição
      });
    }
    // Verifica se a resposta da requisição foi bem-sucedida
    if (response.ok) {
      loadProducts(); // Recarrega os produtos após a adição ou edição bem-sucedida
      clearForm(); // Limpa o formulário
    } else {
      console.error("Erro ao adicionar/editar produto:", response.statusText); // Exibe um erro caso a adição ou edição do produto falhe
    }
  } catch (error) {
    console.error("Erro ao adicionar/editar produto:", error.message); // Exibe um erro caso ocorra algum problema na requisição
  }
}


// Função assíncrona para excluir um produto
async function deleteProduct(id) {
  // Exibe uma mensagem de confirmação para excluir o produto
  if (confirm("Tem certeza que deseja excluir este produto?")) {
    try {
      // Faz uma requisição assíncrona para excluir o produto com o ID fornecido
      const response = await fetch(`/produtos/${id}`, {
        method: "DELETE", // Método HTTP DELETE para excluir o recurso
      });
      // Verifica se a resposta da requisição foi bem-sucedida
      if (response.ok) {
        loadProducts(); // Recarrega os produtos após a exclusão bem-sucedida
      } else {
        console.error("Erro ao excluir produto:", response.statusText); // Exibe um erro caso a exclusão do produto falhe
      }
    } catch (error) {
      console.error("Erro ao excluir produto:", error.message); // Exibe um erro caso ocorra algum problema na requisição
    }
  }
}


// Função para preencher o formulário de edição com os dados do produto selecionado
async function editProduct(id, name, price, quantity, description) {
  document.getElementById("productName").value = name; // Define o valor do campo de nome do produto
  document.getElementById("productPrice").value = price; // Define o valor do campo de preço do produto
  document.getElementById("productQuantity").value = quantity; // Define o valor do campo de quantidade do produto
  document.getElementById("productDescription").value = description; // Define o valor do campo de descrição do produto
  document.getElementById("productId").value = id; // Define o valor do campo oculto de ID do produto
}


// Função assíncrona para atualizar um produto
async function updateProduct(event) {
  event.preventDefault(); // Previne o comportamento padrão de envio do formulário
  const productId = document.getElementById("productId").value; // Obtém o ID do produto
  const productName = document.getElementById("productName").value; // Obtém o novo nome do produto
  const productPrice = document.getElementById("productPrice").value; // Obtém o novo preço do produto
  const productQuantity = document.getElementById("productQuantity").value; // Obtém a nova quantidade do produto
  const productDescription =
    document.getElementById("productDescription").value; // Obtém a nova descrição do produto

  try {
    // Faz uma requisição assíncrona para atualizar o produto com o ID fornecido
    const response = await fetch(`/produtos/${productId}`, {
      method: "PUT", // Método HTTP PUT para atualizar o recurso
      headers: {
        "Content-Type": "application/json", // Define o tipo de conteúdo da requisição como JSON
      },
      body: JSON.stringify({ // Converte os novos dados do produto para JSON e envia no corpo da requisição
        name: productName, // Nome do produto
        price: productPrice, // Preço do produto
        quantity: productQuantity, // Quantidade do produto
        description: productDescription, // Descrição do produto      
      }), // Converte os novos dados do produto para JSON e envia no corpo da requisição
    });
    if (response.ok) {
      loadProducts(); // Recarrega os produtos após a atualização bem-sucedida
      clearForm(); // Limpa o formulário
    } else {
      console.error("Erro ao editar produto:", response.statusText); // Exibe um erro caso a atualização do produto falhe
    }
  } catch (error) {
    console.error("Erro ao editar produto:", error.message); // Exibe um erro caso ocorra algum problema na requisição
  }
}

// Adiciona um event listener para o formulário de edição de produto
addProductForm.addEventListener("submit", updateProduct);

// Função para carregar dados do produto para o formulário de edição
async function carregarProdutoParaEdicao(id) {
  try {
    // Faz uma requisição assíncrona para obter os dados do produto com o ID fornecido
    const response = await fetch(`/produtos/${id}`);
    // Verifica se a resposta da requisição foi bem-sucedida
    if (response.ok) {
      const produto = await response.json(); // Converte a resposta para JSON
      document.getElementById("name").value = produto.name; // Define o valor do campo "name" do formulário como o nome do produto
      document.getElementById("price").value = produto.price; // Define o valor do campo "price" do formulário como o preço do produto
      document.getElementById("quantity").value = produto.quantity; // Define o valor do campo "quantity" do formulário como a quantidade do produto
      document.getElementById("description").value = produto.description; // Define o valor do campo "description" do formulário como a descrição do produto
    } else {
      throw new Error("Erro ao carregar dados do produto para edição"); // Lança um erro caso a resposta da requisição não seja bem-sucedida
    }
  } catch (error) {
    console.error(error); // Exibe o erro no console em caso de falha na requisição
    // Trate o erro aqui (ex: exiba uma mensagem de erro para o usuário)
  }
}


// Função para limpar o formulário
function clearForm() {
  document.getElementById("addProductForm").reset(); // Reseta o formulário de adição de produto
  document.getElementById("productId").value = ""; // Limpa o campo oculto de ID do produto
  document.getElementById("productName").focus(); // Dá foco ao campo "Nome do Produto"
}

// Carrega os produtos quando a página é carregada
window.onload = loadProducts;

// Adiciona um event listener para o formulário de adição de produto
addProductForm.addEventListener("submit", addProduct);