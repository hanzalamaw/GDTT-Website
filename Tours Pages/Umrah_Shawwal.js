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

// LOADING DISPLAYER

let displayer = 0;
let count = 0;
let intervalId = null; 

function loading() {
    displayer = 0;

    if (intervalId) {
        clearInterval(intervalId);
    }

    count = 0;
    document.getElementById("load").style.display = "block"; 

    intervalId = setInterval(() => {
        document.getElementById("load").textContent = `Loading Packages [${count}%]`;
        count++;

        if (displayer > 0 | count > 100) {
            clearInterval(intervalId); 
            document.getElementById("load").style.display = "none";
        }
    }, 100);
}

//RECEIVE PACAGES DATA FROM SHEETS AND DISPLAYS IT

document.addEventListener("DOMContentLoaded", function () {
let packageButtons = document.querySelectorAll(".name-card");

packageButtons.forEach(button => {
    button.addEventListener("click", function () {
        let selectedPackage = this.getAttribute("data-package-name");
        fetchPackages(selectedPackage);
    });
});
});

function fetchPackages(packageName) {
fetch("https://script.google.com/macros/s/AKfycbwyTmugdJ4OP4viNikZuaBP3xD04wSiplLZdUEM4aLjq6h_ohxLf_ASewngc1touth_OQ/exec")
    .then(response => response.json())
    .then(data => {
        if (data[packageName]) {
            displayPackages(data[packageName]);
        } else {
            document.getElementById("packageContainer").innerHTML = "<p>No packages available.</p>";
        }
    })
    .catch(error => console.error("Error fetching packages:", error));
}

function displayPackages(packageData) {

let container = document.getElementById("packageContainer");
let departureContainer = document.getElementById("departureDetails");

container.innerHTML = ""; // Clear previous packages
departureContainer.innerHTML = ""; 

// Display departure date and duration once
let headerHTML = `
    <div class="about-section">
        <h1>Departure: </h1>
        <p>${packageData.departureDate}</p>
    </div>
`;
departureContainer.innerHTML += headerHTML;

// Loop through each package and display it
packageData.packages.forEach((pkg, index) => {
    let packageHTML = `
        <label class="opt-card">
            <input type="radio" name="buttons" data-package-number="${pkg.packageNumber}" ${index === 0 ? "checked" : ""}>
            <div class="opt-content">
                <div class="opt">
                    <span>MAKKAH: ${pkg.makkahHotel}</span> <br>
                    <span>MEDINA: ${pkg.medinaHotel}</span>
                </div>
                <div class="price">
                    <h1>PKR ${pkg.price}</h1>
                    <p>(PER PERSON)</p>
                </div>
            </div>
        </label>
    `;
    container.innerHTML += packageHTML;
    displayer ++;
    console.log(displayer);
    });

    attachPackageSelectionListeners();

}

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


let packageSelected = "# 01";

// HIGHLIGHT SELECTED PACKAGE NUMBER
function attachPackageSelectionListeners() {
const options = document.querySelectorAll(".opt-card input");
let selectedPackageNumber = ""; // Selected package number

if (options.length > 0) {
    // Automatically select the first option and store its package number
    options[0].checked = true;
    options[0].closest(".opt-card").classList.add("selected");
    selectedPackageNumber = options[0].dataset.packageNumber;
    console.log("Selected Package:", selectedPackageNumber); 
}

options.forEach(option => {
    option.addEventListener("change", function () {
        // Remove active class from all options
        document.querySelectorAll(".opt-card").forEach(card => {
            card.classList.remove("selected");
        });

        // Add active class to the selected option
        if (this.checked) {
            const selectedCard = this.closest(".opt-card");
            selectedCard.classList.add("selected");

            // Store selected package number
            selectedPackageNumber = this.dataset.packageNumber;
            console.log("Selected Package:", selectedPackageNumber);
            packageSelected = selectedPackageNumber;
        }
    });
});
}

// SHOW / HIDE PACKAGES

let showPackages = 0;

function display() {
    const packages = document.getElementById("packageContainer");

    if (showPackages == 0) { 
        packages.style.display = "flex";
        showPackages = 1;
        document.getElementById("down").style.display = "none";
        document.getElementById("up").style.display = "flex";
    } 

    else if (showPackages == 1) {            
        packages.style.display = "none";
        showPackages = 0;
        document.getElementById("up").style.display = "none";
        document.getElementById("down").style.display = "flex";
    }
}

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
    package: packageSelected,
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