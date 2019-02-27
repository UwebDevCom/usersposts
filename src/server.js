const users = require('./users/users.routes');
const posts = require('./posts/posts.routes');
const bodyParser = require('body-parser');
const express = require('express');

const app = express();
app.use(bodyParser.json())
app.use(users.route);
app.use(posts.route);

app.listen(5555, () =>{console.log('listening to post 5555')});