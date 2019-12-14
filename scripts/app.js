(function () {

  page1 = document.getElementById('page-one');
  page2 = document.getElementById('page-two');
  page3 = document.getElementById('page-three');

  // hide patient info screen to start
  page3.style.display = 'none';
  // page1.style.display = 'none';

  $.getJSON("data/case-desc.json", function(casesJson) {
    displayCases(casesJson);
  })
  .fail(function (error) {
    console.log("Error loading data");
  });

  function displayCases(cases) {

    // empty case list
    $("#case-selection").empty();
    // loop through cases to build list
    $.each(cases, function (index, value) {
      $("#case-selection").append("<option value="+value["CaseNumber"]+">"+
          value["PatientName"]+" - "+value["ChiefComplaint"]+
          "</option>");
    });

    // button selects case
    $("#select-btn").on("click", function (e) {
      console.log($("#case-selection").children("option:selected").val());
      $("#case-list").modal("hide");

      // select case with selected ID number
      var caseNumber = $("#case-selection").children("option:selected").val();
      var caseDetails = [];
      $.each(cases, function (index, value) {
        if (value["CaseNumber"] == caseNumber) {
          caseDetails = value;
        }
      });

      // hide case selection area and show case details
      $("#page-one").hide();
      $("#page-three").show();

      // build case details page
      showCase(caseDetails);
    });

  } //end displayCases

  function showCase(details) {
    $("#patient-name").append(details["PatientName"]);
    console.log(details["History1"] + details["History2"]);
    $("#HPI").append(details["History1"] + details["History2"]);
  }

})();
