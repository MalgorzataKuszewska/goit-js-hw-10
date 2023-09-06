import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

const breedSelect = document.querySelector('.breed-select');

function populateBreedsSelect(breeds) {
  breeds.forEach(breed => {
    const option = document.createElement('option');
    option.value = breed.id;
    option.textContent = breed.name;
    breedSelect.appendChild(option);
  });
}

fetchBreeds()
  .then(breeds => {
    populateBreedsSelect(breeds);
  })
  .catch(error => {
    console.error('Błąd podczas pobierania ras:', error);
  });

const catInfoDiv = document.querySelector('.cat-info');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');

breedSelect.addEventListener('change', () => {
  const selectedBreedId = breedSelect.value;

  catInfoDiv.style.display = 'none';
  loader.style.display = 'block';
  error.style.display = 'none';

  fetchCatByBreed(selectedBreedId)
    .then(catData => {
      catInfoDiv.innerHTML = `
        <h2>${catData.breeds[0].name}</h2>
        <p><strong>Opis:</strong> ${catData.breeds[0].description}</p>
        <p><strong>Temperament:</strong> ${catData.breeds[0].temperament}</p>
        <img src="${catData.url}" alt="${catData.breeds[0].name}" />
      `;
    })
    .catch(fetchError => {
      console.error('Błąd podczas pobierania informacji o kocie:', fetchError);
      error.style.display = 'block';
    })
    .finally(() => {
      loader.style.display = 'none';
      catInfoDiv.style.display = 'block';
    });
});
