import axios from 'axios';

axios.post('http://localhost:3001/addresses')
.then(string => console.log(string.data))






