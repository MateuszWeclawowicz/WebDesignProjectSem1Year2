// checkout.js
let productData;
var checkout = document.getElementById('buy-now');
// add a listener for add to cart if such a button id is pressed


// add a listener so that we run this code and preventdefault for submit...
checkout.addEventListener("click", () => {
    event.preventDefault();
    var cardnumber=document.getElementById('cardNumber').value;
    var cardcvv=document.getElementById('cardCvv').value;
    //check if user is logged in
    if(localStorage.getItem('loggedIn') == 1)
    {
        //check if there are items in cart
        if(localStorage.getItem('checkout') != 0) 
        {
            if (cardnumber=="1234 5678 9102 3456" && cardcvv=="123") 
            {
                var element = document.getElementById("payment-failure");
                element.classList.add("d-none");
                var element = document.getElementById("payment-success");
                element.classList.remove("d-none");
                // now set cart total to zero
                var total=0;
                // makes sure that when we goto another page the total is zero 
                localStorage.setItem('checkout',total); 
                localStorage.setItem('order', 0);

                //reset cart counter
                let checkoutCount = document.getElementById('checkout');
                checkoutCount.textContent = 0
                //remove items from cart
                let checkoutOrder = document.getElementById('orderList');
                while(checkoutOrder.firstChild){
                    checkoutOrder.removeChild(checkoutOrder.lastChild);
                }

                //reset price
                let totalPrice = document.getElementById('totalPrice');
                totalPrice.textContent = '€' + 0;

            } 
            else 
            {
                var element = document.getElementById("payment-success");
                element.classList.add("d-none");
                var element = document.getElementById("payment-failure");
                element.classList.remove("d-none");
        
            }
        }
        else
        {
            let element = document.getElementById('emptyCart');
            element.classList.remove('d-none');
        }
        
    }
    else
    {
        let element = document.getElementById("loginRequired");
        element.classList.remove('d-none');
    }
    
    return false;  

    
    
})

fetch('https://mateuszweclawowicz.github.io/WebDesignProjectYear2ProductsJSON/products.json')
    .then(response => {
        return response.json();
      }).then(data => {
        // Work with JSON data here
        createCart(data);
        productData = data;
        }) 
        .catch(err => {
        // Do something for an error here
      });

    



let counter = 0;
function createCart(data) {
    let cart = document.getElementById('order');
    let billing = document.getElementById('billing');
    let total= 0;

    //get products ordered
    let order = JSON.parse(localStorage.getItem('order'));

    //create checkout list of products ordered
    let cartDiv = document.createElement('div');
    cartDiv.setAttribute('class', 'col-md-6 order-md-2 mb-4');
    let cartDivScroll = document.createElement('div');
    cartDivScroll.setAttribute('class','overflow-auto p-3 checkoutList');
    cartDivScroll.setAttribute('id', 'orderList');
    let h4 = document.createElement('h4');
    let span = document.createElement('span');
    span.setAttribute('class', 'text-muted');
    span.textContent = "Your cart";
    cartDiv.appendChild(h4);
    h4.appendChild(span);
    
    let cartList = document.createElement('ul');
    cartList.setAttribute('class', 'list-group mb-3');
    
    for(let i = 0; i < order.length; i++){
        let li = document.createElement('li');
        li.setAttribute('class', 'list-group-item d-flex justify-content-between lh-condensed');
        let divItem = document.createElement('div');
        let h6 = document.createElement('h6');
        h6.setAttribute('class', 'my-0');
        let small = document.createElement('small');
        small.setAttribute('class', 'text-muted');
        let spanItem = document.createElement('span');
        spanItem.setAttribute('class', 'text-muted');
        let image = document.createElement('img')
        image.setAttribute('class', 'rounded float-left checkoutImage');
        
        //find products from api that match products ordered and populate elements with data
        data.products.forEach(item =>{
            if(order[i] == item.product_id){
                h6.textContent = item.product_name;
                small.textContent = item.desc;
                spanItem.textContent = '€' + item.price
                image.src = item.imgPath;
                total += item.price;
            }
            
            
            
        })
        
        //append everything together
        cartList.appendChild(li);
        li.appendChild(image);
        li.appendChild(divItem);
        
        divItem.appendChild(h6);
        divItem.appendChild(small);
        li.appendChild(spanItem);
    };
    //create total price 
    let liTotal = document.createElement('li');
    liTotal.setAttribute('class', 'list-group-item d-flex justify-content-between lh-condensed')
    let spanTotal = document.createElement('span');
    spanTotal.textContent = "Total (EUR)"
    let strong = document.createElement('strong');
    strong.setAttribute('id', 'totalPrice');
    strong.textContent = '€' + total;

    //append everything together
    cart.appendChild(cartDiv);
    cartDiv.appendChild(cartDivScroll);
    cartDivScroll.appendChild(cartList);
    cartDiv.appendChild(liTotal);
    liTotal.appendChild(spanTotal);
    liTotal.appendChild(strong);
    
}

