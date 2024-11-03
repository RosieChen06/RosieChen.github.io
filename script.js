const add = document.querySelector(".add-card");
const add_form = document.querySelector(".back-effet");
const submit_btn = document.querySelector(".submit-btn");
const newword = document.getElementById("wordid");
const def = document.getElementById("defid");
const ex = document.getElementById("exid");
const exit = document.querySelector(".bx-x");
const warningexplain = document.querySelector(".warning-explain");

const cards = JSON.parse(localStorage.getItem("cards") || "[]");
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug",
    "Sep", "Oct", "Nov", "Dec"
]

const input_name = document.querySelector(".short");

let updatedID

add.addEventListener("click", () => {
  add_form.classList.add("show");
  def.classList.remove("warning");
  newword.classList.remove("warning");
  warningexplain.classList.remove("show");
  newword.value = "";
  def.value = "";
  ex.value = "";
  normal.classList.remove("select");
  trivial.classList.remove("select");
  important.classList.remove("select");
  input_name.innerHTML="New Word";
  submit_btn.innerHTML="Add";
});

exit.addEventListener("click", () => {
  add_form.classList.remove("show");
});

const important = document.querySelector(".important");
const normal = document.querySelector(".normal");
const trivial = document.querySelector(".trivial");

important.addEventListener("click", () => {
  important.classList.add("select");
  normal.classList.remove("select");
  trivial.classList.remove("select");
});

normal.addEventListener("click", () => {
  normal.classList.add("select");
  important.classList.remove("select");
  trivial.classList.remove("select");
});

trivial.addEventListener("click", () => {
  trivial.classList.add("select");
  normal.classList.remove("select");
  important.classList.remove("select");
});

submit_btn.addEventListener("click", () => {
  let newwordadd = newword.value;
  let defadd = def.value;
  let exadd = ex.value;

  const selectitem = document.querySelector(".select").className.split(" ")[0];

  if (newwordadd === "" && defadd === "") {
    newword.classList.add("warning");
    def.classList.add("warning");
    warningexplain.classList.add("show");
  } else if (newwordadd === "") {
    newword.classList.add("warning");
    def.classList.remove("warning");
    warningexplain.classList.add("show");
  } else if (defadd === "") {
    def.classList.add("warning");
    newword.classList.remove("warning");
    warningexplain.classList.add("show");
  } else {
    def.classList.remove("warning");
    newword.classList.remove("warning");
    warningexplain.classList.remove("show");

    let dateObj = new Date();
    let month = months[dateObj.getMonth()];
    let day = dateObj.getDate();
    let year = dateObj.getFullYear();

    let cardinfo = {
      id: parseInt(cards.length)+1,
      vocab: newwordadd,
      def: defadd,
      ex: exadd,
      date: `${month} ${day} ${year}`,
      priority: selectitem,
      unique: newwordadd
    };
    if(submit_btn.innerHTML==="Add"){
        cards.push(cardinfo);
    }else{
        cards[updatedID]=cardinfo;
    }
    localStorage.setItem("cards", JSON.stringify(cards));
    newword.value = "";
    def.value = "";
    ex.value = "";
    normal.classList.remove("select");
    trivial.classList.remove("select");
    important.classList.remove("select");
  }
  showCard(cards);
});

console.log(cards);

function showCard(array){
    const aggregate = document.querySelector(".card-aggregate");
    aggregate.innerHTML='';
    array.forEach((card,index) => {
        const newDiv = document.createElement('div');
        newDiv.innerHTML = `
        <div class="card-list" id=${index} onclick="turnCard(this.id)">
            <div class="head">
                <p class="title">${card.vocab}</p>
                <p class=${card.priority}tag>${card.priority}</p>
            </div>
            <div class="main">
                <p class="definition">${card.def}</p>
                <p class="example">${card.ex}</p>
            </div>
            <hr>
            <div class="bottom">
                <p class="date">${card.date}</p>
                <p class="progress">${parseInt(index)+1}/${cards.length}</p>
            </div>
            <div class="card-back" id='${index}_diff'>
                <div class="func">
                    <i class='bx bxs-edit-alt' onclick="updateItem(${index})"></i>
                    <i class='bx bxs-trash' onclick="deleteItem(${index})" ></i>
                </div>
            </div>
        </div>
        `;
        aggregate.appendChild(newDiv);
    });
}

showCard(cards);

function turnCard(id){
    const back = document.getElementById(`${id}_diff`);
    back.classList.toggle("turn");
}

function deleteItem(target){
    cards.splice(target, 1);
    localStorage.setItem("cards", JSON.stringify(cards));
    showCard(cards);
}

function updateItem(index_){
    add_form.classList.add("show");
    newword.value=cards[index_].newword;
    def.value=cards[index_].def;
    ex.value=cards[index_].ex;
    input_name.innerHTML="Word";
    submit_btn.innerHTML="Update";
    normal.classList.remove("select");
    trivial.classList.remove("select");
    important.classList.remove("select");
    if(cards[index_].priority==="Important"){
        important.classList.add("select");
    }else if(cards[index_].priority==="Normal"){
        normal.classList.add("select");
    }else{
        trivial.classList.add("select");
    }
    updatedID = index_;
}

const search = document.querySelector(".search_input");

search.addEventListener('keyup',()=>{
    let value = search.value;
    console.log(value);
    let new_order = cards.filter((card)=>{
        return String(card.vocab).startsWith(value)
    })
    showCard(new_order);    
})

const toggle = document.querySelector(".toggle");
const card_section = document.querySelector(".card");
const mask = document.querySelector(".play-ground");

toggle.addEventListener('click',()=>{
    card_section.classList.toggle("hide");
    toggle.classList.toggle("move");
    mask.classList.toggle("mask");
})

let start_value = 0;

const vocab_cnt_ttl = document.querySelector(".vocab_cnt_ttl");
let progress = setInterval(()=>{
    start_value++;
    vocab_cnt_ttl.textContent=`${start_value}`;
    if(start_value == cards.length){
        clearInterval(progress);
    }
}, 35)

const game_page = document.querySelector(".main-page");
const wavy = document.querySelector(".wavy");

wavy.addEventListener('click',()=>{
    window.location.href = `./game.html`
})

const vocab_cnt_today = document.querySelector(".vocab_cnt_today");

function getTodayCnt(){
    let second_start_value = 0;
    let datetime = new Date();
    let month = months[datetime.getMonth()];
    let day = datetime.getDate();
    let year = datetime.getFullYear();

    let today = `${month} ${day} ${year}`;

    let todayarray = cards.filter((card)=>{
        return card.date===today
    })

    let second_progress = setInterval(()=>{
        second_start_value++;
        vocab_cnt_today.textContent=`${second_start_value}`;
        if(second_start_value == todayarray.length){
            clearInterval(second_progress);
        }
    }, 35)
}

getTodayCnt();




