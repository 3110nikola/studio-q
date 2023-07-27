if (cartArr.length === 0) {
    location.href = 'index.html';
}

const checkoutContainer = document.querySelector('#checkout-container');

async function fetchCheckout () {
    let response = await fetch('json/products.json');
    let data = await response.json();
    return data;
}

fetchItemsInCart()
    .then(data => {
        for (item of cartArr) {
            const itemId = item.substring(item.indexOf('id=')+3, item.indexOf(','));
            const itemVariant = item.substring(item.indexOf('variant=')+8, item.indexOf(', price'));
            const itemPrice = item.substring(item.indexOf('price=')+6);
            const product = data.find(oneProduct => oneProduct.Id === itemId);
            const cartProductDiv = document.createElement('div');
            cartProductDiv.innerHTML =
            `<div>
                <div class="flex align-items-center justify-space">
                    <div class="flex align-items-center gap-5">
                        <img src="${product.Images[0]}" class="circle" width="50px">
                        <div class="flex-col gap-5">
                            <p><b>${product.Title}</b></p>
                            <p>${itemVariant == 'null' ? '' : itemVariant}</p>
                        </div>
                    </div>
                    <p class="font-xl">$${itemPrice}</p>
                </div>
                <hr>
            </div>`;
            checkoutContainer.append(cartProductDiv);
        }
    })
    .catch(error => {
        console.log(error)
    })

const nameRegex = /^[a-zA-Z ]+$/,
addressRegex = /^[a-zA-Z0-9\s,.'-]{3,}$/,
postalRegex =  /^[0-9]{5}(?:-[0-9]{4})?$/,
cityRegex = /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/,
phoneRegex = /^\+(?:[0-9] ?){6,14}[0-9]$/,
firstName = document.querySelector('#first-name'),
lastName = document.querySelector('#last-name'),
address = document.querySelector('#address'),
postal = document.querySelector('#postal'),
city = document.querySelector('#city'),
phone = document.querySelector('#phone'),
form = document.forms.namedItem('checkout');

function sendData(event) {
    event.preventDefault();
    if (!(nameRegex.test(firstName.value))) {
        alert('First name is not valid');
    } else if (!(nameRegex.test(lastName.value))) {
        alert('Last name is not valid');
    } else if (!(addressRegex.test(address.value))) {
        alert('Address is not valid');
    } else if (!(postalRegex.test(postal.value))) {
        alert('Postal code is not valid');
    } else if (!(cityRegex.test(city.value))) {
        alert('City name is not valid');
    } else if (!(phoneRegex.test(phone.value))) {
        alert('Phone number is not valid');
    } else {
        formData = new FormData(form),
        request = new XMLHttpRequest();
        request.open("POST", "stash.php", true);
        request.onload = () => {
            console.log(formData);
            request.status === 200 ? 
            alert("Thanks for contacting us! We will get in touch with you shortly.") : 
            alert(`Unfortunately, error ${request.status} occurred when trying to send your data. Please try again.`);
        };
        request.send(formData);
    }
}