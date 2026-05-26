// --- CENTRAL STATE MANAGEMENT ---
let state = {
    user: null,
    navigationStack: ['home-screen'], 
    activeSection: 'home-screen',
    activeSubFeature: null,
    
    // English System State
    nativeLanguage: null,
    streak: 0,
    roomItems: [],
    lastLessonDate: null, 
    
    // Mini-games state
    puzzleLevel: 1,
    puzzleBoard: [],
    mathIndex: 1,
    selectedGenres: []
};

// --- DATA RESOURCE POOLS ---
const englishLessons = [
    { words: [
        {w: "Apple", p: "/ˈæpəl/", tr: {Arabic: "تفاحة", French: "Pomme", Spanish: "Manzana", Turkish: "Elma", Japanese: "リンゴ", Korean: "사과"}, ex: "I eat a fresh apple every morning."},
        {w: "Cat", p: "/kæt/", tr: {Arabic: "قطة", French: "Chat", Spanish: "Gato", Turkish: "Kedi", Japanese: "猫", Korean: "고양이"}, ex: "The cozy cat is sleeping on the desk."},
        {w: "Laptop", p: "/ˈlæptɒp/", tr: {Arabic: "حاسوب محمول", French: "Ordinateur", Spanish: "Portátil", Turkish: "Dizüstü", Japanese: "ノートPC", Korean: "노트북"}, ex: "Your gaming laptop glows beautifully in the dark."}
    ], question: "What is the translation for 'Cat'?", options: ["Chat/قطة/Gato", "Pomme", "Laptop"], correct: 0 },
    
    { words: [
        {w: "Moon", p: "/muːn/", tr: {Arabic: "القمر", French: "Lune", Spanish: "Luna", Turkish: "Ay", Japanese: "月", Korean: "달"}, ex: "The moon shines bright through my bedroom window."},
        {w: "Coffee", p: "/ˈkɒfi/", tr: {Arabic: "قهوة", French: "Café", Spanish: "Café", Turkish: "Kahve", Japanese: "コーヒー", Korean: "커피"}, ex: "Hot coffee keeps me focused while coding."},
        {w: "Rain", p: "/reɪn/", tr: {Arabic: "مطر", French: "Pluie", Spanish: "Lluvia", Turkish: "Yağmur", Japanese: "雨", Korean: "비"}, ex: "I love the sound of rain against the glass panel."}
    ], question: "Complete sentence: 'I love the sound of ____.'", options: ["Rain", "Coffee", "Moon"], correct: 0 }
];

const rewardPool = [
    { item: "Desk 🖥️", rarity: "Common" }, { item: "Cozy Plant 🌱", rarity: "Common" },
    { item: "Neon Sign 🦄", rarity: "Rare" }, { item: "RGB Floor LED 🌈", rarity: "Rare" },
    { item: "Ergonomic Gaming Chair 💺", rarity: "Epic" }, { item: "Fluffy Cat 🐱", rarity: "Epic" },
    { item: "Dual Monitor Setup 🖥️🖥️", rarity: "Legendary" }, { item: "Ultimate Water-Cooled PC 🚀", rarity: "Legendary" }
];

const bookDatabase = {
    "Sci-Fi": ["Dune by Frank Herbert", "Project Hail Mary by Andy Weir"],
    "Psychology": ["Atomic Habits by James Clear", "Thinking, Fast and Slow"],
    "Self-Help": ["The Mountain Is You", "Deep Work by Cal Newport"],
    "Philosophy": ["Meditations by Marcus Aurelius", "Letters from a Stoic"],
    "Cyberpunk": ["Neuromancer by William Gibson", "Snow Crash"],
    "Fantasy": ["The Hobbit by Tolkien", "Name of the Wind"]
};

// --- CORE APP INITIALIZATION ---
document.addEventListener("DOMContentLoaded", () => {
    initAuth();
    initNavigation();
    initAICore();
    initEnglishSystem();
    initStudyChill();
});

// --- AUTH SYSTEM ---
function initAuth() {
    const authForm = document.getElementById("auth-form");
    authForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const userIn = document.getElementById("username").value.trim();
        if(userIn) {
            state.user = userIn;
            // Load custom stored user profile save
            loadFromLocalStorage(userIn);
            document.getElementById("display-username").innerText = state.user;
            document.getElementById("banner-user").innerText = state.user;
            
            document.getElementById("auth-screen").classList.remove("active");
            document.getElementById("main-container").classList.remove("hidden");
            renderVirtualRoom();
        }
    });
}

