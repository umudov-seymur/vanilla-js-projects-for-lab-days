let bookmarkBtn = document.querySelector(".bookmark-btn");
let outputList = document.querySelector(".output-list");
let inputForm = document.querySelector(".input-form");

let bookmarkList = [];

function getBookmarks() {
  outputList.innerHTML = "";

  bookmarkList.forEach((bookmark, index) => {
    outputList.innerHTML += `
		<li>
			<a href="${bookmark.url}"  target="_blank">
				${bookmark.title}
			</a>
			<div class="edit" onclick="editBookmark(event, ${index})">Edit</div>
			<div class="cross" onclick="removeBookmark(event)">X</div>
		</li>
		`;
  });
}

function removeBookmark(e) {
  e.target.parentElement.remove();
}

function editBookmark(event, bookmarkIndex) {
  let bookmark = bookmarkList.find((b, index) => index == bookmarkIndex);
  let bookmarkUrl = document.querySelector(".url");
  let bookmarkTitle = document.querySelector(".title");

  bookmarkUrl.value = bookmark.url;
  bookmarkTitle.value = bookmark.title;

  bookmarkBtn.setAttribute("data-edit", bookmarkIndex);
}

bookmarkBtn.addEventListener("click", function () {
  let isEdit = this.getAttribute("data-edit");

  if (isEdit === null) {
    let bookmarkUrl = document.querySelector(".url").value;
    let bookmarkTitle = document.querySelector(".title").value;

    bookmarkList.push({
      url: bookmarkUrl,
      title: bookmarkTitle,
    });

    let bookmarIndex = bookmarkList.length - 1;

	getBookmarks();

    inputForm.reset();
  } else {
    let bookmarkUrl = document.querySelector(".url").value;
    let bookmarkTitle = document.querySelector(".title").value;

    let bookmark = bookmarkList.find((b, index) => index == isEdit);

    bookmark.url = bookmarkUrl;
    bookmark.title = bookmarkTitle;

    bookmarkList[isEdit] = bookmark;

    getBookmarks();
  }
});
