import {
  collection,
  onSnapshot,
} from "https://www.gstatic.com/firebasejs/10.13.2/firebase-firestore.js";
import { db } from "./config.js";

function displayRestorants(restorants) {
  const restorantsContainer = document.getElementById("restorants-container");
  restorantsContainer.innerHTML = "";

  restorants.forEach((item) => {
    const restorant = item.data(); // Get restaurant data from document

    const Restorant = document.createElement("div");
    Restorant.style.margin = "10px"; 
    Restorant.style.textAlign = "center"; 
    Restorant.innerHTML = `
      <img src="${
        restorant.urlimg
      }" alt="image" style="width:250px; height: auto; border-radius: 8px;">
      <div>
        <a href="menu.html?id=${encodeURIComponent(
          item.id
        )}&title=${encodeURIComponent(
      restorant.restorant
    )}" style="text-decoration: none; color: balck; font-weight: bold;">
          ${restorant.restorant}
        </a>
      </div>
    `;

    restorantsContainer.appendChild(Restorant);
  });
}

function listenToOrders() {
  const ordersCollection = collection(db, "restorants");

  onSnapshot(ordersCollection, (snapshot) => {
    const restorants = snapshot.docs;
    displayRestorants(restorants);
  });
}

window.onload = listenToOrders;
