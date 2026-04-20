async function fetchData(url, elementId, options = {}) {
  try {
    const res = await fetch(url, options);
    const data = await res.json();

    document.getElementById(elementId).textContent = JSON.stringify(
      data,
      null,
      2,
    );
  } catch (err) {
    document.getElementById(elementId).textContent = err.message;
  }
}

/* =========================
   GET REQUESTS
========================= */

function fetchBooks() {
  fetchData("/api/v1/books", "getBooksResult");
}

function fetchBooksByYear() {
  fetchData("/api/v1/books?year=1960", "booksByYearResult");
}

/* =========================
  OPERATORS (FILTERS)
========================= */

// IN
function fetchIn() {
  fetchData("/api/v1/books?year[in]=1960,2003", "booksYearInResult");
}

// GT
function fetchGT() {
  fetchData("/api/v1/books?year[gt]=1950", "booksYearGTResult");
}

// GTE
function fetchGTE() {
  fetchData("/api/v1/books?year[gte]=2000", "booksYearGTEResult");
}

// LT
function fetchLT() {
  fetchData("/api/v1/books?year[lt]=1900", "booksYearLTResult");
}

// LTE
function fetchLTE() {
  fetchData("/api/v1/books?year[lte]=2000", "booksYearLTEResult");
}

function fetchBooksSortedByTitle() {
  fetchData("/api/v1/books?sort=title", "booksSortedByTitleResult");
}

function fetchBooksWithSelectedFields() {
  fetchData(
    "/api/v1/books?fields=title,author,year",
    "booksSelectedFieldsResult",
  );
}

function fetchPaginatedBooks() {
  fetchData("/api/v1/books?page=1&limit=4", "paginatedBooksResult");
}

/* =========================
   POST REQUEST
========================= */

function createBook() {
  const body = JSON.parse(document.getElementById("postBookBody").value);

  fetchData("/api/v1/books", "postBookResult", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

/* =========================
   SINGLE BOOK
========================= */

function getBook() {
  const id = document.getElementById("getBookId").value;

  fetchData(`/api/v1/books/${id}`, "getBookResult");
}

/* =========================
   UPDATE BOOK
========================= */

function updateBook() {
  const id = document.getElementById("updateBookId").value;
  const body = JSON.parse(document.getElementById("updateBookBody").value);

  fetchData(`/api/v1/books/${id}`, "updateBookResult", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

/* =========================
   DELETE BOOK
========================= */

function deleteBook() {
  const id = document.getElementById("deleteBookId").value;

  fetchData(`/api/v1/books/${id}`, "deleteBookResult", {
    method: "DELETE",
  });
}
