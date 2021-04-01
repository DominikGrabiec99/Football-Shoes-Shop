const filtreSpan = document.querySelector('.filter__title');
const filter = document.querySelector('.filter');
const filterWrapp = document.querySelector('.filter__wrapp');
const filterTilte = document.querySelector('.filter__title');
const wrappClose = document.querySelector('.wrapp__close');
const froms = document.querySelectorAll('form');
const formSexInput = document.querySelectorAll('.formSex > input');
const wrappFilterSpans = document.querySelectorAll('.filterNameSpan');
let sizeWindow = window.innerWidth;

const inputsFilter = document.querySelectorAll('.filter input')

const openFiltrPC = function(){

    wrappFilterSpans.forEach((wrappSpan, indexWrappSpan)=>{

    wrappSpan.addEventListener('click', function(){
        if( sizeWindow < 1000 ) return;

        wrappFilterSpans.forEach( (span, indexSpan) => {
            if(indexSpan === indexWrappSpan) {
                
            }else{
                span.classList.remove('span__active')
                span.parentNode.nextElementSibling.classList.remove('div__active')
                span.parentNode.nextElementSibling.childNodes[1].classList.remove('form__active')
            }
        })

        wrappSpan.classList.toggle('span__active')
        wrappSpan.parentNode.nextElementSibling.classList.toggle('div__active')
        wrappSpan.parentNode.nextElementSibling.childNodes[1].classList.toggle('form__active')
        })
    })
}

openFiltrPC();

const toggleFilter = ()=>{
    filter.classList.toggle('filter--active')
    filterWrapp.classList.toggle('filter__wrapp--active')
    filterTilte.classList.toggle('filter__title--active')
    wrappClose.classList.toggle('wrapp__close--active')
}

formSexInput.forEach((input, index)=>{
    input.addEventListener('click', function(){
        formSexInput.forEach((inputIn, indexIn) =>{
            if(index !== indexIn) inputIn.checked=false;
        })
    })
})

filtreSpan.addEventListener('click', toggleFilter)

wrappClose.addEventListener('click', toggleFilter)

window.addEventListener('resize', () =>{
    sizeWindow = window.innerWidth;
    if(window.innerWidth > 999){
        filter.classList.remove('filter--active')
        filterWrapp.classList.remove('filter__wrapp--active')
        filterTilte.classList.remove('filter__title--active')
        wrappClose.classList.remove('wrapp__close--active')
    }
})