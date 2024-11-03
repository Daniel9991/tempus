const openMenuButton = document.getElementById("open-menu")
const closeMenuButton = document.getElementById("close-menu")
const menuWrapper = document.getElementById("menu-wrapper")

function openMenu(){
  menuWrapper.style.display = "block"
}

function closeMenu(){
  menuWrapper.style.display = "none"
}

openMenuButton.addEventListener("click", openMenu)
closeMenuButton.addEventListener("click", closeMenu)