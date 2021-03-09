// função construtora de mundr as cores rascunho
function ChangeColor() {
    this.createFunction= function(option, colorsFromDatabase, whereColorsAreBeingChanged, selectionLocation, functionRememberMe) {
        var color_id = option;
        var color_index = colorsFromDatabase.findIndex( x => x.id === color_id);

        var color = colorsFromDatabase[color_index].color;

        for (var i = 0; i < whereColorsAreBeingChanged.length; i++) {
            whereColorsAreBeingChanged[i].style.fill = color;
        }

        selectionLocation.innerHTML ="<h2>test Color</h2>";
        functionRememberMe;
    }
};
var changeBodyColor2 = new ChangeColor();
function bodyColor2(opt) {
    changeBodyColor2.createFunction(opt, bodyColor, [faceFund, armsAndNeck], bodyColorSelectionLocation, bodyColoringrememberMe);
};


function Colors() {
    this.createFunc = function(option, colorsFromDatabase, whereColorsAreBeingChanged, selectionLocation, functionRememberMe) {
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
            console.log("teste")
        }     

        selectionLocation.innerHTML = "";
        bodyColoringrememberMe();
    }
};


var changeBodyColor3 = new Colors();
function bodyColor3(opt) {
    changeBodyColor3.createFunc(opt, bodyColor, ["faceFund", "armsNeck"], bodyColorSelectionLocation, bodyColoringrememberMe);
}

// body color options
var bodyColor = [
    {
        id:"bodycolor000",
        color:'#FFA093'},
    {
        id:"bodycolor001",
        color:'#FFA784'},
    {
        id:"bodycolor002",
        color:'#FF8585'}, 
    {
        id:"bodycolor003",
        color:'#D08668'},
    {
        id:"bodycolor004",
        color:'#E6A581'},
    {
        id:"bodycolor005",
        color:'#E576C6'},
    {
        id:"bodycolor006",
        color:'#5E93D1'
    }
];
