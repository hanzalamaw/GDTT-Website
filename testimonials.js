if (window.location.pathname.endsWith("index.html")) {
    window.history.replaceState(null, "", window.location.pathname.replace("index.html", "Home"));
} 

// fade in animation

document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll(".fade-in-section");

    const observer = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target); 
                }
            });
        },
        { threshold: 0.2 }
    );

    sections.forEach(section => {
        observer.observe(section);
    });
});


// HAMBURGER MENU

const menuToggle = document.getElementById('menuToggle');
const navOptions = document.getElementById('navOptions');

menuToggle.addEventListener('click', () => {
    navOptions.classList.toggle('show');
    menuToggle.classList.toggle('open');
});

document.querySelectorAll('.navItem').forEach(item => {
    item.addEventListener('click', () => {
        navOptions.classList.remove('show');
        menuToggle.classList.remove('open'); 
    });
});