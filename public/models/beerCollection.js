let instance = null

const BeerCollection = function(){

  if(!instance){
    instance = this
    // // to test singleton
    // this.time = new Date()
    this.requestToAPI()
  }

  return instance
}

BeerCollection.prototype.requestToAPI = function () {
  const request = new XMLHttpRequest()
  request.open('GET', "https://api.punkapi.com/v2/beers")
  request.addEventListener('load', this.convertJson.bind(request, this))
  request.send()
}

BeerCollection.prototype.convertJson = function(beerCollection) {
  const jsonString  = this.responseText
  const beers       = JSON.parse(jsonString)
  beerCollection.beers = beers
}
