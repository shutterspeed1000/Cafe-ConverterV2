// GPS coordinate map on page load.

let gpslat = "";
let gpslong = "";

window.onload = function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    // do nothing
  }
};

function showPosition(position) {
  gpslat = position.coords.latitude;
  gpslong = position.coords.longitude;

  $(`#map`).replaceWith(
    `<iframe id="map" class="container-fluid shadow p-3 mb-5 bg-body-tertiary rounded-5" width="600" height="450" style="border:0" loading="lazy" allowfullscreen
        referrerpolicy="no-referrer-when-downgrade"
        src="https://www.google.com/maps/embed/v1/search?key=AIzaSyD7RDg8X7uUVnvqkUwNzH0WpdBRlypx8v0&q=Coffee+shops+near+me&center=${gpslat},${gpslong}&zoom=14">
    </iframe>`
  );
}

// City search bar and map call.
$(`#citySubmit`).on("click", function () {
  let city = $(`#city`).val();

  $(`#map`).replaceWith(
    `<iframe id="map" class="container-fluid shadow p-3 mb-5 bg-body-tertiary rounded-5" width="600" height="450" style="border:0" loading="lazy" allowfullscreen
        referrerpolicy="no-referrer-when-downgrade"
        src="https://www.google.com/maps/embed/v1/search?key=AIzaSyD7RDg8X7uUVnvqkUwNzH0WpdBRlypx8v0&q=Coffee+shops+${city}+Europe">
    </iframe>`
  );
});

// Currency Conversion API
// global variables
let cururl = `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/eur.json`;

let eur = "";
let usdbox = "";
let usdconv = "";

// function to currency api
async function convert(eur) {
  try {
    const response = await fetch(cururl);
    let info = await response.json();
    let eurToUsdRate = info.eur.usd;
    let usdCalc = eur * eurToUsdRate;
    return usdCalc.toFixed(2);
  } catch (error) {
    console.error("Error: " + error);
    return null;
  }
}

// Button click for currency convert
$(`#currencyCon`).on("click", async function () {
  eur = $(`#eur`).val();
  $("#usd").val("$" + (await convert(eur)));
});

// Translator
const url = `https://xlate.spwphoto.com/translate`;
let englishInput = "";
let lang = "";
let translateOutput = "";
let savedOrder = localStorage.getItem(0);

$(document).ready(function () {
  $(".dropdown-item").click(function () {
    var selectedItemID = $(this).attr("id");
    var selectedItemText = $(this).text();
    $("#selectLang").text(selectedItemText);
    lang = selectedItemID;
  });
});

// updates to resolve promise from return in function

$(`#translateButton`).on("click", async function () {
  englishInput = $(`#englishInput`).val();
  localStorage.setItem(0, englishInput);
  $(`#translateOutput`).val(await xlate(englishInput, lang));
});

if (localStorage.getItem(0) !== null) {
  $("#englishInput").val(savedOrder);
}

// updated to full async/await
async function xlate(phrase, target) {
  try {
    const response = await fetch(url, {
      method: "POST",
      retry: 5,
      body: JSON.stringify({
        q: `${phrase}`,
        source: "en",
        target: `${target}`,
        format: "text",
        api_key: "",
      }),
      headers: { "Content-Type": "application/json" },
    });

    let data = await response.json();
    let xlated = await data.translatedText;

    return xlated;
  } catch (error) {
    console.error("Error: " + error);
    return null;
  }
}
