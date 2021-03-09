// main image goes here
var main = document.getElementById("creatingMain");
// hair options goes here
var menuList = document.getElementById("hairList");
// hair options goes rendered here (inside menuList)
var headsPlace = document.getElementById("headsOptions");

var bodiesOptionsPlace = document.getElementById("bodySelect");
// glasses options goes rendered here
var glassesMenuPlace = document.getElementById("glassesSelectOptions");
// body color options goes here
var bodyColorSelectionLocation = document.getElementById("bodyColorOptions");
// hair color options goes here
var hairColorSelectionLocation = document.getElementById("hairColorOptions");

var hatColorSelectionLocation = document.getElementById("hatColorOptions");
// glasses color options goes here
var glassesColorSelectionLocation = document.getElementById("glassesSelectColor");
// background color options goes here
var backgroundColorSelectionLocation = document.getElementById("backgroundColorSelect");
// svg from main image
var svgPersonInPage = document.getElementById("testeSVG");
var pageTabs = false;

// saving important data in these variables
var body_color_id = bodyColor[0].id;
var clothes_color_id = clothesColor[0].id;
var glasses_color_id = glassesColors[0].id;
var background_color_id = backgroundColors[0].id;
var hair_color_id = hairColor[0].id;
var hat_color_id = hatColors[0].id;
 
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


// COLORS PART
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
    // hair color
    changeHairColor(hair_color_id);
    // clothes color
    changeClothesColor(clothes_color_id);
    // hat color
    changeHatColor(hat_color_id);
};



function Colors() {
    this.createFunction = function(option, colorsFromDatabase, whereColorsAreBeingChanged, selectionLocation, functionRememberMe) {        
        var color_index = colorsFromDatabase.findIndex( x => x.id === option);
        var color = colorsFromDatabase[color_index].color;

        if(whereColorsAreBeingChanged.length > 1) {
            for(var i = 0; i < whereColorsAreBeingChanged.length; i++) {
                var locations = document.getElementsByClassName(whereColorsAreBeingChanged[i]);
                for(var y = 0; y < locations.length; y++) {
                    locations[y].style.fill = color;
                }        
            }
        } else {
            var locations = document.getElementsByClassName(whereColorsAreBeingChanged)
            // console.log("me chamou")

            for(var y = 0; y < locations.length; y++) {
                
                locations[y].style.fill = color;
            } 
        }
        selectionLocation.innerHTML = "";
        functionRememberMe();
    }
};

// creating the color functions
var change_hair_color_func = new Colors();
function changeHairColor(opt) {
    hair_color_id = opt;
    change_hair_color_func.createFunction(opt, hairColor, ["hairOfSvg"], hairColorSelectionLocation, hairColoringRememberMe);
};

var change_body_color_func = new Colors();
function changeBodyColor(opt) {
    body_color_id = opt;
    change_body_color_func.createFunction(opt, bodyColor, ["faceFund", "armsNeck"], bodyColorSelectionLocation, bodyColoringrememberMe);
};

var change_clothes_color_func = new Colors();
function changeClothesColor(opt) {
    clothes_color_id = opt;
    change_clothes_color_func.createFunction(opt, clothesColor, ["clothes"], clothesColorOptions, clothesColoringrememberMe);
};

function changeHatColor(option) {
    hat_color_id = option;
    var color_index = hatColors.findIndex( x => x.id === option);
    var hatColorMain = hatColors[color_index].hatMain;
    var hatColorDetail = hatColors[color_index].hatDetail;
    var hatMain = document.getElementsByClassName("hatMain");
    var hatDetail = document.getElementsByClassName("hatDetail");
    // main colors
    for(var i = 0; i < hatMain.length; i++) {
        hatMain[i].style.fill = hatColorMain;
    };

    // detail colors
    for(var i = 0; i < hatDetail.length; i++) {
        hatDetail[i].style.fill = hatColorDetail;
    };

    hatColorSelectionLocation.innerHTML = "";
    hatColor(hat_color_id);
};

// END OF COLORS PART


