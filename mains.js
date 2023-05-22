const Boxes=document.querySelectorAll('.box');
const heading=document.querySelector('#header');
const text=document.querySelector('#strategy');
const RestartBtn=document.querySelector('#restart');
let x="X"
let o="O"
let currentPlayer=x;

const win=[
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
];

let options = ["","","","","","","","",""];
let player= "X";
let running =false;
Init();
function Init(){
  Boxes.forEach(box=>box.addEventListener('click',boxClick));
  RestartBtn.addEventListener('click',restartGame);
  text.textContent=`${player} Your Turn`;
  running=true;
}

function boxClick(){
  const index=this.dataset.index;
  if(options[index]!="" || !running){
    return;
  }
  updateBox(this,index);
  checkWinner();
}
function updateBox(box,index){
  options[index]=player;
  box.innerHTML=currentPlayer;
}
function changePlayer(){
  player=(player=='X') ? "O" :"X";
  currentPlayer=(currentPlayer==x) ? o : x ;
  text.textContent=`${player} Your Turn`;
}
function checkWinner(){
  let isWon=false;
  for(let i=0;i<win.length;i++){
    const condition=win[i]; //[0,1,2]
    const box1=options[condition[0]]; //x
    const box2=options[condition[1]]; //''
    const box3=options[condition[2]]; //''
    if(box1=="" || box2=="" || box3==""){
      continue;
    }
    if(box1==box2 && box2==box3){
      isWon=true;
      Boxes[condition[0]].classList.add('win');
      Boxes[condition[1]].classList.add('win');
      Boxes[condition[2]].classList.add('win');
    }
  }

  if(isWon){
    text.textContent=`${player} Won..`;
    running=false;
  }else if(!options.includes("")){
    text.textContent=`Game Draw..!`;
    running=false;
  }else{
    changePlayer();
  }

}

function restartGame(){
  options=["","","","","","","","",""];
  currentPlayer=x;
  player="X";
  running=true;
  text.textContent=`${player} Your Turn`;

  Boxes.forEach(box=>{
      box.innerHTML="";
      box.classList.remove('win');
  });
}