
window.addEventListener('load', () => {
        let long;
        let lat;
        let temperatureDescription = document.querySelector(".temperature-descreption");
        let temperatureDegree = document.querySelector(".temperature-degree");
        let locationTimezone = document.querySelector(".location-timezone");
        let temperaturesection = document.querySelector('.temperature');
        const temperatureSpan = document.querySelector('.temperature span');
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                long = position.coords.longitude;
                lat = position.coords.latitude;

                const proxy = "https://cors-anywhere.herokuapp.com/";
                const api = `${proxy}https://api.darksky.net/forecast/fd9d9c6418c23d94745b836767721ad1/${lat},${long}`;

                fetch(api)

                    .then(response => {
                        return response.json();
                    })

                    .then((data) => {
                        const { temperature, summary, icon } = data.currently;
                        temperatureDegree.textContent = temperature;
                        temperatureDescription.textContent = summary;
                        locationTimezone.textContent = data.timezone;
                        // formula of C°
                        let cel = (temperature - 32) * (5 / 9);
                        // set icon
                        setIcons(icon, document.querySelector('.icon'));

                        //F to C
                        temperaturesection.addEventListener('click', () => {
                                if (temperatureSpan.textContent === "°F") {
                                    temperatureSpan.textContent = "°C";
                                    temperatureDegree.textContent = Math.floor(cel);
                                }
                                else {
                                    temperatureSpan.textContent = "°F";
                                    temperatureDegree.textContent = temperature;
                                }
                            });


                    });

            });


        }
        else {
            console.log("Please allow you location");
        }

        function setIcons(icon, iconID) {
            const skycons = new Skycons({ color: "white" });
            const currentIcon = icon.replace(/-/g, "_").toUpperCase();
            skycons.play();
            return skycons.set(iconID, Skycons[currentIcon]);
        }
    });
