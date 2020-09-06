import axios from 'axios';

const getCountry = async (countryName) => {
  try {
    const url = `https://restcountries.eu/rest/v2/name/${countryName}?fullText=true`;
    const country = await axios.get(url);
    return country.data[0];
  } catch (e) {
    return e;
  }
};

export default { getCountry };
