let drugData = [];

fetch("https://api.sheetbest.com/sheets/785c23db-917a-4b01-b105-7c1f20483190")
  .then(response => response.json())
  .then(data => {
    drugData = data;
  });

const searchInput = document.getElementById("searchInput");
const resultDiv = document.getElementById("results");

searchInput.addEventListener("input", function () {
  const query = this.value.trim().toLowerCase();
  resultDiv.innerHTML = "";

  if (query === "") {
    return;
  }

  const filtered = drugData.filter(drug =>
    (drug["Generic name/Active Substance & Strength"] || "").toLowerCase().startsWith(query) ||
    (drug["Trade name & Strength"] || "").toLowerCase().startsWith(query)
  );

  if (filtered.length === 0) {
    resultDiv.innerHTML = "<p>No results found.</p>";
    return;
  }

  filtered.forEach(drug => {
    const container = document.createElement("div");
    container.className = "drug-entry";

    container.innerHTML =
      "<strong>Generic Name:</strong> " + drug["Generic name/Active Substance & Strength"] + "<br>" +
      "<strong>Trade Name:</strong> " + drug["Trade name & Strength"] + "<br>" +
      "<strong>Price per unit:</strong> " + drug["Price per unit"] + "<br>" +
      "<strong>Price per pack:</strong> " + drug["Selling Price per pack"];

    resultDiv.appendChild(container);
  });
});
