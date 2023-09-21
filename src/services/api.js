/* Arquivo de serviços para acessar o axios */
import axios from 'axios'

const apiCodeBurger = axios.create({

 // baseURL: 'http://177.71.203.249:3000'

 // baseURL: 'http://192.168.100.7:3000'
 
  //baseURL: 'https://api-hambuguer.coders4future.com'

  baseURL: "http://pedepede.fun"

})

// Interceptando um arequisição. Antes de enviar a requisição vai ser Adicionado Token JWT nas chamadas da API
apiCodeBurger.interceptors.request.use(async config => {
  // Pegando o token no localStorage
  const userData = await localStorage.getItem('codeburger: userData')
  const token = userData && JSON.parse(userData).token
  // Colocando o token dentro da config
  config.headers.authorization = `Bearer ${token}`
  return config
})

export default apiCodeBurger
