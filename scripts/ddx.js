// display DDx options
// load ddx options from json
d3.json("data/ddx.json").then(function (ddxList) {
  // Get the modal
  var ddxModal = document.getElementById("ddx");
  var ddxModalContent = ddxModal.firstElementChild;

  // add categories to modal
  // console.log(ddxList);
  var ddxCatList = [];
  ddxList.forEach(function(diagnosis) {
    // console.log(diagnosis);
    if (!ddxCatList.includes(diagnosis['Category'])) {
      ddxCatList.push(diagnosis['Category']);
    }
  });
  // console.log(ddxCatList);
  var ddxModalCat = null;
  ddxCatList.forEach(function (category) {
    // add collapsible list headers for each category
    // add button
    var ddxCatBtn = document.createElement("button");
    ddxCatBtn.className = "collapsible";
    ddxCatBtn.setAttribute("type","button");
    ddxCatBtn.innerHTML = category;
    ddxModalContent.appendChild(ddxCatBtn);

    // add divs for buttons
    var content = document.createElement("div");
    content.className = "content";
    content.style.display = "block";  // temp fix for collapsible buttons not working
    ddxModalContent.appendChild(content);
    var row = document.createElement("div");
    row.className = "row";
    content.appendChild(row);

    // add diagnosis buttons
    ddxList.filter(function (item) {
      if (item["Category"] == category) {
        // console.log(item["Diagnosis"]);
        var diagBtn = document.createElement("button");
        diagBtn.className = "button-primary";
        diagBtn.setAttribute("type","button");
        diagBtn.setAttribute("id",item["Diagnosis"]);
        diagBtn.innerHTML = item["Diagnosis"];
        diagBtn.onclick = function() {
          // add to DDx section and summary statements
          var ddxDiv = document.getElementById("ddx-list");
          var ddxDivItem = document.createElement("div");
          ddxDivItem.className = item["Diagnosis"];
          ddxDivItem.innerHTML = item["Category"]+": "+item["Diagnosis"]+"<span class='removeDDx'>&times;</span>";
          ddxDiv.appendChild(ddxDivItem);

          // remove DDx on click
          var removeDDxBtns = document.getElementsByClassName('removeDDx');
          // console.log(removeDDxBtns);
          for (var i = 0; i < removeDDxBtns.length; i++) {
            removeDDxBtns[i].onclick = function () {
              var DDx = this.parentNode;
              DDx.parentNode.removeChild(DDx);

            };
          };

          //close ddx modal
          ddx.style.display = "none";
        };

        row.appendChild(diagBtn);
      }
    });

  })

  // Get the button that opens the modal
  var ddxBtn = document.getElementById("ddx-btn");

  // When the user clicks on the button, open the modal
  ddxBtn.onclick = function() {
    ddxModal.style.display = "block";
  }

  // When the user clicks on (x), close the modal
  // change from hard-coding [2] value - seems error-prone
  closeBtn[2].onclick = function() {
    // console.log("close");
    ddxModal.style.display = "none";
  }

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == ddxModal) {
      ddxModal.style.display = "none";
    }
  }
});
