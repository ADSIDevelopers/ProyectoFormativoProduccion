const button = document.querySelector('#Openform');
const poup = document.querySelector('.content-form-subject');
const closed = document.querySelector('.popup-close-window');

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

let archive = document.querySelector('#img');
    archive.addEventListener('change',()=>{
        document.querySelector('#originalfilename').innerText = archive.files[0].name;
    });