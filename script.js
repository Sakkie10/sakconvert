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

    case "boxing-calories":
      bindCalculator("boxingBtn", calculateBoxingCalories);
      break;

    case "golf-distance":
      bindCalculator("golfDistanceBtn", calculateGolfDistance);
      break;

    case "one-rep-max":
      bindCalculator("oneRMBtn", calculateOneRM);
      break;

    case "tdee":
      bindCalculator("calculateTDEE", calculateTDEE);
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
// EMAIL SUBSCRIBE FORM
// ===============================

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