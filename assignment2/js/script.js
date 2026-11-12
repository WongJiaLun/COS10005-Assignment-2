/* ==========================================================================
   COS10005 Assignment 2 - script.js

   Contents
   1. Restaurant data
   2. Shared helpers
   3. Navigation
   4. Recommendation page
   5. Registration page validation
   6. Reservation page
   7. Bill calculator page
   8. Start-up
   ========================================================================== */

"use strict";

/* 1. Restaurant data ------------------------------------------------------ */
var restaurants = [
    {
        id: 1, name: "PIII Eatery", area: "Damansara Uptown",
        cuisine: "Western pasta & rice bowls", 
        image: "images/piii_eatery.jpg", 
        imageAlt: "A modern plate of creamy pasta and a savory rice bowl on a wooden table", 
        description: "A cozy, modern cafe specializing in comforting Western pasta dishes and flavorful fusion rice bowls.",
        priceMin: 40, priceMax: 50, deposit: 20,
        dishes: [
            { name: "Spaghetti Carbonara", price: 25.00 },
            { name: "Kam Heong Spicy Chicken Rice", price: 22.00 }
        ],
        dietary: [], purposes: ["casual", "date"]
    },
    {
        id: 2, name: "Restoran Jin Xuan Hong Kong", area: "Damansara Uptown",
        cuisine: "Hong Kong dim sum", 
        image: "images/jin_xuan.jpg", 
        imageAlt: "Bamboo steamers filled with fresh har gaw and fluffy BBQ pork buns", 
        description: "A bustling, traditional dim sum spot famous for its piping hot dumplings, fluffy steamed buns, and lively atmosphere.",
        priceMin: 30, priceMax: 40, deposit: 15,
        dishes: [
            { name: "Har Gaw", price: 8.00 },
            { name: "BBQ Pork Bun", price: 7.50 }
        ],
        dietary: [], purposes: ["family", "casual"]
    },
    {
        id: 3, name: "Ming Kee Cantonese", area: "Damansara Uptown",
        cuisine: "Cantonese roast meats", 
        image: "images/ming_kee.jpg", 
        imageAlt: "Shiny roast duck and caramelized char siew hanging in a glass display", 
        description: "Authentic Cantonese cuisine renowned for its beautifully caramelized char siew, succulent roast duck, and premium dining experience.",
        priceMin: 50, priceMax: 70, deposit: 30,
        dishes: [
            { name: "Roast Duck", price: 45.00 },
            { name: "Char Siew", price: 20.00 }
        ],
        dietary: [], purposes: ["family", "business"]
    },
    {
        id: 4, name: "Super Kitchen Chilli Pan Mee", area: "SS15, Subang Jaya",
        cuisine: "Chilli pan mee", 
        image: "images/chilli_pan_mee.jpg", 
        imageAlt: "A bowl of dry pan mee topped with minced meat, crispy anchovies, a poached egg, and dry chilli", 
        description: "Famous for its fiery dry chilli paste, springy noodles, and perfectly poached eggs, this casual eatery is a staple for spice lovers.",
        priceMin: 15, priceMax: 25, deposit: 0,
        dishes: [
            { name: "Chilli Pan Mee", price: 12.00 }
        ],
        dietary: [], purposes: ["casual"]
    },
    {
        id: 5, name: "Menya Hanabi", area: "Damansara Utama",
        cuisine: "Japanese ramen", 
        image: "images/menya_hanabi.jpg", 
        imageAlt: "A bowl of Nagoya Mazesoba topped with minced meat, scallions, seaweed, and a raw egg yolk", 
        description: "The pioneer of Nagoya Mazesoba (soupless ramen), offering rich, umami-packed bowls meant to be mixed with a dash of vinegar.",
        priceMin: 35, priceMax: 45, deposit: 10,
        dishes: [
            { name: "Nagoya Mazesoba", price: 28.00 }
        ],
        dietary: [], purposes: ["casual", "date"]
    },
    {
        id: 6, name: "Village Park Restaurant", area: "Damansara Uptown",
        cuisine: "Malaysian (nasi lemak)", 
        image: "images/village_park.jpg", 
        imageAlt: "A plate of Nasi Lemak with fragrant coconut rice, sambal, and a large crispy fried chicken leg", 
        description: "An award-winning local legend serving arguably the best Nasi Lemak Ayam Goreng in the Klang Valley.",
        priceMin: 15, priceMax: 30, deposit: 10,
        dishes: [
            { name: "Nasi Lemak Ayam Goreng", price: 12.30 }
        ],
        dietary: ["halal"], purposes: ["casual", "family"]
    }
];

