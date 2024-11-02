var numSelected = null;
var tileSelected = null;
var errors= 0;
let selectedGame = null;
let selectedBoard = null;
let selectedSolution = null;

var board = [
    ["--74916-5","2---6-3-9","-----7-1-","-586----4","--3----9-","--62--187","9-4-7---2","67-83----","81--45---"],
    ["53--7----","6--195---","-98----6-","8---6---3","4--8-3--1","7---2---6","-6----28-","---419--5","----8--79"],
    ["168---9-2","---3-1---","-3-62----","--9---1-5","--1---37-","-435----9","---8-26--","---9-5-23","2-6-3-7--"],
    ["---39--1-","5-1----4-","9--7--5--","6-253--7-","----7---8","7--8--9-3","8-3-1--9-","-9-2-6--7","4----3-61"]
];

var solution = [
    ["387491625","241568379","569327418","758619234","123784596","496253187","934176852","675832941","812945763"],
    ["534678912","672195348","198342567","859761423","426853791","713924856","961537284","287419635","345286179"],
    ["138457932","572391468","934628517","829743156","651289374","743516289","395872641","417965823","286134795"],
    ["248395716","571628349","936741582","682539174","359174628","714862953","863417295","195286437","427953861"]

];


window.onload = function(){
    setGame();
}
function setGame(){
    selectedGame = Math.floor(Math.random() * board.length);
    selectedBoard = board[selectedGame];
    selectedSolution = solution[selectedGame];
    //Digits
    for(let i=1;i<=9;i++){
        let number = document.createElement("div");
        number.id=i;
        number.innerText=i;
        number.draggable = true;
        number.addEventListener("click",selectNumber);
        number.addEventListener("dragstart", dragStart);
        number.classList.add("number");
        document.getElementById("digits").appendChild(number);
    }
    //Board

    for(let i=0;i<9;i++){
        for(let j =0;j<9;j++){
            let tile = document.createElement("div");
            tile.id=i.toString()+'-'+j.toString();
            if(selectedBoard[i][j]!='-'){
                tile.innerText = selectedBoard[i][j];
                tile.classList.add("tile-start");
            }
            if(i==2||i==5){
                tile.classList.add("bottom-border");
            }
            if(j==2||j==5){
                tile.classList.add("right-border");
            }
            tile.classList.add("tile");
            tile.addEventListener("click",selectTile);
            tile.addEventListener("dragover", dragOver);
            tile.addEventListener("drop", drop);
            document.getElementById("board").appendChild(tile);
        }
    }
}

function selectNumber(){
    if(numSelected!=null){
        numSelected.classList.remove("number-selected");
    }
    numSelected = this;
    numSelected.classList.add("number-selected");
}
function selectTile(){
    if(numSelected){
        if(this.innerText!= ""){return;}
    }

    let coords = this.id.split("-");
    let i= parseInt(coords[0]);
    let j = parseInt(coords[1]);

    if(selectedSolution[i][j]==numSelected.id){
        this.innerText = numSelected.id;
        this.classList.add("tile-solved");
        if(validateSudoku()){
            alert("Congratulations! You've completed the Sudoku correctly!");
            showFireworks(); 
        }
    }
    else{
        errors+=1;
        if(errors>=10){
            document.getElementById("errors").style.color = "red";
        }
        document.getElementById("errors").innerText=errors;
    }

}

function dragStart(event) {
    numSelected = this;
    event.dataTransfer.setData("text", this.id);  // Set data to be transferred
}
function dragOver(event) {
    event.preventDefault();  // Allow dropping
}

function drop(event) {
    if(this.innerText!=""){return ;}

    event.preventDefault();
    const numberId = event.dataTransfer.getData("text");  // Get dragged number

    let coords = this.id.split("-");
    let i = parseInt(coords[0]);
    let j = parseInt(coords[1]);

    // Check if the dropped number is correct
    if (selectedSolution[i][j] == numberId) {
        this.innerText = numberId;  // Place number on tile
        this.classList.add("tile-solved");
        if(validateSudoku()){
            alert("Congratulations! You've completed the Sudoku correctly!");
            showFireworks(); 
        }
    } else {
        errors += 1;  // Increment errors if incorrect
        if(errors>=10){
            document.getElementById("errors").style.color = "red";
        }
        document.getElementById("errors").innerText = errors;
    }
}
let solved = false;
function solvePuzzle(){
    solved=true;
    for (let i=0;i<9;i++){
        for(let j=0;j<9;j++){

            let tile = document.getElementById(i.toString()+'-'+j.toString());
            tile.innerText = selectedSolution[i][j];
            tile.classList.add("tile-solved");
        }
    }
    errors = 0; 
    document.getElementById("errors").innerText = errors; 
    document.getElementById("errors").style.color = "green";
}

function validateSudoku() {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            let tile = document.getElementById(i.toString() + '-' + j.toString());
            if (tile.innerText !== selectedSolution[i][j]) { // Check if the tile matches the solution
                console.log(`Mismatch at tile [${i}, ${j}]: tile = ${tile.innerText}, solution = ${selectedSolution[i][j]}`);
                return false;
            }
        }
    }
    return true;
}

function showFireworks() {
    document.body.classList.add("winner");

    const container = document.getElementById('fireworks-container');

    // Generate a few fireworks
    for (let i = 0; i < 10; i++) {
        const firework = document.createElement('div');
        firework.classList.add('firework');

        // Set random positions within the viewport
        firework.style.left = `${Math.random() * 100}vw`;
        firework.style.top = `${Math.random() * 100}vh`;

        container.appendChild(firework);

        // Remove the firework after the animation
        setTimeout(() => {
            firework.remove();
        }, 10000); // Match the animation duration in CSS
    }
}
