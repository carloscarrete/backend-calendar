const moment = require('moment');

const isDate = (value) =>{
    if(!value){
        return false
    }

    const customDate = moment();

    if(customDate.isValid()){
        return true;
    }else{
        return false;
    }
}



module.exports = {isDate};