/* 2. Shared helpers ------------------------------------------------------- */
function getRestaurantById(id) {
    return restaurants.find(r => r.id === parseInt(id, 10));
}

function showError(fieldId, message) {
    var errorElement = document.getElementById(fieldId + "-error");
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.color = "#B30000";
    }
}

function clearError(fieldId) {
    var errorElement = document.getElementById(fieldId + "-error");
    if (errorElement) {
        errorElement.textContent = "";
    }
}

/* 3. Navigation ----------------------------------------------------------- */
function highlightCurrentPage() {
    var currentPath = window.location.pathname.split('/').pop();
    if (currentPath === "") currentPath = "index.html"; 

    var links = document.querySelectorAll('.nav-list a');
    links.forEach(function(link) {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
            link.setAttribute('aria-current', 'page');
        } else {
            link.classList.remove('active');
            link.removeAttribute('aria-current');
        }
    });
}

/* 4. Recommendation page -------------------------------------------------- */
function initRecommendPage() {
    var form = document.getElementById("recommend-form");
    if (!form) return;

    form.addEventListener("submit", function(event) {
        event.preventDefault(); 
        
        var diet = document.getElementById("diet").value;
        var budget = document.getElementById("budget").value;
        var purpose = document.getElementById("purpose").value;
        var container = document.getElementById("results-container");

        // Filter logic
        var matches = restaurants.filter(function(r) {
            var avgPrice = (r.priceMin + r.priceMax) / 2;
            var matchesBudget = true;
            
            if (budget === "low" && avgPrice > 25) matchesBudget = false;
            if (budget === "medium" && (avgPrice <= 25 || avgPrice > 45)) matchesBudget = false;
            if (budget === "high" && avgPrice <= 45) matchesBudget = false;

            var matchesDiet = (diet === "none" || diet === "") || r.dietary.includes(diet);
            var matchesPurpose = (purpose === "") || r.purposes.includes(purpose);

            return matchesBudget && matchesDiet && matchesPurpose;
        });

        // Render results
        if (matches.length > 0) {
            var html = "<h3>We found " + matches.length + " match(es)!</h3><ul>";
            matches.forEach(function(m) {
                html += `<li><strong>${m.name}</strong> - ${m.cuisine} 
                         <br><a href="reservation.html?restaurant=${m.id}" class="btn">Reserve a table</a></li><br>`;
            });
            html += "</ul>";
            container.innerHTML = html;
        } else {
            container.innerHTML = "<p>No exact matches found. Try broadening your criteria.</p>";
        }
    });
}

