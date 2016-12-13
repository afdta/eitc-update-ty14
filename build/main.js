import dir from '../../js-modules/rackspace.js';
import format from '../../js-modules/formats.js';
import table from '../../js-modules/table.js';


//local use
dir.local();
dir.add("data", "data/ty2014");

//rackspace
//dir.add("data", "eitc-interactive/data/ty2014");

function mainfn(){
	var state = {};
		state.st = null;
		state.geo = null;
		state.year = 14;

	var wrap = d3.select("#eitc-interactive").style("max-width","1200px");
	var control = d3.select("#eitc-interactive-control");
	var user_guide = d3.select("#eitc-user-guide-ty2014").attr("href", dir.url("data","UserGuideTY14.docx")).attr("type","application/msword");

	var gheight = 200;
	var svg = d3.select("#eitc-interactive-graphic").style("height",gheight+"px").append("svg").style("height","200");

	var geo_select_wrap = control.append("div").style("border-bottom","0px solid #aaaaaa")
											   .style("margin-right","1em")
											   .classed("control-section", true)
											   ;

	var geo_levels = [
			{code:"zipcode", label:"Zip code", aso:false},
			{code:"city", label:"Place (city/town)", aso:false},
			{code:"county", label:"County", aso:false},
			{code:"congress", label:"Congressional district"},
			{code:"house", label:"State legislative district (lower chamber)"},
			{code:"senate", label:"State legislative district (upper chamber)"},
			{code:"metro", label:"Metropolitan area", aso:true},
			{code:"state", label:"State", aso:true}
		];
	state.geo = geo_levels[0].code;

	geo_select_wrap.append("div")
					.style("height","1.2em")
					.append("p").text("SELECT LEVEL OF GEOGRAPHY")
					.style("font-size","0.8em")
					.style("margin","0em")
					.style("text-align","left");

	var geo_select = geo_select_wrap.append("div").style("height","2em").append("select");
	var geo_options = geo_select.selectAll("option").data(geo_levels)
			.enter().append("option").attr("value", function(d,i){return d.code}).text(function(d,i){return d.label})

	geo_select.on("change", function(d,i){
		state.geo = this.value;
		setSelection();
	});

	var fips52 = [{"STATE":"00","STUSAB":"ALL","STATE_NAME":"All states","STATENS":"00all"},{"STATE":"01","STUSAB":"AL","STATE_NAME":"Alabama","STATENS":"01779775"},{"STATE":"02","STUSAB":"AK","STATE_NAME":"Alaska","STATENS":"01785533"},{"STATE":"04","STUSAB":"AZ","STATE_NAME":"Arizona","STATENS":"01779777"},{"STATE":"05","STUSAB":"AR","STATE_NAME":"Arkansas","STATENS":"00068085"},{"STATE":"06","STUSAB":"CA","STATE_NAME":"California","STATENS":"01779778"},{"STATE":"08","STUSAB":"CO","STATE_NAME":"Colorado","STATENS":"01779779"},{"STATE":"09","STUSAB":"CT","STATE_NAME":"Connecticut","STATENS":"01779780"},{"STATE":"10","STUSAB":"DE","STATE_NAME":"Delaware","STATENS":"01779781"},{"STATE":"11","STUSAB":"DC","STATE_NAME":"District of Columbia","STATENS":"01702382"},{"STATE":"12","STUSAB":"FL","STATE_NAME":"Florida","STATENS":"00294478"},{"STATE":"13","STUSAB":"GA","STATE_NAME":"Georgia","STATENS":"01705317"},{"STATE":"15","STUSAB":"HI","STATE_NAME":"Hawaii","STATENS":"01779782"},{"STATE":"16","STUSAB":"ID","STATE_NAME":"Idaho","STATENS":"01779783"},{"STATE":"17","STUSAB":"IL","STATE_NAME":"Illinois","STATENS":"01779784"},{"STATE":"18","STUSAB":"IN","STATE_NAME":"Indiana","STATENS":"00448508"},{"STATE":"19","STUSAB":"IA","STATE_NAME":"Iowa","STATENS":"01779785"},{"STATE":"20","STUSAB":"KS","STATE_NAME":"Kansas","STATENS":"00481813"},{"STATE":"21","STUSAB":"KY","STATE_NAME":"Kentucky","STATENS":"01779786"},{"STATE":"22","STUSAB":"LA","STATE_NAME":"Louisiana","STATENS":"01629543"},{"STATE":"23","STUSAB":"ME","STATE_NAME":"Maine","STATENS":"01779787"},{"STATE":"24","STUSAB":"MD","STATE_NAME":"Maryland","STATENS":"01714934"},{"STATE":"25","STUSAB":"MA","STATE_NAME":"Massachusetts","STATENS":"00606926"},{"STATE":"26","STUSAB":"MI","STATE_NAME":"Michigan","STATENS":"01779789"},{"STATE":"27","STUSAB":"MN","STATE_NAME":"Minnesota","STATENS":"00662849"},{"STATE":"28","STUSAB":"MS","STATE_NAME":"Mississippi","STATENS":"01779790"},{"STATE":"29","STUSAB":"MO","STATE_NAME":"Missouri","STATENS":"01779791"},{"STATE":"30","STUSAB":"MT","STATE_NAME":"Montana","STATENS":"00767982"},{"STATE":"31","STUSAB":"NE","STATE_NAME":"Nebraska","STATENS":"01779792"},{"STATE":"32","STUSAB":"NV","STATE_NAME":"Nevada","STATENS":"01779793"},{"STATE":"33","STUSAB":"NH","STATE_NAME":"New Hampshire","STATENS":"01779794"},{"STATE":"34","STUSAB":"NJ","STATE_NAME":"New Jersey","STATENS":"01779795"},{"STATE":"35","STUSAB":"NM","STATE_NAME":"New Mexico","STATENS":"00897535"},{"STATE":"36","STUSAB":"NY","STATE_NAME":"New York","STATENS":"01779796"},{"STATE":"37","STUSAB":"NC","STATE_NAME":"North Carolina","STATENS":"01027616"},{"STATE":"38","STUSAB":"ND","STATE_NAME":"North Dakota","STATENS":"01779797"},{"STATE":"39","STUSAB":"OH","STATE_NAME":"Ohio","STATENS":"01085497"},{"STATE":"40","STUSAB":"OK","STATE_NAME":"Oklahoma","STATENS":"01102857"},{"STATE":"41","STUSAB":"OR","STATE_NAME":"Oregon","STATENS":"01155107"},{"STATE":"42","STUSAB":"PA","STATE_NAME":"Pennsylvania","STATENS":"01779798"},{"STATE":"44","STUSAB":"RI","STATE_NAME":"Rhode Island","STATENS":"01219835"},{"STATE":"45","STUSAB":"SC","STATE_NAME":"South Carolina","STATENS":"01779799"},{"STATE":"46","STUSAB":"SD","STATE_NAME":"South Dakota","STATENS":"01785534"},{"STATE":"47","STUSAB":"TN","STATE_NAME":"Tennessee","STATENS":"01325873"},{"STATE":"48","STUSAB":"TX","STATE_NAME":"Texas","STATENS":"01779801"},{"STATE":"49","STUSAB":"UT","STATE_NAME":"Utah","STATENS":"01455989"},{"STATE":"50","STUSAB":"VT","STATE_NAME":"Vermont","STATENS":"01779802"},{"STATE":"51","STUSAB":"VA","STATE_NAME":"Virginia","STATENS":"01779803"},{"STATE":"53","STUSAB":"WA","STATE_NAME":"Washington","STATENS":"01779804"},{"STATE":"54","STUSAB":"WV","STATE_NAME":"West Virginia","STATENS":"01779805"},{"STATE":"55","STUSAB":"WI","STATE_NAME":"Wisconsin","STATENS":"01779806"},{"STATE":"56","STUSAB":"WY","STATE_NAME":"Wyoming","STATENS":"01779807"}];

	state.st = fips52[0].STUSAB;

	var state_select_wrap = control.append("div").style("border-bottom","0px solid #aaaaaa")
											     .style("margin-right","1em")
											     .classed("control-section", true)
											     ;
	state_select_wrap.append("div")
					 .style("height","1.2em")
					 .append("p").text("FILTER BY STATE")
					 .style("font-size","0.8em")
					 .style("margin","0em")
					 .style("text-align","left");
	var state_select = state_select_wrap.append("div").style("height","2em").append("select");
	var state_options = state_select.selectAll("option").data(fips52).enter().append("option")
			.attr("value", function(d,i){return d.STUSAB}).text(function(d,i){return d.STATE_NAME})
			;

	state_select.on("change", function(d,i){
		state.st = this.value;
		setSelection();
	})

	var download_button = control.append("a").style("display","block")
											 .style("text-decoration", "none")
										     .style("color","#ffffff")
										     .style("font-weight","bold")
										     .style("width","12em")
										     .style("border","0px solid #aaaaaa")
										     .style("padding","0em 0em 0em 0em")
										     .style("text-align","center")
										     .classed("control-section", true)
										     ;

	download_button.append("div").style("width","100%").style("height","1.2em");

	var dspan = download_button.append("div")
				   .style("height","2em")
				   .style("background-color","#dc2a2a")
				   .append("span")
				   .text("Download CSV »")
				   .style("line-height","2.5em")
				   .style("display","inline-block")
				   .style("vertical-align","middle")
				   .style("font-size","0.8em")
				   ;

	download_button.on("mouseenter", function(d,i){dspan.style("text-decoration","underline")});
	download_button.on("mouseleave", function(d,i){dspan.style("text-decoration","none")});



	function setSelection(){
		if(state.geo == "metro" || state.geo == "state"){
			state_options.filter(function(d,i){
				return d.STUSAB != "ALL";
			}).attr("disabled",true);
			state.st = "ALL";
			state_select.node().value = state.st;
		}
		else{
			state_options.attr("disabled",null);
		}

		var file = state.geo + "TY14/" + state.geo + (state.st=="ALL" ? "_TY14.csv" : (state.st + "_TY14.csv")); 
		var href = dir.url("data", file);

		download_button.attr("href", href);
		download_button.attr("type", "text/csv");

		d3.csv(href, function(E, D){
			try{
				if(E){
					throw "Bad_download";
				}
				else{
					var H = d3.histogram().value(function(d){
						var num = +(d.ERETURN14.replace(/,/g, ""));
						var val = +(d.EEICAM14.replace(/,/g, ""));
						var avg = num==0 ? 0 : val/num;
						//console.log(avg);
						//console.log(val + " == " + d.EEICAM14);
						return avg;
					});
					var BINS = H(D);
					//console.log(BINS);
					var BINWIDTH = 100/BINS.length > 15 ? 15 : 100/BINS.length;
					var scale = d3.scaleLinear().domain([0,1]).range([gheight,0]);
					var max = d3.max(BINS, function(d,i){return d.length});
					var B = {};
					B.u = svg.selectAll("rect").data(BINS);
					B.u.exit().remove();
					B.e = B.u.enter().append("rect");
					B.b = B.e.merge(B.u);
					B.b.attr("x", function(d,i){return (i*BINWIDTH)+"%"})
					   .attr("y", function(d,i){
					   		return scale(d.length/max);
					   })
					   .attr("height", function(d,i){
					   		return gheight - scale(d.length/max);
					   })
					   .attr("width", BINWIDTH+"%");
				}
			}
			catch(e){
				svg.selectAll("*").remove();
			}
		})
	}

	setSelection();

}


//on load, kick off the app
document.addEventListener("DOMContentLoaded", function(){
	mainfn();
});