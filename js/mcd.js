var casePalette = [
  {value: new createjs.ColorFilter(1, 1, 1, 1, 0, 0, 0, 0), text: "white"},
  {value: new createjs.ColorFilter(1.2, 1, 1.05, 1, 0, 0, 0, 0), text: "ultima angelic cure"},
  {value: new createjs.ColorFilter(1.2, .25, .5, 1, 40, 100, 40, 0), text: "the color of sweet love!!"},
  {value: new createjs.ColorFilter(1, .25, .5, 1, 0, 0, 0, 0), text: "atomic pink"},
  {value: new createjs.ColorFilter(1.2, 1, .5, 1, 0, 0, 0, 0), text: "chamomille"},
  {value: new createjs.ColorFilter(1, .5, .0, 1, 90, 90, 90, 0), text: "orange creamsicle"},
  {value: new createjs.ColorFilter(1, .2, .0, 1, 0, 0, 0, 0), text: "oreko"},
  {value: new createjs.ColorFilter(1, .9, 0, 1, 40, 40, 0, 0), text: "sunflare"},
  {value: new createjs.ColorFilter(.20, .15, .25, 1, 10, 0, 10, 0), text: "nasu"},
  {value: new createjs.ColorFilter(.2, .2, .2, 1, 0, 0, 0, 0), text: "charcoal"},
  {value: new createjs.ColorFilter(0, 0, 0, 1, 0, 0, 0, 0), text: "grimdark"},
];
var panelCoords = {x: 4, y: 4, tabSize: 16, width: 120, height: 248};
var paletteConfig = {
  colorSize: 16,
  colorGap: 8
}

var tower;

function init() {
  //Create a stage by getting a reference to the canvas
  stage = new createjs.Stage("screen");

  var spriteData = {
    images: ["img/case/sample.png"],
    frames: {width: 98, height: 103},
  };
  var spriteSheet = new createjs.SpriteSheet(spriteData);
  tower = new createjs.Sprite(spriteSheet);
  tower.filters = [
    casePalette[0].value
  ];
  tower.x = 216;
  tower.y = 80;
  tower.play();
  stage.addChild(tower);
  tower.cache(0, 0, 105, 105);

  var panelBody = new createjs.Bitmap("img/panel_body.png");
  panelBody.x = panelCoords.tabSize + panelCoords.x;
  panelBody.y = panelCoords.y;
  stage.addChild(panelBody);
  var panelTab = new createjs.Bitmap("img/panel_tab.png");
  panelTab.x = panelCoords.x;
  panelTab.y = panelCoords.y;
  stage.addChild(panelTab);

  var colorsPerLine = Math.floor((panelCoords.width - paletteConfig.colorGap) / (paletteConfig.colorSize + paletteConfig.colorGap));
  var lines = Math.floor((casePalette.length - 1) / colorsPerLine) + 1;
  var topLeftX = .5*panelCoords.width - (.5 * colorsPerLine * paletteConfig.colorSize) - (.5 * (colorsPerLine - 1) * paletteConfig.colorGap);
  var topLeftY = panelCoords.height + panelCoords.y - (lines * (paletteConfig.colorSize + paletteConfig.colorGap));
  for(var i = 0; i < casePalette.length; i++) {
    var colorX = topLeftX + (i % colorsPerLine) * (paletteConfig.colorSize + paletteConfig.colorGap);
    var colorY = topLeftY + Math.floor(i / colorsPerLine) * (paletteConfig.colorSize + paletteConfig.colorGap);
    var graphics = new createjs.Graphics().beginFill("#f4f4f4").drawRect(colorX + panelBody.x, colorY, paletteConfig.colorSize, paletteConfig.colorSize);
    var shape = new createjs.Shape(graphics);
    shape.filters = [casePalette[i].value];
    stage.addChild(shape);
    shape.cache(colorX + panelBody.x, colorY, paletteConfig.colorSize, paletteConfig.colorSize);
    console.log("(" + colorX + ", " + colorY + ")");
    shape.on("mousedown", function (evt) {
      tower.filters = this.filters;
      tower.updateCache();
      stage.update();
    });
  }

  //Update stage will render next frame
  stage.update();
}