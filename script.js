//SPELLBOOK
let spellbook = JSON.parse(localStorage.getItem("spellbook")) || [];


//RENDER SPELLBOOK
function renderSpellbook() {
        const list = document.getElementById("spellbook-list");

        list.textContent = ""; 

    spellbook.forEach(spell => {
        const li = document.createElement("li");
        li.textContent = spell.name;
        list.appendChild(li);
    });


    if (spellbook.length > 0) {
        document.getElementById("spellbook-container").style.display = "block";
    }
}

//LOGIK, HÄMTA DATA, VISA SPELLS
document.querySelector(".BtnSubmit").addEventListener("click", () => {

const spellBox = document.getElementById("spell-display");
const selectedClass = document.querySelector("#class-select").value;

    if (!selectedClass) {
        alert("Please choose a class first!");
        return;
    }

const url = `https://api.open5e.com/v1/spells/?classes=${selectedClass.toLowerCase()}&limit=200`;
console.log("Fetching spells from:", url);

    fetch(url)
        .then(res => res.json())
        .then(json => {
            const spells = json.results;
            console.log("Loaded spells:", spells);

            const randomSpell = spells[Math.floor(Math.random() * spells.length)];

            spellBox.textContent = "";

//SPELLKORT /SAFTEY

//titel
    const title = document.createElement("h2");
    title.textContent = randomSpell.name;
    spellBox.appendChild(title);
//school

    const schoolP = document.createElement("p");
    schoolP.innerHTML = `<strong>School:</strong> `;
    const schoolText = document.createTextNode(randomSpell.school);
    schoolP.appendChild(schoolText);
    spellBox.appendChild(schoolP); 
    
//level 
    const levelP = document.createElement("p");
    levelP.innerHTML = `<strong>Level:</strong> `;
    const levelText = document.createTextNode(randomSpell.level);
    levelP.appendChild(levelText);
    spellBox.appendChild(levelP);

//desription
    const descP = document.createElement("p");
    descP.textContent =randomSpell.desc;
    spellBox.appendChild(descP);
            
//save-btn  
    const saveBtn = document.createElement("button");
    saveBtn.id = "save-spell";
    saveBtn.classList.add("spell-btn");
    saveBtn.textContent = "Save to Spellbook";
    spellBox.appendChild(saveBtn);

    spellBox.style.display = "block";

    // visa spellbook först när en spell visats
document.getElementById("spellbook-container").style.display = "block";


//SPARA SPELLS /SPELLBOOK           

saveBtn.addEventListener("click", () => {
    const exists = spellbook.some(s => s.name === randomSpell.name);

                if (!exists) {
                    spellbook.push(randomSpell);
                    localStorage.setItem("spellbook", JSON.stringify(spellbook));
                    console.log(`Saved: ${randomSpell.name}`);

                    renderSpellbook();
                    saveBtn.classList.add("flash-save");
                    setTimeout(() => {
                    saveBtn.classList.remove("flash-save");
                    }, 500);

                } else {
                    console.log("Already saved!");
                }
            });
        })
        .catch(err => console.error("Error loading spells:", err));
});

renderSpellbook();


//  C O L L A P S I B L E  S P E L L B O O K
const toggleBtn = document.getElementById("toggle-spellbook");
const spellbookContent = document.getElementById("spellbook-content");
const spellbookContainer = document.getElementById("spellbook-container");

toggleBtn.addEventListener("click", () => {
    const isOpen = spellbookContent.style.display === "block";

   
    spellbookContent.style.display = isOpen ? "none" : "block";

    spellbookContainer.classList.toggle("open");
});
