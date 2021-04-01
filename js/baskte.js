const basket = document.querySelector('.basket');
const basketOpen = document.querySelector('.basketOpen');
const i_basketOpenClose = document.querySelector('.basketOpen__close > i')
const basketWrapp = document.querySelector('.basketOpen__wrapp');
let itemClose = document.querySelectorAll('.item__close');
const basketAccount = document.querySelectorAll('.basket__value');
const basketOpenOption = document.querySelector('.basketOpen__option a');

let counterProductBasket ='';
let tableLocalProducts = []


const removeProductInBasket = function(){
    const parentItem = this.parentElement;
    counterProductBasket--;
    tableLocalProducts = (localStorage.getItem('productsInBasket') ? JSON.parse(localStorage.getItem('productsInBasket')) : []);

    let arr= [].slice.call(parentItem.parentElement.children);

    arr.forEach((child, index) =>{
        if(parentItem === child){
            tableLocalProducts.splice(index , 1)
        }
    })

    localStorage.setItem('productsInBasket', JSON.stringify(tableLocalProducts))

    basketWrapp.removeChild(parentItem)

    if(counterProductBasket === 0 ){
        basketOpen.classList.remove('basketOpen--active')
        basketOpenOption.classList.remove('basketOpen__option--active')
    }

    basketAccount.forEach ( element =>{
        element.textContent = counterProductBasket
    })
}

basket.addEventListener( 'click', ()=>{
    basketOpen.classList.toggle('basketOpen--active')
    itemClose = document.querySelectorAll('.item__close')

    itemClose.forEach (item =>{
        item.addEventListener('click', removeProductInBasket)
    })
})

i_basketOpenClose.addEventListener( 'click', ()=>{
    basketOpen.classList.remove('basketOpen--active')
})

document.addEventListener('DOMContentLoaded', () => {
    // localStorage.setItem('productsInBasket', "")
    tableLocalProducts = (localStorage.getItem('productsInBasket') ? JSON.parse(localStorage.getItem('productsInBasket')) : []);
    
    tableLocalProducts.forEach( product =>{
        basketWrapp.innerHTML += product.content;
    })

    basketAccount.forEach ( element =>{
        counterProductBasket = tableLocalProducts.length;
        element.textContent = counterProductBasket;
    })

    if(tableLocalProducts.length !== 0){
        basketOpenOption.classList.add('basketOpen__option--active')
    }
    

})