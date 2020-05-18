const themeButton = document.getElementById('changeThemeButton');

themeButton.addEventListener('click', ()=>{
  document.body.classList.toggle('light');
});