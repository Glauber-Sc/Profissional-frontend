import axios from "axios";

const apiPort4000 = axios.create({
    //baseURL: "http://localhost:4000", // ou a URL correta do backend na porta 4000
    baseURL: "http://177.71.203.249:4000"
  });
  

  export default apiPort4000;