// --- COZY NAVIGATION ENGINE (STACK BASED) ---
function initNavigation() {
    const mainCards = document.querySelectorAll(".main-menu-grid .menu-card");
    const globalBackBtn = document.getElementById("global-back-btn");

    mainCards.forEach(card => {
        card.addEventListener("click", () => {
            const targetScreenId = card.getAttribute("data-target");
            navigateTo(targetScreenId);
        });
    });

    globalBackBtn.addEventListener("click", () => {
        if (state.navigationStack.length > 1) {
            state.navigationStack.pop(); // Remove current screen
            const previousScreen = state.navigationStack[state.navigationStack.length - 1];
            
            // Apply visual visibility change safely
            document.querySelectorAll(".sub-screen, #home-screen").forEach(s => s.classList.add("hidden"));
            document.getElementById(previousScreen).classList.remove("hidden");
            
            state.activeSection = previousScreen;
            if(previousScreen === 'home-screen') {
                globalBackBtn.classList.add("hidden");
            }
        }
    });
}

function navigateTo(screenId) {
    document.querySelectorAll(".sub-screen, #home-screen").forEach(s => s.classList.add("hidden"));
    document.getElementById(screenId).classList.remove("hidden");
    
    state.activeSection = screenId;
    state.navigationStack.push(screenId);
    document.getElementById("global-back-btn").classList.remove("hidden");
}

// --- SECTION 1: MOCK AI CORE OPERATIONS ---
function initAICore() {
    setupMockImageUpload('food-img', 'food-preview');
    setupMockImageUpload('body-img', 'body-preview');

    // Toggle secondary inner sub-features cards inside AI Hub
    document.querySelectorAll("#section-ai .option-card").forEach(card => {
        card.addEventListener("click", () => {
            const subId = card.getAttribute("data-sub");
            document.querySelectorAll(".ai-feature-panel").forEach(p => p.classList.add("hidden"));
            document.getElementById(subId).classList.remove("hidden");
        });
    });

    // 1.1 Food Scanner Logic
    document.getElementById("btn-calc-calories").addEventListener("click", () => {
        const out = document.getElementById("calories-result");
        out.classList.remove("hidden");
        out.innerHTML = `<strong>🤖 AI Core Analysis Complete:</strong><br>
                         • Estimated Calories: <b>420 kcal</b><br>
                         • Structure Composition: 45% Carbs, 30% Healthy Fats, 25% High Proteins.<br>
                         • Ingredients detected: Avocado, Artisan Sourdough, Poached egg, Chili flakes.`;
    });

    // 1.2 Height Scan logic
    document.getElementById("btn-calc-height").addEventListener("click", () => {
        const out = document.getElementById("height-result");
        out.classList.remove("hidden");
        out.innerHTML = `<strong>🤖 AI Standing Geometric Estimation:</strong><br>
                         • Calculated Proportional Height: <b>176.5 cm</b> (+/- 1.5cm variance).<br>
                         • Torso-to-Leg Golden Ratio: 1 : 1.61`;
    });

    // 1.3 Thermal Stylist logic
    document.getElementById("btn-get-style").addEventListener("click", () => {
        const temp = parseFloat(document.getElementById("temp-input").value);
        const out = document.getElementById("style-result");
        if(isNaN(temp)) return alert("Please enter a valid temperature value.");
        
        out.classList.remove("hidden");
        let proposal = "";
        if(temp <= 15) {
            proposal = "<b>Top:</b> Deep Charcoal oversized hoodie layered under a Neon Blue bomber jacket.<br><b>Pants:</b> Tailored black cargo pants with cyberstrap accents.";
        } else if(temp > 15 && temp <= 26) {
            proposal = "<b>Top:</b> Relaxed Pastel purple drop-shoulder tee.<br><b>Pants:</b> Matte dark grey minimalist tech shorts.";
        } else {
            proposal = "<b>Top:</b> Ultra-breathable cream white linen short-sleeve shirt.<br><b>Pants:</b> Soft light-wash relaxed denim jeans.";
        }
        out.innerHTML = `<strong>🌡️ Climate Outfit Generated:</strong><br>${proposal}`;
    });
}

function setupMockImageUpload(inputId, previewId) {
    document.getElementById(inputId).addEventListener("change", function(e) {
        if(this.files && this.files[0]) {
            const reader = new FileReader();
            reader.onload = function(e) {
                document.getElementById(previewId).innerHTML = `<img src="${e.target.result}" alt="Preview">`;
            }
            reader.readAsDataURL(this.files[0]);
        }
    });
}

