// Updated Product array
const products = [
  {
    id: "fc-1888",
    name: "flux capacitor",
    averagerating: 4.5
  },
  {
    id: "fc-2050",
    name: "power laces",
    averagerating: 4.7
  },
  {
    id: "fs-1987",
    name: "time circuits",
    averagerating: 3.5
  },
  {
    id: "ac-2000",
    name: "low voltage reactor",
    averagerating: 3.9
  },
  {
    id: "jj-1969",
    name: "warp equalizer",
    averagerating: 5.0
  }
];

// Populate product select options
document.addEventListener("DOMContentLoaded", () => {
    const productSelect = document.getElementById("productName");
    products.forEach(product => {
        const option = document.createElement("option");
        option.value = product.id;
        option.textContent = product.name;
        if (!productSelect.firstChild || productSelect.firstChild.value === "") {
            const placeholder = document.createElement("option");
            placeholder.value = "";
            placeholder.textContent = "Choose a Product...";
            placeholder.disabled = true;
            placeholder.selected = true;
            productSelect.appendChild(placeholder);
        }
        productSelect.appendChild(option);
    });

    // Event listener for form submission
    document.getElementById("submitBtn").addEventListener("click", (event) => {
        event.preventDefault();
        const form = document.getElementById("reviewForm");
        const errorMessage = document.getElementById("errorMessage");

        if (!productSelect.value || !document.querySelector('input[name="rating"]:checked') || !document.getElementById("installDate").value) {
            errorMessage.textContent = "Please fill out all required fields (*)";
            errorMessage.style.display = "block";
            return;
        }

        errorMessage.style.display = "none";
        form.submit();
    });

    // Dynamic feedback on rating selection
    const ratingInputs = document.querySelectorAll('input[name="rating"]');
    ratingInputs.forEach(input => {
        input.addEventListener("change", () => {
            const selectedValue = document.querySelector('input[name="rating"]:checked').value;
            console.log(`Rating selected: ${selectedValue} stars`);
        });
    });
});