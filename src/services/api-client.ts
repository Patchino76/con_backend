import axios, { CanceledError } from 'axios';

export default axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  headers: { // not nessesary, but can pass api-key if needed
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})


export {CanceledError}
