

let sidebarslid = false;
let sidebarTl = gsap.timeline(paused(true));

//retract
sidebarTl.to("#sidebar", {width: "0", duration: 0.7, ease:"power2.in"});

//extend
sidebarTl.to("#sidebar", {width: "200px", duration: 0.7, ease:"power2.out"});
sidebarTl.to("#sidebar > *", );


document.getElementById("carticon").addEventListener("click", () => {
    if (!sidebarslid) {
        sidebarTl.play();
    } else {
        sidebarTl.reverse()
    }
});
