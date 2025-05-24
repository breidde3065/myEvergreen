document.addEventListener("DOMContentLoaded",function(){
let cart =JSON.parse(localStorage.getItem("cart")) || [];

    function fetchProducts(){

        fetch("https://evergreendb.glitch.me/products")
        .then(response =>{
            if (!response.ok){
                throw new Error(`Server error:${response.status}${response.statusText}`);
            }
        
        return response.json();
    })
    .then(products => {
        const productlist = document.getElementById("productlist");
        if(!productlist){
            console.error("Error: Product list element not found.");
            return;
        }
        productlist.innerHTML = ""; // Clear existing list
    
    if(Array.isArray(products)){
    
    
        products.forEach(product => {
            const li = document.createElement("li");
           const img=document.createElement("img");
           img.src=product.imageUpload;
           img.alt=product.title;
           img.style.maxWidth="150px";
           
           const lititle=document.createElement("h3");
           lititle.textContent=product.title;
    
           const lidescription=document.createElement("p");
           lidescription.textContent=product.description;
    
           const liprice=document.createElement("p");
           liprice.textContent=`Price:$${product.price}`;
    
           
        
    
           
    const add2cart=document.createElement("button");
    add2cart.textContent="Add to Cart";
    add2cart.addEventListener("click",function(){
        cartProduct(product);
    });
          
                li.appendChild(img);
                li.appendChild(lititle);
                li.appendChild(lidescription);
                li.appendChild(liprice);
    li.appendChild(add2cart);
            productlist.appendChild(li);
        });
    }
    })
    .catch(error => console.error("Error fetching products:", error));
    }

    


function cartProduct(product){
   
    cart.push(product);
   localStorage.setItem("cart",JSON.stringify(cart));
   updatecart();
   updatecartcount();
}
function updatecart(){

    
   

    const cartitems=document.getElementById("cartitems");
    const totals=document.getElementById("totals");
    const placeorderbtn=document.getElementById("checkout");
    
    

    if(!cartitems || !totals || !placeorderbtn){
        console.error("ERROR: Elements not found!!");
        return;
    }

    cartitems.innerHTML="";

    let total=0;

    cart.forEach((item,index)=>{
        const li= document.createElement("li");
        const img=document.createElement("img");
        img.src=item.imageUpload;
        img.alt=item.title;
        img.style.maxWidth="100px";

        const title=document.createElement("h4");
        title.textContent=item.title;

        const price=document.createElement("p");
        price.textContent=`Price: Kes ${item.price}`;

        const DeleteBtn=document.createElement("button");
        DeleteBtn.textContent="Delete";
        DeleteBtn.addEventListener("click",function(){
            removeFromcart(index);
        });
        li.appendChild(img);
        li.appendChild(title);
        li.appendChild(price);
        li.appendChild(DeleteBtn);

        

        cartitems.appendChild(li);
        total += item.price;
    });
    totals.textContent=`Total: Kes ${total.toFixed(2)}`;
    placeorderbtn.style.display=cart.length > 0 ? "block" : "none";
}

function removeFromcart(index){
cart.splice(index,1);
localStorage.setItem("cart",JSON.stringify(cart));
updatecart();
updatecartcount();
}
function updatecartcount(){
    const cartcount=document.getElementById("cartcount");
    if(cartcount){
        cartcount.textContent=cart.length;
    }
}
fetchProducts();
updatecartcount();
updatecart();
});
