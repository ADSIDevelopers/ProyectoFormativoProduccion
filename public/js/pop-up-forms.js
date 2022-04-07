const button = document.querySelector('#Openform');
const poup = document.querySelector('.content-form-subject');
const closed = document.querySelector('.popup-close-window');

const buutonact = document.querySelector('#OpenAct');
const poupact = document.querySelector('.content-form-subject-actul');
const closedact = document.querySelector('.popup-close-window-act');

closed.addEventListener('click', () => {
    poup.style.display = 'none';
});
button.addEventListener('click', () => {
    poup.style.display = 'block';
});
poup.addEventListener('click', e => {
    // console.log(e);
    if (e.target.className === 'content-form-subject') {
        poup.style.display = 'none';
    }
});

closedact.addEventListener('click', () => {
    poupact.style.display = 'none';
});
buutonact.addEventListener('click', () => {
    poupact.style.display = 'block';
});
poupact.addEventListener('click', e => {
    // console.log(e);
    if (e.target.className === 'content-form-subject-actul') {
        poupact.style.display = 'none';
    }
});


let archive = document.querySelector('#img');
    archive.addEventListener('change',()=>{
        document.querySelector('#originalfilename').innerText = archive.files[0].name;
    });
    /* Tener en cuenta que generara un error de no reconocer la funcion addEventListener de la imagen porque no la estamos llamando en el ejs*/