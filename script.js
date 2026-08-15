let currentPage = 1;

const selectedFoods = [];

let selectedPlace = "";


// -------------------------
// PAGE CHANGE
// -------------------------

function nextPage() {

    const current = document.getElementById(
        `page${currentPage}`
    );

    current.classList.remove("active");

    currentPage++;

    const next = document.getElementById(
        `page${currentPage}`
    );

    if (next) {
        next.classList.add("active");
    }

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


// -------------------------
// NORMAL OPTIONS
// -------------------------

function chooseSingle(button) {

    const parent = button.parentElement;

    parent
        .querySelectorAll("button")
        .forEach(item => {
            item.classList.remove("selected");
        });

    button.classList.add("selected");
}


// -------------------------
// FOOD - MULTIPLE SELECTION
// -------------------------

function toggleFood(button) {

    const food = button.dataset.food;

    button.classList.toggle("selected");

    if (button.classList.contains("selected")) {

        if (!selectedFoods.includes(food)) {
            selectedFoods.push(food);
        }

    } else {

        const index =
            selectedFoods.indexOf(food);

        if (index !== -1) {
            selectedFoods.splice(index, 1);
        }
    }

    updateFoodText();
}


function updateFoodText() {

    const text =
        document.getElementById("foodSelected");

    if (selectedFoods.length === 0) {

        text.innerText =
            "nothing selected yet";

        return;
    }

    text.innerText =
        selectedFoods.join(" · ");
}


// -------------------------
// EXTRA OPTIONS
// -------------------------

function toggleExtra(button) {

    button.classList.toggle("selected");
}


// -------------------------
// PLACE
// -------------------------

function setPlace(place) {

    document.getElementById(
        "placeInput"
    ).value = place;

    selectedPlace = place;
}


function savePlace() {

    const input =
        document.getElementById("placeInput");

    if (input.value.trim()) {

        selectedPlace =
            input.value.trim();

    } else {

        selectedPlace =
            "somewhere nice";
    }

    nextPage();
}


// -------------------------
// DATE
// -------------------------

function finishQuestions() {

    const date =
        document.getElementById(
            "dateInput"
        ).value;

    if (!date) {

        alert(
            "you have to pick a day first :)"
        );

        return;
    }

    updateSummary();

    document
        .getElementById(`page${currentPage}`)
        .classList.remove("active");

    currentPage = 9;

    document
        .getElementById("page9")
        .classList.add("active");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


// -------------------------
// SUMMARY
// -------------------------

function updateSummary() {

    const food =
        document.getElementById(
            "summaryFood"
        );

    const place =
        document.getElementById(
            "summaryPlace"
        );

    const date =
        document.getElementById(
            "summaryDate"
        );


    food.innerText =
        selectedFoods.length
            ? selectedFoods.join(", ")
            : "your choice";


    place.innerText =
        selectedPlace || "somewhere nice";


    const dateValue =
        document.getElementById(
            "dateInput"
        ).value;


    const formatted =
        new Date(
            dateValue + "T00:00:00"
        ).toLocaleDateString(
            "en-US",
            {
                weekday: "long",
                month: "long",
                day: "numeric"
            }
        );


    date.innerText = formatted;
}


// -------------------------
// THE NO BUTTON
// -------------------------

function escapeNo() {

    const button = document.getElementById("noButton");

    if (!button) return;

    button.style.position = "fixed";
    button.style.zIndex = "99999";

    const padding = 25;

    const buttonWidth = button.offsetWidth;
    const buttonHeight = button.offsetHeight;

    const maxX = window.innerWidth - buttonWidth - padding;
    const maxY = window.innerHeight - buttonHeight - padding;

    const x =
        Math.floor(
            Math.random() * Math.max(maxX - padding, 1)
        ) + padding;

    const y =
        Math.floor(
            Math.random() * Math.max(maxY - padding, 1)
        ) + padding;

    button.style.left = `${x}px`;
    button.style.top = `${y}px`;

    const texts = [
        "no",
        "nice try",
        "nope",
        "too slow",
        "try again",
        "almost",
        "not happening",
        "hehe no",
        "you wish"
    ];

    button.innerText =
        texts[Math.floor(Math.random() * texts.length)];
}


document.addEventListener("mousemove", function(event) {

    const button =
        document.getElementById("noButton");

    if (!button) return;

    const page =
        document.getElementById("page9");

    if (!page.classList.contains("active")) {
        return;
    }

    const rect =
        button.getBoundingClientRect();

    const centerX =
        rect.left + rect.width / 2;

    const centerY =
        rect.top + rect.height / 2;

    const distance =
        Math.hypot(
            event.clientX - centerX,
            event.clientY - centerY
        );

    if (distance < 100) {
        escapeNo();
    }
});


// -------------------------
// YES
// -------------------------

function sayYes() {

    document
        .getElementById("page9")
        .classList.remove("active");

    document
        .getElementById("success")
        .classList.add("active");


    makeHearts();

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


// -------------------------
// LITTLE HEARTS
// -------------------------

function makeHearts() {

    const hearts = [
        "♡",
        "♥",
        "✦"
    ];


    for (let i = 0; i < 18; i++) {

        const heart =
            document.createElement("span");

        heart.innerText =
            hearts[
                Math.floor(
                    Math.random() *
                    hearts.length
                )
            ];


        heart.style.position =
            "fixed";

        heart.style.left =
            Math.random() * 100 + "vw";

        heart.style.top =
            "-20px";

        heart.style.color =
            "#d9829a";

        heart.style.fontSize =
            Math.random() * 15 + 12 + "px";

        heart.style.zIndex =
            "10";

        heart.style.pointerEvents =
            "none";


        document.body.appendChild(
            heart
        );


        heart.animate(
            [
                {
                    transform:
                        "translateY(0) rotate(0deg)",
                    opacity: 0
                },

                {
                    transform:
                        `translateY(50vh) rotate(90deg)`,
                    opacity: 1
                },

                {
                    transform:
                        `translateY(110vh) rotate(180deg)`,
                    opacity: 0
                }
            ],
            {
                duration:
                    3000 + Math.random() * 2500,

                easing: "ease-out",

                fill: "forwards"
            }
        );


        setTimeout(() => {
            heart.remove();
        }, 6000);
    }
}