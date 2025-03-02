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


// HAMBURGUR MENU

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

// HIGHLIGHT SELECTED PACKAGE NAME

const packageNames = document.querySelectorAll(".name-card");
let selectedPackageName = ""; // Selected package name

if (packageNames.length > 0) {
    // Automatically select the first package name
    selectedPackageName = packageNames[0].dataset.packageName;
    console.log("Selected Package Name:", selectedPackageName);
}

packageNames.forEach(packageName => {
    packageName.addEventListener("click", function () {
        // Remove selected class from all package names
        packageNames.forEach(p => p.classList.remove("selected"));

        // Add selected class to the clicked package name
        this.classList.add("selected");

        // Update selected package name
        selectedPackageName = this.dataset.packageName;
        console.log("Selected Package Name:", selectedPackageName);
    });
});


// MIN PERSONS

document.getElementById("persons").addEventListener("input", function () {
if (this.value < 1) {
    this.value = 1;
}
});

//SEND DATA TO SHEETS

document.getElementById("contactForm").addEventListener("submit", function(event) {
document.getElementById("done").style.display = "block";

event.preventDefault(); 

let data = {
    from: selectedPackageName,
    package: "-",
    name: document.getElementById("name").value,
    contact: document.getElementById("contact").value,
    email: document.getElementById("email").value,
    persons: document.getElementById("persons").value
};

document.getElementById("name").value = "";
document.getElementById("contact").value = "";
document.getElementById("email").value = "";
document.getElementById("persons").value = "";

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