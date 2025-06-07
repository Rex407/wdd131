document.addEventListener("DOMContentLoaded", () => {
    // Initialize or increment review counter
    let reviewCount = localStorage.getItem("reviewCount") || 0;
    reviewCount = parseInt(reviewCount) + 1;
    localStorage.setItem("reviewCount", reviewCount);

    // Display review count
    document.getElementById("reviewCount").textContent = reviewCount;

    // Event listener for back link
    document.getElementById("backLink").addEventListener("click", () => {
        console.log("Returning to form page");
    });
});