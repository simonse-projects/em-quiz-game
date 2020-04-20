
page1 = document.getElementById('page-one');
// page2 = document.getElementById('page-two');
page3 = document.getElementById('page-three');

// hide patient info screen to start
page3.style.display = 'none';
// page1.style.display = 'none';

// Get the <span> element that closes the modal
var closeBtn = document.getElementsByClassName("close");
// console.log(closeBtn);

collapsibleSections();


// Get the modal
var patientEncModal = document.getElementById("patient-enc");

// Get the button that opens the modal
var btn = document.getElementById("patient-enc-btn");

// When the user clicks on the button, open the modal
btn.onclick = function() {
  patientEncModal.style.display = "block";
}

// When the user clicks on (x), close the modal
closeBtn[1].onclick = function() {
  // console.log("close");
  patientEncModal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == patientEncModal) {
    patientEncModal.style.display = "none";
  }
}

d3.json("data/case-desc.json").then(function(casesJson) {
  displayCases(casesJson);
});

function displayCases(cases) {
  // console.log("displayCases");
  // console.log(cases);
  // Case List Selection
  // Get the modal
  var caseListModal = document.getElementById("case-list");

  // Get the button that opens the modal
  var caseListBtn = document.getElementById("case-list-btn");

  // Get the <span> element that closes the modal
  // var closeBtn = document.getElementsByClassName("close")[0];

  // When the user clicks on the button, open the modal
  caseListBtn.onclick = function() {
    caseListModal.style.display = "block";
  }

  // When the user clicks on (x), close the modal
  closeBtn[0].onclick = function() {
    caseListModal.style.display = "none";
  }

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == caseListModal) {
      caseListModal.style.display = "none";
    }
  }

  var caseSelection = document.getElementById("case-selection");


  // empty case list
  // caseSelection.empty();
  while(caseSelection.firstChild) {
    caseSelection.removeChild(caseSelection.firstChild);
  }

  // loop through cases to build list
  cases.forEach(function (item) {
    var caseItem = caseSelection.appendChild(document.createElement("option"));
    // console.log(caseItem);
    caseItem.value = item['CaseNumber'];
    caseItem.innerHTML = item["PatientName"]+" - "+item["Age"]+item["Gender"]+" - "+
        item["ChiefComplaint"];
  });

  // button selects case
  document.getElementById("select-btn").addEventListener("click", function (e) {
    console.log(caseSelection.value);
    // document.getElementById("case-list").modal("hide");

    // select case with selected ID number
    // console.log(document.getElementById("case-selection").children);
    var caseNumber = caseSelection.value;
    var caseDetails = [];
    cases.forEach(function (item) {
      if (item["CaseNumber"] == caseNumber) {
        caseDetails = item;
      }
    });

    // hide modal
    caseListModal.style.display = "none";

    // hide case selection area and show case details
    page1.style.display = 'none';
    page3.style.display = 'block';

    // build case details page
    // console.log(caseDetails);
    showCase(caseDetails);
  }, false);

} //end displayCases

