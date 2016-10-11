function GameManager(ready) {
  var victory = false;
  var gm = this;
  var defaultSearchCost = 500;
  var defaultTravelCost = 800;

  var cities = ['London', 'Bangkok', 'Paris', 'Dubai', 'Instanbul', 'New York', 'Singapore', 'Kualal Lumpur', 'Seoul', 'Hong Kong', 'Tokyo', 'Barcelona', 'Amsterdam', 'Rome', 'Milan', 'Taipei', 'Vienna', 'Prague', 'Los Angeles'];

  console.log('setting up the Gumshoe budget')
  var gumshoe = {
    budget: 10000,
    city: 'New York'
  }

  console.log('Carmen is Finding her hat and boots....')
  var carmen = {
    firstName: 'Carmen',
    lastName: 'Sansiego tm',
    wanted: true
  };

  console.log('initiating countdown')
  var countdown = 4;
  hideCarmen();

  function hideCarmen() {
    setTimeout(function() {
      countdown--;
      if (countdown > 0) {
        console.log(countdown)
        return hideCarmen();
      } else {
        carmen.city = getRandomCity();
        console.log(`Oh no, it would appear that Carmen Sandiego, The thieving villian is on the loose its your job to track her down and bring her to justice Gumshoe. You have a budget of $${gumshoe.budget} to find her.`)
        return ready(gm);
      }
    }, 1000)
  }

  function getRandomCity(){
    var randI = Math.floor(Math.random() * cities.length);
    var city = cities[randI];
    return city;
  }

  function getClue(){
    return `Bar Keep: "A women wearing a red hat and black boots is more likely found in ${getRandomCity()}" `
  }


  function getCityIndex(to) {
    for (var i = 0; i < cities.length; i++) {
      var c = cities[i];
      if (c == to) {
        return i;
      }
    }
  }

  gm.getCities = function() {
    return cities;
  }
  
  gm.getGumshoe = function() {
    return gumshoe;
  }

  gm.getTravelCost = function(to) {
    return (defaultTravelCost * (((getCityIndex(to) + 1) + (getCityIndex(gumshoe.city) + 1)) / 30)).toFixed()
  }

  gm.getSearchCost = function() {
    return (defaultSearchCost * (gumshoe.city.length / 10)).toFixed()
  }

  gm.flyTo = function(to, cb) {
    var cost = gm.getTravelCost(to);
    if (gumshoe.budget - cost > 0) {
      console.log(`Flight departing for ${to} from ${gumshoe.city} leaving now`)
      gumshoe.budget -= cost;
      gumshoe.city = to;
      setTimeout(function(){
        console.log(`You have arrived at ${to} thank you for flying skyblue`);
        cb();
      }, 1500)
    }else{
      console.error('Error: you don\'t have the budget necessary to fly there.')
    }
  }

  gm.checkGuess = function(callback) {
    var cost = gm.getSearchCost(gumshoe.city);
    if (gumshoe.budget - cost < 0) {
      console.error('Error: you don\'t have the budget necessary to search here.')
      return callback(false);
    }
    console.log('Scouring the city to find Carmen')
    setTimeout(function() {
      gumshoe.budget -= cost;
      victory = gumshoe.city == carmen.city
      if(!victory){
        console.log(getClue())
      }
      callback(victory);
    }, 1000)
  }
}
