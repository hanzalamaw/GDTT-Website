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