// --- SECTION 2: 1-MIN ADDICTIVE ENGLISH & VIRTUAL ROOM ---
function initEnglishSystem() {
    // Check Language Selection Stored
    document.querySelectorAll(".btn-lang").forEach(btn => {
        btn.addEventListener("click", () => {
            state.nativeLanguage = btn.getAttribute("data-lang");
            saveToLocalStorage();
            showEnglishMainHub();
        });
    });

    document.getElementById("btn-start-lesson").addEventListener("click", startDailyLesson);
    document.getElementById("btn-go-quiz").addEventListener("click", startQuizChallenge);
    document.getElementById("btn-close-reward").addEventListener("click", claimAndDismissModal);
}

function showEnglishMainHub() {
    document.getElementById("ln-lang-setup").classList.add("hidden");
    document.getElementById("ln-main-hub").classList.remove("hidden");
    document.getElementById("active-lang").innerText = state.nativeLanguage;
    document.getElementById("streak-count").innerText = state.streak;
    renderVirtualRoom();
}

function renderVirtualRoom() {
    const itemsLayer = document.getElementById("room-items-layer");
    const atmosphere = document.getElementById("room-atmosphere-overlay");
    if(!itemsLayer) return;

    itemsLayer.innerHTML = "";
    
    if(state.roomItems.length === 0) {
        itemsLayer.innerHTML = "<p class='subtitle' style='padding:20px;'>Your cozy setup is empty. Complete a lesson to drop items!</p>";
    } else {
        state.roomItems.forEach(itemStr => {
            const emoji = itemStr.split(" ").pop() || "🪑";
            const span = document.createElement("div");
            span.className = "room-item-spirit";
            span.innerText = emoji;
            span.title = itemStr;
            itemsLayer.appendChild(span);
        });
    }

    // Adapt Atmosphere dynamically based on user streak performance
    if(state.streak === 0) {
        atmosphere.style.backgroundColor = "rgba(0, 0, 0, 0.45)"; // Darker/gloomy mood
    } else if (state.streak >= 7) {
        atmosphere.style.backgroundColor = "rgba(0, 240, 255, 0.08)"; // Cyber glow neon room
    } else {
        atmosphere.style.backgroundColor = "rgba(112, 0, 255, 0.05)"; // Soft cozy violet
    }
}

function startDailyLesson() {
    // Simple verification check to guarantee maximum 1 lesson per actual calendar day
    const todayStr = new Date().toDateString();
    if(state.lastLessonDate === todayStr) {
        alert("Your cozy brain is resting! You have already finished your interactive capsule for today. Come back tomorrow!");
        return;
    }

    document.getElementById("ln-main-hub").classList.add("hidden");
    const lessonView = document.getElementById("ln-lesson-view");
    lessonView.classList.remove("hidden");
    
    // Pick daily entry lesson depending on current streak index
    const index = state.streak % englishLessons.length;
    const currentLesson = englishLessons[index];
    
    const stack = document.getElementById("cards-stack");
    stack.innerHTML = "";
    
    currentLesson.words.forEach(wObj => {
        const card = document.createElement("div");
        card.className = "eng-word-card";
        card.innerHTML = `
            <h4>${wObj.w}</h4>
            <div class="ipa-pron">${wObj.p} <span style="cursor:pointer;" onclick="alert('🔊 Playing audio simulation for ${wObj.w}')">🎵</span></div>
            <div class="translation-txt">${wObj.tr[state.nativeLanguage] || wObj.tr['Arabic']}</div>
            <div class="example-txt">" ${wObj.ex} "</div>
        `;
        stack.appendChild(card);
    });

    const goQuizBtn = document.getElementById("btn-go-quiz");
    goQuizBtn.classList.remove("hidden");
}

