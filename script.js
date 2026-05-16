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

document.addEventListener("DOMContentLoaded", function () {
  const vatBtn = document.getElementById("vatBtn");

  if (vatBtn) {
    vatBtn.addEventListener("click", calculateVAT);
  }
});

function calculateVAT() {
  const amountInput = document.getElementById("vatAmount");
  const rateInput = document.getElementById("vatRate");
  const modeInput = document.getElementById("vatMode");
  const resultsBox = document.getElementById("vatResultsBox");

  if (!amountInput || !rateInput || !modeInput || !resultsBox) return;

  const amount = parseFloat(amountInput.value);
  const rate = parseFloat(rateInput.value);
  const mode = modeInput.value;

  if (isNaN(amount) || isNaN(rate)) {
    resultsBox.innerHTML = "<p>Please enter both an amount and VAT rate.</p>";
    return;
  }

  if (amount < 0 || rate < 0) {
    resultsBox.innerHTML = "<p>Amount and VAT rate must not be negative.</p>";
    return;
  }

  const rateDecimal = rate / 100;

  let netAmount;
  let vatAmount;
  let grossAmount;

  if (mode === "add") {
    netAmount = amount;
    vatAmount = amount * rateDecimal;
    grossAmount = amount + vatAmount;
  } else {
    grossAmount = amount;
    netAmount = amount / (1 + rateDecimal);
    vatAmount = grossAmount - netAmount;
  }

  resultsBox.innerHTML = `
    <div class="result-grid">
      <div class="result-item">
        <span>Net amount</span>
        <strong>${formatCurrency(netAmount)}</strong>
      </div>

      <div class="result-item">
        <span>VAT amount</span>
        <strong>${formatCurrency(vatAmount)}</strong>
      </div>

      <div class="result-item">
        <span>Gross amount</span>
        <strong>${formatCurrency(grossAmount)}</strong>
      </div>

      <div class="result-item">
        <span>VAT rate</span>
        <strong>${rate.toFixed(2)}%</strong>
      </div>
    </div>
  `;
}

document.addEventListener("DOMContentLoaded", function () {
  const percentageBtn = document.getElementById("percentageBtn");

  if (percentageBtn) {
    percentageBtn.addEventListener("click", calculatePercentage);
  }
});

function calculatePercentage() {
  const modeInput = document.getElementById("percentageMode");
  const valueInput = document.getElementById("percentageValue");
  const baseInput = document.getElementById("percentageBase");
  const resultsBox = document.getElementById("percentageResultsBox");

  if (!modeInput || !valueInput || !baseInput || !resultsBox) return;

  const mode = modeInput.value;
  const firstValue = parseFloat(valueInput.value);
  const secondValue = parseFloat(baseInput.value);

  if (isNaN(firstValue) || isNaN(secondValue)) {
    resultsBox.innerHTML = "<p>Please enter both values.</p>";
    return;
  }

  let resultTitle = "";
  let resultValue = "";
  let explanation = "";

  if (mode === "percentOf") {
    const result = secondValue * (firstValue / 100);

    resultTitle = "Result";
    resultValue = result.toFixed(2);
    explanation = `${firstValue}% of ${secondValue} is ${result.toFixed(2)}.`;
  }

  if (mode === "percentChange") {
    if (firstValue === 0) {
      resultsBox.innerHTML = "<p>The original value must not be zero.</p>";
      return;
    }

    const change = secondValue - firstValue;
    const percentChange = (change / firstValue) * 100;
    const direction = percentChange >= 0 ? "increase" : "decrease";

    resultTitle = "Percentage change";
    resultValue = `${percentChange.toFixed(2)}%`;
    explanation = `The value changed from ${firstValue} to ${secondValue}, which is a ${Math.abs(percentChange).toFixed(2)}% ${direction}.`;
  }

  if (mode === "percentDifference") {
    const average = (Math.abs(firstValue) + Math.abs(secondValue)) / 2;

    if (average === 0) {
      resultsBox.innerHTML = "<p>Percentage difference cannot be calculated when both values are zero.</p>";
      return;
    }

    const difference = Math.abs(firstValue - secondValue);
    const percentDifference = (difference / average) * 100;

    resultTitle = "Percentage difference";
    resultValue = `${percentDifference.toFixed(2)}%`;
    explanation = `The percentage difference between ${firstValue} and ${secondValue} is ${percentDifference.toFixed(2)}%.`;
  }

  resultsBox.innerHTML = `
    <div class="result-grid">
      <div class="result-item">
        <span>${resultTitle}</span>
        <strong>${resultValue}</strong>
      </div>

      <div class="result-item">
        <span>First value</span>
        <strong>${firstValue.toFixed(2)}</strong>
      </div>

      <div class="result-item">
        <span>Second value</span>
        <strong>${secondValue.toFixed(2)}</strong>
      </div>
    </div>

    <p style="margin-top: 14px;">${explanation}</p>
  `;
}