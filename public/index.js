async function fetchBooks() {
  const res = await fetch("/api/v1/books");
  const data = await res.json();
  document.getElementById("getBooksResult").textContent = JSON.stringify(
    data,
    null,
    2,
  );
}

async function fetchBooksByYear() {
  const res = await fetch("/api/v1/books?year=1960");
  const data = await res.json();
  document.getElementById("booksByYearResult").textContent = JSON.stringify(
    data,
    null,
    2,
  );
}

async function fetchBooksSortedByTitle() {
  const res = await fetch("/api/v1/books?sort=title");
  const data = await res.json();
  document.getElementById("booksSortedByTitleResult").textContent =
    JSON.stringify(data, null, 2);
}

async function fetchBooksWithSelectedFields() {
  const res = await fetch("/api/v1/books?fields=title,author,year");
  const data = await res.json();
  document.getElementById("booksSelectedFieldsResult").textContent =
    JSON.stringify(data, null, 2);
}

async function fetchPaginatedBooks() {
  const res = await fetch("/api/v1/books?page=1&limit=2");
  const data = await res.json();
  document.getElementById("paginatedBooksResult").textContent = JSON.stringify(
    data,
    null,
    2,
  );
}

async function createBook() {
  const body = JSON.parse(document.getElementById("postBookBody").value);
  const res = await fetch("/api/v1/books", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  document.getElementById("postBookResult").textContent = JSON.stringify(
    data,
    null,
    2,
  );
}

async function getBook() {
  const id = document.getElementById("getBookId").value;
  const res = await fetch(`/api/v1/books/${id}`);
  const data = await res.json();
  document.getElementById("getBookResult").textContent = JSON.stringify(
    data,
    null,
    2,
  );
}

async function updateBook() {
  const id = document.getElementById("updateBookId").value;
  const body = JSON.parse(document.getElementById("updateBookBody").value);
  const res = await fetch(`/api/v1/books/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  document.getElementById("updateBookResult").textContent = JSON.stringify(
    data,
    null,
    2,
  );
}

async function deleteBook() {
  const id = document.getElementById("deleteBookId").value;
  const res = await fetch(`/api/v1/books/${id}`, { method: "DELETE" });
  const data = await res.json();
  document.getElementById("deleteBookResult").textContent = JSON.stringify(
    data,
    null,
    2,
  );
}
