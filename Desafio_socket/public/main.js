const socket = io();

const formatterPeso = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0
});

let formProducts = document.getElementById("productForm");

formProducts.addEventListener('submit', (event)=>{
    event.preventDefault();
    const product = {
        title: document.querySelector('[name="title"]').value,
        price: document.querySelector('[name="price"]').value,
        thumbnail: document.querySelector('[name="thumbnail"]').value
    }
    formProducts.reset();
    socket.emit('newProduct', product);
})




socket.on('products', data => {
    let html;
    if (data.length > 0) {
        html = data.map(product => {
                return `<tr>
                        <td>${product.title}</td>
                        <td> ${formatterPeso.format(product.price)}</td>
                        <td><img style="width: 60px" src="${product.thumbnail}" alt="${product.title}"></td>
                    </tr>`
            })
            .join(" ")
    } else {
        html = `
                <tr>
                    <td scope="row" colspan="4" style="text-align:center;">HO HAY PRODUCTOS</td>
                </tr>`;

    }
    document.getElementById("tbody").innerHTML = html;
});