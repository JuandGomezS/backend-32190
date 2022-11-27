const Message = require('../models/message.model');
const bd = new Message('messages');

function toSocketMessages(){
    let response =  bd.getAll();
    return response;
}

async function insertMessage(message){   
    let response = await bd.save(message);
    console.log(response)
}


module.exports = {
    toSocketMessages,
    insertMessage
};