const searchInput = document.querySelector('.search__input');
const resultsSearch = document.querySelector('.result');
const closeResaultI = document.querySelector('.search__i')

let productsALlSearch = []

document.addEventListener("DOMContentLoaded", function(){
    const shoes = new ShoesAll();
    shoes.getProducts('../js/products/allProducts.json').then( products => {
        productsALlSearch = products;
    })
})

searchInput.addEventListener('input', (e)=>{
    resultsSearch.innerHTML = '';

    if(e.target.value.length < 3) return; 

    closeResaultI.style.display = 'block'

    let counterSearchPrduct = 0;

    productsALlSearch.forEach(product =>{

       if(counterSearchPrduct === 4) return;

       product.title = product.title.toUpperCase();

       if(product.title.includes(e.target.value.toUpperCase())){
            resultsSearch.innerHTML += `
            <a href='indexPruduct.html?${product.id}'>
                <img class="result__image" src="${product.image1}" alt="">
                <div class="result__information">
                    <span class="result__mark">${product.mark}</span>
                    <span class="result__title">${product.title}</span>
                    <span class="result__price">${product.newPrice}zł</span>
                </div>
            </a>
            `
        counterSearchPrduct++;
       }
   })
})

searchInput.addEventListener('focus', ()=>{
    resultsSearch.style.height = 'auto';
})

closeResaultI.addEventListener('click', () =>{
    searchInput.value = '';
    resultsSearch.innerHTML = '';
    closeResaultI.style.display = 'none';
})

document.body.addEventListener('click', (e)=>{
    if(e.target == searchInput) return
    resultsSearch.style.height = '0';
    resultsSearch.style.overflow = 'hidden'
})