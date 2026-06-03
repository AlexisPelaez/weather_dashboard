document.addEventListener("DOMContentLoaded", function () {
    const celsiusTemps = TEMPS;
    const fahrenheitTemps = TEMPS.map(t => (t * 9/5) + 32);
    const feelsLikeC = FEELS_LIKE;
    const feelsLikeF = FEELS_LIKE.map(t => (t * 9/5) +32);
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
    const humidityChart = new Chart(humidityCtx, {
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
    const windChart = new Chart(windCtx, {
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
    const feelsLikeChart = new Chart(feelsCtx, {
        type: "line",
        data: {
            labels: HOURS,
            datasets: [{
                label: "Feels‑Like Temperature (°C)",
                data: feelsLikeC,
                borderColor: "rgb(255, 99, 132)",
                tension: 0.25
            }]
        }
    });

    // Precipitation Probability Chart
    const precipCtx = document.getElementById("precipChart");
    const precipChart = new Chart(precipCtx, {
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
    const cloudChart = new Chart(cloudCtx, {
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

    toggleBtn.addEventListener("click", () => {
        console.log("TOGGLE CLICKED");
        console.log("usingCelsius BEFORE:", usingCelsius);

        usingCelsius = !usingCelsius;

        if (usingCelsius) {
            tempChart.data.datasets[0].data = celsiusTemps;
            tempChart.data.datasets[0].label = "Temperature (°C)";

            feelsLikeChart.data.datasets[0].data = feelsLikeC;
            feelsLikeChart.data.datasets[0].label = "Feels‑Like Temperature (°C)";

            toggleBtn.textContent = "Switch to °F";
        } else {
            tempChart.data.datasets[0].data = fahrenheitTemps;
            tempChart.data.datasets[0].label = "Temperature (°F)";

            feelsLikeChart.data.datasets[0].data = feelsLikeF;
            feelsLikeChart.data.datasets[0].label = "Feels‑Like Temperature (°F)";
            toggleBtn.textContent = "Switch to °C";
        }

        tempChart.update();
        feelsLikeChart.update();

        document.querySelectorAll(".temp-high, .temp-low").forEach(el => {
            const c = el.dataset.c;
            const f = el.dataset.f;

            el.textContent = usingCelsius
                ? `High: ${c}°C`
                : `High: ${f}°F`;

            if (el.classList.contains("temp-low")) {
                el.textContent = usingCelsius
                    ? `Low: ${c}°C`
                    : `Low: ${f}°F`;
            }   
        });

        const current = document.getElementById("currentTemps");

        const maxC = current.dataset.maxC;
        const minC = current.dataset.minC;
        const maxF = current.dataset.maxF;
        const minF = current.dataset.minF;

        current.textContent = usingCelsius
            ? `${maxC}°C / ${minC}°C`
            : `${maxF}°F / ${minF}°F`;
    });
    const hourRange = document.getElementById("hourRange");
    const rangeValue = document.getElementById("rangeValue");

    hourRange.addEventListener("input", () => {
        const hours = parseInt(hourRange.value);
        rangeValue.textContent = `${hours}h`;

        const slicedLabels = HOURS.slice(0, hours);

        tempChart.data.labels = slicedLabels;
        tempChart.data.datasets[0].data =
            (usingCelsius ? celsiusTemps : fahrenheitTemps).slice(0, hours);

        feelsLikeChart.data.labels = slicedLabels;
        feelsLikeChart.data.datasets[0].data =
            (usingCelsius ? feelsLikeC : feelsLikeF).slice(0, hours);

        humidityChart.data.labels = slicedLabels;
        humidityChart.data.datasets[0].data = HUMIDITY.slice(0, hours);

        windChart.data.labels = slicedLabels;
        windChart.data.datasets[0].data = WIND.slice(0, hours);

        precipChart.data.labels = slicedLabels;
        precipChart.data.datasets[0].data = PRECIP_PROB.slice(0, hours);

        cloudChart.data.labels = slicedLabels;
        cloudChart.data.datasets[0].data = CLOUDCOVER.slice(0, hours);

        tempChart.update();
        feelsLikeChart.update();
        humidityChart.update();
        windChart.update();
        precipChart.update();
        cloudChart.update();
    });
})