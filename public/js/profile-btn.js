let logoutBtn = document.getElementById('logout');
let profileBtn = document.getElementById('profile');
document.addEventListener('click', (e) => {
    let profileBox = document.getElementById('profile-box');
    if(!profileBox.getAttribute('style')) return;
    if(e.target.parentNode.className != 'profile-box' 
    && e.target.parentNode.className != 'profile-section' ) {
        if(e.target.id == 'profile') return;
        else OpenAndCloseProfileBox();
    }
})
profileBtn.addEventListener('click', ()=> { OpenAndCloseProfileBox()});
logoutBtn.addEventListener('click', ()=> logOut());

function OpenAndCloseProfileBox(){
    let profileBox = document.getElementById('profile-box');
    if(profileBox.getAttribute('style')) profileBox.removeAttribute('style');
    else profileBox.setAttribute('style', 'display: block');
}

function logOut(){
    let url = 'http://localhost:3000/auth/logout';
    let config = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: ''
    }
    fetch(url, config)
    .then(res => res.json())
    .then(data => {
        if(data.status == 'error') return window.location.href = '/'
    })
    .catch(err => console.log(err))
    window.location.href = '/';
}
