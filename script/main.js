const header = document.querySelector("header");
document.body.prepend(header);
const main = document.createElement("main");
main.classList.add("main");
header.after(main);
let section = document.createElement("section");
section.classList.add("section");
main.after(section);
allBtn = document.getElementsByTagName("button");

function delay(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}

function removeAddClass(btn) {
    for (let i = 0; i < allBtn.length; i++) {
        if (btn !== allBtn[i]) {
            allBtn[i].classList.add("active");
            allBtn[i].classList.remove("line");
        }
    }
}

function stopButton() {
    for (let i = 0; i < allBtn.length; i++) {
        if (allBtn) {
            allBtn[i].toggleAttribute("disabled");
        }
    }
}

async function getOneCharacter(el) {
    let imageNumber = el.match(/\d+/g).join("");
    let response = await fetch(el);
    let character = await response.json();
    main.innerHTML += `<div class="card">
                <img src="https://starwars-visualguide.com/assets/img/characters/${imageNumber}.jpg" alt="" />
                <div class="card__innerBox">
                    <p>Name<br>${character.name}</p>
                    <p>Birth<br>${character.birth_year}</p>
                    <p>Gender<br>${character.gender}</p>
                </div>
            </div>`;
}

async function starWars(e) {
    let event = e.target;
    stopButton();
    console.log(event.value);
    if (event.classList.contains("active")) {
        main.innerHTML = "";
        let response = await fetch(`https://swapi.dev/api/films/${event.value}`);
        let fiveEpisod = await response.json();
        event.classList.remove("active");
        event.classList.add("line");
        fiveEpisod.characters.forEach((el) => {
            getOneCharacter(el);
        });
        await delay(1000);
        removeAddClass(event);
    } else {
        event.classList.add("active");
        main.innerHTML = "";
    }
    stopButton();
}

async function planetWars(e) {
    let event = e.target;
    stopButton();
    if (event.classList.contains("active")) {
        main.innerHTML = "";
        let response = await fetch("https://swapi.dev/api/planets");
        let getPlanet = await response.json();
        let imageNumber = 1;
        for (let key in getPlanet.results) {
            event.classList.remove("active");
            event.classList.add("line");
            main.innerHTML += `<div class="card">
                <img src="https://starwars-visualguide.com/assets/img/planets/${imageNumber}.jpg" alt="На цю планету нема фото соррі))" />
                <div class="card__innerBox">
                    <p>Name<br>${getPlanet.results[key].name}</p>
                </div>
            </div>`;
            imageNumber += 1;
        }
        removeAddClass(event);
        await delay(1000);
    } else {
        event.classList.add("active");
        main.innerHTML = "";
    }
    stopButton();
}
