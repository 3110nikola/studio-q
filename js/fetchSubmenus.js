const submenus = document.querySelectorAll('.submenu');

async function fetchSubmenus () {
    let response = await fetch('json/products.json');
    let data = await response.json();
    return data;
}

fetchSubmenus()
        .then(data => {
            submenus.forEach(submenu => {
                for (product of data) {
                    const productLink = document.createElement('a');
                    productLink.classList.add('flex', 'gap-5', 'justify-space', 'align-items-center', 'submenu-link', 'transition');
                    productLink.href = `product.html?id=${product.Id}`;
                    productLink.innerHTML =
                    `<div class="no-space">
                        <p>${product.Title}</p>
                        <p class="font-s uppercase">${product.ShortDescription}</p>
                    </div>
                    <img src="${product.Logo ? product.Logo : product.Images[0]}" width="40" height="40" class="circle bg-white">`;
                    submenu.append(productLink);
                }
            })
        })
        .catch(error => {
            console.log(error)
        })