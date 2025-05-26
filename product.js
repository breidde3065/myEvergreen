document.addEventListener("DOMContentLoaded", function () {
  // Load cart from localStorage or empty array
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  function fetchProducts() {
    fetch("https://evergreendb.glitch.me/products")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Server error: ${response.status} ${response.statusText}`);
        }
        return response.json();
      })
      .then((products) => {
        const productlist = document.getElementById("productlist");
        if (!productlist) {
          console.error("Error: Product list element not found.");
          return;
        }
        productlist.innerHTML = ""; // Clear existing list

        if (Array.isArray(products)) {
          products.forEach((product) => {
            const li = document.createElement("li");

            const img = document.createElement("img");
            img.src = product.imageUpload;
            img.alt = product.title;
            img.style.maxWidth = "150px";

            const lititle = document.createElement("h3");
            lititle.textContent = product.title;

            const lidescription = document.createElement("p");
            lidescription.textContent = product.description;

            const liprice = document.createElement("p");
            liprice.textContent = `Price: Kes ${product.price}`;

            const add2cart = document.createElement("button");
            add2cart.textContent = "Add to Cart";
            add2cart.addEventListener("click", function () {
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
      .catch((error) => console.error("Error fetching products:", error));
  }

  // Add product to cart or increase quantity if already exists
  function cartProduct(product) {
    // Find if product already in cart by id
    const existingProductIndex = cart.findIndex((item) => item.id === product.id);

    if (existingProductIndex !== -1) {
      // If found, increase quantity
      cart[existingProductIndex].quantity += 1;
    } else {
      // If not found, add product with quantity 1
      // Clone product object to avoid mutating original
      const productToAdd = { ...product, quantity: 1 };
      cart.push(productToAdd);
    }

    // Save updated cart
    localStorage.setItem("cart", JSON.stringify(cart));
    updatecart();
    updatecartcount();
  }

  function updatecart() {
    const cartitems = document.getElementById("cartitems");
    const totals = document.getElementById("totals");
    const placeorderbtn = document.getElementById("checkout");

    if (!cartitems || !totals || !placeorderbtn) {
      console.error("ERROR: Elements not found!!");
      return;
    }

    cartitems.innerHTML = "";

    let total = 0;

    cart.forEach((item, index) => {
      const li = document.createElement("li");

      const img = document.createElement("img");
      img.src = item.imageUpload;
      img.alt = item.title;
      img.style.maxWidth = "100px";

      const title = document.createElement("h4");
      title.textContent = item.title;

      const price = document.createElement("p");
      // Show price × quantity and total for item
      price.textContent = `Price: Kes ${item.price} x ${item.quantity} = Kes ${(item.price * item.quantity).toFixed(2)}`;

      const DeleteBtn = document.createElement("button");
      DeleteBtn.textContent = "Delete";
      DeleteBtn.addEventListener("click", function () {
        removeFromcart(index);
      });

      li.appendChild(img);
      li.appendChild(title);
      li.appendChild(price);
      li.appendChild(DeleteBtn);

      cartitems.appendChild(li);

      total += item.price * item.quantity;
    });

    totals.textContent = `Total: Kes ${total.toFixed(2)}`;
    placeorderbtn.style.display = cart.length > 0 ? "block" : "none";
  }

  function removeFromcart(index) {
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    updatecart();
    updatecartcount();
  }

  function updatecartcount() {
    const cartcount = document.getElementById("cartcount");
    if (cartcount) {
      // Show sum of quantities, not just array length
      const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
      cartcount.textContent = totalQuantity;
    }
  }

  fetchProducts();
  updatecartcount();
  updatecart();
});
