from flask import Flask, render_template, request
import requests

app = Flask(__name__)

@app.route("/")
def welcome():
    return render_template("welcome.html")

@app.route("/dashboard")
def dashboard():
    city = request.args.get("city")

    if city:
        geo_url = f"https://geocoding-api.open-meteo.com/v1/search?name={city}&count=1"
        geo = requests.get(geo_url).json()

        if "results" in geo:
            lat = geo["results"][0]["latitude"]
            lon = geo["results"][0]["longitude"]
            city_name = geo["results"][0]["name"]
        else:
            lat, lon = 41.8781, -87.6298
            city_name = "Chicago"
    else:
        lat = request.args.get("lat", 41.8781)
        lon = request.args.get("lon", -87.6298)
        city_name = "Chicago"

    url = (
        f"https://api.open-meteo.com/v1/forecast?"
        f"latitude={lat}&longitude={lon}"
        f"&hourly=temperature_2m,apparent_temperature,precipitation_probability,cloudcover,relativehumidity_2m,windspeed_10m"
        f"&daily=weathercode,temperature_2m_max,temperature_2m_min"
        f"&timezone=America%2FChicago"
    )

    response = requests.get(url).json()
    emoji_map = {
        0: "☀️",
        1: "🌤️",
        2: "⛅",
        3: "☁️",
        45: "🌫️",
        48: "🌫️",
        51: "🌦️",
        53: "🌦️",
        55: "🌧️",
        61: "🌧️",
        63: "🌧️",
        65: "🌧️",
        71: "❄️",
        73: "❄️",
        75: "❄️",
        80: "🌧️",
        81: "🌧️",
        82: "🌧️",
        95: "⛈️",
        96: "⛈️",
        99: "⛈️"
    }

    return render_template(
        "index.html",
        hours=response["hourly"]["time"],
        temps=response["hourly"]["temperature_2m"],
        feels_like=response["hourly"]["apparent_temperature"],
        precip_prob=response["hourly"]["precipitation_probability"],
        cloudcover=response["hourly"]["cloudcover"],
        humidity=response["hourly"]["relativehumidity_2m"],
        wind=response["hourly"]["windspeed_10m"],
        daily=response["daily"],
        emoji_map=emoji_map,
        city=city_name,
        lat=lat,
        lon=lon
    )



if __name__ == "__main__":
    app.run(debug=True)