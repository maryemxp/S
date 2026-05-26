// ==========================================================================
// CENTRAL APPLICATION LOGIC ENGINE & DATA ARCHITECTURE
// ==========================================================================
const LocalState = {
    activeSector: 'home-panel',
    activeSubview: null,
    englishStreak: 0,
    currentCardIdx: 0,
    inventory: [],
    mathLevel: 1,
    puzzleSize: 3,
    puzzleTiles: [],
    selectedGenres: []
};

// Miracle English Advanced Database (Structures, Metaphors, Learning Depth)
const EnglishImmersiveDatabase = [
    {
        term: "Conundrum",
        category: "Cognitive Vocabulary",
        phonetic: "/kəˈnʌndrəm/",
        translation: "لغز محير / مشكلة معقدة",
        deepLearning: {
            definition: "A confusing and difficult problem or question that challenges standard logical frameworks.",
            idiomaticUsage: "<span class='immersion-idiom'>'Wrap one's head around a conundrum'</span> — To exhaust mental capacity attempting to solve an intricate problem architecture.",
            contextualModel: "The engineering team faced a severe infrastructure conundrum when the primary cluster lost synchronization."
        },
        validation: {
            prompt: "Identify the context where 'Conundrum' is correctly applied syntactically:",
            options: [
                "He swallowed a cold conundrum during breakfast.",
                "Resolving the cryptographic data conundrum required twenty hours of linear logic processing.",
                "The weather was highly conundrum and clear."
            ],
            correctIdx: 1
        }
    },
    {
        term: "Ephemeral",
        category: "Temporal States",
        phonetic: "/əˈfemərəl/",
        translation: "زائل / قصير الأجل",
        deepLearning: {
            definition: "Lasting for a very short time; transient or fleeting structural existence.",
            idiomaticUsage: "<span class='immersion-idiom'>'Cast an ephemeral shadow'</span> — To leave an impact that disappears rapidly without permanent record.",
            contextualModel: "Fame on global networks is notoriously ephemeral, decaying within mere production cycles."
        },
        validation: {
            prompt: "Which statement reflects the architectural essence of 'Ephemeral'?",
            options: [
                "The concrete mountain stood strong and ephemeral.",
                "Digital interface notifications are ephemeral, designed to vanish after consumer attention is logged.",
                "We must build an ephemeral pipeline to hold records permanently."
            ],
            correctIdx: 1
        }
    }
];

const ModuleCargoPool = [
    { id: "dev-terminal", glyph: "⌨️", name: "Cyber Workspace Console", left: "15%", top: "50%" },
    { id: "hologram-pylon", glyph: "🔮", name: "Luminous Hologram Core", left: "75%", top: "60%" },
    { id: "neon-grid", glyph: "🚨", name: "Wall Mounted Neon Array", left: "5%", top: "15%" },
    { id: "bonsai-node", glyph: "🪴", name: "Hydroponic Zen Flora", left: "85%", top: "45%" }
];

const BookVault = [
    { title: "Deep Work", tags: ["Focus", "Productivity"] },
    { title: "Marrow", tags: ["Sci-Fi", "Philosophy"] },
    { title: "Metaphors We Live By", tags: ["Language", "Philosophy"] }
];
const GenresList = Array.from(new Set(BookVault.flatMap(b => b.tags)));

// ==========================================================================
// CORE NAVIGATION ROUTING ROUTINE (CENTRIC DISMISSAL FLOW)
// ==========================================================================
document.querySelectorAll("[data-target]").forEach(card => {
    card.addEventListener("click", () => {
        const targetSectorId = card.getAttribute("data-target");
        switchNavigationLayer(targetSectorId, 'sector');
    });
});

document.querySelectorAll(".option-node").forEach(card => {
    card.addEventListener("click", () => {
        const targetSubviewId = card.getAttribute("data-view");
        switchNavigationLayer(targetSubviewId, 'subview');
        initializeSubviewController(targetSubviewId);
    });
});

// Structural Backward Integration Triggers
document.querySelectorAll(".nav-back-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        switchNavigationLayer('home-panel', 'home');
    });
});

document.querySelectorAll(".sub-back-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        switchNavigationLayer(LocalState.activeSector, 'sector');
    });
});

function switchNavigationLayer(targetId, tier) {
    // Hide all viewports everywhere
    document.querySelectorAll(".view-panel").forEach(p => p.classList.remove("active"));
    
    const targetElement = document.getElementById(targetId);
    targetElement.classList.add("active");

    if (tier === 'sector') {
        LocalState.activeSector = targetId;
    } else if (tier === 'home') {
        LocalState.activeSector = 'home-panel';
        LocalState.activeSubview = null;
    } else if (tier === 'subview') {
        LocalState.activeSubview = targetId;
    }
}

// ==========================================================================
// SUBVIEW SUB-ROUTINE INITIALIZATION HUB
// ==========================================================================
function initializeSubviewController(subviewId) {
    switch(subviewId) {
        case 'sub-eng-learn':
            loadImmersiveLearningCard();
            break;
        case 'sub-eng-quiz':
            bootLinguisticQuizSequence();
            break;
        case 'sub-eng-room':
            renderSpatialSanctuary();
            break;
        case 'sub-puzzle':
            buildSortEngineStructure();
            break;
        case 'sub-math':
            generateSequentialMathNode();
            break;
        case 'sub-books':
            renderGenreCloudMatrix();
            break;
    }
}

