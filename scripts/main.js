document.getElementById("carticon").addEventListener("click", changeCartState);

let CART_STATE = "CLOSED";
function changeCartState() {

    if (CART_STATE == "CLOSED") {
        gsap.to("#sidebar", {width: "200px", duration: 0.7, ease:"power2.out"});
        CART_STATE = "OPEN";
    } else {
        gsap.to("#sidebar", {width: "0", duration: 0.7, ease:"power2.in"});
        CART_STATE = "CLOSED";
    }
}