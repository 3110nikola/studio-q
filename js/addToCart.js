function addToCart (buyButton) {
    const id = buyButton.value;
    const variant = buyButton.getAttribute('data-variant');
    const price = buyButton.getAttribute('data-price');
    for (item of cartArr) {
        if (item.includes(id) && (item.includes(variant) || item.includes('null'))) {
            alert("This item is already in the cart!");
            throw new Error("This item is already in the cart!");
        }
    }
    cartArr.push(`id=${id}, variant=${variant}, price=${price}`);
    localStorage.setItem('cart', JSON.stringify(cartArr));
    updateCounter();
}