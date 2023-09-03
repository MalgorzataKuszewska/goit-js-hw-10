import axios from 'axios';

const apiKey =
  live_cbkzkrcE1WTY81HQBMZT6QzaXFg5qiMpRLuvaRXgbik6lfQkiG2PHlZArmp7aS0L;
axios.defaults.headers.common['x-api-key'] = apiKey;

export function fetchBreeds() {
  return axios
    .get('https://api.thecatapi.com/v1/breeds')
    .then(response => {
      return response.data;
    })
    .catch(error => {
      throw error;
    });
}

export function fetchCatByBreed(breedId) {
  const params = {
    breed_ids: breedId,
  };

  return axios
    .get('https://api.thecatapi.com/v1/images/search', { params })
    .then(response => {
      return response.data[0];
    })
    .catch(error => {
      throw error;
    });
}