/* 5. Registration page validation ----------------------------------------- */
function initRegisterPage() {
    var form = document.getElementById("register-form");
    if (!form) return;

    form.addEventListener("submit", function(event) {
        var isValid = true;
        
        // 1. Username: minimum 5 characters; letters, numbers, and underscores only
        var username = document.getElementById("reg-username").value;
        var userRegex = /^[a-zA-Z0-9_]{5,}$/;
        if (!userRegex.test(username)) {
            showError("reg-username", "Username must be at least 5 characters and contain only letters, numbers, and underscores.");
            isValid = false;
        } else {
            clearError("reg-username");
        }

        // 2. Email: valid email format
        var email = document.getElementById("reg-email").value;
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showError("reg-email", "Please enter a valid email address.");
            isValid = false;
        } else {
            clearError("reg-email");
        }

        // 3. Phone number: digits only, 8–15 digits
        var phone = document.getElementById("reg-phone").value;
        var phoneRegex = /^\d{8,15}$/;
        if (!phoneRegex.test(phone)) {
            showError("reg-phone", "Phone number must be between 8 and 15 digits only.");
            isValid = false;
        } else {
            clearError("reg-phone");
        }

        // 4. Gender must be selected
        var genderSelected = document.querySelector('input[name="gender"]:checked');
        if (!genderSelected) {
            showError("reg-gender", "Please select a gender.");
            isValid = false;
        } else {
            clearError("reg-gender");
        }
        
        // 5. Password: min 10 chars, uppercase, lowercase, numbers, special characters
        var password = document.getElementById("reg-password").value;
        var pwdRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{10,}$/;
        if (!pwdRegex.test(password)) {
            showError("reg-password", "Password must be at least 10 characters and include an uppercase letter, a lowercase letter, a number, and a special character.");
            isValid = false;
        } else {
            clearError("reg-password");
        }

        // 6. Confirm password must match the password
        var confirmPwd = document.getElementById("reg-confirm").value;
        if (confirmPwd === "" || confirmPwd !== password) {
            showError("reg-confirm", "Passwords do not match.");
            isValid = false;
        } else {
            clearError("reg-confirm");
        }

        // 7. Country must be selected
        var country = document.getElementById("reg-country").value;
        if (country === "") {
            showError("reg-country", "Please select your country/region.");
            isValid = false;
        } else {
            clearError("reg-country");
        }

        // Block submission until all errors are resolved
        if (!isValid) {
            event.preventDefault(); 
        } else {
            // Success state
            alert("Registration successful!");
        }
    });
}

/* 6. Reservation page ------------------------------------------------------ */

function initReservationPage() {
    var form = document.getElementById("reservation-form");
    if (!form) return;

    // --- NEW: Billing Email Auto-fill Logic (Moved outside the submit event) ---
    var sameEmailCheck = document.getElementById("same-email-check");
    var mainEmailInput = document.getElementById("res-email");
    var billingEmailInput = document.getElementById("res-billing-email");

    if (sameEmailCheck && mainEmailInput && billingEmailInput) {
        sameEmailCheck.addEventListener("change", function() {
            if (this.checked) {
                billingEmailInput.value = mainEmailInput.value;
                billingEmailInput.readOnly = true; 
            } else {
                billingEmailInput.value = "";
                billingEmailInput.readOnly = false; 
            }
        });

        mainEmailInput.addEventListener("input", function() {
            if (sameEmailCheck.checked) {
                billingEmailInput.value = this.value;
            }
        });
    }
    // ---------------------------------------------------------------------------

    // 1. Dynamic Payment Display Logic
    var paymentRadios = document.querySelectorAll('input[name="payment"]');
    var sectionVoucher = document.getElementById("section-voucher");
    var sectionCC = document.getElementById("section-cc");

    paymentRadios.forEach(function(radio) {
        radio.addEventListener("change", function() {
            if (this.value === "voucher") {
                sectionVoucher.style.display = "block";
                sectionCC.style.display = "none";
            } else if (this.value === "online") {
                sectionVoucher.style.display = "none";
                sectionCC.style.display = "block";
            }
        });
    });

    // 2. Validation Logic on Submit
    form.addEventListener("submit", function(event) {
        var isValid = true;

        // Required field: Name
        var name = document.getElementById("res-name").value.trim();
        if (name === "") {
            showError("res-name", "Name is required.");
            isValid = false;
        } else {
            clearError("res-name");
        }

        // Email validation
        var email = document.getElementById("res-email").value;
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showError("res-email", "Please enter a valid email address.");
            isValid = false;
        } else {
            clearError("res-email");
        }

        // Phone: at least 10 digits
        var phone = document.getElementById("res-phone").value;
        var phoneRegex = /^\d{10,}$/;
        if (!phoneRegex.test(phone)) {
            showError("res-phone", "Phone number must contain at least 10 digits.");
            isValid = false;
        } else {
            clearError("res-phone");
        }

        // Date: must not be in the past
        var dateInput = document.getElementById("res-date").value;
        if (dateInput === "") {
            showError("res-date", "Please select a date.");
            isValid = false;
        } else {
            var selectedDate = new Date(dateInput);
            var today = new Date();
            today.setHours(0, 0, 0, 0); // Reset time to midnight for accurate date comparison
            
            if (selectedDate < today) {
                showError("res-date", "Reservation date cannot be in the past.");
                isValid = false;
            } else {
                clearError("res-date");
            }
        }

        // People: must be > 0
        var people = parseInt(document.getElementById("res-people").value, 10);
        if (isNaN(people) || people <= 0) {
            showError("res-people", "Number of people must be greater than 0.");
            isValid = false;
        } else {
            clearError("res-people");
        }
        
        // Payment Validation
        var paymentSelected = document.querySelector('input[name="payment"]:checked');
        if (!paymentSelected) {
            showError("res-payment", "Please select a payment method.");
            isValid = false;
        } else {
            clearError("res-payment");
            
            if (paymentSelected.value === "online") {
                var ccType = document.getElementById("res-cc-type").value;
                var ccNumber = document.getElementById("res-cc-number").value.trim();
                
                // Visa/Mastercard: 16 digits, Amex: 15 digits
                if (ccType === "visa-mc" && !/^\d{16}$/.test(ccNumber)) {
                    showError("res-cc", "Visa/Mastercard requires exactly 16 digits.");
                    isValid = false;
                } else if (ccType === "amex" && !/^\d{15}$/.test(ccNumber)) {
                    showError("res-cc", "American Express requires exactly 15 digits.");
                    isValid = false;
                } else {
                    clearError("res-cc");
                }
            }
        }

        if (!isValid) {
            event.preventDefault(); // Block submission if there are errors
        } else {
            alert("Reservation successfully validated!");
        }
    });
}


