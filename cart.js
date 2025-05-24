document.addEventListener("DOMContentLoaded",()=>{
const cart=JSON.parse(localStorage.getItem("cart") || "[]");
const cartItems=document.getElementById("cartitems");
const totals=document.getElementById("totals");
const placeorderbtn=document.getElementById('checkout');
const form=document.getElementById('orderform');
const confirmmsg=document.getElementById('confirmation');

placeorderbtn.addEventListener("click",()=>{
 form.style.display="flex";
})

console.log("checkout button:", placeorderbtn);
console.log("order form:", form);


 
form.addEventListener('submit',async(e)=>{
    e.preventDefault();

    const userDetails={
        name:document.getElementById('name').value,
        phone:document.getElementById('phone').value,
        location:document.getElementById('location').value,
        city:document.getElementById('city').value,
        cartItems:cart
    };
    const res=await fetch('https://evergreendb.glitch.me/place-order',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(userDetails)
    });

    const data=await res.json();
    if (res.ok){
        confirmmsg.innerText=data.message;
        confirmmsg.style.display='block';
        localStorage.removeItem('cart');
        form.style.display='none';
    }else{
        alert(data.message || 'error placing order');
    }
});
    });
