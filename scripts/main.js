

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
    if (e.target.classList.contains("add-cart-btn")) {
        handleCartAdd(e.target);
    }

    if (e.target.classList.contains("listing-add")) {
        handleQuantityChange(true, e.target);
    }
    if (e.target.classList.contains("listing-minus")) {
        handleQuantityChange(false, e.target);
    }

})


document.getElementById("listing-container").addEventListener("input", function(e) {
    const input = e.target;

    if (input.classList.contains("q-input")) {
        input.value = input.value.replace(/[^0-9]/g, "")
    };
    quantityRestraint(input);
});

function handleCartAdd(target) {

    const listing = target.closest(".listing");
    addCart();

    function addCart() {
        const template = document.getElementById("cart-item-template");
        const clone = template.content.cloneNode(true);
        let newItem = clone.querySelector(".item-group");

        newItem.id = `cart-item${itemCount}`
        itemCount++;

        document.getElementById("sidebar-container").appendChild(clone);
    }

}

function handleQuantityChange(isIncrease, target) {
    const input = target.closest(".l-q-container").querySelector(".q-input");

    if (isIncrease) {
        input.value = parseInt(input.value || "1") + 1;
    } else {
        input.value = parseInt(input.value || "1") - 1;
    }
    quantityRestraint(input);
}

function quantityRestraint(input) {
    if (input.value > 99) {
        input.value = 99;
    } else if (input.value < 1) {
        input.value = 1;
    }
}

function itemNameRestraint(element, container, clip = {minRem: 0.5, increment: 0.1}) {
    
    const rootPx = parseFloat(getComputedStyle(document.documentElement).fontSize);
    let elementPx = parseFloat(getComputedStyle(element).fontSize);
    let curRem = elementPx / rootPx;

}