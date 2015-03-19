var	legend = new Array();
	legend["fat"] = new Array();
	legend["muscle"] = new Array();

        legend["fat"]["FW"] = "Global fat";
	legend["fat"]["Fr"] = "Arm (right)";
	legend["fat"]["Fl"] = "Arm (left)";
	legend["fat"]["FR"] = "Leg (right)";
	legend["fat"]["FL"] = "Leg (left)";
	legend["fat"]["FT"] = "Chest";

        legend["muscle"]["mW"] = "Global muscle";
	legend["muscle"]["mr"] = "Arm (right)";
	legend["muscle"]["ml"] = "Arm (left)";
	legend["muscle"]["mR"] = "Leg (right)";
	legend["muscle"]["mL"] = "Leg (left)";
	legend["muscle"]["mT"] = "Chest";

var	svg_part_ids = new Array();
	svg_part_ids["Fr"] = "right_arm";
	svg_part_ids["Fl"] = "left_arm";
	svg_part_ids["FR"] = "right_leg";
	svg_part_ids["FL"] = "left_leg";
	svg_part_ids["FT"] = "chest";
	svg_part_ids["mr"] = "right_arm";
	svg_part_ids["ml"] = "left_arm";
	svg_part_ids["mR"] = "right_leg";
	svg_part_ids["mL"] = "left_leg";
	svg_part_ids["mT"] = "chest";

// Set the dimensions of the canvas / graph
var	margin = {top: 30, right: 20, bottom: 30, left: 50},
	width = 1000 - margin.left - margin.right,
	height = 200 - margin.top - margin.bottom;
 
// Parse the date / time
var	parseDate = d3.time.format("%d/%m/%Y").parse;
 
// Set the ranges
var	x = d3.time.scale().range([0, width]);
var	y = d3.scale.linear().range([height, 0]);
 
// Define the axes
var	xAxis = d3.svg.axis().scale(x)
	.orient("bottom").ticks(10);
 
var	yAxis = d3.svg.axis().scale(y)
	.orient("left").ticks(5);
 
// Define the line
var	weight = d3.svg.line()
    	.interpolate("basis")
	.x(function(d) { return x(d.DT); })
	.y(function(d) { return y(d.Wk); });
var	fat = d3.svg.line()
    	.interpolate("basis")
	.x(function(d) { return x(d.DT); })
	.y(function(d) { return y(d.FW); });
    
// Adds the svg canvas
var	svg1 = d3.select("#weight")
	.append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
	.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")")
var	svg2 = d3.select("#global_fat")
	.append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
	.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")")
var	svg3 = d3.select("#body_fat")
	.append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
	.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")")
var	svg4 = d3.select("#global_muscle")
	.append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
	.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")")
var	svg5 = d3.select("#leg_muscle")
	.append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
	.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")")
var	svg6 = d3.select("#arm_muscle")
	.append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
	.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")")
var	svg_water = d3.select("#body_water")
	.append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
	.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")")
var	svg_viseral = d3.select("#viseral_fat")
	.append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
	.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")")
var	svg_bmr = d3.select("#bmr")
	.append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
	.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")")
var	svg_age = d3.select("#metab_age")
	.append("svg")
		.attr("width", width + margin.left + margin.right)
		.attr("height", height + margin.top + margin.bottom)
	.append("g")
		.attr("transform", "translate(" + margin.left + "," + margin.top + ")")
 
