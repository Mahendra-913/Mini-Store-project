

//1. getLimitedData()
//2. getAllProducts()
//3. getAllCategory()
//4. getAllFooterCategory()
//5. getACategory()
//6. productDetail(pid)
//7. getDataFromLocalStorage()
//8. cartData()
//9. getCartDataFromLocalStorage()

// get cart data from Local Storage
function getDataFromLocalStorage() {
  let records = localStorage.getItem("cart_Data");
  if (records != null) {
    cartArr = JSON.parse(records);
  }
  
  else {
    cartArr = [];
  }
}
//limited Data
async function getLimitedData() {
  try {
    let str = "";
    let res = await axios.get("https://fakestoreapi.com/products?limit=5");
    res.data.forEach((items) => {
      str += `
      <div class="swiper-slide">
          <div class="product-card position-relative">
            <div class="image-holder">
              <img src="${items.image}" class = "img-img-fluid custom-image">
            </div>
            <div class="cart-concern position-absolute">
              <div class="cart-button d-flex">
                <a href="#" class="btn btn-medium btn-black" onclick = "addCartData(${items.id})" >Add to Cart<svg class="cart-outline"><use xlink:href="#cart-outline"></use></svg></a>
              </div>
            </div>
            <div class="card-detail d-flex justify-content-evenly align-items-baseline pt-3">
              <h3 class="card-title text-uppercase">
                <a href="#">${items.category}</a>
              </h3>
              <span class="item-price text-primary">$980</span>
            </div>
          </div>
      </div>
        `;
    });
    document.getElementById("limited_data").innerHTML = str;
    cartCount();
  } catch (error) {}
}
getLimitedData();

//all data
async function getAllProducts() {
  try {
    let str = "";
    let res = await fetch("https://fakestoreapi.com/products");
    let data = await res.json();
    data.forEach((items) => {
      str += `
      <div class="col-sm-3 mt-5">
        <div class="card">
            <img class="card-img-top" src="${items.image}" style = "height:250px" alt="Card image">
            <div class="card-body text-center">
              <h4 class="card-title"></h4>
              <p class="card-text">${items.category}</p>
              <a href="#" class="btn btn-primary btn-sm"  onclick = "addCartData(${items.id})">Add To Cart</a>
              <a href="#" class="btn btn-primary btn-sm" onclick= "viewSingleData(${items.id})">View Details</a>
            </div>
          </div>
      </div>
        `;
    });
    document.getElementById("all_Products").innerHTML = str;
    cartCount();
  } catch (error) {}
}
getAllProducts();

//get all category to dropdown
async function getAllCategory() {
  try {
    let str = "";
    let res = await axios.get("https://fakestoreapi.com/products/categories");
    res.data.forEach((items) => {
      str += `
      <li>
      <a href = "#" class="dropdown-item" onclick="getACategory(this)">${items}</a>
    </li>
      `;
    });
    document.getElementById("category_data").innerHTML = str;
  } catch (error) {}
}
getAllCategory();

// get  a category data to show specific category data on screen
async function getACategory(t) {
  try {
    // let result = "";
    let category_Name = t.innerText.toLowerCase();
    let res = await axios.get(
      `https://fakestoreapi.com/products/category/${category_Name}`
    );
    // mera = document.getElementById('cat-head').innerText = category_Name;
    localStorage.setItem("product_category_data", JSON.stringify(res.data));
    window.location = "category.html";
    // getDataCategory()
  } catch (error) {}
}
// get category data from ls 
function getCategoryData(){
  try {
    let result = "";
    let Data = localStorage.getItem("product_category_data");
    if(Data != null ){
      res = JSON.parse(Data)
    }
    else{
     res = [];
    }
   res.forEach((items) => {
      result += 
       `<div class="col-sm-3 mt-5">
       <div class="card">
           <img class="card-img-top" src="${items.image}" style = "height:250px" alt="Card image">
           <div class="card-body text-center">
             <h4 class="card-title"></h4>
             <p class="card-text">${items.category}</p>
             <a href="#" class="btn btn-primary btn-sm"  onclick = "addCartData(${items.id})">Add To Cart</a>
             <a href="#" class="btn btn-primary btn-sm" onclick= "viewSingleData(${items.id})">View Details</a>
           </div>
         </div>
     </div>
        `
    });
    document.getElementById("productsCategory").innerHTML = result;
  } catch(error) {}
}
getCategoryData();

