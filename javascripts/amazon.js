let productsHTML=[]

products.forEach((product)=>{
  productsHTML +=`<div class="product-container">
    <div class="product-image-container">
      <img class="product-image"
        src="${product.image}">
    </div>

    <div class="product-name limit-text-to-2-lines">
      ${product.name}
    </div>

    <div class="product-rating-container">
      <img class="product-rating-stars"
        src="images/ratings/rating-${product.rating.stars *10}.png">
      <div class="product-rating-count link-primary">
        ${product.rating.count}
      </div>
    </div>

    <div class="product-price">
      $${(product.priceCents/100).toFixed(2)}
    </div>

    <div class="product-quantity-container">
      <select class="js-quantiy-selector-${product.id}">
        <option selected value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
      </select>
    </div>

    <div class="product-spacer"></div>

    <div class="added-to-cart js-added-to-cart">
      <img src="images/icons/checkmark.png">
      Added
    </div>

    <button class="add-to-cart-button button-primary js-add-to-cart" 
    data-product-id ="${product.id}">
      Add to Cart
    </button>
  </div>
  `;
});
document.querySelector('.js-products-grid').innerHTML = productsHTML;

let timedOut;
document.querySelectorAll('.js-add-to-cart').forEach((button) =>{
  button.addEventListener('click',()=>{
    const {productId} = button.dataset;
    let matchingItem;

    cart.forEach((item)=>{
      if(productId === item.productId){
        matchingItem =item;
      }
    });

    document.querySelector('.js-added-to-cart').classList.add('added-to-cart-pressed');
    clearTimeout(timedOut);
    timedOut =setTimeout(()=>{
      document.querySelector('.js-added-to-cart').classList.remove('added-to-cart-pressed');
    },2000);
    
    if(matchingItem){
      matchingItem.qantity += Number(document.querySelector(`.js-quantiy-selector-${productId}`).value);
    }else{
      cart.push({
        productId,
        qantity: Number(document.querySelector(`.js-quantiy-selector-${productId}`).value)
      });  
    }
    let cartQuanity =0;
    cart.forEach(item=>cartQuanity += Number(item.qantity));
    
    document.querySelector('.js-cart-quantity').innerHTML = cartQuanity;
  });
});