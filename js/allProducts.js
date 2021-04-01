const productList = document.querySelector('.productList');
const sortTitle = document.querySelector('.titleSort__title');
const sortOptions = document.querySelector('.sort__options');
const optionsButtons = document.querySelectorAll('.formSort > button');
const filtrsAll = [];
let productsAll = [];
let productsHelpAll =[];

const chnageProductList = () =>{
    productsHelpAll = [];
    let wasFiltre = false;
    if(filtrsAll.length === 0){
        productsHelpAll= productsAll;
    }else{

    let typyfiltrow = ["size", "sex", "color", "mark", "model"];

    typyfiltrow.forEach( typfiltr =>{
        let konkretnefiltry = [];
        filtrsAll.forEach(filtr =>{
            if(filtr.dataset.type === typfiltr){
                konkretnefiltry.push(filtr.value);
            }
        })
        if(konkretnefiltry.length !==  0){
        if(!wasFiltre){
            productsAll.forEach( product => {
                konkretnefiltry.forEach( konkretnyfiltr =>{
                    if(typfiltr == 'size'){
                        if(product[typfiltr].includes(parseInt(konkretnyfiltr))){
                            if(!productsHelpAll.includes(product)){
                                productsHelpAll.push(product)
                            }
                        }
                    }else if(typfiltr == 'sex'){
                        if(product[typfiltr].includes(konkretnyfiltr)){
                            if(!productsHelpAll.includes(product)){
                                productsHelpAll.push(product)
                            }
                        }
                    }else{
                        if(product[typfiltr].toUpperCase() === konkretnyfiltr.toUpperCase()){
                            productsHelpAll.push(product)
                        }
                    }
                })
            })
        }else{
            let pomocniczatablica =[];
            productsHelpAll.forEach( product => {
                konkretnefiltry.forEach( konkretnyfiltr =>{

                    if(typfiltr == 'size'){
                        if(product[typfiltr].includes(parseInt(konkretnyfiltr))){
                            if(!pomocniczatablica.includes(product)){
                                pomocniczatablica.push(product)
                            }
                        }
                    }else if(typfiltr == 'sex'){
                        if(product[typfiltr].includes(konkretnyfiltr)){
                            if(!pomocniczatablica.includes(product)){
                                pomocniczatablica.push(product)
                            }
                        }
                    }else{
                        if(product[typfiltr].toUpperCase() === konkretnyfiltr.toUpperCase()){
                            pomocniczatablica.push(product)
                        }
                    }                    
                })
            })
            productsHelpAll = pomocniczatablica;
        }
            wasFiltre=true;
        }
    })
    }
}

const inputChecked = function(){

    if(this.checked){

        filtrsAll.push(this)

    }else if( this.checked == false){  

        const index = filtrsAll.findIndex( (element) => {return element === this})
        filtrsAll.splice(index,1)
    }

    chnageProductList()

    if(productsHelpAll.length === 0){
        productList.innerHTML = '<dvi style="margin-top: 2rem">Nie znalezionow butów z szukanym wynikiem </div>'
        productList.style.display='block';
    }else{
        productList.style.display='grid';
        const shoes = new ShoesAll();
        productsHelpAll.forEach(product =>{
            shoes.displayProducts(product,productList);   
        })
    }

}

const sortProducts = function(event){
    event.preventDefault();
    if(this.classList.value === 'formSort__lowPrice'){

        productsHelpAll.sort((productA, productB)=>{
            if(document.querySelector('#formSex__child').checked){
                return productA.childNewPrice - productB.childNewPrice
            }else{
                return productA.newPrice - productB.newPrice
            }
        })

    }else if(this.classList.value === 'formSort__heightPrice'){

        productsHelpAll.sort((productA, productB)=>{
            if(document.querySelector('#formSex__child').checked){
                return productB.childNewPrice - productA.childNewPrice
            }else{
                return productB.newPrice - productA.newPrice
            }
        })

    }else if(this.classList.value === 'formeSort__alphabetA'){

        productsHelpAll.sort((productA, productB)=>{
            let titleA = productA.title.toUpperCase(); 
            let titleB = productB.title.toUpperCase();
            if (titleA < titleB) {
                return -1;
            }
            if (titleA > titleB) {
                return 1;
            }
            return 0;
        })

    }else if(this.classList.value === 'formSort__alphabetZ'){

        productsHelpAll.sort((productA, productB)=>{
            let titleA = productA.title.toUpperCase(); 
            let titleB = productB.title.toUpperCase();
            if (titleA > titleB) {
                return -1;
            }
            if (titleA < titleB) {
                return 1;
            }
            return 0;
        })

    }
    const shoes = new ShoesAll();
    productsHelpAll.forEach(product =>{
        shoes.displayProducts(product,productList);   
    })
    sortOptions.classList.toggle('sort__options--active')
}

sortTitle.addEventListener('click', ()=>{
    sortOptions.classList.toggle('sort__options--active')
})

optionsButtons.forEach(button =>{
    button.addEventListener('click', sortProducts)
})

inputsAll.forEach( input =>{
    input.addEventListener('click', inputChecked)
})

document.addEventListener("DOMContentLoaded", function(){
    
    const shoes = new ShoesAll();
    shoes.getProducts('../js/products/allProducts.json').then( products => {
            productsAll = products;

            inputsAll.forEach( input =>{
                if(input.checked) filtrsAll.push(input);
            })
            chnageProductList()

        productsHelpAll.forEach(product =>{
            shoes.displayProducts(product,productList);   
        })
    })
})