// ===============================
// SakConvert Engine v2
// ===============================

console.log("SakConvert Engine v2 loaded");

document.addEventListener("DOMContentLoaded", () => {
  const page = document.body.dataset.calculator;

  if (page) {
    initCalculator(page);
  }

  initSubscribeForms();
});

// ===============================
// CORE ENGINE
// ===============================

function initCalculator(type) {
  switch (type) {

    // BUSINESS & FINANCE
    case "profit-margin":
      bindCalculator("calculateProfitMargin", calculateProfitMargin);
      break;

    case "roi":
      bindCalculator("calculateROI", calculateROI);
      break;

    case "vat":
      bindCalculator("vatBtn", calculateVAT);
      break;

    case "percentage":
      bindCalculator("calculatePercentage", calculatePercentage);
      break;

    case "discount":
      bindCalculator("calculateDiscount", calculateDiscount);
      break;

    case "markup":
      bindCalculator("calculateMarkup", calculateMarkup);
      break;

    case "compound-interest":
      bindCalculator("compoundInterestBtn", calculateCompoundInterest);
      break;



    // HEALTH & FITNESS
    case "boxing-calories":
      bindCalculator("boxingBtn", calculateBoxingCalories);
      break;

    case "one-rep-max":
      bindCalculator("oneRMBtn", calculateOneRM);
      break;

    case "tdee":
      bindCalculator("calculateTDEE", calculateTDEE);
      break;

    case "bmi":
      bindCalculator("calculateBMI", calculateBMI);
      break;



    // SPECIALIST
    case "golf-distance":
      bindCalculator("golfDistanceBtn", calculateGolfDistance);
      break;


  }
}

function bindCalculator(buttonId, handler) {
  const btn = document.getElementById(buttonId);
  if (!btn) return;

  const calculatorCard = btn.closest(".calculator-card");

  btn.addEventListener("click", handler);

  if (!calculatorCard) return;

  const inputs = calculatorCard.querySelectorAll("input, select");

  inputs.forEach((input) => {
    input.addEventListener("input", handler);
    input.addEventListener("change", handler);
  });
}

// ===============================
// UTILITIES
// ===============================

function formatCurrency(value) {
  return `£${value.toFixed(2)}`;
}

function formatPercent(value) {
  return `${value.toFixed(2)}%`;
}

function showError(box, message) {
  if (!box) return;
  box.innerHTML = `<p class="error">${message}</p>`;
}

function renderResult(box, html) {
  if (!box) return;
  box.innerHTML = html;
}

// ===============================
// PROFIT MARGIN
// ===============================

function calculateProfitMargin() {
  const cost = parseFloat(document.getElementById("costPrice").value);
  const sell = parseFloat(document.getElementById("sellingPrice").value);
  const box = document.getElementById("resultsBox");

  if (isNaN(cost) || isNaN(sell)) {
    return showError(box, "Enter cost and selling price.");
  }

  if (sell === 0) {
    return showError(box, "Selling price must be greater than zero.");
  }

  const profit = sell - cost;
  const margin = (profit / sell) * 100;
  const markup = cost === 0 ? 0 : (profit / cost) * 100;

  renderResult(box, `
    <div class="result-grid">
      <div class="result-item"><span>Profit</span><strong>${formatCurrency(profit)}</strong></div>
      <div class="result-item"><span>Margin</span><strong>${formatPercent(margin)}</strong></div>
      <div class="result-item"><span>Markup</span><strong>${formatPercent(markup)}</strong></div>
    </div>
  `);
}

// ===============================
// ROI
// ===============================

function calculateROI() {
  const cost = parseFloat(document.getElementById("investmentCost").value);
  const ret = parseFloat(document.getElementById("investmentReturn").value);
  const box = document.getElementById("roiResultsBox");

  if (isNaN(cost) || isNaN(ret)) {
    return showError(box, "Enter both values.");
  }

  if (cost === 0) {
    return showError(box, "Cost must be greater than zero.");
  }

  const profit = ret - cost;
  const roi = (profit / cost) * 100;

  renderResult(box, `
    <div class="result-grid">
      <div class="result-item"><span>Net Profit</span><strong>${formatCurrency(profit)}</strong></div>
      <div class="result-item"><span>ROI</span><strong>${formatPercent(roi)}</strong></div>
    </div>
  `);
}

