// Variable to keep track of the current index of the displayed product
let currentIndex = 0;
let products; // Variable to store product data

// Function to fetch product data from JSON file
async function fetchProducts() {
    try {
        const response = await fetch('products.json');
        products = await response.json();
        return products;
    } catch (error) {
        console.error('Error fetching products:', error);
        return [];
    }
}

// Function to display products in the slider
async function displayProductSlider() {
    try {
        const prevIndex = (currentIndex === 0) ? products.length - 1 : currentIndex - 1;
        const nextIndex = (currentIndex === products.length - 1) ? 0 : currentIndex + 1;

        const prevProduct = document.getElementById("prev-product");
        const currentProduct = document.getElementById("current-product");
        const nextProduct = document.getElementById("next-product");

        // Update product details
        const prevProductData = products[prevIndex];
        const currentProductData = products[currentIndex];
        const nextProductData = products[nextIndex];

        prevProduct.innerHTML = getProductHTML(prevProductData);
        currentProduct.innerHTML = getProductHTML(currentProductData);
        nextProduct.innerHTML = getProductHTML(nextProductData);
    } catch (error) {
        console.error('Error displaying product slider:', error);
    }
}

function getProductHTML(product) {
    if (!product) return ''; // Return empty string if product is undefined
    return `
        <img src="${product.image}" alt="">
        <h2>${product.name}</h2>
        <p>$${product.price}</p>
        <p>${product.description}</p>
    `;
}

// Function to switch to the next product
function switchToNextProduct() {
    currentIndex = (currentIndex + 1) % products.length;
    displayProductSlider();
}

// Function to switch to the previous product
function switchToPrevProduct() {
    currentIndex = (currentIndex - 1 + products.length) % products.length;
    displayProductSlider();
}

// Slider functionality
const slider = document.querySelector('.slider');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

// Scroll to next card
function scrollToNextCard() {
    slider.scrollBy({
        left: slider.offsetWidth + 15, // 15px for margin between cards
        behavior: 'smooth'
    });
}

// Scroll to previous card
function scrollToPrevCard() {
    slider.scrollBy({
        left: -(slider.offsetWidth + 15), // 15px for margin between cards
        behavior: 'smooth'
    });
}

// Event listeners for navigation
prevBtn.addEventListener('click', scrollToPrevCard);
nextBtn.addEventListener('click', scrollToNextCard);

// Get the search input element
const searchInput = document.getElementById('searchInput');

// Event listener for the search input field
searchInput.addEventListener("input", function() {
    const query = this.value.trim().toLowerCase();
    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
    );

    // Update the products and reset the current index
    products = filteredProducts;
    currentIndex = 0;

    // Display the updated product slider
    displayProductSlider();
});

// Function to initialize the page with the first product and start automatic rotation
window.onload = async () => {
    await fetchProducts(); // Fetch product data
    displayProductSlider(); // Display the product slider
    setInterval(switchToNextProduct, 8000); // Switch to the next product every 8 seconds
};
