const archivo =  require('./clase');

const ar = new archivo();
ar.getById(3).then(value => {
    console.log(value);
});;