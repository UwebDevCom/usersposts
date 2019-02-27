


function isEmpty(post) {
    if (Object.keys(post).length > 0) {
        for (let field in post) { 
            if (post[field] =='') {
                console.log(post[field])        
                return false
            }
        }
    }
    return true;
}
module.exports = {
    isEmpty,
}