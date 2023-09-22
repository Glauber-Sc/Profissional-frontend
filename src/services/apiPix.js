import axios from "axios";

const apiPort4000 = axios.create({
  //  baseURL: "http://192.168.100.7:4000", // ou a URL correta do backend na porta 4000


  baseURL: "http://177.71.203.249:4000",


   //baseURL: "https://pedepede.fun"

  });
  

  export default apiPort4000;