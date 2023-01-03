// shop.js
let addtocart = document.getElementsByClassName('addtocart');
(function () {
    //call api
    fetch('https://mateuszweclawowicz.github.io/WebDesignProjectYear2ProductsJSON/products.json')
    .then(response => {
        return response.json();
      }).then(data => {
        // Work with JSON data here
        console.log(data);
        let card = document.querySelectorAll('.card-body');
        card.forEach(item =>{
          item.style.height = '35rem';
        })
        let child = document.querySelectorAll('.childOfCard');
        let counter = 0;
        data.products.forEach(product => {
          //create main description and populate with data from api
          let h5 = document.createElement('h5');
          h5.classList.add('card-title');
          h5.textContent = product.product_name
          let p = document.createElement('p');
          p.classList.add('card-text');
          p.textContent = product.desc;
          let img = document.createElement('img');
          img.src = product.imgPath;
          img.classList.add('productImage');
          img.classList.add('img-thumbnail');
          
          //create price and add to card button
          let cardDiv = document.createElement('div');
          cardDiv.classList.add('cardDiv');

          

          let h3 = document.createElement('h3');
          h3.classList.add('d-inline-block');
          h3.textContent = '€' + product.price;
          let button = document.createElement('a');
          button.textContent = 'Add to Cart';
          button.setAttribute('class', 'btn btn-primary addtocart float-end col-sm-5');
          
          let icon = document.createElement('svg');
          icon.setAttribute('xmins', 'http://www.w3.org/2000/svg')
          icon.setAttribute('height', '16');
          icon.setAttribute('width', '16');
          icon.setAttribute('fill', 'white');
          icon.setAttribute('class', 'bi bi-cart');
          icon.setAttribute('viewBox','0 0 16 16');
          let path = document.createElement('path');
          path.setAttribute('d', 'M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z');
          
          card[counter].appendChild(h5);
          card[counter].appendChild(img);
          card[counter].appendChild(p);
          
          cardDiv.appendChild(h3);
          cardDiv.appendChild(button);
          button.appendChild(icon);
          icon.appendChild(path);
          card[counter].appendChild(cardDiv);
          counter++;
        })
        
        // add a listener for add to cart if such a button id is pressed
        counter = 0
        for(let i = 0; i < addtocart.length; i++)
        {
          addtocart[i].addEventListener("click", (Event) => AddToCart(i));
        }
        
      }).catch(err => {
        // Do something for an error here
      });
    let productCard = document.getElementsByClassName('card');
    
    
    
    
})();
let productOrdered = []
function AddToCart(productID) {
  addtocart[productID].classList.add('disabled');
  addtocart[productID].classList.remove('btn-primary');
  addtocart[productID].classList.add('btn-success');
  addtocart[productID].textContent = 'Added to cart';
  var total=localStorage.getItem('checkout');
  total++;
  localStorage.setItem('checkout',total);
  document.querySelector('#checkout').innerHTML=total;
  
  //store productID of products in cart
  productOrdered.push(productID + 1); 
  localStorage.setItem('order', JSON.stringify(productOrdered));
  console.log(JSON.parse(localStorage.getItem('order')))
} 


  






