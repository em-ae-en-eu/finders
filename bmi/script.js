const BMI_CATEGORIES = {
  underweight: "Underweight",
  normal: "Normal",
  overweight: "Overweight",
  obese: "Obese",
};

const RESULT_MESSAGES = {
  underweight: "A little light! extra snacks wouldn't hurt",
  normal: "You're in the green zone. keep doing you!",
  overweight: "A bit above the range — a walk wouldn't hurt",
  obese: "Above the healthy range. small steps still count!",
};

const BACKGROUND_EMOJIS = {
  underweight: ["🍃", "🥗", "🌱", "🥝"],
  normal: ["🌿", "💪", "✨", "✅"],
  overweight: ["🚶", "🍎", "🌳", "💚"],
  obese: ["🧘", "🥦", "🌻", "🍀"],
};

function categorizeBmi(bmi) {
  if (bmi < 18.5) return "underweight";
  if (bmi < 25) return "normal";
  if (bmi < 30) return "overweight";
  return "obese";
}

function calculateBmi(rawHeightCm, rawWeightKg) {
  const heightCm = Number(rawHeightCm);
  const weightKg = Number(rawWeightKg);

  if (!Number.isFinite(heightCm) || !Number.isFinite(weightKg)) {
    return { error: "Please enter a height and weight." };
  }

  if (heightCm < 50 || heightCm > 250) {
    return { error: "Height should be between 50 and 250 cm." };
  }

  if (weightKg < 10 || weightKg > 400) {
    return { error: "Weight should be between 10 and 400 kg." };
  }

  const heightM = heightCm / 100;
  const bmi = weightKg / (heightM * heightM);
  const category = categorizeBmi(bmi);

  return {
    bmi: Math.round(bmi * 10) / 10,
    category,
    label: BMI_CATEGORIES[category],
  };
}

function clearBackground() {
  const existing = document.querySelector(".bg-emojis");
  if (existing) existing.remove();
}

function showBackground(category) {
  clearBackground();

  const emojis = BACKGROUND_EMOJIS[category];

  const container = document.createElement("div");
  container.className = "bg-emojis";
  container.setAttribute("aria-hidden", "true");

  for (let i = 0; i < 120; i++) {
    const item = document.createElement("span");
    item.className = "bg-emoji";
    item.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    item.style.left = Math.random() * 100 + "%";
    item.style.top = Math.random() * 100 + "%";
    item.style.fontSize = 12 + Math.random() * 16 + "px";
    item.style.setProperty("--rotate", Math.round(Math.random() * 360) + "deg");
    item.style.animationDelay = Math.random() * 0.8 + "s";
    container.appendChild(item);
  }

  document.body.appendChild(container);
}

function findBmi() {
  const height = document.getElementById("height").value;
  const weight = document.getElementById("weight").value;
  const resultEl = document.getElementById("result");

  const result = calculateBmi(height, weight);

  if (result.error) {
    clearBackground();
    resultEl.textContent = result.error;
    return;
  }

  resultEl.textContent = `BMI ${result.bmi} — ${result.label}. ${RESULT_MESSAGES[result.category]}`;
  showBackground(result.category);
}
