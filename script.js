console.log("SakConvert loaded.");

function calculateProfitMargin() {
  const costPrice = parseFloat(document.getElementById("costPrice").value);
  const sellingPrice = parseFloat(document.getElementById("sellingPrice").value);
  const resultsBox = document.getElementById("resultsBox");

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
        <strong>£${profit.toFixed(2)}</strong>
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
        <strong>£${costPrice.toFixed(2)}</strong>
      </div>

      <div class="result-item">
        <span>Selling price</span>
        <strong>£${sellingPrice.toFixed(2)}</strong>
      </div>
    </div>
  `;
function calculateROI() {
  const investmentCost = parseFloat(document.getElementById("investmentCost").value);
  const investmentReturn = parseFloat(document.getElementById("investmentReturn").value);
  const resultsBox = document.getElementById("roiResultsBox");

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
        <strong>£${netProfit.toFixed(2)}</strong>
      </div>

      <div class="result-item">
        <span>ROI</span>
        <strong>${roi.toFixed(2)}%</strong>
      </div>

      <div class="result-item">
        <span>Investment cost</span>
        <strong>£${investmentCost.toFixed(2)}</strong>
      </div>

      <div class="result-item">
        <span>Total return</span>
        <strong>£${investmentReturn.toFixed(2)}</strong>
      </div>
    </div>
  `;
}