function ProductService() {
  this.getListProductApi = function () {
    return axios({
      url: "https://637b699710a6f23f7fa80a5c.mockapi.io/api/CaptoneJS",
      method: "GET",
    });
  };

  this.deleteProductApi = function (id) {
    return axios({
      url: `https://637b699710a6f23f7fa80a5c.mockapi.io/api/CaptoneJS/${id}`,
      method: "DELETE",
    });
  };

  this.addProductApi = function (product) {
    return axios({
      url: "https://637b699710a6f23f7fa80a5c.mockapi.io/api/CaptoneJS",
      method: "POST",
      data: product,
    });
  };

  this.getProductByIdApi = function (id) {
    return axios({
      url: `https://637b699710a6f23f7fa80a5c.mockapi.io/api/CaptoneJS/${id}`,
      method: "GET",
    });
  };

  this.updateProductApi = function (product) {
    return axios({
      url: `https://637b699710a6f23f7fa80a5c.mockapi.io/api/CaptoneJS/${product.id}`,
      method: "PUT",
      data: product,
    });
  };
}
