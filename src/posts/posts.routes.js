
const {Router} = require('express');

const route = Router();

const {
    getPosts,getPostById,createPost,updatePost,deletePost,getPostByUserId
} = require('./posts');

const {
    postDisp,
} = require('./postUI');


route.get('/',(req,res)=>{
    const posts = getPosts();
    res.send(postDisp(posts));
});
route.get('/posts',(req,res)=>{

    if (req.query.userId) {
        let userIdPosts = getPostByUserId(req.query.userId);
        res.send('sdf' + postDisp(userIdPosts));
        
    }else 
    {
        const posts = getPosts();
        res.send(postDisp(posts));
    }
});


route.get('/posts/:id',(req,res)=>{
    try {
        let post = getPostById(req.params.id);
    res.send(postDisp(post));
    } catch(e) {
        res.status(404);
        res.send(e.message);
    }
});




route.post('/posts',(req,res)=>{
    try {
        let querys = req.body;
    let newPosts = createPost(querys);
    res.send((`<h1>user with id ${newPosts[0].id} was created</h1> <hr /><hr /><hr />`) + postDisp(newPosts));
    } catch(e) {0
        res.status(409);
        res.send(e.message);
    }
}); 
   
   


route.post('/users/:id/posts',(req,res)=>{
    try {
    const post = {
        ...req.body,
        userId: req.params.id
    }
    const newPost = createPost(post);
    res.send(newPost)
    // my solution1
    //if (user == req.body.userId)  {
    //     const newPost = createPost(req.body);
    //     res.send( `new post: ${JSON.stringify(newPost[0])} by user ${newPost[0].userId}`); 
    // } else { res.send( `<p>Cant write post the other user</p>`); }
} catch(e) {
    res.status(409);
    res.send(e.message);
}     


/*
Roy solution

    const post = {
        ...req.body,
        userId: req.params.id
        connst newPost = createPost(post);
        res.send(post);
    }


        try {
    const user =  req.params.id;
    if (user == req.body.userId)  {
        const newPost = createPost(req.body);
        res.send( `new post: ${JSON.stringify(newPost[0])} by user ${newPost[0].userId}`); 
    } else { res.send( `<p>Cant write post the other user</p>`); }
} catch(e) {
    res.status(409);
    res.send(e.message);
}     


*/
    });




   
route.put('/posts/:id',(req,res)=>{
   try {
    let post = updatePost(req.params.id,req.body);
    res.send(`<h1>post was updated to:  ${post.title} and ${post.body}`);
   }catch(e) {
       res.status(404);
       res.send(e.message);
   }
});



route.delete('/posts/:id',(req,res)=>{
    try{
        let {id} = req.params;
    let posts = deletePost(id);
    res.send((`<h1>user with id ${id} was deleted</h1> <hr /><hr /><hr />`) + postDisp(posts));
    }catch(e){
        res.status(404);
        res.send(e.message);
    }
});

module.exports = {
    route,
}




/*
 // the solution by Roy


route.get('./users/:id/posts', (req,res)=>{
    const posts = getPostByUserId(req.params.id)
    res.send(postss)
})






*/