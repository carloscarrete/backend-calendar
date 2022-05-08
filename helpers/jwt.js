const jwt = require('jsonwebtoken');

const generateToken = ( uid, name) => {

    return new Promise((resolve, reject)=>{

        const payload = {uid, name};

        jwt.sign(payload, process.env.SECRET_KEY_JWT, {
            expiresIn: '2hr'
        }, (err, token)=>{
            if(err){
                console.log(err);
                reject(err);
            }else{
                resolve(token);
            }
        })

    })
}


module.exports = {
    generateToken
}
