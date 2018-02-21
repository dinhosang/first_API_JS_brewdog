const onPageLoad = function () {
  requestToAPI()
};

const requestToAPI = function() {
  const request = new XMLHttpRequest()
  request.open('GET', "https://api.punkapi.com/v2/beers")
  request.addEventListener('load', convertJson)
  request.send()
}

const convertJson = function() {
  const jsonString  = this.responseText
  const beers       = JSON.parse(jsonString)

  populateList(beers)
}

const populateList = function(beers) {
  const mainList = document.getElementById('list_of_beers')
  beers.forEach(beer => createListItem(beer, mainList))
}

const createListItem = function(beer, mainList) {
  const newListItemName = document.createElement('li')
  const newListItemImg  = document.createElement('li')
  const newImg    = document.createElement('img')
  const breakLine = document.createElement('br')

  newListItemName.innerText = beer.name

  newImg.width  = '50'
  newImg.src    = beer.image_url

  newListItemImg.appendChild(newImg)

  mainList.appendChild(newListItemName)
  mainList.appendChild(newListItemImg)
  mainList.appendChild(breakLine)
}

document.addEventListener('DOMContentLoaded', onPageLoad);
