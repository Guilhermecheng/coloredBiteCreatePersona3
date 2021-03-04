// main image goes here
var main = document.getElementById("creatingMain");
// hair options goes here
var menuList = document.getElementById("hairList");
// hair options goes rendered here (inside menuList)
var headsPlace = document.getElementById("headsOptions");
// glasses options goes rendered here
var glassesMenuPlace = document.getElementById("glassesSelectOptions");
// body color options goes here
var bodyColorSelectionLocation = document.getElementById("bodySelectColor");
// hair color options goes here
var hairSelectionColorLocation = document.getElementById("hairsSelectColor");
// glasses color options goes here
var glassesColorSelectionLocation = document.getElementById("glassesSelectColor");
// background color options goes here
var backgroundColorSelectionLocation = document.getElementById("backgroundColorSelect");
// svg from main image
var svgPersonInPage = document.getElementById("testeSVG");
var pageTabs = false;

// saving important data in these variables
var body_color_id = bodyColor[0].id;
var glasses_color_id = glassesColors[0].id;
var background_color_id = backgroundColors[0].id;
var hair_color_id = hairColor[0].id;
 
// render person image in page
function renderPersona(person) {
    for (var prop in person) {
        if (Object.prototype.hasOwnProperty.call(person, prop)) {
            svgPersonInPage.innerHTML += person[prop];
        };
    }; 
};
renderPersona(charactDefaultMale);

// TO DO
// submit image function 
function submitPersona() {
    console.log(svgPersonInPage);
    var blob = new Blob([`${svgPersonInPage}`],{type:"text/plain;charset=utf-8"});
    // var f = new File([`${svgPersonInPage}`], "filename.svg", {type: "text/plain"})
    // saveAs(blob,"helloworld.svg");
    // localStorage.setItem('myBlob', blob);
};


// background color select function
function changeBackgroundColor(option) {
    var backgroundId = background_color_id = option;
    var color_index = backgroundColors.findIndex( x => x.id === backgroundId);
    var background = document.getElementById("background");
    background.style.fill = backgroundColors[color_index].color;

    // reseting color menu to manage option selection
    backgroundColorSelectionLocation.innerHTML = "<h2>Background Color</h2>";
    backgroundColoringRememberMe();
};


// Body color change function
function changeBodyColor(number) {
    var color_id = body_color_id = number;
    var color_index = bodyColor.findIndex( x => x.id === color_id);
    var faceFund = document.getElementById('faceFund');
    var armsAndNeck = document.getElementById('armNeck');
    var colorTmp = bodyColor[color_index].color
    faceFund.style.fill = colorTmp;
    armsAndNeck.style.fill = colorTmp;

    // reseting color menu to manage option selection
    bodyColorSelectionLocation.innerHTML ="<h2>Body Color</h2>";
    bodyColoringrememberMe()
};


// TO DO - changeHairColor




// change glasses color
function changeGlassesColor(option) {
    var colorId = glasses_color_id = option;
    var color_index = glassesColors.findIndex( x => x.id === colorId);
    var glassesPaths = document.getElementsByClassName("charGlasses");
    for(var i = 0; i < glassesPaths.length; i++) {
        glassesPaths[i].style.stroke = glassesColors[color_index].color;
    };
    
    // reseting color menu to manage option selection
    glassesColorSelectionLocation.innerHTML = "<h2>Glasses Color</h2>";
    glassesColoringRememberMe();
};

// maintaining previous color changes 
function colorFromItems() {
    // body color
    changeBodyColor(body_color_id);
    // glasses color
    changeGlassesColor(glasses_color_id);
    // background color
    changeBackgroundColor(background_color_id);    
};


// hair type change
function changeHair(option) {
    var hair_id = option;
    // finding clicked option in hair array through id
    var hairIndex = hairs2.findIndex( x => x.hairId === hair_id);
    svgPersonInPage.innerHTML = "";
    charactDefaultMale.hair = hairs2[hairIndex].mainPersonaPath;
    renderPersona(charactDefaultMale);
    // maintaining previous color changes 
    colorFromItems();
};


