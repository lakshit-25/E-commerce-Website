const top_items_count = document.querySelector('.items-count');
const exit = document.querySelector('.exit');
const bucket = document.querySelector('.cart').style;

var items = document.querySelectorAll('.items');
var count = 0;
var cloth_cart1 = [];

top_items_count.innerHTML = count;

function openBucket() {
  bucket.visibility = "visible";
  bucket.opacity = "1";
  bucket.zIndex = "9";
  bucket.transition = "all 1s";
}

exit.addEventListener('click', () => {
  bucket.visibility = "hidden";
  bucket.opacity = "0";
  bucket.zIndex = "-9";
  bucket.transition = "all 0.5s";
});

function loadCart() {
  if (localStorage.cloth_cart1) {
    cloth_cart1 = JSON.parse(localStorage.cloth_cart1);
    showCart();
  }
}

function saveCart() {
  if (window.localStorage) {
    localStorage.cloth_cart1 = JSON.stringify(cloth_cart1);
  }
}

function addToCart(itemName, price, qty) {
  for (var i in cloth_cart1) {
    if (cloth_cart1[i].Product == itemName) {
      cloth_cart1[i].Qty += qty;
      showCart();
      saveCart();
      return;
    }
  }

  var itemArray = {
    Product: itemName,
    Price: price,
    Qty: qty
  }

  cloth_cart1.push(itemArray);
  saveCart();
  showCart();
}

function deleteItem(index) {
  cloth_cart1.splice(index, 1);
  // count=count-1;
  // top_items_count.innerHTML = count;
  showCart();
  saveCart();
}

function showCart() {
  var totalAmount = 0;

  if (cloth_cart1.length == 0) {
    var _ul = document.querySelector('#ul');
    _ul.innerHTML = "";
    return;
  }

  var _ul = document.querySelector('#ul');
  _ul.innerHTML = "";
  for (var i in cloth_cart1) {
    var item = cloth_cart1[i];
    var li = document.createElement("li");
    var row = `<span>${item.Product}</span><span onclick='deleteItem(${i})'><i class='fas fa-trash'></i></span><span>${item.Qty}</span><span>${item.Qty * item.Price}</span>`;
    li.innerHTML = row;
    _ul.appendChild(li);
    totalAmount += item.Qty * item.Price;
  }

  var totalLi = document.createElement("li");
  totalLi.innerHTML = `<span>Total:</span><span>${totalAmount}</span>`;
  _ul.appendChild(totalLi);
}

loadCart();

for (var i = 0; i < items.length; i++) {
  items[i].onclick = function(e) {
    count += 1;
    var itemName = e.target.dataset.item;
    var price = e.target.dataset.price;
    addToCart(itemName, price, 1);
    top_items_count.innerHTML = count;
  }
}
