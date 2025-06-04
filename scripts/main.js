

let sidebarTl = gsap.timeline({paused: true});
let sidebarslid = false;
let itemCount = 1;

sidebarTl.fromTo("#sidebar", { x: "-100%" }, { x: "0%", duration: 0.7, ease: "power2.inOut" }, 0);

document.getElementById("carticon").addEventListener("click", () => {
    const sidebar = document.getElementById("sidebar");
    if (!sidebarslid) {
        sidebarTl.play();
        sidebar.removeAttribute("inert");
    } else {
        sidebarTl.reverse();
    }

    sidebarslid = !sidebarslid;
});

//clicking off sidebar
document.addEventListener("click", function (event) {
    const sidebar = document.getElementById("sidebar");
    const carticon = document.getElementById("carticon")
    if (!sidebarslid) {
        return;
    }
    if (!sidebar.contains(event.target) && !carticon.contains(event.target)) {
        sidebarTl.reverse();
        siderbar.setAttribute("inert", "");
        sidebarslid = !sidebarslid;
    }
});

//TODO: add a items count updater for sidebar top

document.getElementById("sidebar-container").addEventListener("click", function(e) {
    if (e.target.classList.contains("item-trash")) {
        const itemG = e.target.closest(".item-group")
        //TODO: impl change cart total

        itemG.remove();
    }
});

document.getElementById("listing-container").addEventListener("click", function (e) {
    console.log(e);
    if (e.target.classList.contains("add-cart-btn")) {
        handleCartAdd();
    }
    if (e.target.classList.contains("l-q-container")) {
        if (e.target.classList.contains("listing-add")) {
            handleQuantityChange(true, e);
        }
        if (e.target.classList.contains("listing-minus")) {
            handleQuantityChange(false, e);
        }
    }
})


function handleCartAdd(event) {

}

function addItem() {
    const template = document.getElementById("cart-item-template");
    const clone = template.content.cloneNode(true);
    let newItem = clone.querySelector(".item-group");

    newItem.id = `cart-item${itemCount}`
    itemCount++;

    console.log(clone);
    document.getElementById("sidebar-container").appendChild(clone);
}

function handleQuantityChange(isIncrease, event) {

}