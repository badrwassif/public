import { menus } from "./menuList.js";
import { db } from "./config.js";
import {
  collection,
  addDoc,
  onSnapshot,
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";

console.log("the null is: ", typeof null);
const title = document.getElementById("menu-title");
const urlParams = new URLSearchParams(window.location.search);
const ID = urlParams.get("id");
const menu = menus.filter((item) => item.restoId == ID);
const TITLE = urlParams.get("title");
title.innerHTML = `${TITLE} menu`;

let restorant = {};
let cart = [];
let quantitys = [];
let orders = [];
let total = 0;

function renderMenu() {
  const menuContainer = document.getElementById("menu");
  menuContainer.innerHTML = ""; // Clear existing items

  menu.forEach((item) => {
    const menuItem = document.createElement("div");
    menuItem.classList.add("menu-item");

    menuItem.innerHTML = `
            <h3>${item.name}</h3>
            <p class="price">$${item.price.toFixed(2)}</p>
            <div class="quantity-controls">
                <button onclick="changeQuantity(${item.id}, -1)">-</button>
                <span id="quantity-${item.id}">1</span>
                <button onclick="changeQuantity(${item.id}, 1)">+</button>
            </div>
            <button onclick="addToCart(${item.id})">Add to Cart</button>
        `;
    menuContainer.appendChild(menuItem);
    let spanId = document.getElementById("quantity-" + item.id);
    quantitys.push(spanId);
  });
}

window.changeQuantity = function changeQuantity(itemId, change) {
  const quantityElement = document.getElementById(`quantity-${itemId}`);
  let currentQuantity = parseInt(quantityElement.innerText);
  if (currentQuantity + change > 0) {
    quantityElement.innerText = currentQuantity + change;
  }
};

// window.changeQuantity = changeQuantity;

window.addToCart = function addToCart(itemId) {
  const quantity = parseInt(
    document.getElementById(`quantity-${itemId}`).innerText
  );
  const item = menu.find((item) => item.id === itemId);
  const cartItem = cart.find((cartItem) => cartItem.id === itemId);

  if (cartItem) {
    cartItem.quantity += quantity; // Update quantity if item already in cart
  } else {
    cart.push({ ...item, quantity });
  }

  renderCart();
};

function renderCart() {
  const cartContainer = document.getElementById("cart-items");
  cartContainer.innerHTML = ""; // Clear existing cart items

  let totalPrice = 0;
  orders = [];

  cart.forEach((item) => {
    const cartItem = document.createElement("div");
    cartItem.innerHTML = `
            <p>${item.name} x${item.quantity} - $${(
      item.price * item.quantity
    ).toFixed(2)}</p>
        `;
    orders.push(`${item.name} x${item.quantity}`);
    totalPrice += item.price * item.quantity;
    cartContainer.appendChild(cartItem);
  });

  document.getElementById("total-price").innerText = `$${totalPrice.toFixed(
    2
  )}`;
  total = totalPrice;
}

window.document
  .getElementById("confirm-order")
  .addEventListener("click", async () => {
    if (cart.length === 0) {
      alert("Your cart is empty.");
    } else {
      await addOrder();
      alert("Order confirmed!");
      quantitys.forEach((item) => {
        item.innerHTML = 1;
      });
      cart = [];
      renderCart();
    }
  });

async function addOrder() {
  const date = new Date();
  try {
    await addDoc(collection(db, "orders"), {
      // id: ,
      companyName: TITLE,
      date: date,
      gerome: "badr",
      orderDetails: orders,
      amountToPay: restorant.country,
      price: total,
    });
    alert("Commande ajoutée avec succès");
  } catch (error) {
    console.error("Error adding order: ", error);
  }
}

function listenToOrders() {
  const ordersCollection = collection(db, "restorants");

  onSnapshot(ordersCollection, (snapshot) => {
    const restos = snapshot.docs;
    restos.forEach((item) => {
      const resto = item.data();
      if (item.id == ID) {
        restorant = resto;
      }
    });
    console.log(restorant);
  });
}
listenToOrders();

renderMenu();
