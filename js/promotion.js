const counter = document.querySelector('.time__counter');
const buttonCheck = document.querySelector('.price__check');
const dateEnd = new Date('2021-07-22');
let seconds = 0;
let minutes = 0;
let hours = 0;
let day = 0;

const counterTime = () => {
    const date = new Date();
    if(dateEnd.getTime() < date.getTime()) {
        counter.innerHTML = '00:00:00';
        clearInterval(timeInterval);
        return;
    }
    let time = Math.floor((dateEnd.getTime() - date.getTime())/1000)
    hours = Math.floor(time/60/60);
    minutes = Math.floor((time - hours *60 *60)/60);
    seconds = Math.floor((time - hours* 60 *60 - minutes *60 ));

    if(hours<10) hours='0'+hours;
    if(minutes<10) minutes='0'+minutes;
    if(seconds<10) seconds='0'+seconds;
    if(hours > 99) {
        day = Math.floor(hours/24);
        hours%=24;
         if(hours<10) hours='0'+hours;
        counter.innerHTML = `${day}:${hours}:${minutes}:${seconds}`;
    }else{
        counter.innerHTML = `${hours}:${minutes}:${seconds}`;
    }
}

const animationButton = () =>{
    buttonCheck.style.animation = 'buttonMovement 0.6s ease 0s infinite alternate';
    setTimeout(function(){
        buttonCheck.style.animation = '';
    },1000)
}

setInterval(animationButton, 5500)

const timeInterval = setInterval(counterTime, 1000)
