document.addEventListener("DOMContentLoaded",()=>{
const cart=JSON.parse(localStorage.getItem("cart") || "[]");
const cartItems=document.getElementById("cartitems");
const totals=document.getElementById("totals");
const placeorderbtn=document.getElementById('checkout');
const modal=document.getElementById("orderModal");
const closebtn=document.getElementById(".close")
 const form=document.getElementById('orderform');
const confirmmsg=document.getElementById('confirmation');

placeorderbtn.addEventListener("click",()=>{
 modal.style.display="flex";
 form.style.display="flex";
});
 closebtn.addEventListener("click",()=>{
  modal.style.display="none";
  form.style.display="none";
 });
 window.addEventListener("click",(e)=>{
  if(e.target===modal){
   modal.style.display="none";
   form.style.dispaly="none";
  }
 });

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
        modal.style.display='none';
    }else{
        alert(data.message || 'error placing order');
    }
});
    });
