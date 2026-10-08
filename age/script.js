const RESULT_MESSAGES = {
  baby: "Brand new! enjoy the snacks and naps",
  kid: "Kid mode unlocked. playground energy only",
  teen: "Teen years! homework vs vibes, good luck",
  adult: "Adulting in progress. coffee counts as a personality",
  mid: "Peak wisdom hours. the plot is getting good",
  senior: "Legend status. tell the stories, skip the rush",
};

const BACKGROUND_EMOJIS = {
  baby: ["🍼", "🧸", "👶", "🌙"],
  kid: ["🎈", "🪀", "🖍️", "⭐"],
  teen: ["🎧", "📱", "✌️", "🌀"],
  adult: ["☕", "💼", "📅", "💙"],
  mid: ["📖", "🌿", "🕯️", "🧭"],
  senior: ["🎉", "🥇", "🌅", "👑"],
};

function categorizeAge(years) {
  if (years < 3) return "baby";
  if (years < 13) return "kid";
  if (years < 20) return "teen";
  if (years < 40) return "adult";
  if (years < 60) return "mid";
  return "senior";
}

function plural(count, word) {
  return count === 1 ? `${count} ${word}` : `${count} ${word}s`;
}

function calculateAge(rawBirthdate) {
  if (!rawBirthdate) {
    return { error: "Please enter your date of birth." };
  }

  const birth = new Date(`${rawBirthdate}T00:00:00`);
  if (Number.isNaN(birth.getTime())) {
    return { error: "Please enter a valid date." };
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (birth > today) {
    return { error: "That date is in the future. Try again." };
  }

  let years = today.getFullYear() - birth.getFullYear();
  let months = today.getMonth() - birth.getMonth();
  let days = today.getDate() - birth.getDate();

  if (days < 0) {
    months -= 1;
    const previousMonth = new Date(today.getFullYear(), today.getMonth(), 0);
    days += previousMonth.getDate();
  }

  if (months < 0) {
    years -= 1;
    months += 12;
  }

  return {
    years,
    months,
    days,
    category: categorizeAge(years),
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

const birthdateInput = document.getElementById("birthdate");
if (birthdateInput) {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");
  birthdateInput.max = `${yyyy}-${mm}-${dd}`;
}

function findAge() {
  const birthdate = document.getElementById("birthdate").value;
  const resultEl = document.getElementById("result");

  const result = calculateAge(birthdate);

  if (result.error) {
    clearBackground();
    resultEl.textContent = result.error;
    return;
  }

  const ageText = `${plural(result.years, "year")}, ${plural(result.months, "month")}, ${plural(result.days, "day")}`;
  resultEl.textContent = `${ageText}. ${RESULT_MESSAGES[result.category]}`;
  showBackground(result.category);
}
