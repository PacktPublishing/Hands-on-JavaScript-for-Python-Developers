var swapi;

$(document).ready(function() {
  swapi = new SWAPI;
});

var SWAPI = function() {
  this.constructor();
  this.getPeople('https://swapi.co/api/people/', this.people);
  $('.go').click(function(e) {
    swapi.getPerson($('#peopleSelector').val())
  });
};

SWAPI.prototype.constructor = function() {
  this.$loader = $('#loader');
  this.people = [];
};

SWAPI.prototype.getPeople = function(url, arr) {
  $.get(url)
    .done(function(data) {
      for (var i = 0; i < data.results.length; i++) {
        swapi.people.push(data.results[i]);
      }

      if (data.next !== null) {
        swapi.getPeople(data.next, arr)
      } else {
        var $peopleSelector = $('#peopleSelector');

        for (var i = 0; i < swapi.people.length; i++) {
          var person = swapi.people[i];
          var $option = $("<option></option");
          $option.val(person.url);
          $option.html(person.name);
          $peopleSelector.append($option);

        }

        swapi.$loader.toggle();
        $('#people').show();
      }
    })
    .fail(function(error) {
      console.log(error);
    });
};

SWAPI.prototype.getPerson = function(url) {
  swapi.$loader.toggle();
  $.get(url)
    .done(function(data) {
      $('#person').show();
      $('#person h2').html(data.name);
      swapi.$loader.toggle();
    })
    .fail(function(error) {
      console.log(error);
    });
}