/* 7. Bill calculator page ------------------------------------------------- */
function initBillPage() {
    var calculateBtn = document.getElementById("calculate-btn");
    if (!calculateBtn) return; // Exit if not on the bill page

    calculateBtn.addEventListener("click", function() {
        // 1. Get input values
        var restaurantSelect = document.getElementById("calc-restaurant");
        var numPeopleInput = document.getElementById("calc-people").value;
        var sstCheckbox = document.getElementById("calc-sst");
        var serviceCheckbox = document.getElementById("calc-service");

        // 2. Validation
        var avgPerPax = parseFloat(restaurantSelect.value);
        var numPeople = parseInt(numPeopleInput, 10);

        if (isNaN(avgPerPax) || avgPerPax <= 0) {
            alert("Please select a valid restaurant.");
            return;
        }

        if (isNaN(numPeople) || numPeople <= 0) {
            alert("Please enter a valid number of diners (at least 1).");
            return;
        }

        // 3. Calculation
        var subtotal = avgPerPax * numPeople;
        
        var sstAmount = 0;
        if (sstCheckbox && sstCheckbox.checked) {
            sstAmount = subtotal * parseFloat(sstCheckbox.value); // 6%
        }

        var serviceAmount = 0;
        if (serviceCheckbox && serviceCheckbox.checked) {
            serviceAmount = subtotal * parseFloat(serviceCheckbox.value); // 10%
        }

        var finalTotal = subtotal + sstAmount + serviceAmount;

        // 4. Update the UI
        document.getElementById("bill-total").textContent = finalTotal.toFixed(2);
        
        var breakdownText = `Subtotal: RM ${subtotal.toFixed(2)}`;
        if (sstAmount > 0) breakdownText += ` | SST (6%): RM ${sstAmount.toFixed(2)}`;
        if (serviceAmount > 0) breakdownText += ` | Service Charge (10%): RM ${serviceAmount.toFixed(2)}`;
        
        document.getElementById("bill-breakdown").textContent = breakdownText;
    });
}
/* 8. Start-up ------------------------------------------------------------- */
highlightCurrentPage();
initRecommendPage();
initRegisterPage();
initReservationPage();
initBillPage();