function showCase(details) {
  // add case number as attribute
  page3.setAttribute("case-number",details["CaseNumber"]);

  // empty MDM
  document.getElementById("MDM").value = "";

  document.getElementById("patient-name").append(details["PatientName"]+" - "+details["Age"]+" "+details["Gender"]);
  // console.log(details["History1"] + details["History2"]);
  document.getElementById("HPI").append(details["History1"] +" "+ details["History2"]);
  var VSRhythm = document.getElementById("VSRhythm");
  VSRhythm.innerHTML = "<img src='images/VRhythm_NSR.png' width=70%>"

  // list of vitals
  var vitalsList = ["VSPulse", "VSSBP", "VSDBP", "VSO2Sat", "VSTemperature", "VSRespiratoryRate"];
  // loop over array to print on screen
  vitalsList.forEach(function (item, index) {
    var el = document.getElementById(item);
    el.innerHTML = details[item];

  });

  // patient encounter
  var ROSList = ["ROSGeneral", "ROSHEENT", "ROSRespiratory", "ROSGastrointestinal", "ROSGenitoruinary", "ROSMusculoskeletal", "ROSNeurologic", "ROSBehavioral", "ROSSkin"];
  ROSList.forEach(function (item, index) {
    var el = document.getElementById(item);
    // console.log(el);
    var elBtn = document.getElementById(item+"Btn");
    if (elBtn == null) {
      console.log(item);
    }
    elBtn.onclick = function() {
      el.innerHTML = item+": "+details[item];
      el.style.display = "inline";
      el.style["padding-left"] = "10px";
      var statement = document.createElement("div");
      statement.innerHTML = item+": "+details[item];
      // create <br> element
      var br = document.createElement('br');
      document.getElementById('ed-course').append("Performed "+item, br);

      //close patient-enc modal
      patientEncModal.style.display = "none";
    };
  });

  // physical exam
  var PEList = ["PEGeneralAppearance", "PEHEENT", "PENeck", "PECardiovascular", "PERespiratory", "PEMusculoskeletal", "PEGastrointestinal", "PEGenitourinary", "PESkin", "PENeurologic", "PEBehavioral"];
  PEList.forEach(function (item, index) {
    var el = document.getElementById(item);
    var elBtn = document.getElementById(item+"Btn");
    // if (elBtn == null) {
    //   console.log(item);
    //   console.log(details[item]);
    // }
    elBtn.onclick = function() {
      el.innerHTML = item+": "+details[item];
      el.style.display = "inline";
      el.style["padding-left"] = "10px";
      var statement = document.createElement("div")
      statement.innerHTML = item+": "+details[item];
      // create <br> element
      var br = document.createElement('br')
      document.getElementById('ed-course').append(item, br);

      //close patient-enc modal
      patientEncModal.style.display = "none";
    };
  });

  // labs
  // d3.json("data/labs.json").then(function (labResults) {
  //   console.log(labResults);
  //   // get divs
  //
  // });

  var dispBtn = document.getElementById("disposition-btn");
  // Get the modal
  var dispositionModal = document.getElementById("disposition");
  var form = document.querySelector('form');
  var gradingDiv = document.getElementById("grading");

  document.getElementById("solution-ddx").innerHTML = details["FinalDiagnosis"];

  var playerDiv = document.getElementById("player-performance");


  dispBtn.onclick = function () {
    // console.log(details["FinalDiagnosis"]);
    // console.log(ddxDiv.children);

    // When the user clicks on the button, open the modal
    dispositionModal.style.display = "block";
    document.getElementById("select-diagnosis").style.display = "block";

    var finalDiagnosis = document.getElementById("final-diagnosis");
    var ddxDiv = document.getElementById("ddx-list");

    // empty DDx list
    while(finalDiagnosis.firstChild) {
      finalDiagnosis.removeChild(finalDiagnosis.firstChild);
    }

    // loop through ddx to build list
    for (var i = 0; i < ddxDiv.children.length; i++) {
      var ddxItem = finalDiagnosis.appendChild(document.createElement("option"));
      // console.log(ddxDiv.children[i].className);
      ddxItem.value = ddxDiv.children[i].className;
      ddxItem.innerHTML = ddxDiv.children[i].className;
    }

    var header = document.getElementById("patient-name-age")
    header.append(details["PatientName"]);
    header.append(" - "+details["Age"]);
    header.append(details["Gender"]);

  }

  form.addEventListener('submit', e => {
    e.preventDefault();

    var finalDiagnosis = document.getElementById("final-diagnosis");
    console.log(finalDiagnosis.value);

    // hide form
    document.getElementById("select-diagnosis").style.display = "none";

    var checkedValue = document.querySelector('input[name="disposition"]:checked').value;
    // console.log(checkedValue);
    // console.log(document.querySelector('input[name="disposition"]:checked'));

    var hpiFinal = document.getElementById("HPI");
    var rosFinal = document.getElementById("ROS");
    var peFinal = document.getElementById("PE");
    var labsFinal = document.getElementById("lab-results");
    var edCourseFinal = document.getElementById("ed-course");
    var mdmFinal = document.getElementById("MDM");

    var button = document.createElement("button");
    button.className = "collapsible";
    var div = document.createElement("div");
    div.className = "content";

    playerDiv.appendChild(document.createElement("h6")).textContent = "Your Performance";

    var hpirosBtn = button.cloneNode();
    playerDiv.appendChild(hpirosBtn).textContent = "HPI / ROS";
    var playerHPIROS = div.cloneNode();
    playerDiv.appendChild(playerHPIROS);
    hpirosContent = "HPI: "+hpiFinal.innerHTML+"<br>";
    hpirosContent += "ROS: "+rosFinal.innerHTML;
    playerHPIROS.innerHTML = hpirosContent;

    var vitalsBtn = button.cloneNode();
    playerDiv.appendChild(vitalsBtn).textContent = "Vitals";
    var playerVitals = div.cloneNode();
    playerDiv.appendChild(playerVitals);

    var peBtn = button.cloneNode();
    playerDiv.appendChild(peBtn).textContent = "PE";
    var playerPE = div.cloneNode();
    playerDiv.appendChild(playerPE);
    playerPE.innerHTML = peFinal.innerHTML;

    var labsBtn = button.cloneNode();
    playerDiv.appendChild(labsBtn).textContent = "Labs / Imaging";
    var playerLabs = div.cloneNode();
    playerDiv.appendChild(playerLabs);
    playerLabs.innerHTML = labsFinal.innerHTML;

    var ddxBtn = button.cloneNode();
    ddxBtn.className = "collapsible active";
    playerDiv.appendChild(ddxBtn).textContent = "Differential Diagnoses";
    var playerDDx = div.cloneNode();
    playerDiv.appendChild(playerDDx);
    playerDDx.setAttribute("style","display:block");
    playerDDx.innerHTML = finalDiagnosis.value;
    if (finalDiagnosis.value == details['FinalDiagnosis']) {
      playerDDx.className = playerDDx.classList + " correct";
    } else {
      playerDDx.className = playerDDx.classList + " incorrect";
    }

    var edCourseBtn = button.cloneNode();
    edCourseBtn.className = "collapsible active";
    playerDiv.appendChild(edCourseBtn).textContent = "ED Course / MDM / Disposition";
    var playerEDCourse = div.cloneNode();
    playerDiv.appendChild(playerEDCourse);
    edMDMDisp = "ED Course: " + edCourseFinal.innerHTML + "<br>" + "MDM: " + mdmFinal.value + "<br>" + checkedValue;
    playerEDCourse.innerHTML = edMDMDisp;
    playerEDCourse.setAttribute("style","display:block");

    collapsibleSections();

    gradingDiv.style.display = "block";

  });

  // When the user clicks on (x), close the modal
  closeBtn[4].onclick = function() {
    dispositionModal.style.display = "none";
    form.reset();
    gradingDiv.style.display = "none";

    document.getElementById("patient-name-age").innerHTML = "";

    // empty grading list
    while(playerDiv.firstChild) {
      playerDiv.removeChild(playerDiv.firstChild);
    }

  }

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == dispositionModal) {
      dispositionModal.style.display = "none";
      form.reset();
      gradingDiv.style.display = "none";

      document.getElementById("patient-name-age").innerHTML = "";

      // empty grading list
      while(playerDiv.firstChild) {
        playerDiv.removeChild(playerDiv.firstChild);
      }

    }
  }


} //end showCase

function collapsibleSections() {
  // collapsible areas
  var coll = document.getElementsByClassName("collapsible");
  // console.log(coll);
  var i;

  for (i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function() {
      // console.log("clicked");
      this.classList.toggle("active");
      var content = this.nextElementSibling;
      if (content.style.display === "block") {
        content.style.display = "none";
      } else {
        content.style.display = "block";
      }
    });
  }
}
