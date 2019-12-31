// Get the <span> element that closes the modal
var closeBtn = document.getElementsByClassName("close");


// display DDx options
// load ddx options from json
d3.json("data/ddx.json").then(function (ddxList) {
  // Get the modal
  var ddxModal = document.getElementById("ddx");
  ddxModalContent = ddxModal.firstElementChild;

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
    // content.style.display = "block";  // temp fix for collapsible buttons not working
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
          ddxDivItem.innerHTML = item["Category"]+": "+item["Diagnosis"];
          ddxDiv.append(ddxDivItem);

          var statement = document.createElement("div")
          statement.innerHTML = "DDx: "+item["Diagnosis"];
          document.getElementById('MDM').append(statement);

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
  closeBtn[0].onclick = function() {
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
