const allImages = document.querySelector('.allImages');
const containerImages = document.querySelector('.containerImages__wrapper');
const containerDots = document.querySelector('.containerImages__dots');
const imagesListAll = document.querySelector('.imagesList');
const mainInformationSex = document.querySelector('.mainInformation__sex');
const mainInformationSize = document.querySelector('.size__sizeBox');
const priceOld = document.querySelector('.price__div--old  span');
const priceNew = document.querySelector('.price__div--new span');
const titleProduct = document.querySelector('.title__span');

let carousleImages = '';
let imagesList = '';
let sexButtons = '';
let dots = '';
let product = '';
let imagesProductTable = [];
let sizeButtons = '';

//basket
const btnToBasket = document.querySelector('.rest__btn');

let table_ProductsInBasket = [];


const prevBtn = document.querySelector('#prevBtn');
const nextBtn = document.querySelector('#nextBtn');

let counter = 0;
let size = containerImages.clientWidth;


const addToBasket = function(){

    if(sizeButtons === '')return

    sizeButtons.forEach(buttonSize =>{
        if(buttonSize.classList.contains('input__active')){
            sexButtons.forEach( buttonSex =>{
                if(buttonSex.classList.contains('input__active')){
                    counterProductBasket++;
                    basketOpenOption.classList.add('basketOpen__option--active')
                    basketAccount.forEach ( element =>{
                        element.textContent = counterProductBasket
                    }  
                    )
                    creatIteminBasket(buttonSex.value ,buttonSize.value)
                }   
            })
           
        }
    })

}

const creatIteminBasket = (sex, size)=> {
    
    if(sex === 'Mężczyźni' || sex === 'Kobiety'){
        product.price = product.newPrice;
    }else{
        product.price = product.childNewPrice;
    }

    const valueWrapp =
    `
        <div class="basketOpen__item item">
            <div class="item__close" id=${counterProductBasket}>
                <div class="line1"></div>
                <div class="line2"></div>
            </div>
            <a class="item__link" href='indexPruduct.html?${product.id}'>
                <img class="item__image" src="${product.image1}" alt="">
                 <div class="item__information">
                    <span class="item__mark">${product.mark}</span>
                    <span class="item__title">${product.title}</span>
                    <span class="item__sex">${sex}</span>
                    <span class="item__size">${size}</span>
                    <span class="item__price">${product.price}zł</span>
                </div>
            </a>
        </div>
    `; 

    basketWrapp.innerHTML += valueWrapp;
    
    table_ProductsInBasket = (localStorage.getItem('productsInBasket') ? JSON.parse(localStorage.getItem('productsInBasket')) : [])
    table_ProductsInBasket.push({content: valueWrapp, id:counterProductBasket })
    localStorage.setItem('productsInBasket', JSON.stringify(table_ProductsInBasket))
}


btnToBasket.addEventListener('click', addToBasket)