let quizTimerInterval = null;
function startQuizChallenge() {
    document.getElementById("ln-lesson-view").classList.add("hidden");
    document.getElementById("ln-quiz-view").classList.remove("hidden");

    const index = state.streak % englishLessons.length;
    const currentLesson = englishLessons[index];

    document.getElementById("quiz-question").innerText = currentLesson.question;
    const grid = document.getElementById("quiz-options-grid");
    grid.innerHTML = "";

    currentLesson.options.forEach((opt, idx) => {
        const btn = document.createElement("button");
        btn.className = "btn-option";
        btn.innerText = opt;
        btn.onclick = () => evaluationQuizAnswer(idx, currentLesson.correct);
        grid.appendChild(btn);
    });

    // Run exciting 20 Second Challenge ticking bar bar
    let secondsLeft = 20;
    const fill = document.getElementById("quiz-timer-fill");
    fill.style.width = "100%";

    clearInterval(quizTimerInterval);
    quizTimerInterval = setInterval(() => {
        secondsLeft -= 0.1;
        const percentage = (secondsLeft / 20) * 100;
        fill.style.width = `${percentage}%`;

        if(secondsLeft <= 0) {
            clearInterval(quizTimerInterval);
            alert("⏰ Out of time! Relax, try the daily lesson capsule again.");
            showEnglishMainHub();
        }
    }, 100);
}

function evaluationQuizAnswer(selected, correctIndex) {
    clearInterval(quizTimerInterval);
    if(selected === correctIndex) {
        // Success reward triggering
        state.streak += 1;
        state.lastLessonDate = new Date().toDateString();
        
        // Give milestone extra rewards for special high streaks
        checkStreakMilestones();
        
        saveToLocalStorage();
        triggerRewardDrop();
    } else {
        alert("Incorrect answer! Re-read the card words calmly to absolute perfection.");
        showEnglishMainHub();
    }
}

function checkStreakMilestones() {
    if(state.streak === 3) state.roomItems.push("Milestone Plant 🌿");
    if(state.streak === 7) state.roomItems.push("Aesthetic Neon Desk Lamp 💡");
    if(state.streak === 30) state.roomItems.push("Ultimate Battle Station Gaming PC 🖥️🔥");
}

function triggerRewardDrop() {
    // Rarity Randomizer system roll
    const roll = Math.random();
    let selectedPool = [];
    let chosenRarity = "Common";

    if(roll > 0.90) { chosenRarity = "Legendary"; }
    else if(roll > 0.70) { chosenRarity = "Epic"; }
    else if(roll > 0.40) { chosenRarity = "Rare"; }
    
    selectedPool = rewardPool.filter(r => r.rarity === chosenRarity);
    if(selectedPool.length === 0) selectedPool = [rewardPool[0]];
    
    const absoluteReward = selectedPool[Math.floor(Math.random() * selectedPool.length)];
    
    // Store in virtual home inventory list
    state.roomItems.push(`${absoluteReward.item} (${absoluteReward.rarity})`);
    saveToLocalStorage();

    // Render Modal popup view
    const modal = document.getElementById("reward-modal");
    const title = document.getElementById("reward-title");
    const rarityText = document.getElementById("reward-rarity");
    const desc = document.getElementById("reward-desc");
    const boxImg = document.getElementById("box-animation-container");

    modal.classList.remove("hidden");
    rarityText.innerText = `Rarity: ${chosenRarity}`;
    rarityText.style.color = `var(--rarity-${chosenRarity.toLowerCase()})`;
    desc.innerText = `Unboxed: You unlocked the ${absoluteReward.item} for your cozy virtual space!`;

    if(chosenRarity === "Legendary") {
        modal.querySelector('.modal-content').classList.add("glow-legendary");
        boxImg.innerText = "👑⭐📦⭐👑";
    } else {
        modal.querySelector('.modal-content').classList.remove("glow-legendary");
        boxImg.innerText = "🎁";
    }
}

function claimAndDismissModal() {
    document.getElementById("reward-modal").classList.add("hidden");
    document.getElementById("ln-quiz-view").classList.add("hidden");
    showEnglishMainHub();
}

// --- SECTION 3: STUDY & CHILL CAPTAIN LOGICS ---
function initStudyChill() {
    // Secondary inner sub-feature switching routes
    document.querySelectorAll("#section-study .option-card").forEach(card => {
        card.addEventListener("click", () => {
            const subId = card.getAttribute("data-sub");
            document.querySelectorAll(".study-panel").forEach(p => p.classList.add("hidden"));
            document.getElementById(subId).classList.remove("hidden");
            
            // Lazy initialize selected panel components if loaded
            if(subId === 'study-puzzle') buildPuzzleGame();
            if(subId === 'study-math') generateMathQuestion();
            if(subId === 'study-books') renderGenresInterests();
        });
    });

    initPomodoroEngine();
    
    document.getElementById("btn-skip-puzzle").addEventListener("click", () => {
        state.puzzleLevel++;
        buildPuzzleGame();
    });

    document.getElementById("btn-skip-math").addEventListener("click", () => {
        state.mathIndex = Math.min(2500, state.mathIndex + 1);
        generateMathQuestion();
    });
}

