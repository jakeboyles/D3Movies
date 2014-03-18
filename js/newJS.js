$(document).ready(function() {



$("#go").click(function() {	
	d3.select("#chart svg").remove();
	  var item = $("#search").val()
	var apikey = "7pnkq67a82za439zqpmsse45";
	var baseUrl = "http://api.rottentomatoes.com/api/public/v1.0";
	// construct the uri with our apikey
	var moviesSearchUrl = baseUrl + '/movies.json?apikey=' + apikey;
	var query = item; 
	  // send off the query
	  $.ajax({
	    url: moviesSearchUrl + '&q=' + encodeURI(query),
	    dataType: "jsonp",
	    success: searchCallback
	  });
	  
	  });
	  });


	$(".buyName").live('click', function(){
   var name = $(this).attr("name");  
   $.ajax({
	    url: "https://itunes.apple.com/search?media=movie&term="+name,
	    dataType: "jsonp",
	    success: works
	  });

	});
	
	function works(data) {
	console.log(data);
	var link = data.results[0].trackViewUrl;
	 window.open(link);
	}
		 
	// callback for when we get back the results
	function searchCallback(data) {
	
	var color = d3.scale.linear()
    .domain([1980, 2013])
    .range(["black", "red"]);
    
    
	console.log(data);
	//Create SVG element
	var w=1000;
	var h=400;
	
	var div = d3.select("#chart").append("div")   
    .attr("class", "tooltip")               
    .style("opacity", 0);
    
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
                .style("opacity", .9);      
            div .html("Title: "+d.title+"<br /><img src='"+d.posters.thumbnail+"' /><p>"+cons+"</p> <a class='buyName' href='#' name='"+d.title+"'>Buy</a> Audience: "+d.ratings.audience_score+"<br /> Critic: "+d.ratings.critics_score)  
                .style("left", (d3.event.pageX) + "px")     
                .style("top", (d3.event.pageY - 28) + "px");    
                
            }) 
       .attr("fill", function(d) {
	    return color(d.year)
    });
    
    
 

       };