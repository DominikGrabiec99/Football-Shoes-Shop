const bestsellerBox = document.querySelector('.bestseller__box');
const arrowLeftBestseller = document.querySelector('.bestseller__arrow--left');
const arrowRightBestseller = document.querySelector('.bestseller__arrow--right');
let productsLenght;
let productsBox;
let transformBox = 0;
let counterBestseller;
let productOnPage;

let cloneItemsEnd = [];
let cloneItemsStart = [];
let minusLenghtBox;
let clickBestseller = false;


const moveOneLeft = ()=>{
    productsBox = document.querySelectorAll('.box__product');

    if(counterBestseller <= 0) return

    productsLenght = productsBox[0].offsetWidth;
    counterBestseller--;
    transformBox=counterBestseller * productsLenght;
    bestsellerBox.style.transition = `all 0.4s ease-in-out 0s`;
    bestsellerBox.style.transform =`translateX(${-transformBox}px)`
}

const moveOneRight = async()=>{
    productsBox = document.querySelectorAll('.box__product');

    if(counterBestseller >= productsBox.length - productOnPage-1) return

    productsLenght = productsBox[0].offsetWidth;
    counterBestseller++;
    transformBox=counterBestseller * productsLenght;
    bestsellerBox.style.transition = `all 0.4s ease-in-out 0s`;
    bestsellerBox.style.transform =`translateX(${-transformBox}px)`
}

const resizeWindow = ()=>{

    document.querySelectorAll('.clone').forEach(item => bestsellerBox.removeChild(item));

    if(window.innerWidth < 500){
        for(let i =0; i < 1; i++){
            bestsellerBox.appendChild(cloneItemsStart[i])
        }

        for(let i =0; i > -1; i--){
            bestsellerBox.insertBefore(cloneItemsEnd[i], productsBox[0])
        }
        counterBestseller = 1;
        minusLenghtBox = 1;
    }else if(window.innerWidth < 800){
        for(let i =0; i < 2; i++){
            bestsellerBox.appendChild(cloneItemsStart[i])
        }

        for(let i = 1; i >  -1; i--){
            bestsellerBox.insertBefore(cloneItemsEnd[i], productsBox[0])
        }

        counterBestseller = 2;
        minusLenghtBox = 2;
    }else if(window.innerWidth < 1000){
        for(let i =0; i < 3; i++){
            bestsellerBox.appendChild(cloneItemsStart[i])
        }

        for(let i = 2; i > -1; i--){
            bestsellerBox.insertBefore(cloneItemsEnd[i], productsBox[0])
        }
        counterBestseller = 3;
        minusLenghtBox = 3;
    }else if(window.innerWidth < 1300){
        for(let i =0; i < 4; i++){
            bestsellerBox.appendChild(cloneItemsStart[i])
        }

        for(let i = 3; i > -1; i--){
            bestsellerBox.insertBefore(cloneItemsEnd[i], productsBox[0])
        }
        counterBestseller = 4;
        minusLenghtBox = 4;
    }else{
        for(let i =0; i < 5; i++){
            bestsellerBox.appendChild(cloneItemsStart[i]);
            
        }

        for(let i =4; i > -1; i--){
            bestsellerBox.insertBefore(cloneItemsEnd[i], productsBox[0])
        }
        counterBestseller = 5;
        minusLenghtBox = 5;
    
    }
    checkProductOnPage()   
}

const checkProductOnPage =()=>{
    if(window.innerWidth < 500){
       productOnPage=0
    }else if(window.innerWidth < 800){
      productOnPage=1;
    }else if(window.innerWidth < 1000){
       productOnPage=2
    }else if(window.innerWidth < 1300){
       productOnPage=3
    }else{
       productOnPage=4
    }
}

document.addEventListener("DOMContentLoaded", function(){
    const shoes = new ShoesAll();
    shoes.getProducts('../js/products/bestseller.json').then(products => {
        products.forEach(product =>{
        shoes.displayProductsIndex(product,bestsellerBox);   
        })
    })
    .then(()=>{
        productsBox = document.querySelectorAll('.box__product');
        productsLenght = productsBox[0].offsetWidth;
        
        cloneItemsStart = [productsBox[0].cloneNode(true), productsBox[1].cloneNode(true), productsBox[2].cloneNode(true), productsBox[3].cloneNode(true),productsBox[4].cloneNode(true),];
        cloneItemsEnd = [productsBox[productsBox.length-1].cloneNode(true), productsBox[productsBox.length-2].cloneNode(true), productsBox[productsBox.length-3].cloneNode(true), productsBox[productsBox.length-4].cloneNode(true),productsBox[productsBox.length-5].cloneNode(true)];

        cloneItemsEnd.forEach(item =>{
            item.classList.add('lastClone')
        })
        cloneItemsStart.forEach(item =>{
            item.classList.add('firstClone')
        })
        resizeWindow();
        bestsellerBox.style.transform = `translateX(${-productsLenght * counterBestseller}px)`;

    })
})

const transitionBox = ()=>{
    if(productsBox[counterBestseller + productOnPage].classList.contains('lastClone')){
        bestsellerBox.style.transition = `none`;
        counterBestseller = productsBox.length - minusLenghtBox*2;
        bestsellerBox.style.transform = `translateX(${-productsLenght * counterBestseller}px)`;
    }if(productsBox[counterBestseller].classList.contains('firstClone')){
        bestsellerBox.style.transition = `none`;
        counterBestseller = productsBox.length - counterBestseller;
        bestsellerBox.style.transform = `translateX(${-productsLenght * (counterBestseller)}px)`;
    }
}

setInterval(async ()=>{
    if(clickBestseller){
        clickBestseller = false;
        return
    }
    moveOneRight();
}, 6000)

arrowLeftBestseller.addEventListener('click', moveOneLeft)
arrowRightBestseller.addEventListener('click', moveOneRight)

bestsellerBox.addEventListener('transitionend' ,transitionBox)
window.addEventListener('resize', resizeWindow)