function postDisp(posts){
    posts = posts.length >= 0 ? posts : [posts]; 
    let markup = ''; 
    posts.forEach((post)=>{
    let {userId,id,title,body} = post; 
    markup += `
    <div class="post"></div>
    <h3>${title} | id: <span>${id}</span> | user: <span>${userId}</span></h3>
    <hr />
    <p>${body}</p>
    <br />
    <br />
    `;
    });
    return markup;
}







module.exports = {
    postDisp,
}