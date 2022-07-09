// VARIABLES
let title = document.querySelector("#title");
let author = document.querySelector("#author");
let bookForm = document.querySelector("#book-form");
let bookList = document.querySelector("#book-list");
let error = true;

// EVENTS HANDLERS
title.addEventListener("blur", (e) => validation(e.target));
author.addEventListener("blur", (e) => validation(e.target));
bookForm.addEventListener("submit", addBook);

// FUNCTIONS
// formu submit edende eger inputlar bosdursa validation messagelari gostersin
function checkValidationAllInputs() {
  const inputs = bookForm.querySelectorAll("input");
  inputs.forEach((inp) => validation(inp));
}

function validation(inp) {
  if (inp.value != "") {
    inp.className = "form-control is-valid";
    error = false;
  } else {
    error = true;
    inp.className = "form-control is-invalid";
    inp.nextElementSibling.className = "invalid-feedback";
    inp.nextElementSibling.textContent = "Field can't be left blank";
  }
}

function addBook(e) {
  e.preventDefault();

  if (error) {
    checkValidationAllInputs()
    return;
  }

  bookList.innerHTML += `
    <tr>
        <td>
            <input  class="form-control" disabled type="text" value="${title.value}">
        </td>
        <td>
            <input  class="form-control" disabled type="text" value="${author.value}">
        </td>
        <td class="d-flex">
            <button type="button" id="removeBook" onclick="removeBook(event)" class="btn btn-danger">Remove</button>
            <button type="button" id="editBook" onclick="editBook(event)" class="btn btn-primary mx-3">Edit</button>
        </td>
    </tr>
    `;

  // title.value = "";
  // author.value = "";

  resetForm();
}

function resetForm() {
  // data doma elave olunandan sonra is-success classini silek
  bookForm
    .querySelectorAll("input")
    .forEach((inp) => { 
      inp.classList.remove("is-valid");
    })

  // butun formda olan valualari sifirla
  // best practise yol İsmayila gelsin :))
  bookForm.reset();

  // yeniden validation functionlarimiz islemesi ucun true edek
  error = true;
}

function removeBook(e) {
  let removeBtn = e.target;
  removeBtn.parentElement.parentElement.remove();
}

function editBook(e) {
  let bookRow = e.target.parentElement.parentElement;
  let inputs = bookRow.querySelectorAll("input");

  inputs.forEach((inp) => {
    let disabledInp = inp.getAttribute("disabled");

    console.log(disabledInp);

    if (disabledInp != "" && disabledInp == null) {
      inp.setAttribute("disabled", "disabled");
    } else {
      inp.removeAttribute("disabled");
    }
  });
}
