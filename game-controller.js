function startGame() {
  new GameManager(function (gm) {


    var cities = gm.getCities()
    cities.forEach(function (city) {
      $('#cities').append(`<button class='city-button' id='${city}'>${city}</button>`)
    })
    var city = gm.getGumshoe().city;
    var budget = gm.getGumshoe().budget;
    $('#budget').html(budget);
    $('#current-city').html(city);
    $('#search-cost').html(gm.getSearchCost())

    $('body').on('click', '.city-button', function () {
      gm.flyTo(this.id, function (a) {
        update();
      })
    })
    $('body').on('click', '#search-btn', function () {
      budget = gm.getGumshoe().budget
      budget = budget - (gm.getSearchCost());
      update()
      gm.checkGuess(function (a) {
        return a
      })
      gm.checkGuess(function (victory) {
        if (victory) {
          alert('Woot you have captured the infamous Carmen')
        } else {
          alert('Good Try, but Carmen is not in this city! Keep on searching!')
        }
      })
    })
   
    function update() {
      gm.getGumshoe()
      var city = gm.getGumshoe().city;
      var budget = gm.getGumshoe().budget;
      $('#budget').html(budget);
      $('#current-city').html(city);
    }
  })
}


$('#start').on('click', startGame);





var x = 7
x

