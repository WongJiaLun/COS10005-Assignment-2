COS10005 Web Development - Assignment 2
Student name: Wong Jia Lun
Student ID: 105728022
Website name: Klang Valley Dining

Website structure

Every HTML page in this project shares a consistent header, main navigation menu, and footer layout to ensure a unified user experience.

index.html        - The homepage featuring a welcome message and a responsive hero image showcasing the site's theme.
restaurants.html  - A gallery page displaying 6 featured restaurants using a responsive CSS grid, including location, cuisine, price, and booking links.
recommend.html    - An interactive page where users select dining preferences to receive a dynamically calculated restaurant recommendation.
register.html     - A user registration form with client-side validation to ensure valid account creation.
reservation.html  - A table booking form featuring dynamic URL parameter reading (to pre-select a restaurant), conditional payment fields, and strict validation.
bill.html         - A calculator page that estimates the total bill based on the selected restaurant's pricing and party size.
css/style.css     - The single, shared external stylesheet controlling all styling, responsive media queries, and CSS grid layouts for the entire site.
js/script.js      - The shared JavaScript file handling all DOM manipulation, form validations, dynamic displays, and the recommendation engine.
images/           - Directory containing all optimized image assets used across the web pages.

GitHub repository

https://github.com/WongJiaLun/COS10005-Assignment-2.git

JavaScript validation logic (plain English)

Registration form: The script listens for the form submission and prevents the default action. It checks that no required fields are blank. It verifies that the email contains standard formatting (using regex) and that the password meets security requirements (and matches the "confirm password" field). If a rule is broken, the script displays a specific error message directly beneath the offending input field.

Reservation form: The script strictly enforces booking rules. It ensures the name is provided, the email is valid, and the phone number contains at least 10 digits using regex. It creates a Date object to ensure the user cannot select a date in the past, and verifies the party size is a number greater than zero.

Payment logic (Reservation): The form uses an event listener on the payment radio buttons to dynamically hide or show div sections. If "Voucher" is chosen, a simple text input appears. If "Online payment" is chosen, a credit card section appears. On submit, the script checks the selected card type and uses regex to enforce exactly 16 digits for Visa/Mastercard or exactly 15 digits for Amex.

Recommendation logic: The script captures the user's answers from the three preference questions. It uses if/else statements to cross-reference these answers against the properties (cuisine, area, price) stored in the restaurants JavaScript array. Once a match is found, it dynamically injects the restaurant's name, image, and details into the DOM.

Dynamic parts: The script uses URLSearchParams to read the ?restaurant=ID parameter from the URL when arriving from the restaurants.html page. It uses this ID to pre-fill the restaurant dropdown in the reservation form and dynamically displays the specific deposit amount required for that restaurant.

Known issues or limitations

None known. All forms validate strictly according to the rubric, WAVE accessibility structural alerts (headings, empty select options) have been resolved, and the CSS grid layouts are fully responsive across desktop, tablet, and mobile views.

References


Piii, 2026. Piii | Bukit Mertajam | Facebook. [image] Available at: https://www.facebook.com/PiiiBukitMertajam [Accessed 11 November 2026]

tinytanblog. (2022, January 30). Restaurant Jin Xuan Hong Kong @ PJU5, Kota Damansara (锦选香港特级点心). Tiny Tan.[image] Available at: https://tinytanblog.me/2022/01/30/restaurant-jin-xuan-hong-kong-pju5-kota-damansara/

Ming Kee Cantonese, 2026. Ming Kee Cantonese. [image] Available at: https://mingkeecantonese.com/ [Accessed 11 November 2026].

Super Kitchen Chilli Pan Mee, 2026. Outlets – Super Kitchen Chilli Pan Mee. [image] Available at: https://chillipanmee.com/outlets/ [Accessed 11 November 2026].

Menya Hanabi, 2026. Menya Hanabi 麺屋はなび Kota Kemuning | Shah Alam | Facebook. [image] Available at: https://www.facebook.com/MenyaHanabiKotaKemuning [Accessed 11 November 2026].

foodandfeast. (2017, June 10). Nasi Lemak Village Park - Malaysian food award 2016 & 2017. Foodandfeast.[image] Available at: http://www.foodandfeast.com/2017/06/villageparkrestaurant.html

Khoo, N. (2021, September 26). 15 Cafes and restaurants with outdoor dining areas in the Klang Valley. BURO.[image] Available at: https://www.buro247.my/lifestyle/food-drink/cafes-restaurants-outdoor-klang-valley.html

https://www.w3schools.com/js/default.asp

https://www.w3schools.com/css/default.asp