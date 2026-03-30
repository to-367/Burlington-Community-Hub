const directoryData = [
    { name: "Burlington Area Community Health", cat: "health", desc: "Free & reduced-cost medical and dental services.", address: "610 N. 4th St.", phone: "(319) 753-0140" },
    { name: "Southeast Iowa Food Bank", cat: "food", desc: "Regional food distribution network serving 16 counties.", address: "2250 Mt. Pleasant St.", phone: "(319) 753-8681" },
    { name: "Sunnybrook Community Housing", cat: "housing", desc: "Emergency shelter and transitional housing assistance.", address: "101 South Main St.", phone: "(319) 752-0422" },
    { name: "Burlington Public Library", cat: "education", desc: "Digital literacy, GED prep, and community programs.", address: "501 N. 4th St.", phone: "(319) 753-1647" },
    { name: "Des Moines County DHS", cat: "social", desc: "Medicaid, SNAP, childcare assistance, and protective services.", address: "1001 N. 4th St. Ste 600", phone: "(319) 753-6565" },
    { name: "Iowa Workforce Development", cat: "employment", desc: "Job search, skills training, and unemployment services.", address: "2028 Sunnyside Ave.", phone: "(319) 753-6543" },
    { name: "Burlington Art Center", cat: "arts", desc: "Gallery exhibitions, art classes, and cultural events.", address: "301 Jefferson St.", phone: "(319) 754-8069" },
    { name: "Crapo Park & Campgrounds", cat: "parks", desc: "City park along the Mississippi with trails, picnic areas, and camping.", address: "N. 4th & Columbia Sts.", phone: "(319) 753-8131" },
    { name: "Big Brothers Big Sisters", cat: "social", desc: "Youth mentoring programs for children ages 6–18.", address: "821 S. Main St.", phone: "(319) 752-2611" },
    { name: "Visiting Nurse Association", cat: "health", desc: "Home health care services for elderly and homebound residents.", address: "2723 Mt. Pleasant St.", phone: "(319) 753-4521" },
    { name: "Burlington Hawkeye (newspaper)", cat: "education", desc: "Local daily newspaper covering Burlington & Des Moines County.", address: "141 N. 3rd St.", phone: "(319) 754-8461" },
    { name: "Southeast Iowa Union Labor Temple", cat: "employment", desc: "Labor union hall offering apprenticeship and worker advocacy resources.", address: "Rmington Ave.", phone: "(319) 752-0101" },
    { name: "Winegard Community Garden", cat: "food", desc: "Community garden plots available for residents to grow fresh produce.", address: "N. Roosevelt Ave.", phone: "" },
    { name: "Aspen Grove Cemetery", cat: "parks", desc: "Historic city cemetery with tree-lined grounds and Civil War monuments.", address: "2521 Summer St.", phone: "(319) 753-8131" },
    { name: "Burlington Municipal Airport", cat: "social", desc: "Regional airport serving Southeast Iowa with charter and private flights.", address: "2411 Airport Rd.", phone: "(319) 752-4328" },
    { name: "Hawk-I Children's Health Insurance", cat: "health", desc: "Low-cost health insurance for uninsured Iowa children.", address: "Statewide Program", phone: "1-800-257-8563" },
    { name: "Des Moines County Fair", cat: "arts", desc: "Annual county fair with livestock, food, rides, and entertainment.", address: "Fairgrounds Rd.", phone: "(319) 753-6645" },
    { name: "First United Methodist Food Pantry", cat: "food", desc: "Free food pantry open to Burlington residents in need.", address: "312 N. 4th St.", phone: "(319) 752-2586" },
  ];

function filterContent() {
    const filterDropdown = document.getElementById("filter-dropdown");
    const selectedValue = filterDropdown.value;
    if (selectedValue === "all") {
        displayContent(directoryData);
    } else {
        const filteredData = directoryData.filter(item => item.cat === selectedValue);
        if (filteredData.length === 0) {
            displayNone();
            return;
        }
        displayContent(filteredData);
    }
}

function searchContent() {
    const query = document.getElementById("search-bar").value.toLowerCase();
    console.log(query);
    const searchResults = directoryData.filter(item => {
        const matchName = item.name.toLowerCase().includes(query);
        const matchCat = item.cat.includes(query);
        const matchDesc = item.desc.includes(query);
        const matchLoc = item.address.includes(query);
        const matchPhone = item.phone.includes(query);
        return matchName || matchCat || matchDesc || matchLoc || matchPhone;
    });
    if (searchResults.length === 0) {
        displayNone()
        return;
    }
    displayContent(searchResults);
}

function displayNone() {
    const grid = document.getElementById("directory-grid");
    grid.innerHTML = `<div id="no-results">Sorry! We couldn't find any matching results.</div>`;
}

function displayContent(items) {
    const grid = document.getElementById("directory-grid");
    grid.innerHTML = "";
    items.forEach(item => {
        let htmlString = `
        <div class="resource-card">
            <div class="rcard-title">${item.name}</div>
            <p class="rcard-desc">${item.desc}</p>
            <div class="card-divider"></div>
        `;
        if (item.address !== '') {
            htmlString += ` <div class="rcard-loc"><i class="fa-solid fa-location-dot"></i>${item.address}</div>`;
        };
        if (item.phone !== '') {
            htmlString += ` <div class="rcard-phone"><i class="fa-solid fa-phone"></i>${item.phone}</div>`;
        };
        htmlString += `</div>`;
        grid.innerHTML += htmlString;
    })
}

filterContent();

document.addEventListener('DOMContentLoaded', () => { // Wait for the DOM to be fully loaded
    const observerOptions = {
        root: null, // observe against the viewport
        rootMargin: '0px',
        threshold: 0.1 // Trigger when 10% of the element is visible
    };

    function observerCallback(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Element is in view, add the class
                entry.target.classList.add('is-inview');
                // Optional: Stop observing the element if the animation should only play once
                // observer.unobserve(entry.target); 
            } else {
                // Element is out of view, remove the class to allow re-triggering (optional)
                entry.target.classList.remove('is-inview');
            }
        });
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Select all elements to observe and start observing
    const elementsToAnimate = document.querySelectorAll('.fade-in-from-bottom');
    elementsToAnimate.forEach(element => {
        observer.observe(element);
    });
});