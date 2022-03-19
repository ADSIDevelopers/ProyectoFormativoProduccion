const btnMenu = document.querySelector('#btn-menu');
const menu = document.querySelector('#menu');
btnMenu.addEventListener('click', function () {
	menu.classList.toggle('mostrar');
});
$('.bt-close').click(function () {
	menu.classList.toggle('mostrar');
});
const subMenuBtn = document.querySelectorAll('.submenu-btn');
for (let i = 0; i < subMenuBtn.length; i++) {
	subMenuBtn[i].addEventListener('click', function () {
		//Este anoche debe ser el mismo de el @media en css
		if (window.innerWidth < 1024) {
			const submenu = this.nextElementSibling;
			const rotate = this.querySelector('.rotate-item');
			const height = submenu.scrollHeight;
			if (submenu.classList.contains('desplegar')) {
				submenu.classList.remove('desplegar');
				rotate.classList.remove('rotate-anim');
				submenu.removeAttribute('style');
			} else {
				submenu.classList.add('desplegar');
				submenu.style.height = height + 'px';
				rotate.classList.add('rotate-anim');
			}
		}
	});
}