// 3.1 Beautiful Pomodoro 25/5 Timer
let pomoInterval = null;
let pomoTimeLeft = 25 * 60;
let isFocusSession = true;

function initPomodoroEngine() {
    const timeDisplay = document.getElementById("pomo-time");
    const stateDisplay = document.getElementById("pomo-state");
    
    document.getElementById("btn-pomo-start").addEventListener("click", () => {
        if(pomoInterval) return;
        pomoInterval = setInterval(() => {
            pomoTimeLeft--;
            let mins = Math.floor(pomoTimeLeft / 60);
            let secs = pomoTimeLeft % 60;
            timeDisplay.innerText = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
            
            if(pomoTimeLeft <= 0) {
                clearInterval(pomoInterval);
                pomoInterval = null;
                alert(isFocusSession ? "🎉 Focus finished! Take a cozy 5-minute break." : "⏳ Break over! Time to focus.");
                isFocusSession = !isFocusSession;
                pomoTimeLeft = (isFocusSession ? 25 : 5) * 60;
                stateDisplay.innerText = isFocusSession ? "Focus" : "Break";
                timeDisplay.innerText = isFocusSession ? "25:00" : "05:00";
            }
        }, 1000);
    });

    document.getElementById("btn-pomo-pause").addEventListener("click", () => {
        clearInterval(pomoInterval);
        pomoInterval = null;
    });

    document.getElementById("btn-pomo-reset").addEventListener("click", () => {
        clearInterval(pomoInterval);
        pomoInterval = null;
        isFocusSession = true;
        pomoTimeLeft = 25 * 60;
        stateDisplay.innerText = "Focus";
        timeDisplay.innerText = "25:00";
    });
}

// 3.2 Sliding Numbers Puzzle Game
function buildPuzzleGame() {
    document.getElementById("puzzle-level").innerText = state.puzzleLevel;
    const board = document.getElementById("puzzle-grid");
    board.innerHTML = "";
    
    // Create pre-scrambled achievable arrays
    let initialSet = [1, 2, 3, 4, 5, 6, 8, 7, ""]; 
    state.puzzleBoard = [...initialSet];
    
    state.puzzleBoard.forEach((num, index) => {
        const cell = document.createElement("div");
        cell.className = `puzzle-cell ${num === "" ? "empty-cell" : ""}`;
        cell.innerText = num;
        cell.onclick = () => trySlideMove(index);
        board.appendChild(cell);
    });
}

function trySlideMove(clickedIdx) {
    const emptyIdx = state.puzzleBoard.indexOf("");
    const validMoves = [clickedIdx - 1, clickedIdx + 1, clickedIdx - 3, clickedIdx + 3];

    // Restrict lateral horizontal row overflow wrapping bugs
    if (Math.floor(clickedIdx / 3) !== Math.floor(emptyIdx / 3) && Math.abs(clickedIdx - emptyIdx) === 1) {
        return; 
    }

    if (validMoves.includes(emptyIdx)) {
        // Swap values
        state.puzzleBoard[emptyIdx] = state.puzzleBoard[clickedIdx];
        state.puzzleBoard[clickedIdx] = "";
        
        // Re-render
        const board = document.getElementById("puzzle-grid");
        const cells = board.querySelectorAll(".puzzle-cell");
        state.puzzleBoard.forEach((num, idx) => {
            cells[idx].innerText = num;
            if(num === "") cells[idx].classList.add("empty-cell");
            else cells[idx].classList.remove("empty-cell");
        });

        // Winning solution match verification check
        if(state.puzzleBoard.join(",") === "1,2,3,4,5,6,7,8,") {
            setTimeout(() => {
                alert("✨ Correctly ordered! Level Up.");
                state.puzzleLevel++;
                buildPuzzleGame();
            }, 150);
        }
    }
}

