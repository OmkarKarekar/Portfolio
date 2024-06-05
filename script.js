let navDialog = document.getElementById('nav-dialog');
const nav = document.getElementById('navigation-menu');
const logo = document.getElementsByClassName('logo')[0];
const menu = document.getElementsByClassName('menu-button')[0];


function handleMenu(){
    navDialog.classList.toggle('hidden');
    console.log(nav);
    nav.classList.toggle('backdrop-blur-md');
    logo.classList.toggle('hidden'); 
    menu.classList.toggle('hidden');
}

