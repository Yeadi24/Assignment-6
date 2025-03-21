function removeActive() {
  const activeButtons = document.getElementsByClassName("active");
  for (const i of activeButtons) {
    i.classList.remove("active");
  }
}
// All about loading
function showLoading() {
  let loadingContainer = document.getElementById("loading");
  loadingContainer.innerHTML = `
    <span class="loading loading-ball loading-xs"></span>
    <span class="loading loading-ball loading-sm"></span>
    <span class="loading loading-ball loading-md"></span>
    <span class="loading loading-ball loading-lg"></span>
    <span class="loading loading-ball loading-xl"></span>
  `;
  loadingContainer.style.display = "block";
}
function hideLoading() {
  let loadingContainer = document.getElementById("loading");
  loadingContainer.style.display = "none";
  loadingContainer.innerHTML = ``;
}

function loadLessons() {
  fetch("https://openapi.programming-hero.com/api/levels/all")
    .then((response) => response.json())
    .then((data) => {
      const lessonsContainer = document.getElementById("lessons");
      lessonsContainer.classList.add(
        "flex",
        "flex-row",
        "gap-8",
        "justify-center",
        "mt-5"
      );

      let buttonsHTML = "";
      data.data.forEach((lesson) => {
        buttonsHTML += `
            <button id="id-${lesson.level_no}" class="btn flex items-center gap-4 p-2 rounded-lg w-32"
            onclick="showWords(${lesson.level_no})"
            >
              <img src="./assets/fa-book-open.png" alt="book icon" class="w-5 h-5"/> 
              Lesson-${lesson.level_no}
            </button>
          `;
      });

      lessonsContainer.innerHTML = buttonsHTML;
    });
}
function showWords(level) {
  removeActive();
  showLoading();
  const url = `https://openapi.programming-hero.com/api/level/${level}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const clickedButton = document.getElementById(`id-${level}`);
      clickedButton.classList.add("active");
      let all = data.data;
      let cardContainer = document.getElementById("cards");
      cardContainer.innerHTML = ``;
      hideLoading();

      if (all.length < 1) {
        let warning = document.createElement("section");
        warning.classList.add("col-span-full");
        warning.innerHTML = `
        <div class="p-10 bg-slate-200 m-20 rounded-lg flex flex-col justify-center items-center">
         <img src="./assets/alert-error.png" alt="" />
        <h1 class="font-bold text-[60px] text-center">No Words Found !!!</h1>
      </div>
        `;
        cardContainer.appendChild(warning);
      }

      for (let i of all) {
        let card = document.createElement("div");
        card.classList.add("p-10");
        let meaning = i.meaning;
        if (meaning === null) {
          meaning = "অর্থ নেই";
        }
        card.innerHTML = `
        <div
          class="card w-[400px] p-4 flex flex-col gap-4 justify-center items-center border-2 border-black"
        >
          <h1 class="font-bold text-[40px]">${i.word}</h1>
          <p class="text-[32px]">Meaning/Pronounciation</p>
          <h1 class="font-semibold text-[20px]">"${meaning}/${i.pronunciation}"</h1>
          <div class="logo w-full flex justify-between">
            <button class="btn" id="details-btn" onclick="displayModal(${i.id})">
              <img class="w-10" src="./assets/info.png" alt="" />
            </button>
            <button class="btn">
              <img class="w-10" src="./assets/volume.png" alt="" />
            </button>
          </div>
        </div>
        `;
        cardContainer.appendChild(card);
      }
    });
}
function handleLogin() {
  const nameInput = document.querySelector("input[type='text']");
  const passwordInput = document.querySelector("input[type='password']");

  if (nameInput.value && passwordInput.value === "123456") {
    // Hide the banner
    document.getElementById("banner").style.display = "none";

    // Show the rest of the page
    document.getElementById("learn").style.display = "block";
    document.getElementById("faq").style.display = "block";

    // Show the navbar
    document.querySelector("nav").style.display = "block";

    // Alert the user
    alert("Welcome To English Janala");
  } else if (nameInput.value.length === 0 && passwordInput.value.length > 0) {
    alert("Enter a Name");
  } else {
    alert("Invalid Password.Contact To Your Admin.");
  }
}
function displayModal(id) {
  let url = `https://openapi.programming-hero.com/api/word/${id}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const modalConatainer = document.getElementById("modal-container");
      let word = data.data.word;
      let pronunciation = data.data.pronunciation;
      let meaning = data.data.meaning;
      if (meaning === null) {
        meaning = "অর্থ নেই";
      }
      let sentence = data.data.sentence;
      let synonyms = data.data.synonyms;
      if (synonyms.length < 1) {
        modalConatainer.innerHTML = `
      <h1 class="text-lg font-bold text-[30px] mb-4">${word}:(${pronunciation})</h1>
          <h1 class="font-bold text-[30px] mb-4">Meaning</h1>
          <p class="text-[22px] mb-4">${meaning}</p>
          <h1 class="font-bold text-[30px] mb-4">Example</h1>
          <p class="text-[22px] mb-4">${sentence}</p>
          <h1 class="font-bold text-[30px] mb-4">সমার্থক শব্দগুলো</h1>
          <div class="buttons flex gap-3 mb-4">
            <button class="btn">সমার্থক শব্দ পাওয়া যায়নি</button>
            
          </div>
          <button class="btn btn-outline btn-primary">Complete</button>
      `;
      } else {
        modalConatainer.innerHTML = `
      <h1 class="text-lg font-bold text-[30px] mb-4">${word}:(${pronunciation})</h1>
          <h1 class="font-bold text-[30px] mb-4">Meaning</h1>
          <p class="text-[22px] mb-4">${meaning}</p>
          <h1 class="font-bold text-[30px] mb-4">Example</h1>
          <p class="text-[22px] mb-4">${sentence}</p>
          <h1 class="font-bold text-[30px] mb-4">সমার্থক শব্দগুলো</h1>
          <div class="buttons flex gap-3 mb-4">
            <button class="btn">${synonyms[0]}</button>
            <button class="btn">${synonyms[1]}</button>
            <button class="btn">${synonyms[2]}</button>
          </div>
          <button class="btn btn-outline btn-primary">Complete</button>
      `;
      }
      document.getElementById("dada").showModal();
    });
}

// Attach event listener to the Get started button
document
  .querySelector("button.btn-soft")
  .addEventListener("click", handleLogin);

// Initially load lessons
loadLessons();

// Handle LogOut

function handleLogOut() {
  document.getElementById("logout").addEventListener("click", () => {
    const nameInput = document.querySelector("input[type='text']");
    const passwordInput = document.querySelector("input[type='password']");
    nameInput.value = "";
    passwordInput.value = "";
    document.getElementById("learn").style.display = "none";
    document.getElementById("faq").style.display = "none";

    document.querySelector("nav").style.display = "none";
    document.getElementById("banner").style.display = "flex";
  });
}
handleLogOut();
// scroll to specific section
const learn = document.getElementById("learn-btn");
learn.addEventListener("click", () => {
  document
    .getElementById("lesson_card_container")
    .scrollIntoView({ behavior: "smooth" });
});
const faq = document.getElementById("faq-btn");
faq.addEventListener("click", () => {
  document.getElementById("faq").scrollIntoView({ behavior: "smooth" });
});
