var swapi;

$(document).ready(function() {
  swapi = new SWAPI;
});

var SWAPI = function() {
  this.constructor();
  this.getPeople('https://swapi.co/api/people/', this.people);
};

SWAPI.prototype.constructor = function() {
  this.$loader = $('#loader');
  this.people = [];
};

SWAPI.prototype.getPeople = function(url, arr) {
  $.get({
    url: url
  }, function(data) {
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
  });
};
