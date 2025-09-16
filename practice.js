let cart = [];

// Load Categories
const loadCatagories = () => {
  const url = "https://openapi.programming-hero.com/api/categories";
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayCatagories(data.categories))
    .catch((err) => console.error("Error loading categories:", err));
};

// Display Categories
const displayCatagories = (categories) => {
  const categoryContainer = document.getElementById("display-Catagories");
  categoryContainer.innerHTML = "";

  // Default All button
  const allBtn = document.createElement("h2");
  allBtn.className =
    "pl-3 p-3 bg-green-600 text-white text-[20px] font-bold cursor-pointer rounded-lg mb-2";
  allBtn.innerText = "All";
  allBtn.onclick = () => loadCard();
  categoryContainer.appendChild(allBtn);

  categories.forEach((category) => {
    const div = document.createElement("div");
    div.innerHTML = `
      <h2 
        class="pl-3 p-3 hover:bg-green-600 text-[20px] font-bold cursor-pointer rounded-lg"
        onclick="loadCard('${category.category_name}')"
      >
        ${category.category_name}
      </h2>
    `;
    categoryContainer.appendChild(div);
  });
};

// Load Cards
const loadCard = (selectedCategory = "") => {
  fetch("https://openapi.programming-hero.com/api/plants")
    .then((res) => res.json())
    .then((data) => {
      let filteredCards = data.plants;
      if (selectedCategory) {
        filteredCards = data.plants.filter(
          (plant) => plant.category === selectedCategory
        );
      }
      displayCard(filteredCards);
    })
    .catch((err) => console.error("Error loading cards:", err));
};

// Display Cards
const displayCard = (cards) => {
  const cardContainer = document.getElementById("card-display-container");
  cardContainer.innerHTML = "";

  if (cards.length === 0) {
    cardContainer.innerHTML = `
      <div class="col-span-3 text-center text-gray-500 font-bold">
        No plants found in this category.
      </div>
    `;
    return;
  }

  cards.forEach((card) => {
    const cardDiv = document.createElement("div");
    cardDiv.className =
      "card bg-base-100 w-60 h-[380px] shadow-sm cursor-pointer";

    cardDiv.innerHTML = `
      <div class="card-body">
        <img class="h-[100px] w-full object-cover rounded-lg" src="${card.image}" alt="${card.name}" />
        <h2 class="card-title">${card.name}</h2>
        <p class="text-[10px] text-justify">${card.description}</p>
        <div class="flex justify-between items-center">
          <h2 class="p-2 bg-green-300 rounded-xl font-bold text-green-700">${card.category}</h2>
          <h2 class="font-bold">$<span>${card.price}</span></h2>
        </div>
        <div class="card-actions justify-end">
          <button class="w-full bg-green-600 text-white btn rounded-xl add-to-cart-btn">Add To Cart</button>
        </div>
      </div>
    `;

    // Add to Cart button
    cardDiv.querySelector(".add-to-cart-btn").addEventListener("click", (event) => {
      event.stopPropagation();
      addToCart(card);
    });

    // Click on card -> open modal
    cardDiv.addEventListener("click", () => openModal(card));

    cardContainer.appendChild(cardDiv);
  });
};

// Open Modal
const openModal = (card) => {
  document.getElementById("modalTitle").innerText = card.name;
  document.getElementById("modalImage").src = card.image;
  document.getElementById("modalDescription").innerText = card.description;
  document.getElementById("modalCategory").innerText = card.category;
  document.getElementById("modalPrice").innerText = `$${card.price}`;

  const modalAddToCart = document.getElementById("modalAddToCart");
  modalAddToCart.onclick = () => addToCart(card);

  document.getElementById("plantModal").showModal();
};

// Add to Cart
const addToCart = (card) => {
  const existingItem = cart.find((item) => item.name === card.name);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...card, quantity: 1 });
  }
  displayAddToCart();
};

// Display Cart
const displayAddToCart = () => {
  const cartContainer = document.getElementById("cart-container");
  cartContainer.innerHTML = `<h2 class="p-5 font-bold">Your Cart</h2>`;

  let total = 0;

  cart.forEach((item) => {
    total += item.price * item.quantity;
    const divCart = document.createElement("div");
    divCart.classList.add(
      "p-3",
      "bg-[#d6f6e1]",
      "m-5",
      "rounded-2xl",
      "flex",
      "items-center",
      "justify-between"
    );
    divCart.innerHTML = `
      <div>
        <h3 class="font-bold">${item.name}</h3>
        <div class="flex">
          <span>$${item.price}</span>
          <p class="mx-2">x</p>
          <h4>${item.quantity}</h4>
        </div>
      </div>
      <i class="fa-solid fa-xmark cursor-pointer text-red-600" onclick="removeFromCart('${item.name}')"></i>
    `;
    cartContainer.appendChild(divCart);
  });

  const totalDiv = document.createElement("div");
  totalDiv.classList.add("flex", "justify-between", "m-5", "font-bold");
  totalDiv.innerHTML = `<h2>Total:</h2><p>$${total.toFixed(2)}</p>`;
  cartContainer.appendChild(totalDiv);
};

// Remove From Cart
const removeFromCart = (name) => {
  cart = cart.filter((item) => item.name !== name);
  displayAddToCart();
};

// Initial Load
loadCatagories();
loadCard();
