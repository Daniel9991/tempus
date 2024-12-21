const openMenuButton = document.getElementById("open-menu")
const menuWrapper = document.getElementById("menu-wrapper")

function openMenu(){
  menuWrapper.style.display = "block"
  openMenuButton.setAttribute("state", "open")
  openMenuButton.removeEventListener("click", openMenu)
  openMenuButton.addEventListener("click", closeMenu)
}

function closeMenu(){
  menuWrapper.style.display = "none"
  openMenuButton.setAttribute("state", "closed")
  openMenuButton.removeEventListener("click", closeMenu)
  openMenuButton.addEventListener("click", openMenu)
}

openMenuButton.addEventListener("click", openMenu)