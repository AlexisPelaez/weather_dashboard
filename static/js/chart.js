document.addEventListener("DOMContentLoaded", function () {
    console.log("JS FILE LOADED");
    console.log("HOURS:", HOURS);
    console.log("TEMPS (Celsius):", TEMPS);

    // Prepare data
    const celsiusTemps = TEMPS;
    const fahrenheitTemps = TEMPS.map(t => (t * 9/5) + 32);
    console.log("TEMPS (Fahrenheit):", fahrenheitTemps);

    let usingCelsius = true;

    // Create the temperature chart ONCE
    const tempCtx = document.getElementById("tempChart");
    const tempChart = new Chart(tempCtx, {
        type: "line",
        data: {
            labels: HOURS,
            datasets: [{
                label: "Temperature (°C)",
                data: celsiusTemps,
                borderColor: "rgb(75, 192, 192)",
                tension: 0.25
            }]
        }
    });

    // Create humidity chart
    const humidityCtx = document.getElementById("humidityChart");
    new Chart(humidityCtx, {
        type: "line",
        data: {
            labels: HOURS,
            datasets: [{
                label: "Humidity (%)",
                data: HUMIDITY,
                borderColor: "rgb(54, 162, 235)",
                tension: 0.25
            }]
        }
    });

    // Create wind chart
    const windCtx = document.getElementById("windChart");
    new Chart(windCtx, {
        type: "line",
        data: {
            labels: HOURS,
            datasets: [{
                label: "Wind Speed (m/s)",
                data: WIND,
                borderColor: "rgb(255, 159, 64)",
                tension: 0.25
            }]
        }
    });
    // Feels-Like Temperature Chart
    const feelsCtx = document.getElementById("feelsLikeChart");
    new Chart(feelsCtx, {
        type: "line",
        data: {
            labels: HOURS,
            datasets: [{
                label: "Feels‑Like Temperature (°C)",
                data: FEELS_LIKE,
                borderColor: "rgb(255, 99, 132)",
                tension: 0.25
            }]
        }
    });

    // Precipitation Probability Chart
    const precipCtx = document.getElementById("precipChart");
    new Chart(precipCtx, {
        type: "bar",
        data: {
            labels: HOURS,
            datasets: [{
                label: "Precipitation Probability (%)",
                data: PRECIP_PROB,
                backgroundColor: "rgba(54, 162, 235, 0.6)"
            }]
        },
        options: {
            scales: {
                y: { min: 0, max: 100 }
            }
        }
    });

    // Cloud Cover Chart
    const cloudCtx = document.getElementById("cloudChart");
    new Chart(cloudCtx, {
        type: "line",
        data: {
            labels: HOURS,
            datasets: [{
                label: "Cloud Cover (%)",
                data: CLOUDCOVER,
                borderColor: "rgb(153, 102, 255)",
                tension: 0.25
            }]
        },
        options: {
            scales: {
                y: { min: 0, max: 100 }
            }
        }
    });
    // Temperature toggle button
    const toggleBtn = document.getElementById("unitToggle");
    console.log("TOGGLE BUTTON:", toggleBtn);

    toggleBtn.addEventListener("click", () => {
        console.log("TOGGLE CLICKED");
        console.log("usingCelsius BEFORE:", usingCelsius);

        usingCelsius = !usingCelsius;

        if (usingCelsius) {
            tempChart.data.datasets[0].data = celsiusTemps;
            tempChart.data.datasets[0].label = "Temperature (°C)";
            toggleBtn.textContent = "Switch to °F";
        } else {
            tempChart.data.datasets[0].data = fahrenheitTemps;
            tempChart.data.datasets[0].label = "Temperature (°F)";
            toggleBtn.textContent = "Switch to °C";
        }

        console.log("usingCelsius AFTER:", usingCelsius);
        tempChart.update();
    });
});

