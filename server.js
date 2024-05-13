const app = require('./app');

let port = process.env.PORT || 5000;
let host = '127.0.0.1';
app.listen(port, host, () => {
    console.log('SERVER IS RUNNING....')
});