// display lab options
d3.json("data/labs-setup.json").then(function (labsList) {
  // Get the modal
  var labsModal = document.getElementById("labs");
  var labsModalContent = labsModal.firstElementChild;

  // add labs to modal
  var labsTestList = [];
  labsList.forEach(function(test) {
    // console.log(diagnosis);
    if (!labsTestList.includes(test['Test'])) {
      labsTestList.push(test['Test']);
    }
  });
  // console.log(labsTestList);
  var labsModalCat = null;
  labsTestList.forEach(function (test) {

    var labsTestBtn = document.createElement("button");
    labsTestBtn.setAttribute("type","button");
    labsTestBtn.className = "button-primary";
    labsTestBtn.innerHTML = test;
    labsModalContent.appendChild(labsTestBtn);

    labsTestBtn.onclick = function() {
      // add to labs section and summary statements
      var labsDiv = document.getElementById("lab-results");
      var labsDivItem = document.createElement("div");
      labsDivItem.className = test;
      labsDivItem.innerHTML = test;
      var labComponents = [];

      for (var lab in labsList) {
        if (labsList[lab]["Test"] == test) {
          labComponents.push(labsList[lab]);
        }
      }
      console.log(labComponents);
      labsDiv.appendChild(labsDivItem);

      //close ddx modal
      labsModal.style.display = "none";
    };
  });

  // Get the button that opens the modal
  var labsBtn = document.getElementById("labs-btn");

  // When the user clicks on the button, open the modal
  labsBtn.onclick = function() {
    labsModal.style.display = "block";
  }

  // When the user clicks on (x), close the modal
  // change from hard-coding value - seems error-prone
  closeBtn[3].onclick = function() {
    // console.log("close");
    labsModal.style.display = "none";
  }

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == labsModal) {
      labsModal.style.display = "none";
    }
  }
});
