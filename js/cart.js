const cartButtons = document.querySelectorAll('.cart-button'),
closeButton = document.querySelector('#close-cart'),
emptyButton = document.querySelector('#empty-cart'),
cart = document.querySelector('.cart'),
container = document.querySelector('#cart-products-container'),
body = document.querySelector('body'),
subtotalDisplay = document.querySelector('#subtotal'),
counters = document.querySelectorAll('.counter'),
checkoutButton = document.querySelector('#checkout');
let cartArr = JSON.parse(localStorage.getItem('cart')) || [];
let subtotal = 0;

cartButtons.forEach(button => {
    button.addEventListener('click', () => {
        checkCartArr();
        cart.classList.add('active');
        body.style.overflowY = 'hidden';
        body.style.setProperty('--disableZ', '10');
    })
})

closeButton.addEventListener('click', () => {
    cart.classList.remove('active');
    body.style.overflowY = 'unset';
    body.style.setProperty('--disableZ', '-10');
})

emptyButton.addEventListener('click', () => {
    localStorage.removeItem('cart');
    cartArr = [];
    subtotal = 0;
    subtotalDisplay.innerHTML = `$${subtotal}`;
    updateCounter();
    checkCartArr();
})

async function fetchItemsInCart () {
    let response = await fetch('json/products.json');
    let data = await response.json();
    return data;
}

function checkCartArr() {
    container.innerHTML = '';
    subtotal = 0;
    if (cartArr.length > 0) {
        fetchItemsInCart()
            .then(data => {
                for (item of cartArr) {
                    const itemId = item.substring(item.indexOf('id=')+3, item.indexOf(','));
                    const itemVariant = item.substring(item.indexOf('variant=')+8, item.indexOf(', price'));
                    const itemPrice = item.substring(item.indexOf('price=')+6);
                    const product = data.find(oneProduct => oneProduct.Id === itemId);
                    const cartProductDiv = document.createElement('div');
                    cartProductDiv.innerHTML =
                    `<div class="flex align-items-center justify-space">
                        <div class="flex align-items-center gap-5">
                            <img src="${product.Images[0]}" class="circle" width="50px">
                            <div class="flex-col gap-5">
                                <p><b>${product.Title}</b></p>
                                <p>${itemVariant == 'null' ? '' : itemVariant}</p>
                            </div>
                        </div>
                        <div class="flex flex-col gap-5">
                            <img data-id="${itemId}" data-variant="${itemVariant}" onclick="removeItem(this)" src="img/x.png" class="pointer" width="10px">
                            <p>$${itemPrice}</p>
                        </div>
                    </div>`;
                    container.append(cartProductDiv);
                    subtotal += Number(itemPrice);
                }
                subtotalDisplay.innerHTML = `$${subtotal}`;
                container.classList.remove('empty-bg');
                checkoutButton.classList.remove('inactive');

            })
            .catch(error => {
                console.log(error)
            })
    } else {
        subtotalDisplay.innerHTML = `$${subtotal}`;
        container.classList.add('empty-bg');
        checkoutButton.classList.add('inactive');
    }
}

checkCartArr();

function updateCounter () {
    counters.forEach(counter => {
        counter.innerHTML = cartArr.length;
    })
}

updateCounter();

function removeItem (x) {
    const id = x.getAttribute('data-id');
    const variant = x.getAttribute('data-variant');
    cartArr = cartArr.filter(function(item) {
        return !(item.includes(id) && (item.includes(variant) || item.includes('null')));
    });
    localStorage.setItem('cart', JSON.stringify(cartArr));
    checkCartArr();
}

function checkout () {
    if (cartArr.length > 0) {
        location.href = 'checkout.html';
    }
}