(function () {
  // hide patient info screen to start
  $("#page-three").hide();
  // $("#page-one").hide();

  $.getJSON("data/case-desc.json", function(casesJson) {
    displayCases(casesJson);
  })
  .fail(function (error) {
    console.log("Error loading data");
  });


  function displayCases(cases) {

    $("#case-selection").empty();
    $.each(cases, function (index, value) {
      $("#case-selection").append("<option>"+
          value["PatientName"]+" - "+value["ChiefComplaint"]+
          "</option>");
    });

  }

})();
