/* Author: Artie Kuhn

*/


$(document).ready(function(){
	/* Smooth Scroller */	
	$('nav a').click(function(e){
		$('html,body').animate({scrollTop:$(this.hash).offset().top}, 500);
	});
	
	setInterval("artieSlideShow();", 5000);
	
	/* add a lightbox
	$(".slideShow").each(function(index) {
		$(this).find("ul").find("li").each(function(index) {
			$(this).find("img").each(function(index) {
				$(this).click(function(e) {
					$(this).attr("src").dialog(); //this doesn't work yet
				});
			});
		});
	});
	*/

	/* Highlighter */
	/* scrollSpacingOffset is how close an item needs to be towards the top to "count" as the active section */
	var scrollSpacingOffset = 400;
	
	targets = new Array("statement", "outline","prototype","research","process","background","samples");
	targetsY = new Array();
	for (i=0; i<targets.length; i++) {
		targetsY[i] = $('#'+targets[i]).offset().top;
	}
	
	$(window).scroll(function () {
		var currentScroll = -1*$('html').offset().top;
		$('nav a').removeClass('selected');
		for (i=0; i<targetsY.length; i++) {
			if ( (currentScroll >= targetsY[i]-scrollSpacingOffset) && ((currentScroll < targetsY[i+1]-scrollSpacingOffset) || i==targetsY.length-1 ) ) {
				$('nav a[href="#'+targets[i]+'"]').addClass('selected');
			}
		}
	})
});

function artieSlideShow() {
	$(".slideShow").each(function(index) {
		var totalNumberOfSamples = $(this).find("ul").find("li").length;
		var currentItemLeftMargin = ($(this).find("ul").css("marginLeft"));
		var currentItem = Number( currentItemLeftMargin.substr(0,currentItemLeftMargin.indexOf("px")) )/-400;
		
		if( currentItem < totalNumberOfSamples-1 ) {
			$(this).find("ul").css("marginLeft","-=400px");
		} else {
			$(this).find("ul").css("marginLeft","0px");
		}
		
		
	});
}