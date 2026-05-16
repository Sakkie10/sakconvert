console.log("SakConvert script loaded.");

document.addEventListener("DOMContentLoaded", function () {
  const profitMarginBtn = document.getElementById("profitMarginBtn");
  const roiBtn = document.getElementById("roiBtn");

  if (profitMarginBtn) {
    profitMarginBtn.addEventListener("click", calculateProfitMargin);
  }

  if (roiBtn) {
    roiBtn.addEventListener("click", calculateROI);
  }
});

function formatCurrency(value) {
  return `£${value.toFixed(2)}`;
}

function calculateProfitMargin() {
  const costInput = document.getElementById("costPrice");
  const sellingInput = document.getElementById("sellingPrice");
  const resultsBox = document.getElementById("resultsBox");

  if (!costInput || !sellingInput || !resultsBox) return;

  const costPrice = parseFloat(costInput.value);
  const sellingPrice = parseFloat(sellingInput.value);

  if (isNaN(costPrice) || isNaN(sellingPrice)) {
    resultsBox.innerHTML = "<p>Please enter both cost price and selling price.</p>";
    return;
  }

  if (sellingPrice === 0) {
    resultsBox.innerHTML = "<p>Selling price must be greater than zero.</p>";
    return;
  }

  const profit = sellingPrice - costPrice;
  const profitMargin = (profit / sellingPrice) * 100;
  const markup = costPrice === 0 ? 0 : (profit / costPrice) * 100;

  resultsBox.innerHTML = `
    <div class="result-grid">
      <div class="result-item">
        <span>Profit</span>
        <strong>${formatCurrency(profit)}</strong>
      </div>

      <div class="result-item">
        <span>Profit margin</span>
        <strong>${profitMargin.toFixed(2)}%</strong>
      </div>

      <div class="result-item">
        <span>Markup</span>
        <strong>${markup.toFixed(2)}%</strong>
      </div>

      <div class="result-item">
        <span>Cost price</span>
        <strong>${formatCurrency(costPrice)}</strong>
      </div>

      <div class="result-item">
        <span>Selling price</span>
        <strong>${formatCurrency(sellingPrice)}</strong>
      </div>
    </div>
  `;
}

function calculateROI() {
  const costInput = document.getElementById("investmentCost");
  const returnInput = document.getElementById("investmentReturn");
  const resultsBox = document.getElementById("roiResultsBox");

  if (!costInput || !returnInput || !resultsBox) return;

  const investmentCost = parseFloat(costInput.value);
  const investmentReturn = parseFloat(returnInput.value);

  if (isNaN(investmentCost) || isNaN(investmentReturn)) {
    resultsBox.innerHTML = "<p>Please enter both investment cost and total return.</p>";
    return;
  }

  if (investmentCost === 0) {
    resultsBox.innerHTML = "<p>Investment cost must be greater than zero.</p>";
    return;
  }

  const netProfit = investmentReturn - investmentCost;
  const roi = (netProfit / investmentCost) * 100;

  resultsBox.innerHTML = `
    <div class="result-grid">
      <div class="result-item">
        <span>Net profit</span>
        <strong>${formatCurrency(netProfit)}</strong>
      </div>

      <div class="result-item">
        <span>ROI</span>
        <strong>${roi.toFixed(2)}%</strong>
      </div>

      <div class="result-item">
        <span>Investment cost</span>
        <strong>${formatCurrency(investmentCost)}</strong>
      </div>

      <div class="result-item">
        <span>Total return</span>
        <strong>${formatCurrency(investmentReturn)}</strong>
      </div>
    </div>
  `;
}console.log("SakConvert script loaded.");

document.addEventListener("DOMContentLoaded", function () {
  const profitMarginBtn = document.getElementById("profitMarginBtn");
  const roiBtn = document.getElementById("roiBtn");

  if (profitMarginBtn) {
    profitMarginBtn.addEventListener("click", calculateProfitMargin);
  }

  if (roiBtn) {
    roiBtn.addEventListener("click", calculateROI);
  }
});

function formatCurrency(value) {
  return `£${value.toFixed(2)}`;
}

function calculateProfitMargin() {
  const costInput = document.getElementById("costPrice");
  const sellingInput = document.getElementById("sellingPrice");
  const resultsBox = document.getElementById("resultsBox");

  if (!costInput || !sellingInput || !resultsBox) return;

  const costPrice = parseFloat(costInput.value);
  const sellingPrice = parseFloat(sellingInput.value);

  if (isNaN(costPrice) || isNaN(sellingPrice)) {
    resultsBox.innerHTML = "<p>Please enter both cost price and selling price.</p>";
    return;
  }

  if (sellingPrice === 0) {
    resultsBox.innerHTML = "<p>Selling price must be greater than zero.</p>";
    return;
  }

  const profit = sellingPrice - costPrice;
  const profitMargin = (profit / sellingPrice) * 100;
  const markup = costPrice === 0 ? 0 : (profit / costPrice) * 100;

  resultsBox.innerHTML = `
    <div class="result-grid">
      <div class="result-item">
        <span>Profit</span>
        <strong>${formatCurrency(profit)}</strong>
      </div>

      <div class="result-item">
        <span>Profit margin</span>
        <strong>${profitMargin.toFixed(2)}%</strong>
      </div>

      <div class="result-item">
        <span>Markup</span>
        <strong>${markup.toFixed(2)}%</strong>
      </div>

      <div class="result-item">
        <span>Cost price</span>
        <strong>${formatCurrency(costPrice)}</strong>
      </div>

      <div class="result-item">
        <span>Selling price</span>
        <strong>${formatCurrency(sellingPrice)}</strong>
      </div>
    </div>
  `;
}

function calculateROI() {
  const costInput = document.getElementById("investmentCost");
  const returnInput = document.getElementById("investmentReturn");
  const resultsBox = document.getElementById("roiResultsBox");

  if (!costInput || !returnInput || !resultsBox) return;

  const investmentCost = parseFloat(costInput.value);
  const investmentReturn = parseFloat(returnInput.value);

  if (isNaN(investmentCost) || isNaN(investmentReturn)) {
    resultsBox.innerHTML = "<p>Please enter both investment cost and total return.</p>";
    return;
  }

  if (investmentCost === 0) {
    resultsBox.innerHTML = "<p>Investment cost must be greater than zero.</p>";
    return;
  }

  const netProfit = investmentReturn - investmentCost;
  const roi = (netProfit / investmentCost) * 100;

  resultsBox.innerHTML = `
    <div class="result-grid">
      <div class="result-item">
        <span>Net profit</span>
        <strong>${formatCurrency(netProfit)}</strong>
      </div>

      <div class="result-item">
        <span>ROI</span>
        <strong>${roi.toFixed(2)}%</strong>
      </div>

      <div class="result-item">
        <span>Investment cost</span>
        <strong>${formatCurrency(investmentCost)}</strong>
      </div>

      <div class="result-item">
        <span>Total return</span>
        <strong>${formatCurrency(investmentReturn)}</strong>
      </div>
    </div>
  `;
}