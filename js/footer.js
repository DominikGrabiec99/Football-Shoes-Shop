const informationSpan = document.querySelector('.information__span');
const informationDiv = document.querySelector('.information__div');
const informationArrow = document.querySelector('.information__arrow ');

let informationHeight;
let wasClick = false;


document.addEventListener("DOMContentLoaded", ()=>{
    if( window.innerWidth >= 1025) return;
    informationHeight = informationDiv.clientHeight;
    informationDiv.style.height = 0 ;
})

informationSpan.addEventListener('click', () => {

    if(!wasClick){
        for(let i = 0; i <= informationHeight+10; i++){
            informationDiv.style.height = `${i}px`
        }
        wasClick = true;
    }else if(wasClick){
        for(let i = informationHeight+10; i > 0; i--){
            informationDiv.style.height = `${i}px`
            wasClick = false;
        }
    }
    informationArrow.classList.toggle('fa-sort-up')
})