// ===============================
// VAT
// ===============================

function calculateVAT() {
  const amount = parseFloat(document.getElementById("vatAmount").value);
  const rate = parseFloat(document.getElementById("vatRate").value);
  const mode = document.getElementById("vatMode").value;
  const box = document.getElementById("vatResultsBox");

  if (isNaN(amount) || isNaN(rate)) {
    return showError(box, "Enter amount and VAT rate.");
  }

  const r = rate / 100;
  let net, vat, gross;

  if (mode === "add") {
    net = amount;
    vat = amount * r;
    gross = amount + vat;
  } else {
    gross = amount;
    net = amount / (1 + r);
    vat = gross - net;
  }

  renderResult(box, `
    <div class="result-grid">
      <div class="result-item"><span>Net</span><strong>${formatCurrency(net)}</strong></div>
      <div class="result-item"><span>VAT</span><strong>${formatCurrency(vat)}</strong></div>
      <div class="result-item"><span>Gross</span><strong>${formatCurrency(gross)}</strong></div>
    </div>
  `);
}

// ===============================
// PERCENTAGE
// ===============================

function calculatePercentage() {
  const mode = document.getElementById("percentageMode").value;
  const v1 = parseFloat(document.getElementById("percentageValue").value);
  const v2 = parseFloat(document.getElementById("percentageBase").value);
  const box = document.getElementById("percentageResultsBox");

  if (isNaN(v1) || isNaN(v2)) {
    return showError(box, "Enter both values.");
  }

  let result = "";
  let explanation = "";

  if (mode === "percentOf") {
    const r = v2 * (v1 / 100);
    result = r.toFixed(2);
    explanation = `${v1}% of ${v2} = ${r.toFixed(2)}`;
  }

  if (mode === "percentChange") {
    if (v1 === 0) return showError(box, "Original cannot be zero.");
    const change = ((v2 - v1) / v1) * 100;
    result = formatPercent(change);
    explanation = `Change from ${v1} to ${v2}`;
  }

  if (mode === "percentDifference") {
    const avg = (Math.abs(v1) + Math.abs(v2)) / 2;
    if (avg === 0) return showError(box, "Invalid values.");
    const diff = (Math.abs(v1 - v2) / avg) * 100;
    result = formatPercent(diff);
    explanation = `Difference between ${v1} and ${v2}`;
  }

  renderResult(box, `
    <div class="result-grid">
      <div class="result-item"><span>Result</span><strong>${result}</strong></div>
    </div>
    <p class="result-note">${explanation}</p>
  `);
}

// ===============================
// COMPOUND INTEREST
// ===============================

function calculateCompoundInterest() {
  const principal = parseFloat(document.getElementById("compoundPrincipal")?.value);
  const rate = parseFloat(document.getElementById("compoundRate")?.value);
  const years = parseFloat(document.getElementById("compoundYears")?.value);
  const frequency = parseFloat(document.getElementById("compoundFrequency")?.value);
  const resultsBox = document.getElementById("compoundInterestResultsBox");

  if (!resultsBox) return;

  if (
    isNaN(principal) ||
    isNaN(rate) ||
    isNaN(years) ||
    isNaN(frequency) ||
    principal < 0 ||
    rate < 0 ||
    years < 0 ||
    frequency <= 0
  ) {
    return renderResult(
      resultsBox,
      "<p>Please enter valid positive numbers.</p>"
    );
  }

  const decimalRate = rate / 100;

  const futureValue = principal * Math.pow(
    1 + decimalRate / frequency,
    frequency * years
  );

  const interestEarned = futureValue - principal;

  renderResult(resultsBox, `
    <div class="result-grid">
      <div class="result-item">
        <span>Future value</span>
        <strong>${formatCurrency(futureValue)}</strong>
      </div>

      <div class="result-item">
        <span>Initial amount</span>
        <strong>${formatCurrency(principal)}</strong>
      </div>

      <div class="result-item">
        <span>Interest earned</span>
        <strong>${formatCurrency(interestEarned)}</strong>
      </div>
    </div>
  `);
}

// ===============================
// DISCOUNT
// ===============================

