const fs = require('fs');
const uuid = require('uuid/v1');

function writeFile(content){
    fs.writeFileSync('./users.json',JSON.stringify(content));
}

function getUsers(){
    return require('./users.json');
}

function createUser({name,lastName,id}){
    const users = getUsers();
    if (users.find(user=>user.id==id))
        {
        throw new Error(`User with ID ${id} already exists`);
        }
            users.unshift({
                name,lastName,id:uuid()
            });

       writeFile(users);
        return users;     
}

function getUserById(id)
{
    const users = getUsers();
    let user = users.find(user=>user.id==id);  
    if (!user) {
        throw new Error('not found');
    }
    return user;
}


function deleteUser(id)
{
    let users = getUsers();
    if (getUserById(id));
    users = users.filter(user=> user.id != id);
    writeFile(users);
    return users;
}

function updateUserById(id, {name})
{
    if (getUserById(id));
    const users = getUsers();
    const user = users.find(user=> user.id == id);
    user.name = name;
    writeFile(users);
    return user;
}



module.exports = {
    getUsers,
    createUser,
    deleteUser,
    getUserById,
    updateUserById,

}