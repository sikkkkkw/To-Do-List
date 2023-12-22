// 초기 코드
// const API_KEY = "1e2801038a61d47511e207955ac4db1f";

// function onGeoSuccess(position){ //성공 시 함수 호출
//     // console.log(position)
//     const lat =position.coords.latitude;
//     const lon = position.coords.longitude;
//     // console.log(lat,lon) //현재 위치
//     const url =`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
//     fetch(url)
//     .then(response => response.json())
//     .then(data=>{
//         console.log(data);
//         const weather=document.querySelector("#weather");
//         weather.innerText = `${data.weather[0].main} ${data.main.temp}`
//     })
// }
// function onGeoFail(){ // 실패 시 함수 호출
//     alert("현재 위치를 가져올 수 없습니다.")
// }
// navigator.geolocation.getCurrentPosition(onGeoSuccess,onGeoFail)

// ----------------------------------------------------------------
const API_KEY = "1e2801038a61d47511e207955ac4db1f";

function onGeoSuccess(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      const weatherElement = document.querySelector("#weather");
      const weatherDescription = data.weather[0].main;
      const temperature = data.main.temp;

      // 날씨 텍스트 업데이트
      //   weatherElement.innerText = `${weatherDescription} ${temperature}°C`;

      // 날씨 상태에 따라 이미지 업데이트
      const weatherImage = document.createElement("img");
      weatherImage.alt = weatherDescription;
      weatherImage.src = getWeatherImage(weatherDescription, data.dt);
      weatherElement.appendChild(weatherImage).classList.add("weatherImg");
    });
}

function onGeoFail() {
  alert("현재 위치를 가져올 수 없습니다.");
}

function getWeatherImage(weatherDescription, timestamp) {
  const hour = new Date(timestamp * 1000).getHours();

  // 날씨 조건 및 시간에 따라 필요한 만큼 더 많은 케이스를 추가하세요.
  if (weatherDescription.toLowerCase() === "clear") {
    if (hour >= 6 && hour < 18) {
      return "./images/맑은낮.png";
    } else {
      return "./images/맑은밤.png";
    }
  } else if (weatherDescription.toLowerCase() === "clouds") {
    if (hour >= 6 && hour < 18) {
      return "./images/흐린낮.png";
    } else {
      return "./images/흐린밤.png";
    }
  } else if (weatherDescription.toLowerCase() === "rain") {
    return "./images/비오는날.png";
  } else if (weatherDescription.toLowerCase() === "cloudy") {
    return "./images/구름하늘.png";
  } else {
    // 기본 이미지가 없으므로 빈 문자열 반환
    return "";
  }
}

navigator.geolocation.getCurrentPosition(onGeoSuccess, onGeoFail);
