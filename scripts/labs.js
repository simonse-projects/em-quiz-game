// display lab options
d3.json("data/labs.json").then(function (labsList) {
  // Get the modal
  var labsModal = document.getElementById("labs");
  var labsModalContent = labsModal.firstElementChild;

  // add categories to modal
  // console.log(labsList);
  var labsCatList = [];
  labsList.forEach(function(diagnosis) {
    // console.log(diagnosis);
    if (!labsCatList.includes(diagnosis['Category'])) {
      labsCatList.push(diagnosis['Category']);
    }
  });
  // console.log(labsCatList);
  var labsModalCat = null;
  labsCatList.forEach(function (category) {
    // add collapsible list headers for each category
    // add button
    var labsCatBtn = document.createElement("button");
    labsCatBtn.className = "collapsible";
    labsCatBtn.setAttribute("type","button");
    labsCatBtn.innerHTML = category;
    labsModalContent.appendChild(labsCatBtn);

    // add divs for buttons
    var content = document.createElement("div");
    content.className = "content";
    content.style.display = "block";  // temp fix for collapsible buttons not working
    labsModalContent.appendChild(content);
    var row = document.createElement("div");
    row.className = "row";
    content.appendChild(row);

    // add diagnosis buttons
    labsList.filter(function (item) {
      if (item["Category"] == category) {
        // console.log(item["Diagnosis"]);
        var diagBtn = document.createElement("button");
        diagBtn.className = "button-primary";
        diagBtn.setAttribute("type","button");
        diagBtn.setAttribute("id",item["Diagnosis"]);
        diagBtn.innerHTML = item["Diagnosis"];
        diagBtn.onclick = function() {
          // add to labs section and summary statements
          var labsDiv = document.getElementById("labs-list");
          var labsDivItem = document.createElement("div");
          labsDivItem.className = item["Diagnosis"];
          labsDivItem.innerHTML = item["Category"]+": "+item["Diagnosis"]+"<span class='removelabs'>&times;</span>";
          labsDiv.appendChild(labsDivItem);

          // remove labs on click
          var removelabsBtns = document.getElementsByClassName('removelabs');
          // console.log(removelabsBtns);
          for (var i = 0; i < removelabsBtns.length; i++) {
            removelabsBtns[i].onclick = function () {
              var labs = this.parentNode;
              labs.parentNode.removeChild(labs);

            };
          };

          //close labs modal
          labs.style.display = "none";
        };

        row.appendChild(diagBtn);
      }
    });

  })

  // Get the button that opens the modal
  var labsBtn = document.getElementById("labs-btn");

  // When the user clicks on the button, open the modal
  labsBtn.onclick = function() {
    labsModal.style.display = "block";
  }

  // When the user clicks on (x), close the modal
  // change from hard-coding [2] value - seems error-prone
  closeBtn[4].onclick = function() {
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
