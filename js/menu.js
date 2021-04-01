const burger = document.querySelector('.burger');
const menuPhone = document.querySelector('.menuContainer');

const arrows = document.querySelectorAll('.mainLi__arrow');

const openMenu = ()=>{
    menuPhone.classList.toggle('menuContainer--active');
    burger.classList.toggle('burger-active');

}

const openMenuChild = function(){
    this.parentNode.parentNode.childNodes[3].classList.toggle('mainLi__div--active')
    this.parentNode.parentNode.childNodes[1].childNodes[1].classList.toggle('active')
    this.classList.toggle('fa-sort-up')

}

arrows.forEach(arrow => arrow.addEventListener('click', openMenuChild));

burger.addEventListener('click', openMenu)