let data = [
    {
        todo: "sarapan",
        box: "todo"
    },
    {
        todo: "berenang",
        box: "todo"
    },
    {
        todo: "mandi",
        box: "todo"
    },
    {
        todo: "belajar",
        box: "todo"
    },
    {
        todo: "olahraga",
        box: "doing"
    }
]

function input(){
    let input = document.getElementById("input").value
    console.log(input);
    if(input === ""){
        alert()
    }else{
        let obj ={
            todo: input,
            box: "todo"
        }
        data.push(obj)
        render()
    }
}

let todo = document.getElementById("todo")
todo.addEventListener("click", handleClick)
let doing = document.getElementById("doing")
doing.addEventListener("click", handleClick)
let done = document.getElementById("done")
done.addEventListener("click", handleClick)

function handleClick(click){
    let item =click.target
    let todoElement = item.parentElement.parentElement.parentElement.parentElement.id
    if(todoElement === "todo"){
        if(item.parentElement.classList[1] === "close"){
            data.splice(item.parentElement.id, 1)
        }else if (item.parentElement.classList[1] === "edit") {
            let editkata = prompt("silahkan edit", "type here...")
            data[item.parentElement.id].todo = editkata
        }else if (item.parentElement.classList[1] === "move") {
            data[item.parentElement.id].box = "doing"
        }
    }else if (todoElement === "doing") {
        if(item.parentElement.classList[1] === "close"){
            data.splice(item.parentElement.id, 1)
        }else if (item.parentElement.classList[1] === "edit") {
            let editkata = prompt("silahkan edit", "type here...")
            data[item.parentElement.id].todo = editkata
        }else if (item.parentElement.classList[1] === "move") {
            data[item.parentElement.id].box = "done"
        }else if (item.parentElement.classList[1] === "back") {
            data[item.parentElement.id].box = "todo"
        }

    }
    console.log(item.parentElement.id);
    if(item.parentElement.id === "startTimer"){
        start()
    }else if(item.parentElement.id === "stopTimer"){
        stop()
    }else if(item.parentElement.id === "resetTimer"){
        reset()
    }
    
    render()
}

function reset(){
    document.getElementById("reset-btn").innerHTML = "halooo"
}


let detik = 0;
let minute = 0;
let jam = 0;

let displayDetik = 0
let displayMinute = 0
let displayJam = 0

let timerID = -1;
function tick() {
    detik++
    if(detik === 60){
        detik = 0
        minute ++
        if (minute === 60) {
            minute = 0
            jam ++
        }
    }
    if (detik < 10) {
        displayDetik = "0" + detik
    }else{
        displayDetik = detik
    }
    if (minute < 10) {
        displayMinute = "0" + minute
    }else{
        displayMinute = minute
    }
    if (jam < 10) {
        displayJam = "0" + jam
    }else{
        displayJam = jam
    }
    document.getElementById("time").innerHTML = `${displayJam}:${displayMinute}:${displayDetik}`;
}

function start() {
    if(timerID == -1){
        timerID = setInterval(tick, 1000);
    }
}

function stop() {
    if(timerID != -1){
        clearInterval(timerID)
        timerID = -1
    }
}

function reset() {
    stop();
    detik = -1;
    tick()
}



function render(){
    document.getElementById("todo").innerHTML =""
    document.getElementById("doing").innerHTML =""
    document.getElementById("done").innerHTML =""
    for (let i = 0; i < data.length; i++) {
        let card = document.createElement("div")
        let btn = document.createElement("div")
        let paragraf = document.createElement("p")
        let close = document.createElement("button")
        let edit = document.createElement("button")
        let move = document.createElement("button")
        let check = document.createElement("button")
        let back = document.createElement("button")
        let time = document.createElement("div")
        let play = document.createElement("button")
        let pause = document.createElement("button")
        let reset = document.createElement("button")
        let timeBtn = document.createElement("div")

        paragraf.classList.add("paragraf")
        card.classList.add("list")
        btn.classList.add("btn")
        close.classList.add("btn-a")
        close.classList.add("close")
        edit.classList.add("btn-a")
        edit.classList.add("edit")
        move.classList.add("btn-a")
        move.classList.add("move")
        check.classList.add("btn-a")
        back.classList.add("btn-a")
        back.classList.add("back")
        play.classList.add("btn-a")
        pause.classList.add("btn-a")
        reset.classList.add("btn-a")
        timeBtn.classList.add("time-btn")

        paragraf.id = i
        close.id = i
        edit.id = i
        move.id = i
        check.id = i
        back.id = i
        time.id = "time"
        play.id = "startTimer"
        pause.id = "stopTimer"
        reset.id = "resetTimer"

        paragraf.innerHTML = data[i].todo
        close.innerHTML = '<img src="close.png" width="20px"/>'
        edit.innerHTML = '<img src="edit.png" width="20px"/>'
        move.innerHTML = '<img src="pngwing.com.png" width="20px" height="20px"/>'
        check.innerHTML = '<img src="done.png" width="20px"/>'
        back.innerHTML = '<img src="back.png" width="20px" height="20px"/>'
        time.innerHTML = "00:00:00"
        play.innerHTML = '<img src="play.png" width="25px" />'
        pause.innerHTML = '<img src="pause.png" width="25px" />'
        reset.innerHTML = '<img src="reset.png" width="25px" />'
    

        card.appendChild(paragraf)
        if (data[i].box !== "done") {
            if (data[i].box === "doing") {
                timeBtn.appendChild(time)
                timeBtn.appendChild(play)
                timeBtn.appendChild(pause)
                timeBtn.appendChild(reset)
                btn.appendChild(timeBtn)
                btn.appendChild(back)
            }
            btn.appendChild(close)
            btn.appendChild(edit)
            btn.appendChild(move)
        }else{
            btn.appendChild(time)
            btn.appendChild(check)
        }
        card.appendChild(btn)
        
        console.log(card);
        if(data[i].box === "todo"){
            document.getElementById("todo").appendChild(card)
        }else if(data[i].box === "doing"){
            document.getElementById("doing").appendChild(card)
        }else if(data[i].box === "done"){
            document.getElementById("done").appendChild(card)
        }
        
    }
}

render()
