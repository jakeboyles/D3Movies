$(document).ready(function() {

$("#go").click(function() {	
	d3.select("#chart svg").remove();
	var item = $("#search").val()
	var apikey = "7pnkq67a82za439zqpmsse45";
	var baseUrl = "http://api.rottentomatoes.com/api/public/v1.0";
	
	// This constructs the query
	var moviesSearchUrl = baseUrl + '/movies.json?apikey=' + apikey;
	var query = item; 
	
	// send it off using ajax
	  $.ajax({
	    url: moviesSearchUrl + '&q=' + encodeURI(query),
	    dataType: "jsonp",
	    success: searchCallback,
	    error: function(XMLHttpRequest, textStatus, errorThrown) { 
                    alert("Status: " + textStatus); alert("Error: " + errorThrown); 
                }       
	  });
	  return false;

	  });
	  });


	$(".close").live('click',function() {
	d3.select("#chart .tooltip")
		.style("opacity", 0)
		.style("z-index",-2);
	});
	
	$("body").live('click',function() {
	d3.select("#chart .tooltip")
		.style("opacity", 0)
		.style("z-index",-2);

	});


	$(".buyName").live('click', function(){
		var name = $(this).attr("name");  
		$.ajax({
	    url: "https://itunes.apple.com/search?media=movie&term="+name,
	    dataType: "jsonp",
	    success: function works(data) {
	    if(data.results[0]!=undefined){
		var link = data.results[0].trackViewUrl;
		window.open(link);
		console.log(data);
		}
		else {
		noty({
		timeout: 1000, // delay for closing event. Set false for sticky notifications
		layout: 'center',
		type: 'error',
		text: 'This Movie Is Not On iTunes :(',
		});	
		d3.select("#chart .tooltip").style("opacity", 0);
	}}
	});
	});
	
	
		 
	// callback for when we get back the results
	function searchCallback(data) {
		d3.select("#chart div").remove("div");
		
		var color = d3.scale.linear()
           .domain([1980, 2013])
           .range(["black", "white"]);
    
       console.log(data);
       var w=1000;
       var h=400;
	
       var div = d3.select("#chart").append("div")   
       	.attr("class", "tooltip")               
       	.style("opacity", 0)
       	.style("z-index",-2);
    
       	var svg = d3.select("#chart")
            .append("svg")
            .attr("width", w)
            .attr("height", h);
            
            
        svg.selectAll("circle")
        	.data(data.movies)
        	.enter()
        	.append("circle")
        	.attr("cx", function(d) {
	        	return (d.ratings.audience_score*9)-5;
	        })
	        .attr("cy", function(d) {
		        return 350-d.ratings.critics_score*3.2;
		    })
		    .attr("r", function(d) {
			    return ((d.ratings.critics_score+d.ratings.audience_score)/2)/7;
			})
			.on("mouseover", function(d) { 
				var cons = "";
				if(d.critics_consensus===undefined){
				cons = "";
				} 
				else {
					cons = d.critics_consensus;
			    }
			div.transition()        
                .duration(200)      
                .style("opacity", 1)
                .style("z-index",2000);      
                div .html("<a href='#' class='close'>Close</a>  <h2>"+d.title+"</h2><img src='"+d.posters.thumbnail+"' /><p>"+cons+"</p> <a class='buyName' href='#' name='"+d.title+"'>Buy</a> Audience: <span class='aud'>"+d.ratings.audience_score+"</span><br /> Critic: <span class='crit'>"+d.ratings.critics_score+"</span>")  
                .style("left", (d3.event.pageX) + "px")     
                .style("top", (d3.event.pageY - 28) + "px");    
                }) 
                .attr("fill", function(d) {
	                return color(d.year)
	             })
	             .attr("stroke","black");
	       

       };