// ==========================================================================
// MIRACLE ENGLISH ENGINE (INJECTION, IMMERSION, LEARNING MODULE)
// ==========================================================================
function loadImmersiveLearningCard() {
    document.getElementById("eng-streak-hud").innerText = `STREAK: ${LocalState.englishStreak}`;
    const viewport = document.getElementById("miracle-card-viewport");
    const currentData = EnglishImmersiveDatabase[LocalState.currentCardIdx];

    viewport.innerHTML = `
        <span class="eng-category-pill">${currentData.category}</span>
        <h2 class="eng-core-term">${currentData.term}</h2>
        <div class="eng-local-translation">${currentData.translation}</div>
        <div class="eng-phonetic-script">Phonetic Matrix: ${currentData.phonetic}</div>
        
        <div class="immersion-block-shell">
            <h5>Structural Definition</h5>
            <p>${currentData.deepLearning.definition}</p>
        </div>
        <div class="immersion-block-shell">
            <h5>Idiomatic Manifestation</h5>
            <p>${currentData.deepLearning.idiomaticUsage}</p>
        </div>
        <div class="immersion-block-shell">
            <h5>Context Simulation Model</h5>
            <p>${currentData.deepLearning.contextualModel}</p>
        </div>
    `;

    document.getElementById("prev-card-btn").disabled = (LocalState.currentCardIdx === 0);
    document.getElementById("next-card-btn").innerText = 
        (LocalState.currentCardIdx === EnglishImmersiveDatabase.length - 1) ? "Advance to Verification Matrix" : "Absorb Matrix";
}

document.getElementById("prev-card-btn").addEventListener("click", () => {
    if(LocalState.currentCardIdx > 0) { LocalState.currentCardIdx--; loadImmersiveLearningCard(); }
});

document.getElementById("next-card-btn").addEventListener("click", () => {
    if(LocalState.currentCardIdx < EnglishImmersiveDatabase.length - 1) {
        LocalState.currentCardIdx++;
        loadImmersiveLearningCard();
    } else {
        switchNavigationLayer('sub-eng-quiz', 'subview');
        initializeSubviewController('sub-eng-quiz');
    }
});

// Rapid Evaluation Matrix Implementation
let quizTicker = null;
let remainingQuizTime = 20;

function bootLinguisticQuizSequence() {
    remainingQuizTime = 20;
    const progressFill = document.getElementById("quiz-progress");
    const timerText = document.getElementById("quiz-timer");
    const currentQuizData = EnglishImmersiveDatabase[LocalState.currentCardIdx].validation;

    document.getElementById("quiz-question-text").innerText = currentQuizData.prompt;
    const container = document.getElementById("quiz-options-container");
    container.innerHTML = "";

    currentQuizData.options.forEach((optText, index) => {
        const btn = document.createElement("button");
        btn.className = "quiz-branch-node";
        btn.innerText = optText;
        btn.addEventListener("click", () => evaluateSelectedBranch(index === currentQuizData.correctIdx));
        container.appendChild(btn);
    });

    clearInterval(quizTicker);
    quizTicker = setInterval(() => {
        remainingQuizTime -= 0.05;
        if(remainingQuizTime <= 0) {
            remainingQuizTime = 0;
            evaluateSelectedBranch(false);
        }
        timerText.innerText = remainingQuizTime.toFixed(2);
        progressFill.style.width = `${(remainingQuizTime / 20) * 100}%`;
    }, 50);
}

function evaluateSelectedBranch(isCorrect) {
    clearInterval(quizTicker);
    if(isCorrect) {
        LocalState.englishStreak++;
        alert("Linguistic Alignment Correct. Sector Cargo Secured.");
        // Grant a random module reward item
        const randomItem = ModuleCargoPool[Math.floor(Math.random() * ModuleCargoPool.length)];
        if(!LocalState.inventory.some(i => i.id === randomItem.id)) LocalState.inventory.push(randomItem);
    } else {
        LocalState.englishStreak = 0;
        alert("Linguistic Core Fracture. Recalibrating memory substrates.");
    }
    LocalState.currentCardIdx = 0;
    switchNavigationLayer('english-panel', 'sector');
}

// ==========================================================================
// REPOSITORY SANCTUARY ENGINE VISUALIZATIONS
// ==========================================================================
function renderSpatialSanctuary() {
    const canvas = document.getElementById("room-objects");
    const shelf = document.getElementById("room-shelf-items");
    canvas.innerHTML = ""; shelf.innerHTML = "";

    LocalState.inventory.forEach(item => {
        const sprite = document.createElement("div");
        sprite.className = "spatial-sprite";
        sprite.style.left = item.left; sprite.style.top = item.top;
        sprite.innerText = item.glyph;
        canvas.appendChild(sprite);

        const node = document.createElement("div");
        node.className = "shelf-node";
        node.innerText = `${item.glyph} ${item.name}`;
        shelf.appendChild(node);
    });
}

