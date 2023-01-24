

const placeName = document.querySelector("#place span");
const temperature = document.querySelector("#temp span");
const conditionIcon = document.querySelector("#condition-icon");
const conditionName = document.querySelector("#condition-name");
const humidity = document.querySelector("#humidity span");
const windSpeed = document.querySelector("#wind span");
const timeDate = document.querySelector("#time-date span");

const searchCity = document.querySelector("#searchCity");


let target = "Kathmandu";

const getWeather = async () => {

    try {

        const weatherUrl = `https://api.weatherapi.com/v1/current.json?key=9b62fed581544ad0a6b130513220810&q=${target}&aqi=no`

        const response = await fetch(weatherUrl);
        const data = await response.json();


        const {
            current: { temp_c, condition: { text, icon }, humidity, wind_kph },
            location: { name, localtime },
        } = data;


        updateDom(name, temp_c, icon, text, humidity, wind_kph, localtime);

    } catch (error) {
        alert("Location not found !!")
    }

};
getWeather();



function updateDom(place, temp, icon, text, humid, speed, time_date) {
    placeName.innerHTML = place;
    temperature.innerHTML = temp;
    conditionIcon.src = icon;
    conditionName.innerHTML = text;
    humidity.innerHTML = humid;
    windSpeed.innerHTML = speed;

    // getting days, date and time........
    const exactTime = time_date.split(" ")[1];
    const exactDate = time_date.split(" ")[0];
    const exactDay = new Date(exactDate).getDay();
    //.......*****x**********x*******

    timeDate.innerHTML = `${exactTime} ${getDayName(exactDay)} ${exactDate}`;


};


// index number of days to string Days...

function getDayName(num) {
    switch (num) {
        case 0:
            return "Sunday";
        case 1:
            return "Monday";
        case 2:
            return "Tuesday";
        case 3:
            return "Wednesday";
        case 4:
            return "Thursday";
        case 5:
            return "Friday";
        case 6:
            return "Saturday";

        default: " ";
    }

}

// **********search input...

const search = () => {

    target = searchCity.value;
    getWeather();

};