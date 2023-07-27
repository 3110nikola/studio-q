const allProductsGrid = document.querySelector('#all-products');

async function fetchProducts() {
    let response = await fetch('json/products.json');
    let data = await response.json();
    return data;
}

fetchProducts()
    .then(data => {
        for (product of data) {
            const productLink = document.createElement('a');
            productLink.classList.add('flex', 'flex-col', 'gap-5', 'align-items-center', 'grid-product', 'bg-dark-green', 'transition');
            productLink.href = `product.html?id=${product.Id}`;
            productLink.innerHTML =
            `<img width="100%" src="${product.Logo ? product.Logo : product.Images[0]}" class="circle bg-white">
            <p class="font-xl">${product.Title}</p>
            <p>${product.ShortDescription}</p>`;
            allProductsGrid.append(productLink);
        }
    })
    .catch(error => {
        alert(error);
    })