//get all category  into footer
async function getAllFooterCategory() {
  try {
    let str = "";
    let res = await axios.get("https://fakestoreapi.com/products/categories");
    res.data.forEach((items) => {
      str += `
   <li class="menu-item pb-2">
  <a href="#" onclick="getACategory(this)">${items}</a>
</li>
    `;
    });
    document.getElementById("category_d_footer").innerHTML = str;
  } catch (error) {}
}
getAllFooterCategory();

// get products  details
async function viewSingleData(pid) {
  try {
    let res = await axios.get(`https://fakestoreapi.com/products/${pid}`);
    localStorage.setItem("singleProductData", JSON.stringify(res.data));
    window.location = "product_detail.html";
  } catch (error) {}
}

//get single  product detail data from local storage
function getSingleDataFromLocalStorage() {
  try {
    let Data = localStorage.getItem("singleProductData");
    result = JSON.parse(Data);
    document.getElementById("product_image").src = result.image;
    document.getElementById("product_category").innerText = result.category;
    document.getElementById("product_title").innerText = result.title;
    document.getElementById(
      "product_price"
    ).innerText = `Price : $ ${result.price}`;
    document.getElementById("product_description").innerText =
      result.description;
    document.getElementById(
      "product_rating"
    ).innerText = `Rating : ${result.rating.rate}`;
    let a = document.getElementById("detail-cart-btn");
    a.setAttribute("value", result.id);
    // cartCount();
  } catch (error) {}
}
getSingleDataFromLocalStorage();

//  putting cart  data into Localstorage
async function addCartData(cid) {
  try {
    let res = await axios.get(`https://fakestoreapi.com/products/${cid}`);
      getDataFromLocalStorage();
      let exist = cartArr.find((item) =>{
         return item.id === res.data.id
        })
        console.log(exist);
        if (!exist){
          cartArr.push(res.data);
          localStorage.setItem("cart_Data", JSON.stringify(cartArr));
          cartCount();
        }
        else{
          alert('Already Exist')
        }
  } catch (error) {}
}
// get cart data from local storage
function showCart() {
  try {
  getDataFromLocalStorage();
    let carts = "";
    cartArr.forEach((items) => {
      carts += `<tr  style ="font-size:18px">
<td><img  src="${items.image}" width = "160" height  = "180" ></td>
<td>${items.title}</td>
<td>${items.price}</td>                                                               
<td><a href="#"  onclick="deleteCartData(${items.id})" ><i class="fa fa-trash-o" aria-hidden="true"></i>
</a></td>
</tr>`;
    });
    document.getElementById("cart-items").innerHTML = carts;
  } catch (error) {}
}
showCart();

// cart count data
function cartCount() {
  try {
    getDataFromLocalStorage();
    document.getElementById("cart-count-data").innerText = cartArr.length;
  } catch (error) {}
}
cartCount();
//delet Cart Data
function deleteCartData(did) {
  try {
    getDataFromLocalStorage();
    let updatedArray = cartArr.filter((items) => {
      return items.id != did;
    });
    if (confirm("are you sure to delete")) {
      cartArr = updatedArray;
      localStorage.setItem("cart_Data", JSON.stringify(cartArr));
      window.location = "cart.html";
      showCart();
    } else {
      location.reload();
    }
  } catch (error) {}
}

// total amount calaculate  into cart

function cartAmount() {
  try {
    getDataFromLocalStorage();
    // console.log(cartArr);
    let prices = cartArr.map((items) => {
      return items.price;
    });
    let sum = prices.reduce((a, b) => {
      return a + b;
    }, 0);
    document.getElementById("total_price").value = sum;
  } catch (error) {}
}
cartAmount();
