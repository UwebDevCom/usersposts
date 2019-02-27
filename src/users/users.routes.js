
const {Router} =require('express');
const {MongoClient} = require('mongodb');
const route = Router();


const {
    getUsers,
    createUser,
    deleteUser,
    getUserById,
    updateUserById,

} = require('./users.js');





const {
    getPosts,getPostById,createPost,updatePost,deletePost
} = require('../posts/posts');

const {
    postDisp,
} = require('../posts/postUI');

const {createList, creatUser} = require('./user.ui');

route.get('/', (req,res)=>{
    res.send('<h1>Welcome to my site</h1>');
});

route.get('/users',async (req,res)=>{

    try {
    const url ='mongodb://localhost:27017';
    const dbName = 'net-craft-mongo-one';
    const connection = await MongoClient.connect(url);
    const dataBaes = connection.db(dbName);
    const usersCollection = dataBaes.collection('users');
    const results = await usersCollection.find({}).toArray();
    res.send(results);
    } catch(e){
        res.status(400).send(e.message)
    }


    // const users = getUsers();
//  res.send( `<ul>${createList(users)}</ul>`);
});



route.get('/users/:id/posts',(req,res)=>{
    const posts = getPosts();
    const users = getUsers();
   const user =  req.params.id;
   const userIdPosts = posts.filter((post) => {if (post.userId == user) {return post}});

     res.send( `<ul>${postDisp(userIdPosts)}</ul>`);
    });



route.post('/users',(req,res)=>{
    try {
     const users = createUser(req.body);
     res.send(users);
    }catch(e){
     res.status(409);
     res.send(e.message);
    }
 });



 route.get('/users/:id',(req,res)=>{
    try {
        const user = getUserById(req.params.id);
        res.send(creatUser(user)); 
    } catch(e) {
        res.status(404);
        res.send(e.message);
    }
});



route.delete('/users/:id',(req,res)=>{
    try{
        users  = deleteUser(req.params.id);
    res.send(users);
    }catch(e){
        res.status(404);
        res.send(e.message);
    }
})



route.put('/users/:id',(req,res)=>{
    try {
    const user = updateUserById(req.params.id, req.body)
    res.send(user);
    }
    catch(e){
        res.status(404);
        res.send(e.message);
    }
})

module.exports = {
    route,
}