// CHANGE FUNCTIONS
// hair type change
function changeHair(option) {
    var hair_id = option;
    var hatColorSelector = document.getElementById("hatColorSelector");

    if(option.slice(option.length - 3) === "hat") {
        hatColorSelector.style.display = "block";
    } else {
        hatColorSelector.style.display = "none";
    }


    // finding clicked option in hair array through id
    var hairIndex = hairs.findIndex( x => x.hairId === hair_id);
    svgPersonInPage.innerHTML = "";
    charactDefaultMale.hair = hairs[hairIndex].mainPersonaPath;
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

function changeBody(option) {
    var index = bodyOptions.findIndex( x => x.id === option);
    svgPersonInPage.innerHTML = "";
    charactDefaultMale.body = bodyOptions[index].bodyOptionSvg;
    renderPersona(charactDefaultMale);
    colorFromItems();
}


// END OF CHANGE FUNCTIONS


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
    selectionTab("","hairsSelect");
    var tabDefault = document.getElementById("tabDefault");
    tabDefault.className += " active";
};

// rendering hair options
function getHairsToPage() {
    hairs.forEach((hair) => {
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

// function getBodiesToPage() {};
bodyOptions.forEach((bodyOpt) => {
    var svgElem = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svgElem.setAttribute("class", "bodyOptionImgFromMenu");
    svgElem.setAttribute("width","150px");
    svgElem.setAttribute("id",bodyOpt.id);
    svgElem.setAttribute("onclick",`changeBody(this.id)`);
    svgElem.innerHTML = bodyOpt.bodyMenuImg;    
    bodiesOptionsPlace.appendChild(svgElem);
});



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

var clothesColoring = new GetColorToPage(clothesColor);
function clothesColoringrememberMe() {
    clothesColoring.constructor(clothesColorOptions, clothes_color_id, "changeClothesColor");
};
clothesColoringrememberMe();

var hairColoring = new GetColorToPage(hairColor);
function hairColoringRememberMe() {
    hairColoring.constructor(hairColorSelectionLocation, hair_color_id, "changeHairColor")
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

function hatColor(isColorDefined) {
    hatColors.forEach((hat_color) => {
        var svgElem = document.createElementNS("http://www.w3.org/2000/svg", "svg");
            svgElem.setAttribute("width", "46");
            svgElem.setAttribute("height", "46");
            svgElem.setAttribute("viewBox", "0 0 46 46");
            // svgElem.setAttribute("style","cursor:pointer")

            if(isColorDefined === undefined) {
                isColorDefined = hat_color.id;
            };

            if(hat_color.id === isColorDefined) {
                svgElem.innerHTML = `
                    <g id="${hat_color.id}" onclick="changeHatColor(this.id)">
                    <path d="M1.5 17.5C1.5 8.65541 8.65602 1.5 17.5 1.5C26.3446 1.5 33.5 8.65602 33.5 17.5C33.5 26.3446 26.344 33.5 17.5 33.5C8.62027 33.5 1.5 26.3041 1.5 17.5Z" fill="${hat_color.hatMain}" stroke="white" stroke-width="3"/>
                    <path d="M17 3V32C25.2906 32 32 25.5148 32 17.5C32 9.48575 25.2912 3 17 3Z" fill="${hat_color.hatDetail}"/>
                    </g>
                `;
                
            } else {
                svgElem.innerHTML = `
                    <g style="cursor:pointer" id="${hat_color.id}" onclick="changeHatColor(this.id)">
                    <path d="M17.5 0C7.82763 0 0 7.82694 0 17.5C0 27.1277 7.78709 35 17.5 35C27.1724 35 35 27.1731 35 17.5C35 7.82763 27.1731 0 17.5 0Z" fill="${hat_color.hatMain}"/>
                    <path d="M17.5 0V35C27.1724 35 35 27.1731 35 17.5C35 7.82763 27.1731 0 17.5 0Z" fill="${hat_color.hatDetail}"/>
                    </g>
                `;
            }
            hatColorSelectionLocation.appendChild(svgElem);
        
    });
};
hatColor(hat_color_id);