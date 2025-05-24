document.addEventListener("DOMContentLoaded",()=>{
const placeorderbtn=document.getElementById('checkout');
const orderform=document.getElementById('order-form');
const form=document.getElementById('orderform');
const confirmmsg=document.getElementById('confirmation');

    if(!placeholder || !orderform || !form || !confirmmsg){
        console.error("Missing elements for order placement.");
    return;}
placeorderbtn.addEventListener('click',()=>{
    orderform.style.display='block';
});

form.addEventListener('submit',async(e)=>{
    e.preventDefault();

    const userDetails={
        name:document.getElementById('name').value,
        phone:document.getElementById('phone').value,
        location:document.getElementById('location').value,
        city:document.getElementById('city').value,
        cartItems:JSON.parse(localStorage.getItem('cart') || '[]')
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
        orderform.style.display='none';
    }else{
        alert(data.message || 'error placing order');
    }
});
    });