function calculateDiscount() {
  const originalPrice = parseFloat(
    document.getElementById("originalPrice").value
  );

  const discountPercent = parseFloat(
    document.getElementById("discountPercent").value
  );

  const box = document.getElementById("discountResultsBox");

  if (isNaN(originalPrice) || isNaN(discountPercent)) {
    return showError(box, "Enter a price and discount percentage.");
  }

  if (originalPrice < 0 || discountPercent < 0) {
    return showError(box, "Values must be positive.");
  }

  const discountAmount = originalPrice * (discountPercent / 100);
  const finalPrice = originalPrice - discountAmount;

  renderResult(box, `
    <div class="result-grid">
      <div class="result-item">
        <span>Original Price</span>
        <strong>${formatCurrency(originalPrice)}</strong>
      </div>

      <div class="result-item">
        <span>Discount Amount</span>
        <strong>${formatCurrency(discountAmount)}</strong>
      </div>

      <div class="result-item">
        <span>Final Sale Price</span>
        <strong>${formatCurrency(finalPrice)}</strong>
      </div>

      <div class="result-item">
        <span>You Save</span>
        <strong>${formatCurrency(discountAmount)}</strong>
      </div>
    </div>
  `);
}

// ===============================
// MARKUP
// ===============================

function calculateMarkup() {
  const costPrice = parseFloat(
    document.getElementById("markupCostPrice").value
  );

  const sellingPrice = parseFloat(
    document.getElementById("markupSellingPrice").value
  );

  const box = document.getElementById("markupResultsBox");

  if (isNaN(costPrice) || isNaN(sellingPrice)) {
    return showError(box, "Enter cost price and selling price.");
  }

  if (costPrice <= 0) {
    return showError(box, "Cost price must be greater than zero.");
  }

  const markupAmount = sellingPrice - costPrice;
  const markupPercent = (markupAmount / costPrice) * 100;
  const marginPercent = (markupAmount / sellingPrice) * 100;

  renderResult(box, `
    <div class="result-grid">

      <div class="result-item">
        <span>Markup Amount</span>
        <strong>${formatCurrency(markupAmount)}</strong>
      </div>

      <div class="result-item">
        <span>Markup Percentage</span>
        <strong>${formatPercent(markupPercent)}</strong>
      </div>

      <div class="result-item">
        <span>Profit Margin</span>
        <strong>${formatPercent(marginPercent)}</strong>
      </div>

    </div>
  `);
}


// ===============================
// BOXING CALORIES
// ===============================

function calculateBoxingCalories() {
  const weight = parseFloat(document.getElementById("weight").value);
  const duration = parseFloat(document.getElementById("duration").value);
  const met = parseFloat(document.getElementById("intensity").value);
  const box = document.getElementById("boxingResultsBox");

  if (isNaN(weight) || isNaN(duration)) {
    return showError(box, "Enter weight and duration.");
  }

  const calories = (met * weight * 3.5 / 200) * duration;

  renderResult(box, `
    <div class="result-grid">
      <div class="result-item">
        <span>Calories Burned</span>
        <strong>${Math.round(calories)} kcal</strong>
      </div>
    </div>
  `);
}


// ===============================
// ONE REP MAX
// ===============================

function calculateOneRM() {
  const weight = parseFloat(document.getElementById("oneRMWeight").value);
  const reps = parseFloat(document.getElementById("oneRMReps").value);
  const box = document.getElementById("oneRMResultsBox");

  if (isNaN(weight) || isNaN(reps)) {
    return showError(box, "Enter weight and reps.");
  }

  if (reps <= 0) {
    return showError(box, "Reps must be greater than zero.");
  }

  const oneRM = weight * (1 + reps / 30);

  renderResult(box, `
    <div class="result-grid">
      <div class="result-item">
        <span>Estimated 1RM</span>
        <strong>${oneRM.toFixed(1)} kg</strong>
      </div>
    </div>
  `);
}

// ===============================
// TDEE
// ===============================

