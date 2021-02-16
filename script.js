var main = document.getElementById("creatingMain");
var menuList = document.getElementById("hairList");
var headsPlace = document.getElementById("headsOptions");

var svgPersonInPage = document.getElementById("testeSVG");

var pageTabs = false;


// render person image in page
function renderPersona(person) {
    for (var prop in person) {
        if (Object.prototype.hasOwnProperty.call(person, prop)) {
            svgPersonInPage.innerHTML += person[prop];
        };
    }; 
};
renderPersona(personaObj);

// submit image function TO DO
function submitPersona() {
    console.log(svgPersonInPage);

    var blob = new Blob([`${svgPersonInPage}`],{type:"text/plain;charset=utf-8"});
    // var f = new File([`${svgPersonInPage}`], "filename.svg", {type: "text/plain"})
    // saveAs(blob,"helloworld.svg");
    // localStorage.setItem('myBlob', blob);
};

// background color select function
function changeBackgroundColor(option) {
    var background = document.getElementById("background");
    background.style.fill = backgroundColors[option];
};

// Body color change function
function changeBodyColor(number) {
    var faceFund = document.getElementById('faceFund');
    var armsAndNeck = document.getElementById('armNeck');
    faceFund.style.fill = bodyColor[number];
    armsAndNeck.style.fill = bodyColor[number];
};

// change glasses color
function changeGlassesColor(option) {
    var glassesPaths = document.getElementsByClassName("charGlasses");
    for(var i = 0; i < glassesPaths.length; i++) {
        glassesPaths[i].style.stroke = glassesColors[option];
    };
};

// maintaining previous changes
function colorFromItems() {
    var body_color = document.getElementById("colorChangeSelect").value;    
    changeBodyColor(body_color);
    var backColor = document.getElementById("backgroundColorChangeSelect").value;
    changeBackgroundColor(backColor);
    var glassesColor = document.getElementById("glassColorChangeSelect").value;
    changeGlassesColor(glassesColor);
};


// hair type change
function changeHair(option) {
    var hair_id = option;
    // finding clicked option in hair array through id
    var hairIndex = hairs2.findIndex( x => x.hairId === hair_id);
    svgPersonInPage.innerHTML = "";
    personaObj.hair = hairs2[hairIndex].mainPersonaPath;
    renderPersona(personaObj);

    colorFromItems();
};


// glasses function
function changeGlasses(option) {
    svgPersonInPage.innerHTML = "";
    personaObj.glasses = glasses[option];
    renderPersona(personaObj);

    colorFromItems();
}

// function to make page tabs
function selectionTab(evt, tabName) {
    var tabcontent = document.getElementsByClassName("tabcontent");
    for(var i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";        
    }
    var tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  var colorTab = tabName + "Color";
  document.getElementById(tabName).style.display = "block";
  document.getElementById(colorTab).style.display = "block";
  evt.className += " active";
  pageTabs = true;
};

// activating Body tab by page default
if(!pageTabs) {
    selectionTab("","bodySelect");
    var tabDefault = document.getElementById("tabDefault");
    tabDefault.className += " active";
};


// rendering hair options
hairs2.forEach((hair) => {
    var svgElem = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svgElem.setAttribute("class", "hairImgFromMenu");
    svgElem.setAttribute("width","117px");
    svgElem.setAttribute("id",hair.hairId);
    svgElem.setAttribute("onclick",`changeHair(this.id)`);

    svgElem.innerHTML = hair.menuImg;    
    headsPlace.appendChild(svgElem);
})