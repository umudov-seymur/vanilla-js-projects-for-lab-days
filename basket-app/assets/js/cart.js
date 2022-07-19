let productList = document.querySelector("#tbody");

function updateTotalCount() {
  let totalCount = 0;
  let totalPrice = 0;

  products.forEach((product) => {
    totalCount += +product.count;
    totalPrice += +product.price.split("AZN")[0] * product.count;
  });

  document.querySelector("#totalCount").innerText = totalCount;
  document.querySelector("#sumPrice").innerText = totalPrice;
}

updateTotalCount();

function updatePrice(el, productId) {
  let currentCount = el.value;

  //   productu silmek ucun istifade etdik
  if (currentCount == 0) {
    el.parentElement.parentElement.querySelector(".remove-product").click();
  }

  if (currentCount < 0) {
    alert("Ismayilin qazabina ugradiniz!");
    el.value = 1;
    return;
  }

  let product = products.find((p) => p.id == productId);

  let price = +product.price.split("AZN")[0];
  price *= currentCount;

  product.count = currentCount;

  localStorage.setItem("products", JSON.stringify(products));

  let totalPrice = el.parentElement.parentElement.querySelector(".total-price");

  totalPrice.innerText = price;

  updateTotalCount();
}

function removeProduct(el, productId) {
  Swal.fire({
    title: "Əminsən brat?",
    text: "Qagash baxda ba birdefelik silirsen!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Əəəə sil getsin!",
  }).then((result) => {
    if (result.isConfirmed) {
      let productIndex = products.findIndex((p) => p.id == productId);

      products.splice(productIndex, 1);

      localStorage.setItem("products", JSON.stringify(products));

      el.parentElement.parentElement.remove();

      Swal.fire("Silindi!", "Rəhmətlik oldu.", "success");
    }
  });
}

// if (products.length < 0) return;

products.forEach((product) => {
  let price = +product.price.split("AZN")[0];

  productList.innerHTML += `
        <tr>
            <td>${product.id}</td>
            <td>
                <img src="${product.image}"/>
            </td>
            <td>${product.title}</td>
            <td>
                <input 
                    class="form-control" 
                    min="1"
                    type="number" value="${product.count}" 
                    onchange="updatePrice(event.target, ${product.id})"
                />
            </td>
            <td>${price} <span>AZN</span></td>
            <td>
             <span class="total-price">${price * product.count}</span>
            </td>
            <td>
                <button 
                  class="btn btn-danger remove-product" 
                  onclick="removeProduct(event.target, ${product.id })">
                    Remove
                </button>
            </td>
        </tr>
    `;
});
