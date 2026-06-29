document.addEventListener('DOMContentLoaded', () => {

  async function fetchProducts(query) {
    try {
      const response = await fetch(
        `/search/suggest.json?q=${encodeURIComponent(query)}&resources[type]=product&resources[limit]=5`
      );
      const data = await response.json();
      return data.resources.results.products;
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }

  function renderSuggestions(productNames) {
    const suggestionList = document.querySelector(".search-results__list");

    if (productNames.length === 0) {
      suggestionList.innerHTML = `
            <li class="search-results__item">
              <a>No suggestions found</a>
            </li>
          `;
      return;
    }

    suggestionList.innerHTML = productNames
      .map(
        (name) => `
              <li class="search-results__item">
                <a href="#">${name}</a>
              </li>
            `
      )
      .join("");
  }

  function renderProducts(productDetails) {
    const productList = document.querySelector(".search-results__product-list");

    if (productDetails.length === 0) {
      productList.innerHTML = `
            <p class="search-product__title">
              No products found.
            </p>
          `;
      return;
    }

    productList.innerHTML = productDetails
      .map(
        (product) => `
              <a href="${product.url}" class="search-product">
                <div class="search-product__image">
                  <img src="${product.image}" alt="${product.name}">
                </div>
      
                <div class="search-product__content">
                  <h5 class="search-product__title">${product.name}</h5>
      
                  <span class="search-product__price">
                    ₹${product.price}
                  </span>
                </div>
              </a>
            `
      )
      .join("");
  }

  const searchInput = document.querySelector("#suggestion-input");
  const searchResults = document.querySelector('.search-results');
  let timeout;

  const viewAllBtn = document.querySelector(".search-results__view-all");
  const submitBtn = document.querySelector(".search-results__submit");

  searchInput.addEventListener("input", (e) => {
    clearTimeout(timeout);

    const query = e.target.value.trim();

    if (!query) {
      searchResults.style.display = "none";
      return;
    }

    timeout = setTimeout(async () => {
      const products = await fetchProducts(query);

      const productNames = products.map((product) => product.title);

      const productDetails = products.map((product) => ({
        name: product.title,
        price: product.price,
        image: product.featured_image.url,
        url: product.url,
      }));

      searchResults.style.display = "block";
      renderSuggestions(productNames);
      renderProducts(productDetails);

      if (viewAllBtn) {
        viewAllBtn.textContent = `Search for "${query}"`;
      }
    }, 1000);
  });

  function goToSearch() {
    const query = searchInput.value.trim();
    if (!query) return;

    searchInput.value = ""; 
    window.location.href = `/search?q=${encodeURIComponent(query)}`;
  }

  submitBtn.addEventListener("click", goToSearch);

  searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      goToSearch();
    }
  });


});