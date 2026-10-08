const FLAMES = {
    F: "Friends",
    L: "Love",
    A: "Affection",
    M: "Marriage",
    E: "Enemies",
    S: "Siblings",
  };
  
  const RESULT_MESSAGES = {
    F: "Friends eh? theres still hope xD",
    L: "Its Love! make the first move!",
    A: "Affection bruv! quit your job and move in with them",
    M: "Its Marriage! start saving for the wedding",
    E: "Enemies? uhhh...",
    S: "Step-sis? laundry time :p",
  };
  
  const BACKGROUND_EMOJIS = {
    F: ["🧑‍🤝‍🧑", "👯", "🫂", "🤝"],
    L: ["💖", "💘", "💕", "💗"],
    A: ["🥰", "🤗", "💞", "🧸"],
    M: ["🌸", "🌷", "🌼", "🌺"],
    E: ["😤", "💢", "🔥", "⚡"],
    S: ["🧺", "🧦", "👕", "🧼"],
  };
  
  // Lowercase the name and strip everything that isn't a-z (spaces, digits, symbols)
  function cleanName(name) {
    return name.toLowerCase().replace(/[^a-z]/g, "");
  }
  
  // Cancel shared letters one-for-one, return how many letters are left in total
  function countRemainingLetters(name1, name2) {
    const letters2 = name2.split("");
    let leftFromName1 = 0;
  
    for (const letter of name1) {
      const matchIndex = letters2.indexOf(letter);
      if (matchIndex === -1) {
        leftFromName1++;
      } else {
        letters2.splice(matchIndex, 1); // remove only ONE matching letter
      }
    }
  
    return leftFromName1 + letters2.length;
  }
  
  // Count around F-L-A-M-E-S, removing letters until one is left
  function eliminate(count) {
    const letters = Object.keys(FLAMES);
    let index = 0;
  
    while (letters.length > 1) {
      index = (index + count - 1) % letters.length;
      letters.splice(index, 1);
    }
  
    return letters[0];
  }
  
  // Pure logic: no HTML in here, easy to test in the console
  function calculateFlames(rawName1, rawName2) {
    const name1 = cleanName(rawName1);
    const name2 = cleanName(rawName2);
  
    if (name1 === "" || name2 === "") {
      return { error: "Please enter two names using letters (A-Z)." };
    }
  
    const count = countRemainingLetters(name1, name2);
  
    if (count === 0) {
      return { error: "Names cancel out. Try again." };
    }
  
    const letter = eliminate(count);
    return { letter, relationship: FLAMES[letter] };
  }
  
  function clearBackground() {
    const existing = document.querySelector(".bg-emojis");
    if (existing) existing.remove();
  }
  
  function showBackground(letter) {
    clearBackground();
  
    const emojis = BACKGROUND_EMOJIS[letter];
  
    const container = document.createElement("div");
    container.className = "bg-emojis";
    container.setAttribute("aria-hidden", "true");
  
    for (let i = 0; i < 120; i++) {
      const item = document.createElement("span");
      item.className = "bg-emoji";
      item.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      item.style.left = Math.random() * 100 + "%";
      item.style.top = Math.random() * 100 + "%";
      item.style.fontSize = 12 + Math.random() * 16 + "px"; // small: 12px to 28px
      item.style.setProperty("--rotate", Math.round(Math.random() * 360) + "deg");
      item.style.animationDelay = Math.random() * 0.8 + "s";
      container.appendChild(item);
    }
  
    document.body.appendChild(container);
  }
  
  // The function your button already calls
  function findFlames() {
    const name1 = document.getElementById("name1").value;
    const name2 = document.getElementById("name2").value;
    const resultEl = document.getElementById("result");
  
    const result = calculateFlames(name1, name2);
  
    if (result.error) {
      clearBackground();
      resultEl.textContent = result.error;
      return;
    }
  
    resultEl.textContent = RESULT_MESSAGES[result.letter];
    showBackground(result.letter);
  }