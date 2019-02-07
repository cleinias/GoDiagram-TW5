/*\
title: $:/plugins/cleinias/TW5-Godiagram/godiagram.js
type: application/javascript
module-type: widget

godiagram.js provides a `<$godiagram>` widget that creates an SVG image 
             of a goban from it ASCII representation.
            It uses the GoDiagramJS library render the digrams. 
            See https://github.com/cleinias/GoDiagramJS for details.

\*/
(function(){

/*jslint node: true, browser: true */
/*global $tw: false */
"use strict";

//Real path to the external library is specified in files/tiddlywiki.files
var     Sltxt2svg = require("$:/plugins/cleinias/Godiagram/sltxt2svg.js").GoDiagram;
var	Widget = require("$:/core/modules/widgets/widget.js").widget;

    
var GoDiagramWidget = function(parseTreeNode,options) {
	this.initialise(parseTreeNode,options);
};

/*
Inherit from the base widget class
*/
GoDiagramWidget.prototype = new Widget();
    
    // test from Theado tutorial
/*
Render this widget into the DOM
*/
GoDiagramWidget.prototype.render = function(parent,nextSibling) {
    this.parentDomNode = parent;
    this.computeAttributes();
    var goban = this.getAttribute("goban");
    var div = this.document.createElement("div");
//    console.log(goban);
    var parser = new Sltxt2svg(goban);
    var svgDiagram = parser.createSVG();
    //    debugger;
//    console.log("MY DIV IS THIS: \n",div);
    var mySvgNode = this.document.createElement("svg");
    div.innerHTML = svgDiagram;
 // div.appendChild(mySvgNode);
    parent.insertBefore(div,nextSibling);
    this.domNodes.push(div);
};
  
/*
A widget with optimized performance will selectively refresh, but here we refresh always
*/
GoDiagramWidget.prototype.refresh = function(changedTiddlers) {
  // Regenerate and rerender the widget and
  // replace the existing DOM node
  this.refreshSelf();
  return true;
};


    exports.godiagram = GoDiagramWidget;

})();
