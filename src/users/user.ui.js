function createList(users){
    let fragment = '';
    users.forEach(user=>{

        fragment += `<li>${user.name}</li><li> ${user.id}</li>`;
       
    });
return fragment;
}

function creatUser(user){
  let fragment = `<li>${user.name}</li><li>${user.lastName}</li><li> ${user.id}</li>`;
    return fragment;
}


module.exports = {
    createList, creatUser,
}