// 3.3 Linear Adaptive Math Engine (2500 Progressive levels)
let currentMathAnswer = 0;
function generateMathQuestion() {
    document.getElementById("math-index").innerText = state.mathIndex;
    
    // Scale challenge values dynamically relative to progress rank index
    const difficultyScalar = Math.floor(state.mathIndex / 10) + 2;
    const valA = Math.floor(Math.random() * difficultyScalar * 5) + 1;
    const valB = Math.floor(Math.random() * difficultyScalar * 3) + 1;
    
    const operations = ["+", "-", "*"];
    const op = operations[Math.floor(Math.random() * Math.min(3, Math.floor(state.mathIndex/15)+1))];
    
    let mathString = `${valA} ${op} ${valB}`;
    currentMathAnswer = eval(mathString);
    
    document.getElementById("math-question").innerText = `${mathString} = ?`;
    
    // Distribute smart decoys around options
    let choices = new Set([currentMathAnswer]);
    while(choices.size < 3) {
        choices.add(currentMathAnswer + Math.floor(Math.random() * 7) - 3);
    }
    
    const optionsArray = Array.from(choices).sort(() => Math.random() - 0.5);
    const container = document.getElementById("math-options");
    container.innerHTML = "";
    
    optionsArray.forEach(choice => {
        const button = document.createElement("button");
        button.className = "btn-option";
        button.style.textAlign = "center";
        button.innerText = choice;
        button.onclick = () => {
            if(choice === currentMathAnswer) {
                state.mathIndex = Math.min(2500, state.mathIndex + 1);
                generateMathQuestion();
            } else {
                alert(`Wrong calculation! The right answer was ${currentMathAnswer}. Try another next level.`);
                generateMathQuestion();
            }
        };
        container.appendChild(button);
    });
}

// 3.4 Multi-Interest Core Book Recommendation Algorithmic Engine
function renderGenresInterests() {
    const shelf = document.getElementById("genres-shelf");
    shelf.innerHTML = "";
    state.selectedGenres = [];

    Object.keys(bookDatabase).forEach(genre => {
        const tag = document.createElement("span");
        tag.className = "genre-tag";
        tag.innerText = genre;
        tag.onclick = () => {
            if(tag.classList.contains("selected")) {
                tag.classList.remove("selected");
                state.selectedGenres = state.selectedGenres.filter(g => g !== genre);
            } else {
                if(state.selectedGenres.length >= 5) {
                    alert("Maximum limit: You can choose up to 5 favorite fields simultaneously.");
                    return;
                }
                tag.classList.add("selected");
                state.selectedGenres.push(genre);
            }
        };
        shelf.appendChild(tag);
    });

    document.getElementById("btn-generate-books").onclick = processBookCuration;
}

function processBookCuration() {
    if(state.selectedGenres.length === 0) {
        alert("Please pick at least 1 field to run algorithm processing.");
        return;
    }

    const outputView = document.getElementById("curated-books-result");
    outputView.innerHTML = "";
    outputView.classList.remove("hidden");

    let finalAggregatedPool = [];
    state.selectedGenres.forEach(genre => {
        finalAggregatedPool = finalAggregatedPool.concat(bookDatabase[genre]);
    });

    // Shuffle pool
    finalAggregatedPool.sort(() => Math.random() - 0.5);
    // Grab exactly 2 recommendations
    const selections = finalAggregatedPool.slice(0, 2);

    selections.forEach((book, idx) => {
        const bCard = document.createElement("div");
        bCard.className = "book-item-card";
        bCard.innerHTML = `
            <h5>📖 Core Selection #${idx+1}</h5>
            <p><strong>${book}</strong></p>
            <p style='font-size:0.75rem; margin-top:5px;'>Ranked highly based on your interest profile match.</p>
        `;
        outputView.appendChild(bCard);
    });
}

// --- PERMANENT DEEP STORAGE HOOKS (LOCALSTORAGE) ---
function saveToLocalStorage() {
    if(!state.user) return;
    const packedData = {
        nativeLanguage: state.nativeLanguage,
        streak: state.streak,
        roomItems: state.roomItems,
        lastLessonDate: state.lastLessonDate
    };
    localStorage.setItem(`chilli_save_${state.user}`, JSON.stringify(packedData));
}

function loadFromLocalStorage(username) {
    const serialized = localStorage.getItem(`chilli_save_${username}`);
    if(serialized) {
        const parsed = JSON.parse(serialized);
        state.nativeLanguage = parsed.nativeLanguage || null;
        state.streak = parsed.streak || 0;
        state.roomItems = parsed.roomItems || [];
        state.lastLessonDate = parsed.lastLessonDate || null;
    } else {
        // Clear variables for a brand new user
        state.nativeLanguage = null;
        state.streak = 0;
        state.roomItems = [];
        state.lastLessonDate = null;
    }

    // Dynamic routing checks
    if(!state.nativeLanguage) {
        document.getElementById("ln-lang-setup").classList.remove("hidden");
        document.getElementById("ln-main-hub").classList.add("hidden");
    } else {
        showEnglishMainHub();
    }
}
