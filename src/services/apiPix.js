// import axios from "axios";

// const apiPort4000 = axios.create({
//   //  baseURL: "http://192.168.100.7:4000", // ou a URL correta do backend na porta 4000


// //  baseURL: "https://177.71.203.249:4000",


//    baseURL: "https://pedepede.fun"

//   });
  

//   export default apiPort4000;



/* Arquivo de serviços para acessar o axios */
import axios from "axios";

const apiPort4000 = axios.create({

  //baseURL: "https://177.71.203.249:3000",

 // baseURL: 'http://192.168.100.7:4000',

  //baseURL: 'https://api-hambuguer.coders4future.com'

 baseURL: 'https://pedepede.fun'

});

// Interceptando um arequisição. Antes de enviar a requisição vai ser Adicionado Token JWT nas chamadas da API
apiPort4000.interceptors.request.use(async (config) => {
  // Pegando o token no localStorage
  const userData = localStorage.getItem("codeburger: userData");
  const token = userData && JSON.parse(userData).token;
  // Colocando o token dentro da config
  config.headers.authorization = `Bearer ${token}`;
  return config;
});

export default apiPort4000;
