var productService = new ProductService();
var validation = new Validation();
function getEle(id) {
  return document.getElementById(id);
}

function getListProduct() {
  productService
    .getListProductApi()
    .then(function (result) {
      renderHTML(result.data);
    })
    .catch(function (error) {
      console.log(error);
    });
}

getListProduct();
//Render lại UI
function renderUI(){
  getEle("TenSP").value = "";
  getEle("GiaSP").value = "";
  getEle("HinhSP").value = "";
  getEle("MoTa").value = "";
};



function renderHTML(data) {
  var content = "";

  data.forEach(function (product, index) {
    content += `
        <tr>
            <td>${index + 1}</td>
            <td>${product.name}</td>
            <td>${product.price }$</td>
            <td>
                <img width="50px;" src="${product.img}"/>
            </td>
            <td>${product.desc}</td>
            <td>
                <button class="btn btn-info" data-toggle="modal" data-target="#myModal" onclick="editProduct('${
                  product.id
                }')">Edit</button>
                <button class="btn btn-danger" onclick="deleteProdcut('${
                  product.id
                }')">Delete</button>
            </td>
        </tr>
    `;
  });

  getEle("tblDanhSachSP").innerHTML = content;
}

/**
 * Edit Product
 */
function editProduct(id) {
  var title = "Sua San Pham";
  document.getElementsByClassName("modal-title")[0].innerHTML = title;

  var button = `<button class="btn btn-warning" onclick="updateProduct(${id})">Update Product</button>`;
  document.getElementsByClassName("modal-footer")[0].innerHTML = button;

  productService
    .getProductByIdApi(id)
    .then(function (result) {
      var product = result.data;
      getEle("TenSP").value = product.name;
      getEle("GiaSP").value = product.price;
      getEle("HinhSP").value = product.img;
      getEle("MoTa").value = product.desc;
    })
    .catch(function (error) {
      console.log(error);
    });
    renderUI()

}

/**
 * Update Product
 */
function updateProduct(id) {
  var name = getEle("TenSP").value;
  var price = getEle("GiaSP").value;
  var img = getEle("HinhSP").value;
  var desc = getEle("MoTa").value;

  var product = new Product(id, name, price, img, desc);
  productService
    .updateProductApi(product)
    .then(function () {
      alert("Update Success!");
      getListProduct();
      document.getElementsByClassName("close")[0].click();
    })
    .catch(function (error) {
      console.log(error);
    });
}

/**
 * Delete Product
 */
function deleteProdcut(id) {
  productService
    .deleteProductApi(id)
    .then(function (result) {
      alert("Delete Success!");
      getListProduct();
    })
    .catch(function (error) {
      console.log(error);
    });
}

getEle("btnThemSP").onclick = function () {
  var title = "Thêm Sản Phẩm";
  document.getElementsByClassName("modal-title")[0].innerHTML = title;

  var button = `<button class="btn btn-success" onclick="addProduct()">Add Product</button>`;
  document.getElementsByClassName("modal-footer")[0].innerHTML = button;
};

/**
 * Add Product
 */
function addProduct() {
  var name = getEle("TenSP").value;
  var price = getEle("GiaSP").value;
  var img = getEle("HinhSP").value;
  var desc = getEle("MoTa").value;

  var product = new Product("", name, price,"","","", img, desc,"");

    var isValid = true;
    isValid &= validation.kiemTraRong(name, "errorTenSP", "(*)Vui lòng nhập tên sản phẩm")
  
    isValid &= validation.kiemTraRong(price, "errorGiaSP", "(*)Vui lòng nhập giá sản phẩm")
  
    isValid &= validation.kiemTraRong(img, "errorHinhSP", "(*)Vui lòng nhập link hình ảnh sản phẩm")
  
    isValid &= validation.kiemTraRong(desc, "errorMoTa", "(*)Vui lòng nhập mô tả sản phẩm")
    
if(isValid === true){
  productService
    .addProductApi(product)
    .then(function (result) {
      alert("Add Success!");
      getListProduct();
      document.getElementsByClassName("close")[0].click();
      renderUI()
    })
    .catch(function (error) {
      console.log(error);
    });
    
  }
}