// ==========================================================================
// ARCADE SUBSYSTEMS MOCK FUNCTIONS
// ==========================================================================
// Chronometer Execution
let pomoClock = null, pomoSecs = 1500;
document.getElementById("pomo-start").addEventListener("click", () => {
    if(pomoClock) {
        clearInterval(pomoClock); pomoClock = null;
        document.getElementById("pomo-start").innerText = "Execute";
    } else {
        document.getElementById("pomo-start").innerText = "Suspend";
        pomoClock = setInterval(() => {
            if(pomoSecs > 0) pomoSecs--;
            let m = Math.floor(pomoSecs/60).toString().padStart(2,'0');
            let s = (pomoSecs%60).toString().padStart(2,'0');
            document.getElementById("pomo-display").innerText = `${m}:${s}`;
        }, 1000);
    }
});
document.getElementById("pomo-reset").addEventListener("click", () => {
    clearInterval(pomoClock); pomoClock = null; pomoSecs = 1500;
    document.getElementById("pomo-display").innerText = "25:00";
    document.getElementById("pomo-start").innerText = "Execute";
});

// Slidable Matrix Logic Sort Engine
function buildSortEngineStructure() {
    const board = document.getElementById("puzzle-board");
    const totalTiles = LocalState.puzzleSize * LocalState.puzzleSize;
    board.style.gridTemplateColumns = `repeat(${LocalState.puzzleSize}, 1fr)`;
    board.innerHTML = "";
    
    LocalState.puzzleTiles = Array.from({length: totalTiles - 1}, (_, i) => i + 1);
    LocalState.puzzleTiles.push(""); // The blank tile space asset
    
    LocalState.puzzleTiles.forEach((tile, index) => {
        const cell = document.createElement("div");
        cell.className = `tile-matrix-cell ${tile === "" ? "void" : ""}`;
        cell.innerText = tile;
        board.appendChild(cell);
    });
}

// Sequential Arithmetic Linear Core
function generateSequentialMathNode() {
    document.getElementById("math-node-text").innerText = LocalState.mathLevel;
    const a = Math.floor(Math.random() * 12) + LocalState.mathLevel;
    const b = Math.floor(Math.random() * 9) + 2;
    const result = a * b;
    
    document.getElementById("math-expr").innerText = `${a} × ${b} = ?`;
    const opts = document.getElementById("math-options"); opts.innerHTML = "";
    
    const ansSet = new Set([result, result+5, result-3]);
    Array.from(ansSet).forEach(ans => {
        const btn = document.createElement("div"); btn.className = "math-node"; btn.innerText = ans;
        btn.addEventListener("click", () => {
            if(parseInt(btn.innerText) === result) {
                LocalState.mathLevel++; generateSequentialMathNode();
            } else { alert("Recalculate mathematical structure."); }
        });
        opts.appendChild(btn);
    });
}

// Dynamic Vector Genre Clouds
function renderGenreCloudMatrix() {
    const container = document.getElementById("genre-cloud-container"); container.innerHTML = "";
    GenresList.forEach(genre => {
        const tag = document.createElement("span"); tag.className = "tag-node"; tag.innerText = genre;
        tag.addEventListener("click", () => {
            tag.classList.toggle("selected");
            if(tag.classList.contains("selected")) LocalState.selectedGenres.push(genre);
            else LocalState.selectedGenres = LocalState.selectedGenres.filter(g => g !== genre);
        });
        container.appendChild(tag);
    });
}

document.getElementById("run-books").addEventListener("click", () => {
    const log = document.getElementById("log-books"); log.classList.remove("hidden");
    log.innerText = `[SYSTEM SYNTHESIS]: Extracted reading nodes mapping to selected interests parameters.<br>Recommended Baseline Vector Study: "Deep Work" by Cal Newport.`;
});

// File Simulation UI Triggers
function bindSimulationUpload(inputId, txtId) {
    document.getElementById(inputId).addEventListener("change", (e) => {
        if(e.target.files.length > 0) document.getElementById(txtId).innerText = `Payload loaded: ${e.target.files[0].name}`;
    });
}
bindSimulationUpload("file-cal", "txt-cal");
bindSimulationUpload("file-h", "txt-h");

document.getElementById("run-cal").addEventListener("click", () => {
    document.getElementById("log-cal").classList.remove("hidden");
    document.getElementById("log-cal").innerText = `[LOG]: Pixel structural density computed. Estimated intake payload: 480 kcal.`;
});
document.getElementById("run-h").addEventListener("click", () => {
    document.getElementById("log-h").classList.remove("hidden");
    document.getElementById("log-h").innerText = `[LOG]: Ground plane matrix locked. Height tracking profile: 1.76 Meters.`;
});
document.getElementById("run-outfit").addEventListener("click", () => {
    document.getElementById("log-outfit").classList.remove("hidden");
    document.getElementById("log-outfit").innerText = `[LOG]: Thermal index processed. Recommended: Heavy Tech-Wear Outer Layer with Neutral Base.`;
});