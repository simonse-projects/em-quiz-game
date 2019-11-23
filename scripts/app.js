(function () {
  // hide patient info screen to start
  $("#page-three").hide();
  // $("#page-one").hide();

  Papa.parse("data/CaseDatawHeaders.csv", {
    header: true,
    delimiter: ",",
    complete: function(results) {
      console.log("Finished");
      displayCases(results);
    }
  })


  function displayCases(cases) {
    console.log(cases);
  }

})();
