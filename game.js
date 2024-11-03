const cards = JSON.parse(localStorage.getItem("cards") || "[]");
console.log(cards);
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug",
    "Sep", "Oct", "Nov", "Dec"
]
let min_datetime = new Date(Math.min(...cards.map(card => new Date(Date.parse(card.date)))));
let max_datetime = new Date(Math.max(...cards.map(card => new Date(Date.parse(card.date)))));
let month = months[min_datetime.getMonth()];
let day = min_datetime.getDate();
let year = min_datetime.getFullYear();
let month_max = months[max_datetime.getMonth()];
let day_max = max_datetime.getDate();
let year_max = max_datetime.getFullYear();

let min_date= `${month} ${day} ${year}`;
let max_date= `${month_max} ${day_max} ${year_max}`;

const type = document.querySelector(".pri-type");
const start_date = document.querySelector(".start-date");
start_date.innerHTML=min_date;
const end_date = document.querySelector(".end-date");
end_date.innerHTML=max_date;
const game = document.querySelector(".game");

function gameSetting(){

    let library = cards.filter((card)=>{
        return type.innerHTML==="All"? new Date(Date.parse(card.date))>=new Date(Date.parse(start_date.textContent)) && new Date(Date.parse(card.date))<=new Date(Date.parse(end_date.textContent)):
        new Date(Date.parse(card.date))>=new Date(Date.parse(start_date.textContent)) && new Date(Date.parse(card.date))<=new Date(Date.parse(end_date.textContent)) && card.priority === type.textContent.toLowerCase()
    })

    if(library.length>=10){
        let randomarray = getRandomArray(0,library.length-1);
        console.log(randomarray);

        game.innerHTML='';
        const newarea = document.createElement('div');
        newarea.className="game-mode";
            newarea.innerHTML =`
                <div class="block 0">${library[randomarray[0]].def}</div>
                <div class="block 4">${library[randomarray[4]].vocab}</div>
                <div class="block 3">${library[randomarray[3]].def}</div>
                <div class="block 1">${library[randomarray[1]].vocab}</div>
                <div class="block 7">${library[randomarray[7]].def}</div>
                <div class="block 8">${library[randomarray[8]].def}</div>
                <div class="block 5">${library[randomarray[5]].vocab}</div>
                <div class="block 0">${library[randomarray[0]].vocab}</div>
                <div class="block 2">${library[randomarray[2]].def}</div>
                <div class="block 9">${library[randomarray[9]].vocab}</div>
                <div class="block 4">${library[randomarray[4]].def}</div>
                <div class="block 6">${library[randomarray[6]].def}</div>
                <div class="block 1">${library[randomarray[1]].def}</div>
                <div class="block 3">${library[randomarray[3]].vocab}</div>
                <div class="block 7">${library[randomarray[7]].vocab}</div>
                <div class="block 8">${library[randomarray[8]].vocab}</div>
                <div class="block 9">${library[randomarray[9]].def}</div>
                <div class="block 2">${library[randomarray[2]].vocab}</div>
                <div class="block 5">${library[randomarray[5]].def}</div>
                <div class="block 6">${library[randomarray[6]].vocab}</div>
            `;
            game.appendChild(newarea);
    }else{
        game.innerHTML='';
        const newarea = document.createElement('div');
        newarea.className="lock-img";
            newarea.innerHTML =`
            <img class="lock" src="lock2.png" height="110px" width="145px"></img>
            <p class="lock-instruction">Learn more to unlock!</p>
        `;
        game.appendChild(newarea);
    }
}

gameSetting();

const next_type = document.querySelector(".next-type");
let init_type = 0;
let type_array = ["Important","Normal", "Trivial","All"];
next_type.addEventListener('click',()=>{
    init_type+=1;
    if(init_type%4===0){
        type.innerHTML=type_array[3];
    }
    else if(init_type%4===1){
        type.innerHTML=type_array[0];
    }
    else if(init_type%4===2){
        type.innerHTML=type_array[1];
    }
    else{
        type.innerHTML=type_array[2];
    }
})

