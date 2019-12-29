(function () {

  page1 = document.getElementById('page-one');
  page2 = document.getElementById('page-two');
  page3 = document.getElementById('page-three');

  // hide patient info screen to start
  page3.style.display = 'none';
  // page1.style.display = 'none';

  // collapsible areas
  var coll = document.getElementsByClassName("collapsible");
  var i;

  for (i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function() {
      this.classList.toggle("active");
      var content = this.nextElementSibling;
      if (content.style.display === "block") {
        content.style.display = "none";
      } else {
        content.style.display = "block";
      }
    });
  }



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
          value["PatientName"]+" - "+value["Age"]+value["Gender"]+" - "+
          value["ChiefComplaint"]+"</option>");
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
      page1.style.display = 'none';
      page3.style.display = 'block';

      // build case details page
      showCase(caseDetails);
    });

  } //end displayCases

  function showCase(details) {
    $("#patient-name").append(details["PatientName"]);
    // console.log(details["History1"] + details["History2"]);
    $("#HPI").append(details["History1"] + details["History2"]);
    var VSRhythm = document.getElementById("VSRhythm");
    VSRhythm.innerHTML = "<img src='images/VRhythm_NSR.png' width=50%>"

    // list of vitals
    var vitalsList = ["VSPulse", "VSSBP", "VSDBP", "VSO2Sat", "VSTemperature", "VSRespiratoryRate"];
    // loop over array to print on screen
    vitalsList.forEach(function (item, index) {
      var el = document.getElementById(item);
      el.innerHTML = details[item];

    });

    // patient encounter
    var ROSList = ["ROSGeneral", "ROSHEENT", "ROSRespiratory", "ROSCardiovascular", "ROSGastrointestinal", "ROSGenitoruinary", "ROSMusculoskeletal", "ROSNeurologic", "ROSBehavioral", "ROSSkin"];
    ROSList.forEach(function (item, index) {
      var el = document.getElementById(item);
      var elBtn = document.getElementById(item+"Btn");
      // if (elBtn == null) {
      //   console.log(item);
      // }
      elBtn.onclick = function() {
        el.innerHTML = item+": "+details[item];
        el.style.display = "inline";
        el.style["padding-left"] = "10px";
        var statement = document.createElement("div")
        statement.innerHTML = item+": "+details[item];
        document.getElementById('MDM').append(statement);
      };
    });

    // physical exam
    var PEList = ["PEGeneralAppearance", "PEHEENT", "PENeck", "PECardiovascular", "PERespiratory", "PEMusculoskeletal", "PEGastrointestinal", "PEGenitourinary", "PESkin", "PENeurologic", "PEBehavioral"];
    PEList.forEach(function (item, index) {
      var el = document.getElementById(item);
      var elBtn = document.getElementById(item+"Btn");
      if (elBtn == null) {
        console.log(item);
        console.log(details[item]);
      }
      elBtn.onclick = function() {
        el.innerHTML = item+": "+details[item];
        el.style.display = "inline";
        el.style["padding-left"] = "10px";
        var statement = document.createElement("div")
        statement.innerHTML = item+": "+details[item];
        document.getElementById('MDM').append(statement);
      };
    });

  } //end showCase

})();
