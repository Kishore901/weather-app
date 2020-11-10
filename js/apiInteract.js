class Forecast {
  constructor() {
    this.key = "NHALStB1JhZ339NKmYsafoPSi0GcmuX3";
    this.cityURI =
      "http://dataservice.accuweather.com/locations/v1/cities/search";
    this.weatherURI =
      "http://dataservice.accuweather.com/currentconditions/v1/";
  }
  async updateCity(city) {
    const cityDets = await this.getCity(city);
    const weather = await this.getweather(cityDets.Key);

    return {
      cityDets: cityDets,
      weather: weather,
    };
  }
  async getCity(city) {
    const query = `?apikey=${this.key}&q=${city}`;

    const response = await fetch(this.cityURI + query);
    const data = await response.json();
    return data[0];
  }
  async getweather(id) {
    const query = `${id}?apikey=${this.key}`;

    const response = await fetch(this.weatherURI + query);
    const data = await response.json();
    return data[0];
  }
}
