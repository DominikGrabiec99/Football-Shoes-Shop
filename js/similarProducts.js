const cotainerPrduct = document.querySelector('.cotainerPrduct__box');
const arrowLeftBestseller = document.querySelector('.cotainerPrduct__arrow--left');
const arrowRightBestseller = document.querySelector('.cotainerPrduct__arrow--right');
const titleProductID = document.querySelector('.title__span');
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
    cotainerPrduct.style.transition = `all 0.4s ease-in-out 0s`;
    cotainerPrduct.style.transform =`translateX(${-transformBox}px)`
}

const moveOneRight = async()=>{
    productsBox = document.querySelectorAll('.box__product');

    if(counterBestseller >= productsBox.length - productOnPage-1) return

    productsLenght = productsBox[0].offsetWidth;
    counterBestseller++;
    transformBox=counterBestseller * productsLenght;
    cotainerPrduct.style.transition = `all 0.4s ease-in-out 0s`;
    cotainerPrduct.style.transform =`translateX(${-transformBox}px)`
}

const resizeWindow = ()=>{

    document.querySelectorAll('.clone').forEach(item => cotainerPrduct.removeChild(item));

    if(window.innerWidth < 500){
        for(let i =0; i < 1; i++){
            cotainerPrduct.appendChild(cloneItemsStart[i])
        }

        for(let i =0; i > -1; i--){
            cotainerPrduct.insertBefore(cloneItemsEnd[i], productsBox[0])
        }
        counterBestseller = 1;
        minusLenghtBox = 1;
    }else if(window.innerWidth < 800){
        for(let i =0; i < 2; i++){
            cotainerPrduct.appendChild(cloneItemsStart[i])
        }

        for(let i = 1; i >  -1; i--){
            cotainerPrduct.insertBefore(cloneItemsEnd[i], productsBox[0])
        }

        counterBestseller = 2;
        minusLenghtBox = 2;
    }else if(window.innerWidth < 1000){
        for(let i =0; i < 3; i++){
            cotainerPrduct.appendChild(cloneItemsStart[i])
        }

        for(let i = 2; i > -1; i--){
            cotainerPrduct.insertBefore(cloneItemsEnd[i], productsBox[0])
        }
        counterBestseller = 3;
        minusLenghtBox = 3;
    }else if(window.innerWidth < 1300){
        for(let i =0; i < 4; i++){
            cotainerPrduct.appendChild(cloneItemsStart[i])
        }

        for(let i = 3; i > -1; i--){
            cotainerPrduct.insertBefore(cloneItemsEnd[i], productsBox[0])
        }
        counterBestseller = 4;
        minusLenghtBox = 4;
    }else{
        for(let i =0; i < 5; i++){
            cotainerPrduct.appendChild(cloneItemsStart[i]);
            
        }

        for(let i =4; i > -1; i--){
            cotainerPrduct.insertBefore(cloneItemsEnd[i], productsBox[0])
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
    shoes.getProducts('../js/products/allProducts.json').then(products => {
        let counter = 0;
        products.forEach(product =>{
            if(titleProductID.getAttribute('name').toUpperCase() === 'NewBalance'.toUpperCase() 
            || titleProductID.id.toUpperCase() === 'Tiempo'.toUpperCase()
            || titleProductID.id.toUpperCase() === 'WorldCup'.toUpperCase()
            || titleProductID.id.toUpperCase() === 'X'.toUpperCase()
            || titleProductID.id.toUpperCase() === 'King'.toUpperCase()
            || titleProductID.id.toUpperCase() === 'One'.toUpperCase()
            || titleProductID.id.toUpperCase() === 'Ultra'.toUpperCase()
            ){
                if(counter >= 6) return;
               
                if(product.mark.toUpperCase() === titleProductID.getAttribute('name').toUpperCase()){
                        counter++;
                        shoes.displayProductsIndex(product,cotainerPrduct);  
                } 
            }else{
                if(product.model.toUpperCase() === titleProductID.id.toUpperCase()){
                    if(counter >= 6) return;
                    counter++;
                    shoes.displayProductsIndex(product,cotainerPrduct);  
                } 
            }
        })
    })
    .then(()=>{
        productsBox = document.querySelectorAll('.box__product');
        productsLenght = productsBox[0].offsetWidth;
        
        cloneItemsStart = [productsBox[0].cloneNode(true), productsBox[1].cloneNode(true), productsBox[2].cloneNode(true), productsBox[3].cloneNode(true),productsBox[4].cloneNode(true)];
        cloneItemsEnd = [productsBox[productsBox.length-1].cloneNode(true), productsBox[productsBox.length-2].cloneNode(true), productsBox[productsBox.length-3].cloneNode(true), productsBox[productsBox.length-4].cloneNode(true),productsBox[productsBox.length-5].cloneNode(true)];

        cloneItemsEnd.forEach(item =>{
            item.classList.add('lastClone')
        })
        cloneItemsStart.forEach(item =>{
            item.classList.add('firstClone')
        })
        resizeWindow();
        cotainerPrduct.style.transform = `translateX(${-productsLenght * counterBestseller}px)`;

    })
})

const transitionBox = ()=>{
    if(productsBox[counterBestseller + productOnPage].classList.contains('lastClone')){
        cotainerPrduct.style.transition = `none`;
        counterBestseller = productsBox.length - minusLenghtBox*2;
        cotainerPrduct.style.transform = `translateX(${-productsLenght * counterBestseller}px)`;
    }if(productsBox[counterBestseller].classList.contains('firstClone')){
        cotainerPrduct.style.transition = `none`;
        counterBestseller = productsBox.length - counterBestseller;
        cotainerPrduct.style.transform = `translateX(${-productsLenght * (counterBestseller)}px)`;
    }
}

arrowLeftBestseller.addEventListener('click', moveOneLeft)
arrowRightBestseller.addEventListener('click', moveOneRight)

cotainerPrduct.addEventListener('transitionend' ,transitionBox)
window.addEventListener('resize', resizeWindow)