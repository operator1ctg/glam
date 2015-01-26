/**
 * @fileoverview line primitive parser/implementation
 * 
 * @author Tony Parisi
 */

glam.LineElement = {};

glam.LineElement.create = function(docelt, style) {
		
	if (style) {
	}
	
	var material = glam.DOMMaterial.create(style, null, "line");
	
	var geometry = new THREE.Geometry;
	
	glam.LineElement.parse(docelt, geometry, material);
	
	var line = new THREE.Line(geometry, material);
	
	var obj = new Vizi.Object;	
	var visual = new Vizi.Visual(
			{
				object : line,
			});
	obj.addComponent(visual);

	// Is this the API?
	docelt.geometry = geometry;
	docelt.material = material;
	
	return obj;
}

glam.LineElement.parse = function(docelt, geometry, material) {

	var verts = docelt.getElementsByTagName('vertices');
	if (verts) {
		verts = verts[0];
		glam.DOM.Types.parseVector3Array(verts, geometry.vertices);
	}
	
	var vertexColors = [];
	var colors = docelt.getElementsByTagName('colors');
	if (colors) {
		colors = colors[0];
		if (colors) {
			glam.DOM.Types.parseColor3Array(colors, vertexColors);
	
			var i, len = vertexColors.length;
	
			for (i = 0; i < len; i++) {			
				var c = vertexColors[i];
				geometry.colors.push(c.clone());
			}
	
			material.vertexColors = THREE.VertexColors;
		}
	}


}

