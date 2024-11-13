import axios from 'axios';
const APIProvince = axios.create({
  baseURL: 'https://vapi.vnappmob.com/api/province/',
});
export default APIProvince;