const prev_type = document.querySelector(".prev-type"); 
prev_type.addEventListener('click',()=>{
    init_type-=1;
    if(init_type%4===0){
        type.innerHTML=type_array[3];
    }
    else if(init_type%4===1){
        type.innerHTML=type_array[0];
    }
    else if(init_type%4===2){
        type.innerHTML=type_array[1];
    }
    else{
        type.innerHTML=type_array[2];
    }
})


const prev_start_date = document.querySelector(".prev-start-date");
const next_start_date = document.querySelector(".next-start-date");

prev_start_date.addEventListener('click',()=>{
    let i = start_date.textContent;
    let new_start_date = new Date(Date.parse(i)-1);
    // console.log(new Date(new_start_date));

    if(new_start_date<=new Date(Date.parse(min_date))){
        return
    }

    let month = months[new_start_date.getMonth()];
    let day = new_start_date.getDate();
    let year = new_start_date.getFullYear();
    
    start_date.innerHTML=month+'\xa0'+day+'\xa0'+year;
})

next_start_date.addEventListener('click',()=>{
    let i = start_date.textContent;
    let new_start_date = new Date(Date.parse(i));
    let t = new Date(new_start_date.setDate(new_start_date.getDate()+1));

    if(new_start_date>new Date(Date.parse(end_date.textContent))){
        return
    }

    let month = months[t.getMonth()];
    let day = t.getDate();
    let year = t.getFullYear();
    start_date.innerHTML=month+'\xa0'+day+'\xa0'+year;
})

const prev_end_date = document.querySelector(".prev-end-date");
const next_end_date = document.querySelector(".next-end-date");

prev_end_date.addEventListener('click',()=>{
    let i = end_date.textContent;
    let new_end_date = new Date(Date.parse(i)-1);

    if(new_end_date<new Date(Date.parse(start_date.textContent))){
        return
    }

    let month = months[new_end_date.getMonth()];
    let day = new_end_date.getDate();
    let year = new_end_date.getFullYear();
    
    end_date.innerHTML=month+'\xa0'+day+'\xa0'+year;
})

next_end_date.addEventListener('click',()=>{
    let i = end_date.textContent;
    let new_end_date = new Date(Date.parse(i));
    let t = new Date(new_end_date.setDate(new_end_date.getDate()+1));

    if(new_end_date>new Date(Date.parse(max_date))){
        return
    }

    let month = months[t.getMonth()];
    let day = t.getDate();
    let year = t.getFullYear();
    end_date.innerHTML=month+'\xa0'+day+'\xa0'+year;
})

let div = document.querySelector('div');
div.addEventListener('click', (e) => {

    if(e.target.className.split(" ")[0]==="block"){
        e.target.classList.add("selected");
    }
    setTimeout(function(){
        if(document.querySelectorAll(".selected").length>1){
            if(document.querySelectorAll(".selected")[0].className.split(" ")[1]===document.querySelectorAll(".selected")[1].className.split(" ")[1]){
                console.log("match");
                document.querySelectorAll(".selected")[0].classList.add("match");
                document.querySelectorAll(".selected")[1].classList.add("match");
                document.querySelectorAll(".selected")[1].classList.remove("selected");
                document.querySelectorAll(".selected")[0].classList.remove("selected");
            }
            else if(document.querySelectorAll(".selected")[0].className.split(" ")[1]!=document.querySelectorAll(".selected")[1].className.split(" ")[1]){
                console.log("incorrect");
                document.querySelectorAll(".selected")[1].classList.remove("selected");
                document.querySelectorAll(".selected")[0].classList.remove("selected");
            }
        }
    },500)

})

const home = document.querySelector(".bxs-home");
home.addEventListener('click',()=>{
    window.location.href = `./index.html`
})

function getRandomArray(min, max){
    let array=[];

    while(array.length < 10){
        const randomInt = ~~(Math.random()*(max-min +1)) + min
        if(!array.includes(randomInt)) array.push(randomInt)
    }

    return array
}
