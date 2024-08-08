document.addEventListener("DOMContentLoaded", () => {
  const menu = document.querySelector(".menu");
  const menuBtn = document.querySelector(".menu-btn");
  const menuBtnIcons = document.querySelectorAll(".menu-btn svg");
  const wheather = document.querySelector(".weather");
  const newsCard = document.querySelector(".news .card");
  const backToTopBtn = document.querySelector(".back-to-top");

  backToTopBtn.style.display = "none";

  function showBackToTopBtn() {
    if (window.scrollY > 100) {
      backToTopBtn.style.display = "flex";
    } else {
      backToTopBtn.style.display = "none";
    }
  }

  window.addEventListener("scroll", showBackToTopBtn);

  const newsAPI = {
    key: "xElYqPr2L8NpjZuCcP0Lh2oxqk6wIInGYMpF5CuJ",
    base: "https://api.thenewsapi.com/v1/news/top",
  };

  const weatherAPI = {
    key: "243544165c25843de3dddf33eeef9f76",
    base: "https://api.openweathermap.org/data/2.5/",
  };

  wheather.innerHTML = "Getting weather...";
  newsCard.innerHTML = "Getting latest news...";

  function getLatestNews() {
    const url = `${newsAPI.base}?api_token=${newsAPI.key}&language=en&location=za&limit=1`;
    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        data = data.data;
        console.log(data);
        console.log(data[0].title);
        console.log(data[0].image_url);
        console.log(data[0].url);
        console.log(data[0].published_at);

        newsCard.innerHTML = `
        <img src="${
          data[0].image_url
            ? data[0].image_url
            : "https://plus.unsplash.com/premium_photo-1688561384438-bfa9273e2c00?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        }" alt="news">
        <h3 class="headline">${data[0].title}</h3>
        <div class="content">
            <p class="date"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clock-fill" viewBox="0 0 16 16">
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71z"/>
              </svg><span>${data[0].published_at.split("T")[0].split("-").reverse().join("/")}</span>
            </p>
            <a class="read-more" href="${
              data[0].url
            }" target="_blank">READ MORE</a>
        </div>
        `;
      });
  }

  function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      wheather.innerHTML = "Geolocation is not supported by this browser.";
      wheather.style.color = "red";
    }
  }

  function showPosition(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;

    console.log(lat, lon);
    const url = `${weatherAPI.base}forecast?lat=${lat}&lon=${lon}&mode=json&units=metric&appid=${weatherAPI.key}`;

    fetch(url)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        wheather.innerHTML = `
        <img src="" alt="WeatherImage">
        <div class="content">
            <p class="temperature"></p>
            <p class="city"></p>
        </div>`;
        const wheatherImage = document.querySelector(".weather > img");
        const temperature = document.querySelector(
          ".weather .content .temperature"
        );
        const town = document.querySelector(".weather .content .city");

        town.textContent = `${data.city.name}, ${data.city.country}`;
        temperature.textContent = `${data.list[0].main.temp}°C`;
        wheatherImage.src = `https://openweathermap.org/img/wn/${data.list[0].weather[0].icon}@2x.png`;
      });
  }

  menuBtnIcons[0].style.display = "none";
  menuBtnIcons[1].style.display = "block";

  menuBtn.addEventListener("click", () => {
    menu.classList.toggle("active");
    changeIcon();
  });

  menu.addEventListener("click", () => {
    menu.classList.toggle("active");
    changeIcon();
  });

  function changeIcon() {
    if (menuBtnIcons[0].style.display === "block") {
      menuBtnIcons[0].style.display = "none";
      menuBtnIcons[1].style.display = "block";
    } else {
      menuBtnIcons[0].style.display = "block";
      menuBtnIcons[1].style.display = "none";
    }
  }

  getLocation();
  getLatestNews();
});
