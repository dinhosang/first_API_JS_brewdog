let instance = null

// this doesn't work as the constructor returns before the
// request is completed. Can't find a workaround it.
// would need to be able to delay the return until this event
// happened
const BeerCollection = function(){
  // // to test singleton
  // console.log(!instance);
  if(!instance){
    // // to test singleton
    // this.time = new Date()
    this.requestToAPI()
  }

  return instance

  this.beers = []
}

BeerCollection.prototype.requestToAPI = function () {
  const request = new XMLHttpRequest()
  request.open('GET', "https://api.punkapi.com/v2/beers")
  request.addEventListener('load', this.convertJson.bind(this, request))
  request.send()
}

BeerCollection.prototype.convertJson = function(request) {
  const jsonString  = request.responseText
  this.beers        = JSON.parse(jsonString)
  instance = this
}
