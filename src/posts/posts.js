
const uuid = require('uuid/v1');
const fs = require('fs');

const {
    isEmpty,
} = require('./checks');



function writeFile(content){
    return fs.writeFileSync('./posts-list.json',JSON.stringify(content))
}
function getPosts(){
    return require('./posts-list.json');
}

function getPostById(id){
    const posts = getPosts();
    let post = posts.find(post=> post.id ==id);
    if (!post) { 
        throw new Error(`Post with id ${id} isn't exist`)
    }
    return post;
}
function getPostByUserId(userId){
    const posts = getPosts();
    let post = posts.filter(post => {if (post.userId == userId){return post}});
    if (!post) { 
        throw new Error(`Post with id ${userId} isn't exist`)
    }
    return post;
}


function createPost({userId='',id='',title='',body=''}) {
    let posts = getPosts();
    let post = posts.find(post=> post.id ==id);
    if (post) {
        throw new Error('this ID is already exist');
    }
    let newPost = {
        userId,
        id: uuid(),
        title,
        body
    }
    
    if (isEmpty(newPost)) {
        posts.unshift(newPost);
        writeFile(posts);
    }else{
        throw new Error('excludes details')
       
    }
    return posts;
}



function updatePost(id,{title,body}){
    const posts = getPosts();
    let post = posts.find(post=>post.id == id);
    if(!post) {
        throw new Error(`there is no such a post like this`);
    }
    post.title = title;
    post.body = body;
    fs.writeFileSync('./posts-list.json', JSON.stringify(posts));
    return post;
}

function deletePost(id) {
    if (getPostById(id)) { 
        let posts = getPosts();
        posts = posts.filter(post=>post.id !=id);
        fs.writeFileSync('./posts-list.json', JSON.stringify(posts));
        return posts;   
    }else {
        throw new Error('cant delete non existing post ');  // cant display this cause getPostById throw the error first...
    }
}



/*
 // the solution by Roy


route.get('./users/:id/posts', (req,res)=>{
    const posts =  getPost();
    return posts.filter((post)=>post.userId==userId)

    res.send()
})

*/




module.exports = {
    getPosts,
    getPostById,
    getPostByUserId,
    writeFile,
    createPost,
    updatePost,
    deletePost,
}