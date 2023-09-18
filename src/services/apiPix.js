import axios from "axios";

const apiPort4000 = axios.create({
    //baseURL: "http://localhost:4000", // ou a URL correta do backend na porta 4000
    baseURL: "http://177.71.199.242:4000"
  });
  

  export default apiPort4000;