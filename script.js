const search_input = document.querySelector(".search-location");
const search_button = document.querySelector(".search-location-button");

const getLocationInfo = function() {
    const city = search_input.value;
    console.log(city);
}

search_button.addEventListener('click', getLocationInfo);