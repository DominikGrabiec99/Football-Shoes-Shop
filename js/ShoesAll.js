class ShoesAll{
    constructor(){
       this.result = '';
    }

    async getProducts(plik){
        try{
            let result = await fetch(plik);
            let data = await result.json();
            this.products = await data.items;
            this.products = this.products.map(item =>{
                const {mark, model, title, sex, color, sizeMan, sizeWoman,sizeChild, price, newPrice, childPrice, childNewPrice} = item.fields;
                const {id} = item.sys;
                const image1 = item.fields.image.fields.file1.url;
                const image2 = item.fields.image.fields.file2.url;
                const image3 = item.fields.image.fields.file3.url;
                const image4 = item.fields.image.fields.file4.url;
                const image5 = item.fields.image.fields.file5.url;
                const size = [...sizeChild, ...sizeMan, ...sizeWoman]
                return {id,mark, model, title, sex, color, sizeMan, sizeWoman,sizeChild, price, newPrice, childPrice, childNewPrice, image1,image2,image3,image4,image5, size}
            })
            return this.products;
        }catch(error){
            console.log(error)
        }
    }

    displayProducts(product, className){
        if(document.querySelector('#formSex__child').checked){
            this.result+=`
                <a class="${className.classList.item(1)}__product product" href="indexPruduct.html?${product.id}" id="${product.id}">
                    <div class="product__img-container">
                        <img src=${product.image1} class="product-img">
                    </div>
                    <div class="product__informations">
                        <h3 class="product__mark">${product.mark}</h3>
                        <h3 class="product__title">${product.title}</h3>
                        <h4 class="product__price"><span class="price__old">${product.childPrice}zł</span><span class="price__new">${product.childNewPrice}zł</span></h4>
                    </div>
                    <div class="product__discant">${Math.floor(100 - (product.newPrice/product.price)*100)}%</div>
                </a>
            `;
        }else{

            this.result+=`
                <a class="${className.classList.item(1)}__product product" href="indexPruduct.html?${product.id}" id="${product.id}">
                    <div class="product__img-container">
                        <img src=${product.image1} class="product-img">
                    </div>
                    <div class="product__informations">
                        <h3 class="product__mark">${product.mark}</h3>
                        <h3 class="product__title">${product.title}</h3>
                        <h4 class="product__price"><span class="price__old">${product.price}zł</span><span class="price__new">${product.newPrice}zł</span></h4>
                    </div>
                    <div class="product__discant">${Math.floor(100 - (product.newPrice/product.price)*100)}%</div>
                </a>
            `;
        }
        className.innerHTML = this.result;
    }

    displayProductsIndex(product, className){
            this.result+=`
              <a class="${className.classList.item(1)}__product product" href="indexPruduct.html?${product.id}" id="${product.id}">
                <div class="product__img-container">
                    <img src=${product.image1} class="product-img">
                </div>
                <h3 class="product__mark">${product.mark}</h3>
                <h3 class="product__title">${product.title}</h3>
                <h4 class="product__price">${product.newPrice} zł</h4>
            </a>
            `;
        className.innerHTML = this.result;
    }
}