document.addEventListener('DOMContentLoaded', () => {
    let idImage = location.search.substring(1);
    const shoes = new ShoesAll();

    shoes.getProducts('../js/products/allProducts.json').then( products => {
        products.forEach(item =>{
            if(item.id === idImage){
            product = item;
            titleProduct.id = product.model;
            titleProduct.setAttribute('name', product.mark)
            return product;
            }
        })

        titleProduct.textContent = product.title    

        product.sex.forEach( sex =>{
            const input = document.createElement('input')
            input.setAttribute('type', 'button');
            input.setAttribute('value', sex);
            mainInformationSex.appendChild(input)
        })

        for( let pop in product){
            if(pop.includes('image')){
                imagesProductTable.push(product[pop])
            }
        }
        
        imagesProductTable.forEach( image =>{
            const photo = document.createElement('img')
            photo.setAttribute('src', image);
            
            imagesListAll.appendChild(photo);
            
        })

        imagesProductTable.forEach( image =>{
            const photo = document.createElement('img')
            photo.setAttribute('src', image);
            
            
            allImages.appendChild(photo);

            const dot = document.createElement('div')
            dot.classList.add('dot')

            containerDots.appendChild(dot)
        })  

        sexButtons = document.querySelectorAll('.mainInformation__sex input')
        sexButtons.forEach( button =>{
            button.addEventListener('click', (e)=>{
                sexButtons.forEach( button =>{
                    button.classList.remove('input__active')
                })
                e.preventDefault();
                button.classList.add('input__active')

                if(button.value === "Mężczyźni"){
                   
                    mainInformationSize.innerHTML ='';
                    priceOld.textContent = product.price;
                    priceNew.textContent = product.newPrice;

                    product.sizeMan.forEach( size =>{
                        
                        const input = document.createElement('input')
                        input.setAttribute('type', 'button');
                        input.setAttribute('value', size);
                        mainInformationSize.appendChild(input)
                    })

                }else if(button.value === "Kobiety"){

                    mainInformationSize.innerHTML ='';
                    priceOld.textContent = product.price;
                    priceNew.textContent = product.newPrice;

                    product.sizeWoman.forEach( size =>{

                        const input = document.createElement('input')
                        input.setAttribute('type', 'button');
                        input.setAttribute('value', size);
                        mainInformationSize.appendChild(input)
                    })

                }else if(button.value === "Dzieci"){

                    mainInformationSize.innerHTML ='';
                    priceOld.textContent = product.childPrice;
                    priceNew.textContent = product.childNewPrice;

                    product.sizeChild.forEach( size =>{
                        const input = document.createElement('input')
                        input.setAttribute('type', 'button');
                        input.setAttribute('value', size);
                        mainInformationSize.appendChild(input)

                    })
                }

                sizeButtons = document.querySelectorAll('.size__sizeBox > input');

                sizeButtons.forEach(input =>{
                    input.addEventListener('click', (e)=>{
                        e.preventDefault();
                        sizeButtons.forEach( button =>{
                            button.classList.remove('input__active')
                        })
                        input.classList.add('input__active')
                    })
                })
            })


        })     

        priceOld.textContent = product.price;
        priceNew.textContent = product.newPrice;
          
        carousleImages = document.querySelectorAll('.allImages img');
        imagesList = document.querySelectorAll('.containerImages__imagesList img');

        imagesList.forEach( (image, index) =>{
            image.addEventListener('click', () => {
                imagesList.forEach( image =>  image.style.borderBottom = 'none')
                counter = index;
                allImages.style.transition = `all 0.4s ease-in-out`;
                allImages.style.transform = `translateX(${-size * counter}px)`;
                image.style.borderBottom = '4px solid rgb(66, 170, 66)'
            })
        })
        dots = document.querySelectorAll('.dot');
        dots.forEach( (dot, index) =>{
            dot.addEventListener('click', () => {
                counter = index;
                allImages.style.transition = `all 0.4s ease-in-out`;
                allImages.style.transform = `translateX(${-size * counter}px)`;
            })
        })
    })
})

nextBtn.addEventListener('click', ()=>{
    if(counter >= carousleImages.length -1 ) return;
    allImages.style.transition = `all 0.4s ease-in-out`;
    counter++;
    allImages.style.transform = `translateX(${-size * counter}px)`;

    imagesList.forEach( image =>  image.style.borderBottom = 'none');
    imagesList[counter].style.borderBottom = '4px solid rgb(66, 170, 66)';
})

prevBtn.addEventListener('click', ()=>{
    if(counter <= 0 ) return;
    allImages.style.transition = `all 0.4s ease-in-out`;
    counter--;
    allImages.style.transform = `translateX(${-size * counter}px)`;

    imagesList.forEach( image =>  image.style.borderBottom = 'none');
    imagesList[counter].style.borderBottom = '4px solid rgb(66, 170, 66)';
})