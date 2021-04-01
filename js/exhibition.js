const exhibition = document.querySelector('.wrapp__exhibition');
const arrowLeft = document.querySelector('.wrapp__arrow--left');
const arrowRight = document.querySelector('.wrapp__arrow--right');
const wrapp = document.querySelector('.wrapp')

let moving = false;
let mouseLastPosition = 0;
let transform = 0;
let lastPageX = 0
let transformValue = null

document.addEventListener("DOMContentLoaded", ()=>{
    const shoes = new ShoesAll();
    shoes.getProducts('../js/products/exhibition.json').then(products => {
        products.forEach(product =>{
        shoes.displayProductsIndex(product,exhibition);   
        })
    })
})

const mobileToutchStart = (e) =>{
    if(window.innerWidth > 1125) return;
    moving =true;
    mouseLastPosition = e.pageX;
    transform = window.getComputedStyle(exhibition).getPropertyValue('transform') != 'none' ?  parseInt(window.getComputedStyle(exhibition).getPropertyValue('transform').split(',')[4].trim()) : 0;
}

const mobileToutchMove = (e) =>{
    if(!moving) return;
    const currentPosition = e.pageX;

   const position = currentPosition - mouseLastPosition;
   transformValue = transform + position
   if(e.pageX - lastPageX >= 0){
        if(transformValue > 0 || transformValue === 0){
            return
        }
   }
   if(Math.abs(transformValue) > exhibition.offsetWidth - wrapp.offsetWidth){
        return;
   }
   exhibition.style.transform = `translateX(${transformValue}px)`;
}

const mobileToutchEnd = () =>{
    moving =false;
}

let arrowMove = true;
let account = 0; 
let lengthTransform = 0;

const moveLeft = function(){

    if(lengthTransform === exhibition.offsetWidth){
         lengthTransform -= wrapp.offsetWidth
    }
     
    if(lengthTransform <= 0){
        exhibition.style.transform = `translateX(${0}px)`;
    }else{
        lengthTransform -= wrapp.offsetWidth
        exhibition.style.transform = `translateX(-${lengthTransform}px)`;
    }
    if(lengthTransform%exhibition.offsetWidth<0){
        exhibition.style.transform = `translateX(${0}px)`;
    }

}

const moveRight = function(){
    if(lengthTransform < exhibition.offsetWidth && exhibition.offsetWidth - lengthTransform >wrapp.offsetWidth){
        lengthTransform += wrapp.offsetWidth;
        exhibition.style.transform = `translateX(-${lengthTransform}px)`;
    }else{
        exhibition.style.transform = `translateX(-${exhibition.offsetWidth - wrapp.offsetWidth}px)`;
        lengthTransform = exhibition.offsetWidth;
    }

    if(exhibition.offsetWidth - lengthTransform < wrapp.offsetWidth){
        exhibition.style.transform = `translateX(-${exhibition.offsetWidth - wrapp.offsetWidth}px)`;
        lengthTransform = exhibition.offsetWidth;
    }
}

if(window.PointerEvent){
    exhibition.addEventListener('pointerdown',mobileToutchStart);

    exhibition.addEventListener('pointermove', mobileToutchMove);

    exhibition.addEventListener('pointerup', mobileToutchEnd);
}
arrowLeft.addEventListener('click', moveLeft)
arrowRight.addEventListener('click', moveRight)
// else{
//         exhibition.addEventListener('touchdown',gestureStart);

//         exhibition.addEventListener('touchmove', gestureMove);

//         exhibition.addEventListener('touchup', gestureEnd);

//         exhibition.addEventListener('mousedown',gestureStart);

//         exhibition.addEventListener('mousemove', gestureMove);

//         exhibition.addEventListener('mouseup', gestureEnd);
// }




