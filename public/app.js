const onPageLoad = function () {
  requestToAPI()
};

const requestToAPI = function() {
  const request = new XMLHttpRequest()
  request.open('GET', "https://api.punkapi.com/v2/beers")
  // request.open('GET', "https://s3-eu-west-1.amazonaws.com/brewdogapi/beers.json")
  request.addEventListener('load', convertJson)
  request.send()
}

const convertJson = function() {
  const jsonString  = this.responseText
  const beers       = JSON.parse(jsonString)
  populateDropdown(beers)
}

const populateDropdown = function(beers) {
  const dropdown = document.getElementById('dropdown_beers')

  beers.forEach(beer => createOption(beer.name, dropdown))

  dropdown.addEventListener('change', findBeerChosen.bind(dropdown, beers))
}

const createOption = function(name, dropdown) {
  const newOption     = document.createElement('option')
  newOption.innerText = name

  dropdown.appendChild(newOption)
}

const findBeerChosen = function(beers) {
  const beerName = this.value

  const beer = beers.filter(beer => beer.name === beerName)[0]
  createListItem(beer)
}

const createListItem = function(beer) {
  const mainList = document.getElementById('beer_details')
  mainList.innerHTML = ''

  const listItem  = document.createElement('li')
  const beerDiv   = document.createElement('div')

  const namePara  = document.createElement('p')
  const newImg    = document.createElement('img')
  const breakline = document.createElement('br')

  namePara.innerText = beer.name

  newImg.classList.add('beer_image')
  newImg.src    = beer.image_url

  beerDiv.appendChild(namePara)
  beerDiv.appendChild(newImg)

  listItem.appendChild(beerDiv)
  listItem.appendChild(breakline)
  mainList.appendChild(listItem)

  getIngredientNames(beer, mainList)
}

const getIngredientNames = function(beer, mainList) {
  const hops = beer.ingredients.hops
  const malt = beer.ingredients.malt
  const yeast = beer.ingredients.yeast

  const ingredients = {
    hops: [],
    malt: [],
    yeast: [yeast]
  }

  hops.forEach(function(hop){
    if(!ingredients.hops.includes(hop.name)){
      ingredients.hops.push(hop.name)
    }
  })

  malt.forEach(function(malt){
    if(!ingredients.malt.includes(malt.name)){
      ingredients.malt.push(malt.name)
    }
  })

  console.log(ingredients);

  populateIngredients(ingredients, mainList)

}

const populateIngredients = function(ingredients, list) {
  const ingredientDivOuter = document.createElement('div')
  ingredientDivOuter.innerHTML = ''
  const ingredientDivPara = document.createElement('p')
  const breakLine = document.createElement('br')

  ingredientDivPara.innerText = 'Ingredients'
  ingredientDivPara.classList.add('title')
  ingredientDivOuter.appendChild(ingredientDivPara)

  const ingredientDivInner = document.createElement('div')
  ingredientDivInner.classList.add('ingredients')

  createIngredientList(ingredientDivInner, ingredients.hops, 'Hops')
  createIngredientList(ingredientDivInner, ingredients.yeast, 'Yeast')
  createIngredientList(ingredientDivInner, ingredients.malt, 'Malt')

  ingredientDivOuter.appendChild(ingredientDivInner)
  list.insertAdjacentElement('afterend', ingredientDivOuter)
}

const createIngredientList = function(div, ingredients, type){
  const newSubDiv   = document.createElement('div')
  const newSubPara  = document.createElement('p')
  const newList     = document.createElement('ul')

  ingredients.forEach(function(name){
    const newItem = document.createElement('li')
    newItem.innerText = name
    newList.appendChild(newItem)
  })

  newSubPara.innerText = type
  newSubPara.classList.add('title')

  newSubDiv.appendChild(newSubPara)
  newSubDiv.appendChild(newList)
  div.appendChild(newSubDiv)
}


document.addEventListener('DOMContentLoaded', onPageLoad);
