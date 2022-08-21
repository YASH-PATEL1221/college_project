import axios from "axios";
import Cookies from "js-cookie"
 

const User = Cookies.get("user")

const url = [];

axios.get(`http://localhost:3001/auth?q=${User}`)
.then(res => {
   url.push(res.data.url)
});

export default url;