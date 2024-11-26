// get total
let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let profit = document.getElementById("profit");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let create = document.getElementById("create");
let btnDeleteAll = document.getElementById("deleteAll");
let Search = document.getElementById("Search");
//

//
let mood = "create";
let searchMood = "title";
//

function getTotal() {
  if (price.value != "") {
    let result =
      +price.value +
      +taxes.value +
      +ads.value +
      +profit.value -
      +discount.value;
    total.innerHTML = result;
    total.style.background = "green";
  } else {
    total.innerHTML = "";
    total.style.background = "#ea817f";
  }
}

// create product
// save localStorage

let ArrayProduct = [];

if (localStorage.product != null) {
  ArrayProduct = JSON.parse(localStorage.product);
} else {
  ArrayProduct = [];
}

create.onclick = function () {
  let newPro = {
    title: title.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    profit: profit.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value.toLowerCase(),
  };

  // count and mood
  // clean date
  let variable;
  if (
    title.value != "" &&
    price.value != "" &&
    category.value != "" &&
    count.value < 300
  ) {
    if (mood === "create") {
      if (newPro.count > 1) {
        for (let i = 0; i < newPro.count; i++) {
          ArrayProduct.push(newPro);
        }
      } else {
        ArrayProduct.push(newPro);
      }
    } else {
      ArrayProduct[variable] = newPro;
    }
  } else {
    window.alert(
      "Pleas do not title and price and category imped ,count not more than 300"
    );
  }

  localStorage.product = JSON.stringify(ArrayProduct);
  clearData();
  readDate();
  window.location.reload();
};

// clear inputs
function clearData() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  profit.value = "";
  discount.value = "";
  total.innerHTML = "";
  count.value = "";
  category.value = "";
}

//read
let table = "";
function readDate() {
  for (let i = 0; i < ArrayProduct.length; i++) {
    table += `<tr>
              <td>${i + 1}</td>
              <td>${ArrayProduct[i].title}</td>
              <td>${ArrayProduct[i].price}</td>
              <td>${ArrayProduct[i].taxes}</td>
              <td>${ArrayProduct[i].ads}</td>
              <td>${ArrayProduct[i].profit}</td>
              <td>${ArrayProduct[i].discount}</td>
              <td>${ArrayProduct[i].total}</td>
              <td>${ArrayProduct[i].category}</td>
              <td><button onclick="updateItem(${i})" id="L-update">Update</button></td>
              <td><button onclick="DeleteItem(${i})" id="L-delete">Delete</button></td>
              </tr>`;
  }
  document.getElementById("tbody").innerHTML = table;

  // delete all
  if (ArrayProduct.length > 0) {
    btnDeleteAll.innerHTML = `
    <button onclick="deleteAll()" class="deleteAll">Delete All (${ArrayProduct.length} product) </button>`;
  } else {
    btnDeleteAll.innerHTML = ``;
  }
}
readDate();

// delete all
function deleteAll() {
  localStorage.removeItem("product");
  ArrayProduct.splice(0);
  readDate();
  window.location.reload();
}

// delete
function DeleteItem(i) {
  ArrayProduct.splice(i, 1);
  localStorage.product = JSON.stringify(ArrayProduct);
  readDate();
  window.location.reload();
}

// update
function updateItem(i) {
  title.value = ArrayProduct[i].title;
  price.value = ArrayProduct[i].price;
  taxes.value = ArrayProduct[i].taxes;
  ads.value = ArrayProduct[i].ads;
  profit.value = ArrayProduct[i].profit;
  discount.value = ArrayProduct[i].discount;
  category.value = ArrayProduct[i].category;
  count.style.display = "none";
  create.innerHTML = "update";
  mood = "update";
  variable = i;
  scroll({
    top: 0,
    behavior: "smooth",
  });
  getTotal();
}
// update

// search
function getSearch(id) {
  if (id == "By-title") {
    searchMood = "title";
    Search.placeholder = "   Search By Title";
  } else {
    searchMood = "category";
    Search.placeholder = "   Search By Category";
  }
  Search.focus();
  Search.value = "";
}

function searchDate(value) {
  let table = "";

  if (searchMood == "title") {
    for (let i = 0; i < ArrayProduct.length; i++) {
      if (ArrayProduct[i].title.includes(value.toLowerCase())) {
        table += `<tr>
                  <td>${i}</td>
                  <td>${ArrayProduct[i].title}</td>
                  <td>${ArrayProduct[i].price}</td>
                  <td>${ArrayProduct[i].taxes}</td>
                  <td>${ArrayProduct[i].ads}</td>
                  <td>${ArrayProduct[i].profit}</td>
                  <td>${ArrayProduct[i].discount}</td>
                  <td>${ArrayProduct[i].total}</td>
                  <td>${ArrayProduct[i].category}</td>
                  <td><button onclick="updateItem(${i})" id="L-update">Update</button></td>
                  <td><button onclick="DeleteItem(${i})" id="L-delete">Delete</button></td>
                  </tr>`;
      }
    }
  } else {
    for (let i = 0; i < ArrayProduct.length; i++) {
      if (ArrayProduct[i].category.includes(value.toLowerCase())) {
        table += `<tr>
                <td>${i}</td>
                <td>${ArrayProduct[i].title}</td>
                <td>${ArrayProduct[i].price}</td>
                <td>${ArrayProduct[i].taxes}</td>
                <td>${ArrayProduct[i].ads}</td>
                <td>${ArrayProduct[i].profit}</td>
                <td>${ArrayProduct[i].discount}</td>
                <td>${ArrayProduct[i].total}</td>
                <td>${ArrayProduct[i].category}</td>
                <td><button onclick="updateItem(${i})" id="L-update">Update</button></td>
                <td><button onclick="DeleteItem(${i})" id="L-delete">Delete</button></td>
                </tr>`;
      }
    }
  }
  document.getElementById("tbody").innerHTML = table;
}
