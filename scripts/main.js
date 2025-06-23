

let sidebarTl = gsap.timeline({paused: true});
let sidebarslid = false;
let itemIdCount = 1;
let cartCount = 0;

//key: name, value: # of item
const itemCountMap = new Map([
    ["PLACEHOLDER", 0],
]);

init();

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
        sidebar.setAttribute("inert", "");
        sidebarslid = !sidebarslid;
    }
});

document.getElementById("sidebar-container").addEventListener("click", function(e) {
    if (e.target.classList.contains("item-trash")) {
        const itemG = e.target.closest(".item-group")

        itemG.remove();
        cartCount--;
        updateCartTotalCount();
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

//handler: adding an item to sidebar using "Add To Cart"
function handleCartAdd(target) {

    const selListing = target.closest(".listing");
    let allList = document.getElementById("listing-container").querySelectorAll(".item-group");
    addCart();

    function addCart() {
        //TODO: impl check existing id in cart

        const template = document.getElementById("cart-item-template");
        const clone = template.content.cloneNode(true);
        let item = clone.querySelector(".item-group");

        allList.forEach((value, ind) => {
            
        });

        let name = selListing.querySelector("h1").textContent;
        let pm = selListing.querySelector(".p-q").textContent;
        let price = parseFloat(pm.substring(1, pm.indexOf(" ")));
        let quantity = parseFloat(selListing.querySelector(".q-input").value || "1")
        let tp = price * quantity;

        item.id = name.toLowerCase() + "-cart";

        cartCount += quantity;
        updateCartTotalCount();

        let lImg = selListing.querySelector("img");

        //child properties
        let iName = item.querySelector("h1");
        let ilHr = item.querySelector(".l-hr");
        let iImg = item.querySelector("img");

        iName.textContent = name + " " + pm.substring(pm.indexOf("/"));
        iImg.src = lImg.src;

        document.getElementById("sidebar-container").appendChild(clone);
 
        textRestraint(iName, ilHr)
    }

}

//util func: increasing sidebar's total item count
function updateCartTotalCount(amount) {
        let h2 = document.getElementById("cart-count");
        h2.textContent = "Items: " + cartCount;
}

//util: increase/decrease button on item listing
//learning note: .value instead of .textContent because .value is used for user inputs, not whats inside html's <>
function handleQuantityChange(isIncrease, target) {
    const input = target.closest(".l-q-container").querySelector(".q-input");

    if (isIncrease) {
        input.value = parseInt(input.value || "1") + 1;
    } else {
        input.value = parseInt(input.value || "1") - 1;
    }
    quantityRestraint(input);
}
//util: restrain increase/decrease on item listing to 1-99
function quantityRestraint(input) {
    if (input.value > 99) {
        input.value = 99;
    } else if (input.value < 1) {
        input.value = 1;
    }
}
//util: restraining font size depending on container & content
function textRestraint(text, container, clip = {minRem: 0.1, increment: 0.1}) {
    const rootPx = parseFloat(getComputedStyle(document.documentElement).fontSize);
    let elementPx = parseFloat(getComputedStyle(text).fontSize);
    let curRem = elementPx / rootPx;

    while ((text.scrollWidth > container.clientWidth || text.scrollHeight > container.clientHeight) && curRem > clip.minRem) {
        curRem -= clip.increment;
        text.style.fontSize = curRem + "rem";
    }
}

//NOTE: name & id are the same 
function createItem(name, img, desc, price, measurement) {
    const template = document.getElementById("listing-template");
    const clone = template.content.cloneNode(true);

    let listing = clone.querySelector(".listing");
    listing.id = name;

    let image = listing.querySelector("img");
    let h1 = listing.querySelector("h1");    
    let descr = listing.querySelector(".description");
    let pq = listing.querySelector(".p-q");

    h1.textContent = name;
    image.src = img;
    descr.textContent = desc;

    let concatStr = "$" + price + " / " + measurement;
    pq.textContent = concatStr;

    document.getElementById("listing-container").appendChild(clone);

    let elements = listing.querySelectorAll("h1, .description, .p-q");
    elements.forEach(elem => {textRestraint(elem, elem, {minRem: 0.8, increment: 0.1})});
}

//called when script loaded
//TODO: maybe add impl where it reads json file instead of fuckshit spamming creatitem? just a thought
function init() {
    createItem("Carrot", "../assets/carrotpng2.png", "Bunnies love em'", 3.99, "pc");
    
}