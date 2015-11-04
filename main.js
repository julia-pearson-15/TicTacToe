// √
var restartButton = document.querySelector('.start');
var reloadPage = function(){
  window.location.reload(true);
};
restartButton.addEventListener('click',reloadPage);

// √ array of clickable boxes
var allDaBoxes = [
  //down vertically collumn 1
  document.querySelectorAll('.rowOne')[0],
  document.querySelectorAll('.rowTwo')[0],
  document.querySelectorAll('.rowThree')[0],
  //down vertically collumn 2
  document.querySelectorAll('.rowOne')[1],
  document.querySelectorAll('.rowTwo')[1],
  document.querySelectorAll('.rowThree')[1],
  //down vertically collumn 3
  document.querySelectorAll('.rowOne')[2],
  document.querySelectorAll('.rowTwo')[2],
  document.querySelectorAll('.rowThree')[2] 
];
// √ copy of all boxes to be culled as we click
var emptyBoxes = allDaBoxes; 
// √ alternating Xs and Os
var xTime = true;
// √ adding event listeners-called at bottom;
var makeEmListen = function(target){
  target.addEventListener('click',gotClicked(target));
}
// !!!!! working enough 
var removeListenters = function(target){
  target.removeEventListener('click', gotClicked);
}
// √ checking if winner x or o works
var didWeWin = function(XorO){
  if ((allDaBoxes[0].classList.contains(XorO) && allDaBoxes[1].classList.contains(XorO) && allDaBoxes[2].classList.contains(XorO)) ||
  (allDaBoxes[3].classList.contains(XorO) && allDaBoxes[4].classList.contains(XorO) && allDaBoxes[5].classList.contains(XorO)) ||
  (allDaBoxes[6].classList.contains(XorO) && allDaBoxes[7].classList.contains(XorO) && allDaBoxes[8].classList.contains(XorO)) ||
  (allDaBoxes[0].classList.contains(XorO) && allDaBoxes[3].classList.contains(XorO) && allDaBoxes[6].classList.contains(XorO)) ||
  (allDaBoxes[1].classList.contains(XorO) && allDaBoxes[4].classList.contains(XorO) && allDaBoxes[7].classList.contains(XorO)) ||
  (allDaBoxes[2].classList.contains(XorO) && allDaBoxes[5].classList.contains(XorO) && allDaBoxes[8].classList.contains(XorO)) ||
  (allDaBoxes[0].classList.contains(XorO) && allDaBoxes[4].classList.contains(XorO) && allDaBoxes[8].classList.contains(XorO)) ||
  (allDaBoxes[2].classList.contains(XorO) && allDaBoxes[4].classList.contains(XorO) && allDaBoxes[6].classList.contains(XorO))) {      
      return true;
  }
}

// √ checking if each spot in emptyBoxes is in fact empty
var isEmpty = function(arrayItem){
  if(arrayItem.classList.contains('clicked')){
    return false;   
  }else{
    return true;
  }
}
// √ generating random num for spot in empty boxes
var findRando = function(){
  // var randoIndex = Math.floor(Math.random() * (emptyBoxes.length));
  var randoIndex=null;
  for (var i = 0; i < allDaBoxes.length ; i++) {
    if(allDaBoxes[i].classList.contains('x')){
      //checking if index is within in bounds
      if(i<allDaBoxes.length-1){
        //if there is an open box next our o-box, take it!
        if(!allDaBoxes[i+1].classList.contains('clicked')){
          randoIndex=i+1;
        }
      }
      if(i>0){
        if(!allDaBoxes[i-1].classList.contains('clicked')){
          randoIndex=i-1;
        }
      }
    }
  };
  // for (var i = 1; i < emptyBoxes.length ; i++) {
  //   if(randoIndex!=null){
  //     console.log('hit for loop '+i+' times')
  //     if(allDaBoxes[allDaBoxes.indexOf(emptyBoxes[i])-1].classList.contains('o')){
  //       randoIndex = i;
  //     }
  //     if(allDaBoxes[allDaBoxes.indexOf(emptyBoxes[i])+1].classList.contains('o')){
  //       randoIndex=i;
  //     }
  //   }
  // };
  if(randoIndex===null){
    randoIndex = Math.floor(Math.random() * (emptyBoxes.length));
    return emptyBoxes[randoIndex]
  }else{
    return allDaBoxes[randoIndex];
  }
}

// √ Printing win message and removing listeners
var weWon = function(){
  for (var i = 0; i<allDaBoxes.length; i++) {
    removeListenters(allDaBoxes[i]);
  };
  if(xTime){
    window.alert('Winner is X!');          
  }else{
    window.alert('Winner is O!');
  }
}

//adding Xs and Os when clicked
var gotClicked = function(target){
  //closure!
  var toggleTime = function(){
    //only go through for empty boxes!
    if (!target.classList.contains('clicked')) {
        // √ make thay empty box an X because we clicked it
        target.textContent='X'; 
        // √ add the right color by the class
        target.classList.add('x');
        // √ make it generally clicked, for both x and o
        target.classList.add('clicked');

        // √ filter that item out of emptybox array;
        emptyBoxes=emptyBoxes.filter(isEmpty);
        // √ check if x won
        if (didWeWin('x')) {
          weWon();
        }else if(emptyBoxes.length===0){
          window.alert('TIE');
        }else{
          // √ setting to play O
          xTime=!xTime; 
          // √ playing for AI, select random element from emptyBoxes[]    
          var randomBox = findRando();
          // √ adding O
          randomBox.textContent='O';
          randomBox.classList.add('o');  
          randomBox.classList.add('clicked'); 
          if (didWeWin('o')) {
            weWon();
          };
          //set back to x
          xTime= !xTime;          
        }
    };
  }
  return toggleTime;
}

// √ adding event listeners to all boxes, where everything happens
for (var i = 0; i<allDaBoxes.length; i++) {
  makeEmListen(allDaBoxes[i]);
};