// Get the data
d3.csv(csv_file, function(error, data) {
    // Extract model, age and height
    u_model  = data[0].MO;
    u_height = data[0].Hm;
    u_age    = d3.max(data, function(d) { return d.AG; });

    document.getElementById('user_info').innerHTML =
	'Age : ' + u_age + '<br>' +
	'Height : ' + Math.floor(u_height) + '<br>' +
	'Model : ' + u_model;
    
    document.getElementById('img_model').src = "img/model-" + u_model.toLowerCase() + ".jpg";
    
    data.forEach(function(d) {
	d.DT = parseDate(d.DT);
    });
    // Scale the range of the data
    x.domain(d3.extent(data, function(d) { return d.DT; }));
    y.domain(d3.extent(data, function(d) { return d.Wk; }));
    //y.domain([80, 87]);
    
    // Add the valueline path.
    svg1.append("path")
	.attr("class", "line")
	.attr("d", weight(data));
    
    // Add the X Axis
    svg1.append("g")		
	.attr("class", "x axis")
	.attr("transform", "translate(0," + height + ")")
	.call(xAxis
	      .tickSize(-height, 0, 0));
    
    // Add the Y Axis
    svg1.append("g")		
	.attr("class", "y axis")
	.call(yAxis
	      .tickSize(-width, 0, 0))
	.append("text")
	.attr("y", 6)
	.attr("transform", "rotate(-90)")
	.attr("dy", ".71em")
	.style("text-anchor", "end")
	.style("font-weight", "bold")
	.text("Weight");

    ///////////////////////////////////////////////////////
    //y.domain([15,25]);
    y.domain(d3.extent(data, function(d) { return d.FW; }));

    // Add the valueline path.
    svg2.append("path")
	.attr("class", "line")
	.attr("d", fat(data))
	.style("stroke", "red");
    
    // Add the X Axis
    svg2.append("g")
	.attr("class", "x axis")
	.attr("transform", "translate(0," + height + ")")
	.call(xAxis);
    
    // Add the Y Axis
    svg2.append("g")		
	.attr("class", "y axis")
	.call(yAxis)
	.append("text")
	.attr("y", 6)
	.attr("transform", "rotate(-90)")
	.attr("dy", ".71em")
	.style("text-anchor", "end")
	.style("font-weight", "bold")
	.text("Fat %");

    ///////////////////////////////////////////////////////
    y.domain(d3.extent(data, function(d) { return d.rD; }));

    var	bmr_line = d3.svg.line()
    	.interpolate("basis")
	.x(function(d) { return x(d.DT); })
	.y(function(d) { return y(d.rD); });

    // Add the valueline path.
    svg_bmr.append("path")
	.attr("class", "line")
	.attr("d", bmr_line(data))
	.style("stroke", "red");
    
    // Add the X Axis
    svg_bmr.append("g")
	.attr("class", "x axis")
	.attr("transform", "translate(0," + height + ")")
	.call(xAxis);
    
    // Add the Y Axis
    svg_bmr.append("g")		
	.attr("class", "y axis")
	.call(yAxis)
	.append("text")
	.attr("y", 6)
	.attr("transform", "rotate(-90)")
	.attr("dy", ".71em")
	.style("text-anchor", "end")
	.style("font-weight", "bold")
	.text("BMR");

    ///////////////////////////////////////////////////////
    y.domain(d3.extent(data, function(d) { return d.rA; }));

    var	age_line = d3.svg.line()
    	.interpolate("basis")
	.x(function(d) { return x(d.DT); })
	.y(function(d) { return y(d.rA); });

    // Add the valueline path.
    svg_age.append("path")
	.attr("class", "line")
	.attr("d", age_line(data))
	.style("stroke", "red");
    
    // Add the X Axis
    svg_age.append("g")
	.attr("class", "x axis")
	.attr("transform", "translate(0," + height + ")")
	.call(xAxis);
    
    // Add the Y Axis
    svg_age.append("g")		
	.attr("class", "y axis")
	.call(yAxis)
	.append("text")
	.attr("y", 6)
	.attr("transform", "rotate(-90)")
	.attr("dy", ".71em")
	.style("text-anchor", "end")
	.style("font-weight", "bold")
	.text("Estimated age");

    ///////////////////////////////////////////////////////

    y.domain(d3.extent(data, function(d) { return d.ww; }));

    var	water = d3.svg.line()
    	.interpolate("basis")
	.x(function(d) { return x(d.DT); })
	.y(function(d) { return y(d.ww); });

    // Add the valueline path.
    svg_water.append("path")
	.attr("class", "line")
	.attr("d", water(data))
	.style("stroke", "blue");
    
    // Add the X Axis
    svg_water.append("g")
	.attr("class", "x axis")
	.attr("transform", "translate(0," + height + ")")
	.call(xAxis);
    
    // Add the Y Axis
    svg_water.append("g")		
	.attr("class", "y axis")
	.call(yAxis)
	.append("text")
	.attr("y", 6)
	.attr("transform", "rotate(-90)")
	.attr("dy", ".71em")
	.style("text-anchor", "end")
	.style("font-weight", "bold")
	.text("Water %");

    ///////////////////////////////////////////////////////

    y.domain(d3.extent(data, function(d) { return d.IF; }));

    var	water = d3.svg.line()
    	.interpolate("basis")
	.x(function(d) { return x(d.DT); })
	.y(function(d) { return y(d.IF); });

    // Add the valueline path.
    svg_viseral.append("path")
	.attr("class", "line")
	.attr("d", water(data))
	.style("stroke", "#000000");
    
    // Add the X Axis
    svg_viseral.append("g")
	.attr("class", "x axis")
	.attr("transform", "translate(0," + height + ")")
	.call(xAxis);
    
    // Add the Y Axis
    svg_viseral.append("g")		
	.attr("class", "y axis")
	.call(yAxis)
	.append("text")
	.attr("y", 6)
	.attr("transform", "rotate(-90)")
	.attr("dy", ".71em")
	.style("text-anchor", "end")
	.style("font-weight", "bold")
	.text("Viseral fat");

    ///////////////////////////////////////////////////////

    var color = d3.scale.category20();
    color.domain(["FW", "Fr", "Fl", "FR", "FL", "FT"]);

    var stack = d3.layout.stack()
        .values(function(d) { return d.values; });

    var body_parts = stack(color.domain().map(function(name) {
	return {
	    name: name,
	    values: data.map(function(d) {
		return {date: d.DT, y: d[name]};
	    })
	};
    }));
    
//    x.domain(d3.extent(data, function(d) { return d.DT; }));
//    y.domain([0,100]);

//    var parts = svg3.selectAll(".parts")
//	.data(body_parts)
//	.enter().append("g")
//	.attr("class", "body_parts");
//    var area = d3.svg.area()
//        .x(function(d) { return x(d.date); })
//        .y0(function(d) { return y(d.y0); })
//        .y1(function(d) { return y(d.y0 + d.fat); });
    
//    parts.append("path")
//	.attr("class", "area")
//	.attr("d", function(d) { return area(d.values); })
//	.style("fill", function(d) { return color(d.name); });

//    parts.append("text")
//	.datum(function(d) { return {name: d.name, value: d.values[d.values.length - 1]}; })
//	.attr("transform", function(d) { return "translate(" + x(d.value.date) + "," + y(d.value.y0 + d.value.fat / 2) + ")"; })
//	.attr("x", -6)
//	.attr("dy", ".35em")
//	.text(function(d) { return d.name; });

//    svg3.append("g")
//	.attr("class", "x axis")
//	.attr("transform", "translate(0," + height + ")")
//	.call(xAxis);

//    svg3.append("g")
//	.attr("class", "y axis")
//	.call(yAxis);

    ///////////////////////////////////////////////////////

    var line = d3.svg.line()
        .interpolate("basis")
        .x(function(d) { return x(d.date); })
        .y(function(d) { return y(d.y); });
    
    color = d3.scale.category10();
    color.domain( ["FW", "Fr", "Fl", "FR", "FL", "FT"] );
    
    data_fat = d3.nest().key(function(d) { return d.name; }).entries(data);

    y.domain([d3.min(body_parts, function(d) { return d3.min(d.values, function (d) { return d.y; }); }),
    	      d3.max(body_parts, function(d) { return d3.max(d.values, function (d) { return d.y; }); })]);

    svg3.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    svg3.append("g")
        .attr("class", "y axis")
        .call(yAxis)
	.append("text")
	.attr("y", 6)
	.attr("transform", "rotate(-90)")
	.attr("dy", ".71em")
	.style("text-anchor", "end")
	.style("font-weight", "bold")
	.text("Fat %");

    var parts = svg3.selectAll(".fat")
        .data(body_parts)
        .enter().append("g")
        .attr("class", "fat");

    parts.append("path")
        .attr("class", "line")
        .attr("d", function(d) { return line(d.values); })
	.style("stroke", function(d) { return color(d.name); });

    legendSpace = width/body_parts.length;

    // Add the Legend
    body_parts.forEach(function(d,i) {
	svg3.append("text")
	    .attr("x", (legendSpace/2)+i*legendSpace)
	    .attr("y", height + (margin.bottom/2) + 12)
	    .attr("class", "legend")
	    .style("fill", function() {
		return d.color = color(d.name); })
	    .text(legend["fat"][d.name]);
    });

    ///////////////////////////////////////////////////////

    var color = d3.scale.category10();
    color.domain( ["mW", "mr", "ml", "mR", "mL", "mT"] );

    var body_parts = stack(color.domain().map(function(name) {
	return {
	    name: name,
	    values: data.map(function(d) {
		return {date: d.DT, y: d[name]};
	    })
	};
    }));

    var line = d3.svg.line()
        .interpolate("basis")
        .x(function(d) { return x(d.date); })
        .y(function(d) { return y(d.y); });

    data_muscle = d3.nest().key(function(d) { return d.name; }).entries(data);

    y.domain([d3.min(body_parts, function(d) { return d3.min(d.values, function (d) { return +d.y; }); }),
    	      d3.max(body_parts, function(d) { return d3.max(d.values, function (d) { return +d.y; }); })]);
    //y.domain([ 0, 80 ]);
    
    svg4.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    svg4.append("g")
       .attr("class", "y axis")
        .call(yAxis);
    
    var parts = svg4.selectAll(".muscle")
        .data(body_parts)
        .enter().append("g")
        .attr("class", "muscle");

    parts.append("path")
        .attr("class", "line")
        .attr("d", function(d) { return line(d.values); })
	.style("stroke", function(d) { return color(d.name); });

    legendSpace = width/body_parts.length;

    // Add the Legend
    body_parts.forEach(function(d,i) {
	svg4.append("text")
	    .attr("x", (legendSpace/2)+i*legendSpace)
	    .attr("y", height + (margin.bottom/2) + 12)
	    .attr("class", "legend")
	    .style("fill", function() {
		return d.color = color(d.name); })
	    .text(legend["muscle"][d.name]);
    });

    ///////////////////////////////////////////////////////

    // reuse color category previously defined

    var body_parts = stack(["mR", "mL", "mr", "ml"].map(function(name) {
	return {
	    name: name,
	    values: data.map(function(d) {
		return {date: d.DT, y: d[name]};
	    })
	};
    }));

    var line = d3.svg.line()
        .interpolate("basis")
        .x(function(d) { return x(d.date); })
        .y(function(d) { return y(d.y); });
    
    data_muscle = d3.nest().key(function(d) { return d.name; }).entries(data);

    y.domain([d3.min(body_parts, function(d) { return d3.min(d.values, function (d) { return +d.y; }); }),
    	      d3.max(body_parts, function(d) { return d3.max(d.values, function (d) { return +d.y; }); })]);
    
    svg5.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    svg5.append("g")
       .attr("class", "y axis")
        .call(yAxis);
    
    var parts = svg5.selectAll(".muscle")
        .data(body_parts)
        .enter().append("g")
        .attr("class", "muscle");

    parts.append("path")
        .attr("class", "line")
        .attr("d", function(d) { return line(d.values); })
	.style("stroke", function(d) { return color(d.name); });

    legendSpace = width/body_parts.length;

    // Add the Legend
    body_parts.forEach(function(d,i) {
	svg5.append("text")
	    .attr("x", (legendSpace/2)+i*legendSpace)
	    .attr("y", height + (margin.bottom/2) + 12)
	    .attr("class", "legend")
	    .style("fill", function() {
		return d.color = color(d.name); })
	    .text(legend["muscle"][d.name]);
    });

    ///////////////////////////////////////////////////////

    // reuse color category previously defined

    var body_parts = stack(["mr", "ml"].map(function(name) {
	return {
	    name: name,
	    values: data.map(function(d) {
		return {date: d.DT, y: d[name]};
	    })
	};
    }));

    var line = d3.svg.line()
        .interpolate("basis")
        .x(function(d) { return x(d.date); })
        .y(function(d) { return y(d.y); });
    
    data_muscle = d3.nest().key(function(d) { return d.name; }).entries(data);

    y.domain([d3.min(body_parts, function(d) { return d3.min(d.values, function (d) { return d.y; }); }),
    	      d3.max(body_parts, function(d) { return d3.max(d.values, function (d) { return d.y; }); })]);
    
    svg6.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    svg6.append("g")
       .attr("class", "y axis")
        .call(yAxis);
    
    var parts = svg6.selectAll(".muscle")
        .data(body_parts)
        .enter().append("g")
        .attr("class", "muscle");

    parts.append("path")
        .attr("class", "line")
        .attr("d", function(d) { return line(d.values); })
	.style("stroke", function(d) { return color(d.name); });

    legendSpace = width/body_parts.length;

    // Add the Legend
    body_parts.forEach(function(d,i) {
	svg6.append("text")
	    .attr("x", (legendSpace/2)+i*legendSpace)
	    .attr("y", height + (margin.bottom/2) + 12)
	    .attr("class", "legend")
	    .style("fill", function() {
		return d.color = color(d.name); })
	    .text(legend["muscle"][d.name]);
    });

});
