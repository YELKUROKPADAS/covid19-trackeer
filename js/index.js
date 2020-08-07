let countriesElem = document.getElementById("countries"),
  recoveredElem = document.getElementById("recovered"),
  deathsElem = document.getElementById("deaths"),
  totalElem = document.getElementById("total"),
  allcountriesElem = document.getElementById("all-countries"),
  activeElem = document.getElementById("active"),
  countryElem = document.getElementById("country");
let listofcountries;

window.onload = function () {
  fetchCovidData("Ghana");
};
countriesElem.addEventListener("change" ,function()
{
  fetchCovidData(this.value);
});

function fetchCovidData(country) {
  let xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      let data =JSON.parse(xhr.response);
      let ctry = data.Countries.filter( (c)=> c.Country==country);
      
      
      displayCountryData(ctry);
      populatedTableData(data);
      populatedCountryList(data);
    }
  };

  xhr.open("GET", "https://api.covid19api.com/summary");
  xhr.send();
}

function populatedTableData(list) { 
  let  count = 1;
  allcountriesElem.innerHTML = list.Countries.map((c)=>
    
      `
  <tr>
  <td>${count++} </td>
  <td>${c.Country} </td>
  <td>${c.TotalRecovered} </td>
  <td>${c.TotalConfirmed} </td>
  <td>${c.NewConfirmed} </td>
  <td>${c.TotalDeaths} </td>
  </tr>  
     `
  );
  
}

function displayCountryData(country) {
  countryElem.innerHTML = `<strong> ${country[0].Country}</strong>`;
  totalElem.innerText = country[0].TotalConfirmed;
  recoveredElem.innerText = country[0].TotalRecovered;
  activeElem.innerText = country[0].NewConfirmed;
  deathsElem.innerText = country[0].TotalDeaths;
 }

function populatedCountryList(data) {
  let list = data.Countries.map((c)=>c.Country);
  countriesElem.innerHTML = list.map(
    (c) => `<option value="${c}"> ${c}</option>`
    
  );
 }



// const covid = {
//   Global: {
//     NewConfirmed: 257911,
//     TotalConfirmed: 18539385,
//     NewDeaths: 6956,
//     TotalDeaths: 700634,
//     NewRecovered: 221735,
//     TotalRecovered: 11134084,
//   },
//   Countries: [
//     {
//       Country: "Afghanistan",
//       CountryCode: "AF",
//       Slug: "afghanistan",
//       NewConfirmed: 35,
//       TotalConfirmed: 36782,
//       NewDeaths: 0,
//       TotalDeaths: 1288,
//       NewRecovered: 0,
//       TotalRecovered: 25669,
//       Date: "2020-08-05T09:44:54Z",
//       Premium: {},
//     },
//     {
//       Country: "Albania",
//       CountryCode: "AL",
//       Slug: "albania",
//       NewConfirmed: 130,
//       TotalConfirmed: 5750,
//       NewDeaths: 4,
//       TotalDeaths: 176,
//       NewRecovered: 0,
//       TotalRecovered: 3031,
//       Date: "2020-08-05T09:44:54Z",
//       Premium: {},
//     },
//     {
//       Country: "Algeria",
//       CountryCode: "DZ",
//       Slug: "algeria",
//       NewConfirmed: 532,
//       TotalConfirmed: 32504,
//       NewDeaths: 9,
//       TotalDeaths: 1248,
//       NewRecovered: 474,
//       TotalRecovered: 22375,
//       Date: "2020-08-05T09:44:54Z",
//       Premium: {},
//     },
//   ],
// };
// alert(covid.Countries[2].Country);


