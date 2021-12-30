const allCountriesURL = "https://restcountries.com/v3.1/all";
const countryByURL = "https://restcountries.com/v3.1/name/";
const countriesByRegion = "https://restcountries.com/v3.1/region/";

const CountriesManager = {
  countries: [],
  async fetchCountryByName(name) {
    try {
      const response = await $.ajax(countryByURL + name);
      this.countries = response;
      $(".search-results-wrapper").addClass("active");
      this.syncLSandUI();
    } catch (error) {
      console.log(error);
    }
  },

  getTotalPopulation() {
    return this.countries.reduce((acc, curr) => acc + curr.population, 0);
  },

  handleSubmit() {
    const value = $("input").val().toLowerCase();
    this.fetchCountryByName(value);
  },

  syncLSandUI() {
    document.dispatchEvent(new CustomEvent("searched"));
  },
};
