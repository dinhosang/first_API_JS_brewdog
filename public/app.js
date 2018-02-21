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
  const listItem = document.createElement('li')
  const beerDiv = document.createElement('div')

  const namePara = document.createElement('p')
  const newImg    = document.createElement('img')

  namePara.innerText = beer.name

  newImg.classList.add('beer_image')
  newImg.src    = beer.image_url

  beerDiv.appendChild(namePara)
  beerDiv.appendChild(newImg)

  listItem.appendChild(beerDiv)
  mainList.appendChild(listItem)
}

document.addEventListener('DOMContentLoaded', onPageLoad);