// glasses function
function changeGlasses(option) {
    var glasses_id = option;
    var glassesIndex = glasses.findIndex( x => x.id === glasses_id);
    svgPersonInPage.innerHTML = "";
    // glasses SVG coming as an array
    var glassesFromDatabase = glasses[glassesIndex].glassesSvg;
    charactDefaultMale.glasses = glassesFromDatabase;
    renderPersona(charactDefaultMale);
    // maintaining previous color changes 
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
function getHairsToPage() {
    hairs2.forEach((hair) => {
        var svgElem = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svgElem.setAttribute("class", "hairImgFromMenu");
        svgElem.setAttribute("width","140px");
        svgElem.setAttribute("id",hair.hairId);
        svgElem.setAttribute("onclick",`changeHair(this.id)`);
    
        svgElem.innerHTML = hair.menuImg;    
        headsPlace.appendChild(svgElem);
    })
}
getHairsToPage();

function getGlassesToPage() {
    glasses.forEach((glassesUnit) => {
        if(glassesUnit.id === "glasses000") {
            var textNode = document.createTextNode("None");
            var textPlace = document.createElement("div");
            textPlace.setAttribute("class", "hairImgFromMenu");            
            textPlace.setAttribute("id",glassesUnit.id);
            textPlace.setAttribute("onclick", "changeGlasses(this.id)");


            textPlace.appendChild(textNode);
            glassesMenuPlace.appendChild(textPlace);
        } else {
            var svgElem = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            svgElem.setAttribute("class", "glassesImgFromMenu");
            svgElem.setAttribute("width","88px");
            svgElem.setAttribute("fill","#240C54");
            svgElem.setAttribute("id",glassesUnit.id);
            svgElem.setAttribute("onclick",`changeGlasses(this.id)`);
            if(glassesUnit.id != "glasses000") {
                for(var i = 0; i < glassesUnit.glassesMenuImg.length; i++) {
                    svgElem.innerHTML += glassesUnit.glassesMenuImg[i];
                    };
        };
        glassesMenuPlace.appendChild(svgElem);
        }    
    })
};
getGlassesToPage();

// constructor function for color options
function GetColorToPage(array_of_colors) {
    this.constructor = function(placeToPutColors, isColorDefined, functionName) {
        array_of_colors.forEach((arrayElem) => {
            var svgElem = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            svgElem.setAttribute("width", "46");
            svgElem.setAttribute("height", "46");
            svgElem.setAttribute("viewBox", "0 0 46 46");

            if(isColorDefined === undefined) {
                isColorDefined = arrayElem.id;
            };

            if(arrayElem.id === isColorDefined) {
                svgElem.innerHTML = `
                <circle xmlns="http://www.w3.org/2000/svg" cx="23" cy="19" r="17.5" stroke="white" stroke-width="3"/>
                <circle xmlns="http://www.w3.org/2000/svg" id="${arrayElem.id}" onclick="${functionName}(this.id)" cx="23" cy="19" r="16" fill="${arrayElem.color}"/>
                `;
            } else {
                svgElem.innerHTML = `<circle xmlns="http://www.w3.org/2000/svg" id="${arrayElem.id}" onclick="${functionName}(this.id)" cx="23" cy="19" r="16" fill="${arrayElem.color}" style="cursor:pointer"/>`;
            }            
            placeToPutColors.appendChild(svgElem);
        });
    };
};

// body color options
var bodyColoring = new GetColorToPage(bodyColor);
function bodyColoringrememberMe() {
    bodyColoring.constructor(bodyColorSelectionLocation, body_color_id, "changeBodyColor");
};
bodyColoringrememberMe();


var hairColoring = new GetColorToPage(hairColor);
function hairColoringRememberMe() {
    hairColoring.constructor(hairSelectionColorLocation, hair_color_id, "changeHairColor")
};
hairColoringRememberMe();

// glasses color options
var glassesColoring = new GetColorToPage(glassesColors);
function glassesColoringRememberMe() {
    glassesColoring.constructor(glassesColorSelectionLocation, glasses_color_id, "changeGlassesColor");
};
glassesColoringRememberMe();

// background color options
var backgroundColoring = new GetColorToPage(backgroundColors);
function backgroundColoringRememberMe() {
    backgroundColoring.constructor(backgroundColorSelectionLocation, background_color_id, "changeBackgroundColor");
};
backgroundColoringRememberMe();
