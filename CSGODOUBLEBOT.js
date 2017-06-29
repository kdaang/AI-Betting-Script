var past = document.getElementById('past');//element of the past rolls
var balance = parseInt(document.getElementById('balance').innerHTML);//current balance
var betcount = 1;
var time = document.lastModified;
console.log(betcount + ") " + time); 
console.log("Current Balance: " + balance);	
var panelred = document.getElementById('panel1-7');//red side element
var panelredbox = document.getElementById('panel1-7').childNodes[1].childNodes[1];//red clicker box
var panelblack = document.getElementById('panel8-14');//black side element
var panelblackbox = document.getElementById('panel8-14').childNodes[1].childNodes[1];//black clicker box
var panel;//the panel that is going to be chosen
var panelbox;//panelbox that is going to be chosen
var colour;//know I won from which panel
var randnum;//holds the random number for the panel
var betin;//number displayed when bet is in
var win = true; //know when to double on next or not
var rednum = new Array(1,2,3,4,5,6,7);//numbers of red
var blacknum = new Array(8,9,10,11,12,13,14);//numbers of black
var winnum;//winning number
var basebet = 25;//base bet of coins
var betamount;//the amount of coins to bet 
var betvalue = document.getElementById('betAmount');;//place of field to put bet 
var pastbetnum = past.lastChild.getAttribute('data-rollid');//get the current roll number
pastbetnum = parseInt(pastbetnum);
var num;//used to compare with pastbetnum to know when roll is over
var losestreak = new Array(0,0);//get the longest lose streak
var streak = 0;//temporary var to get streak
var betwin = 0;
var chatArea = document.getElementById('chatArea');
var loststatus = "<i>Connection lost...</i>";

runner();//start the program

function runner(){//main program
	checkstatus();
	betvalue.value = "";//reset bet field to 0
	if(win === true){//if won last roll
		betamount = basebet;//sets to basebet 1
	}
	else{//if lost last roll
		betamount *= 2;//lose then times betvalue by 2
	}
	choosepanel();
	betvalue.value = betamount;//put betamount in
	panelbox.click();//enter bet
	win = false;//reset win to false 
	checkbetin(coinsin, betamount);//check if betamount is in
}
function checkstatus(){
	var status = chatArea.lastChild.innerHTML;
	if(status === loststatus){
		console.log("RELOADED");
		setTimeout(function(){runner();}, 2000);
		location.reload(true);
	}
}
function choosepanel(){
	randnum = Math.random();
	if(randnum < 0.5){
		panel = panelred;
		panelbox = panelredbox;
		colour = "RED";
	}
	else{
		panel = panelblack;
		panelbox = panelblackbox;
		colour = "BLACK"
	}
}
function checkbetin(test, expectedvalue){
	if(test() === expectedvalue){//true if my bet is in
		console.log("Bet is in " + colour + "! -" + betamount);
		checkifrolled(lastrolledid, pastbetnum + 1);	//run second part of program
		betcount += 1;
	}
	else{
		betvalue.value = "";//rest bet field to 0
		betvalue.value = betamount;//put betvalue in
		panelbox.click();//enter bet
		setTimeout(function(){checkbetin(test, expectedvalue);}, 3000);//checks if bet is in again after 3 sec
    }	
}
function coinsin(){//returns the number of coins i betted in
	betin = panel.childNodes[3].childNodes[1].childNodes[1].innerHTML;//number of coins in
	betin = parseInt(betin);
	return betin;
}
function checkifrolled(test, expectedvalue){//check if rolled
  if(test() === expectedvalue){//if rolled go to checkwin
    checkwin();//go to checkwin
  }
  else{
	setTimeout(function(){checkifrolled(test, expectedvalue);}, 3000);//check if rolled again after 3 sec
  }
}
function lastrolledid(){//returns the last rollid
  num = past.lastChild.getAttribute('data-rollid');//get rollid
  num = parseInt(num);
  return num;
}
function checkwin(){//final part of program
    winnum = past.lastChild.innerHTML;//get the number rolled
    winnum = parseInt(winnum);
	if(panel === panelred){//if bet on red
		for(var x = 1; x <=7; x++){//if number rolled is between 1-7 i win
			if(winnum === x){
				win = true;
				break;
			}
		}
	}
	else{//if bet on black
		for(var x = 8; x <= 14; x++){//if number rolled is between 8-14 i win
			if(winnum === x){
				win = true;
				break;
			}
		}
	}
	pastbetnum = num;//change to the new rollid
	if(win === true){
		console.log(colour + " WON! +" + betamount);
		streak = 0;//reset streak
		betwin += 1;
	}
	else{
		console.log(colour + " LOST! -" + betamount);
		streak += 1;//streak of losing
		if (streak == losestreak[0]){
			losestreak[1]++;
		}
		else if(losestreak[0] < streak){
			losestreak[0] = streak;//holds the longest lose streak
			losestreak[1] = 1;
		}
	}
	console.log("# of wins: " + betwin);
	console.log("Longest Lose Streak: " + losestreak[0] + " x" + losestreak[1]);
	console.log("\n");
	balance = parseInt(document.getElementById('balance').innerHTML);
	time = document.lastModified;
	console.log(betcount + ") " + time);
	console.log("Current Balance: " + balance);
	runner();//loop back to beginning to repeat
}
