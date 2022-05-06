const btnMenu = document.querySelector('#btn-menu');
const menu = document.querySelector('#menu');
btnMenu.addEventListener('click', function () {
	menu.classList.toggle('mostrar');
});
$('.bt-close').click(function () {
	menu.classList.toggle('mostrar');
});
