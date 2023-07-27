const selectedProduct = location.href.substring(location.href.indexOf('=') + 1),
pageTitle = document.querySelector('title'),
productImage = document.querySelector('#product-image'),
imageCircles = document.querySelector('#image-circles'),
productText = document.querySelector('#product-text'),
productTitle = document.querySelector('#product-title'),
shortDescription = document.querySelector('#short-description'),
longDescription = document.querySelector('#long-description'),
productOptions = document.querySelector('#product-options'),
productPrice = document.querySelector('#product-price'),
buyButton = document.querySelector('#buy-button'),
productVideo = document.querySelector('#product-video');

async function fetchProduct () {
    let response = await fetch('json/products.json');
    let data = await response.json();
    return data;
}

fetchProduct()
        .then(data => {
            const product = data.find(oneProduct => oneProduct.Id === selectedProduct);
            pageTitle.innerHTML = `${product.Title} - Studio Q`
            productImage.src = product.Images[0];
            for (let i = 0; i < product.Images.length; i++) {
                const imageCircle = document.createElement('button');
                imageCircle.classList.add('images-circle', 'pointer');
                imageCircle.setAttribute('data-src', product.Images[i]);
                imageCircle.setAttribute('onclick', 'changeImage(this)')
                imageCircles.append(imageCircle);
                if (i === 0) {
                    imageCircle.classList.add('active');
                }
            };
            if (product.Logo) {
                const logo = document.createElement('img');
                logo.src = product.Logo;
                logo.setAttribute('width', '100px');
                productText.prepend(logo);
            }
            productTitle.innerHTML = `<b>${product.Title}</b>`;
            shortDescription.innerHTML = `<b>${product.ShortDescription}</b>`;
            longDescription.innerHTML = product.LongDescription;
            if (product.Variants) {
                productPrice.innerHTML = `$${product.Variants[0].Price}`;
                buyButton.setAttribute('data-variant', product.Variants[0].Name);
                buyButton.setAttribute('data-price', product.Variants[0].Price);
                productOptions.setAttribute('onchange', 'changePrice(this)');
                for (let i = 0; i < product.Variants.length; i++) {
                    const option = document.createElement('option');
                    option.innerHTML = product.Variants[i].Name;
                    option.setAttribute('data-price', product.Variants[i].Price);
                    productOptions.append(option);
                };
            } else {
                productPrice.innerHTML = product.Price === '0' ? 'FREE!' : `$${product.Price}`;
                productOptions.remove();
                buyButton.setAttribute('data-price', product.Price);
            }
            if (product.AppLink) {
                const appStoreButton = document.createElement('a');
                appStoreButton.classList.add('bg-dark-green', 'button', 'pointer', 'text-white', 'font-lg', 'transition')
                appStoreButton.href = product.AppLink;
                appStoreButton.innerHTML = 'Download on the App Store';
                productText.append(appStoreButton);
                buyButton.remove()
            } else {
                buyButton.value = product.Id;
                buyButton.setAttribute('onclick', 'addToCart(this)');
            }
            if (product.Video) {
                productVideo.src = product.Video;
            } else {
                productVideo.remove();
            }
        })
        .catch(error => {
            console.log(error)
        })

function changePrice (select) {
    const option = select.options[select.selectedIndex];
    productPrice.innerHTML = `$${option.getAttribute('data-price')}`;
    buyButton.setAttribute('data-variant', option.value);
    buyButton.setAttribute('data-price', option.getAttribute('data-price'));
}

function changeImage (circle) {
    productImage.src = circle.getAttribute('data-src');
    circle.classList.add('active');
    const allCircles = document.querySelectorAll('.images-circle');
    allCircles.forEach(currentCircle => {
        if (currentCircle != circle) {
            currentCircle.classList.remove('active');
        }
    })
}