if (window.location.pathname.endsWith(".html")) {
    window.history.replaceState(null, "", window.location.pathname.replace(".html", ""));
}

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

//SEND DATA TO SHEETS

document.getElementById("careerContactForm").addEventListener("submit", function(event) {
    document.getElementById("done").style.display = "block";
    
    event.preventDefault(); 
    
    let data = {
        from: "Careers-Join Us",
        package: `Statement: ${document.getElementById("statement").value}`,
        name: `Name: ${document.getElementById("name").value}`,
        contact: `Contact: ${document.getElementById("contact").value}`,
        email: `Designation: ${document.getElementById("designation").value}`,
        persons: `Organization: ${document.getElementById("organization").value}`
    };
    
    document.getElementById("name").value = "";
    document.getElementById("contact").value = "";
    document.getElementById("designation").value = "";
    document.getElementById("statement").value = "";
    document.getElementById("organization").value = "";
    
    fetch("https://script.google.com/macros/s/AKfycbxMQ42vYRcCYv2kuIqYDdSN9J9sfZLcQwsVsc_bidfkO1ZMgcyJIpqTxakUqFDFURgeVg/exec", {
        method: "POST",
        mode: "no-cors",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(() => {
        document.getElementById("done").style.display = "block";
        document.getElementById("fail").style.display = "none"})
    .catch(error => {
        document.getElementById("done").style.display = "none";
        document.getElementById("fail").style.display = "block";
    });
});

document.getElementById("abassadorContactForm").addEventListener("submit", function(event) {
    document.getElementById("doneA").style.display = "block";
    
    event.preventDefault(); 
    
    let data = {
        from: "Ambassador",
        package: `Statement: ${document.getElementById("statementA").value}`,
        name: `Name: ${document.getElementById("nameA").value}`,
        contact: `Contact: ${document.getElementById("contactA").value}`,
        email: `Designation: ${document.getElementById("designationA").value}`,
        persons: `Organization: ${document.getElementById("organizationA").value}`
    };
    
    document.getElementById("nameA").value = "";
    document.getElementById("contactA").value = "";
    document.getElementById("designationA").value = "";
    document.getElementById("statementA").value = "";
    document.getElementById("organizationA").value = "";
    
    fetch("https://script.google.com/macros/s/AKfycbxMQ42vYRcCYv2kuIqYDdSN9J9sfZLcQwsVsc_bidfkO1ZMgcyJIpqTxakUqFDFURgeVg/exec", {
        method: "POST",
        mode: "no-cors",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(() => {
        document.getElementById("doneA").style.display = "block";
        document.getElementById("failA").style.display = "none"})
    .catch(error => {
        document.getElementById("doneA").style.display = "none";
        document.getElementById("failA").style.display = "block";
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