// fade in animation

document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll(".fade-in-section");

    const observer = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    observer.unobserve(entry.target); // Unobserve after first reveal
                }
            });
        },
        { threshold: 0.2 } // Adjust threshold for earlier/later triggering
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

// FAQs

function display(plus, answer, plus_selected) {
    document.getElementById(plus).style.display = "none";
    document.getElementById(answer).style.display = "block";
    document.getElementById(plus_selected).style.display = "block";

    let answerElement = document.getElementById(answer);
    answerElement.classList.add('visible');

}

function hide(plus, answer, plus_selected) {
    document.getElementById(plus).style.display = "block";
    document.getElementById(plus_selected).style.display = "none";

    let answerElement = document.getElementById(answer);
    answerElement.classList.remove('visible');
}

//SEND DATA TO SHEETS

document.getElementById("contactForm").addEventListener("submit", function(event) {
    document.getElementById("done").style.display = "block";
    
    event.preventDefault(); 
    
    let data = {
        from: "Contact Us Page",
        package: document.getElementById("message").value,
        name: document.getElementById("name").value,
        contact: document.getElementById("contact").value,
        email: document.getElementById("email").value,
        persons: document.getElementById("trip").value
    };
    
    document.getElementById("name").value = "";
    document.getElementById("contact").value = "";
    document.getElementById("email").value = "";
    document.getElementById("trip").value = "";
    document.getElementById("message").value = "";
    
    fetch("https://script.google.com/macros/s/AKfycbxMQ42vYRcCYv2kuIqYDdSN9J9sfZLcQwsVsc_bidfkO1ZMgcyJIpqTxakUqFDFURgeVg/exec", {
        method: "POST",
        mode: "no-cors",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(() => {document.getElementById("done").style.display = "block";
                document.getElementById("fail").style.display = "none"})
    .catch(error => {
            document.getElementById("done").style.display = "none";
            document.getElementById("fail").style.display = "block";
        });
    });


// SEND EMAIL SUBSCRIPTIONS 

document.getElementById("news").addEventListener("submit", function(event) {
    
    event.preventDefault(); 
    
    let data = {
        from: "NewsLetter Subscription",
        package: "-",
        name: "-",
        contact: "-",
        email: document.getElementById("news-email").value,
        persons: "-"
    };
    
    document.getElementById("news-email").value = "";
    
    fetch("https://script.google.com/macros/s/AKfycbxMQ42vYRcCYv2kuIqYDdSN9J9sfZLcQwsVsc_bidfkO1ZMgcyJIpqTxakUqFDFURgeVg/exec", {
        method: "POST",
        mode: "no-cors",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(() => {console.log("Done!");})
    .catch(error => {console.log("Done!");});
    });