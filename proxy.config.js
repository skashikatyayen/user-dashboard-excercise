
// Use node express server to create auth API.
const express = require('express');
const app = express();
const axios = require('axios');
let users = []; // Configured Mock Users. will be fetched from mockapi users path.
app.use(express.json());
app.post('/auth', (req, res) => {
    console.log('Got Auth request');
    const body = req.body;
    const foundUsers = users.filter(u => u.email.toLowerCase() === body.username.toLowerCase());
    if(foundUsers.length > 0){
        res.json({
            message: "Logged In Successfully.",
            username: foundUsers[0].name,
            role: foundUsers[0].role,
            token: "AuthToken"
          });
    } else {
        res.status(400).json({
            message: "Invalid Details.",
          });
    }

    
});

app.get('/test', (req, res) => {
    console.log('Got Test request');
    res.send('<html>Got it</html>');
});
// Start express server on port 4300
app.listen(4300, () => {
    console.log('Listen started.');
    // Once the server is started. call mockapi to read all the users and save in users variable.
    axios.get("https://64a97aa08b9afaf4844abc0f.mockapi.io/api/users").then((res) => {
        console.log(res.data);
        users = res.data;
    });
});


// Since angular app is running on 4200 we will proxy the auth request to above started express server running on 4300.
const PROXY_CONFIG = {

    "/auth": {
        "target": "http://localhost:4300",
        "secure": false,
        "changeOrigin": true
    }

};

module.exports = PROXY_CONFIG;

