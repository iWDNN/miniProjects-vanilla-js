const mealCt = document.getElementById('meal-ct')
const favCt = document.getElementById('fav-ct')

const logoEl = document.querySelector('.logo')
const searchBtn = document.querySelector('.search-bar .search-btn')
const favBtn = document.querySelector('.btn-group .fav-btn')

async function getRandomMeal() {
  const res = await fetch('https://www.themealdb.com/api/json/v1/1/random.php')
  const resData = await res.json()
  const meal = resData.meals[0]

  showMeal(meal, true)
}
async function getMealbySearch(term) {
  const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${term}`)
  const resData = await res.json()
  const meals = resData.meals
  return meals
}
async function getMealbyId(id) {
  const res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
  const resData = await res.json()
  const meal = resData.meals[0]
  return meal
}

getRandomMeal()
fetchFavMeals()

function showMeal(mealData, random = false, fav = false) {
  const meal = document.createElement('div')
  const ingredients = []
  for (let i = 1; i <= 20; i++) {
    if (mealData['strIngredient' + i]) {
      ingredients.push(`${mealData['strIngredient' + i]} - ${mealData['strMeasure' + i]}`)
    }
  }
  console.log(ingredients)
  meal.classList.add('meal-info')
  meal.innerHTML = `
    <div class="img">
    ${random === false ? '' : '<div class="tag">Random Recipe</div>'}
    ${fav === false ? '' : '<div class="tag">Favorite Recipe</div>'}
      <img src="${mealData.strMealThumb}" alt="">
    </div>
    <div class="title">
      <span class="category">${mealData.strCategory}</span>
      <span class="main">${mealData.strMeal}</span>
    </div>
    <div class="info">
      <div class="desc">
        ${mealData.strInstructions}
      </div>
      <h5>Ingredients / Measures</h5>
      <div class="ingredients">
        <ul>
          ${ingredients.map((el) =>
    `<li>${el}</li>`
  ).join("")}
        </ul>
      </div>
      <button class="btn">
        <i class="fas fa-star"></i>
      </button>
    </div>
  `
  mealCt.appendChild(meal)
  const btn = meal.querySelector('.btn')
  btn.addEventListener('click', () => {
    if (btn.classList.contains('active')) {
      rmLS(mealData.idMeal)
    } else {
      toLS(mealData.idMeal)
    }
    fetchFavMeals()
    btn.classList.toggle('active')
  })
}
function cleanMealCt() {
  mealCt.innerHTML = ``
}
function fetchFavMeals() {
  favCt.innerHTML = `
    <li class="skeleton"></li>
  `
  const mealIds = getLS()
  mealIds.forEach(async (id, index) => {
    const mealData = await getMealbyId(id)
    showFavMeals(mealData, false, true)
  })
}
function showFavMeals(mealData) {
  const meal = document.createElement('li')
  meal.innerHTML = `
    <div class="fav-img">
      <img src="${mealData.strMealThumb}" alt="${mealData.strMeal}">
      <button class="close-btn">
        <i class="fas fa-close"></i>
      </button>
    </div>
    <span>${mealData.strMeal}</span>
  `
  favCt.appendChild(meal)
  const closeBtn = meal.querySelector('.close-btn')
  meal.addEventListener('click', () => {
    cleanMealCt()
    showMeal(mealData)
  })
  closeBtn.addEventListener('click', () => {
    rmLS(mealData.idMeal)
    fetchFavMeals()
  })
}
searchBtn.addEventListener('click', async () => {
  favBtn.classList.remove('active')
  const inputEl = document.querySelector('.search-bar input')
  const meals = await getMealbySearch(inputEl.value)
  cleanMealCt()
  if (meals) {
    meals.forEach(meal => {
      showMeal(meal)
    })
  } else {
    mealCt.innerHTML = `
    <div class="wrap">
      <h2 class="no-result">No results for Search</h2>
    </div>
    `
  }
})
favBtn.addEventListener('click', () => {
  cleanMealCt()
  favCt.innerHTML = ``
  favBtn.classList.toggle('active')
  if (favBtn.classList.contains('active')) {
    const mealIds = getLS()
    mealIds.forEach(async (id) => {
      const mealData = await getMealbyId(id)
      showMeal(mealData, false, true)
    })
  } else {
    fetchFavMeals()
    getRandomMeal()
  }
})
logoEl.addEventListener('click', () => {
  fetchFavMeals()
  favBtn.classList.remove('active')
  cleanMealCt()
  getRandomMeal()
})


function toLS(mealId) {
  const mealIds = getLS()
  localStorage.setItem('mealIds', JSON.stringify([...mealIds, mealId]))
}
function rmLS(mealId) {
  const mealIds = getLS()
  localStorage.setItem('mealIds', JSON.stringify(
    mealIds.filter(id => id !== mealId)
  ))
}
function getLS() {
  const mealIds = JSON.parse(localStorage.getItem('mealIds'))
  return mealIds === null ? [] : mealIds
}
