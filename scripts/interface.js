const renderSearchResults = () => {
  let pageHtml = "";
  CountriesManager?.countries.forEach((country) => {
    console.log(country);
    const { name, population, flags, maps } = country;
    pageHtml += `
     <div class="search-result-item">
              <div class="search-results-name">
                <img src="${flags.svg}"/>
                <span>${name.common} - ${name.official}</span>
                <a href="${maps.googleMaps}" target="_blank">
                <i class="fas fa-map"></i>
                </a>
              </div>
              <div class="search-results-citizens">
                <span>${population.toLocaleString()}</span>
              </div>
            </div>
    `;
  });

  $("#total").html(`Total Countries Population: ${CountriesManager.getTotalPopulation().toLocaleString()}`);
  $("#average").html(`Average Population: ${Math.trunc(CountriesManager.getTotalPopulation() / CountriesManager.countries.length).toLocaleString()}`);
  $("#total-countries").html(`Total Countries Found: ${CountriesManager.countries.length}`);
  $(".top").html(pageHtml);
};
const renderRegionSearchResults = () => {
  let pageHtml = "";
  const mappedRegions = CountriesManager.countries.reduce((prevObj, item) => {
    prevObj[item.region] = prevObj[item.region] ? prevObj[item.region] + 1 : 1;

    return prevObj;
  }, {});
  Object.entries(mappedRegions).forEach(([key, value]) => {
    pageHtml += `
    <div class="search-result-item">
              <div class="search-results-name">
                <span>${key}</span>
              </div>
              <div class="search-results-citizens">
                <span>${value}</span>
              </div>
            </div>
    `;
  });

  $(".mid").html(pageHtml);
};

const renderOnMount = () => {
  $(".on-mount").html(`
  <div>
  <h1 class="gradient-title">Search for countries to start 😊</h1>
  </div>
  `);
};

$("form").on("submit", (e) => {
  e.preventDefault();
  if (!$("input").val()) return;
  $(".on-mount").hide();
  CountriesManager.handleSubmit();
});

document.addEventListener("searched", () => {
  renderSearchResults();
  renderRegionSearchResults();
});

$(document).ready(() => {
  if (!CountriesManager.countries.length) renderOnMount();
});
