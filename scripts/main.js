

let sidebarTl = gsap.timeline({paused: true});

sidebarTl.fromTo("#sidebar", { x: "-100%" }, { x: "0%", duration: 0.7, ease: "power2.inOut" }, 0);

let sidebarslid = false;
document.getElementById("carticon").addEventListener("click", () => {
    if (!sidebarslid) {
        sidebarTl.play();
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
        sidebarslid = !sidebarslid;
    }
});

//TODO: add a items count updater for sidebar top