function calculateTDEE() {
  const age = parseFloat(document.getElementById("tdeeAge").value);
  const weight = parseFloat(document.getElementById("tdeeWeight").value);
  const height = parseFloat(document.getElementById("tdeeHeight").value);
  const gender = document.getElementById("tdeeGender").value;
  const activity = parseFloat(document.getElementById("tdeeActivity").value);
  const box = document.getElementById("tdeeResultsBox");

  if (isNaN(age) || isNaN(weight) || isNaN(height)) {
    return showError(box, "Please enter all values.");
  }

  let bmr;

  if (gender === "male") {
    bmr = 10 * weight + 6.25 * height - 5 * age + 5;
  } else {
    bmr = 10 * weight + 6.25 * height - 5 * age - 161;
  }

  const tdee = bmr * activity;

  renderResult(box, `
    <div class="result-grid">
      <div class="result-item">
        <span>Estimated TDEE</span>
        <strong>${Math.round(tdee)} kcal/day</strong>
      </div>
    </div>
  `);
}

// ===============================
// BMI
// ===============================

function calculateBMI() {
  const height = parseFloat(
    document.getElementById("bmiHeight").value
  );

  const weight = parseFloat(
    document.getElementById("bmiWeight").value
  );

  const box = document.getElementById("bmiResultsBox");

  if (isNaN(height) || isNaN(weight)) {
    return showError(box, "Enter height and weight.");
  }

  if (height <= 0 || weight <= 0) {
    return showError(box, "Values must be greater than zero.");
  }

  const bmi = weight / Math.pow(height / 100, 2);

  let category = "";

  if (bmi < 18.5) {
    category = "Underweight";
  } else if (bmi < 25) {
    category = "Healthy Weight";
  } else if (bmi < 30) {
    category = "Overweight";
  } else {
    category = "Obese";
  }

  renderResult(box, `
    <div class="result-grid">

      <div class="result-item">
        <span>BMI Score</span>
        <strong>${bmi.toFixed(1)}</strong>
      </div>

      <div class="result-item">
        <span>Category</span>
        <strong>${category}</strong>
      </div>

    </div>
  `);
}




// ===============================
// GOLF DISTANCE
// ===============================

function calculateGolfDistance() {
  const speed = parseFloat(document.getElementById("golfSpeed").value);
  const club = document.getElementById("golfClub").value;
  const box = document.getElementById("golfDistanceResultsBox");

  if (isNaN(speed)) {
    return showError(box, "Enter your swing speed.");
  }

  let factor;

  if (club === "driver") factor = 2.3;
  else if (club === "iron") factor = 1.6;
  else factor = 1.2;

  const distance = speed * factor;

  renderResult(box, `
    <div class="result-grid">
      <div class="result-item">
        <span>Estimated Distance</span>
        <strong>${Math.round(distance)} yards</strong>
      </div>
    </div>
  `);
}



// ===============================
// EMAIL SUBSCRIBE FORM
// ===============================

function setFormMessage(messageElement, text, type) {
  messageElement.textContent = text;
  messageElement.className = `form-message ${type}`;
}

function initSubscribeForms() {
  const forms = document.querySelectorAll(".subscribe-form");

  forms.forEach((form) => {
    form.addEventListener("submit", async (event) => {
      event.preventDefault();

      const input = form.querySelector('input[name="email"]');
      const message = form.querySelector(".form-message");

      if (!input || !message) return;

      const email = input.value.trim();

      if (!email) {
        setFormMessage(message, "Please enter your email.", "error");
        return;
      }

      const turnstileToken =
        form.querySelector('[name="cf-turnstile-response"]')?.value;

      if (!turnstileToken) {
        setFormMessage(
          message,
          "Please complete the verification.",
          "error"
        );
        return;
      }

      setFormMessage(message, "Subscribing...", "loading");

      try {
        const response = await fetch("/api/subscribe", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            email,
            source: "email-form",
            page: window.location.pathname,
            turnstileToken
          })
        });

        const data = await response.json();

        if (data.success) {
          const type = data.status === "duplicate" ? "duplicate" : "success";

          setFormMessage(
            message,
            data.message || "Thanks — you’re subscribed.",
            type
          );

          if (data.status === "new") {
            input.value = "";
          }
        } else {
          setFormMessage(
            message,
            data.error || "Something went wrong.",
            "error"
          );
        }

        resetTurnstile(form);
      } catch (error) {
        setFormMessage(
          message,
          "Something went wrong. Please try again.",
          "error"
        );

        resetTurnstile(form);
      }
    });
  });
}

function resetTurnstile(form) {
  if (!window.turnstile) return;

  const widget = form.querySelector(".cf-turnstile");

  if (widget) {
    window.turnstile.reset(widget);
  }
}