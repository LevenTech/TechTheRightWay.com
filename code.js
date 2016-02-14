
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','http://www.google-analytics.com/analytics.js','ga');
ga('create', 'UA-73623567-1', 'auto');
ga('send', 'pageview');

$(document).ready(function(){

	$('.content_box').click(function(e)	{
		var $thisBox = $(e.target).closest('.content_box');
		thisId = $thisBox.attr('id');

		var $otherboxes = $('.content_box:not(#' + thisId + ')')

		var $parent = $thisBox.parent();

		var isExpanding = !$thisBox.is('.expand');

		if (isExpanding)
		{
			$parent.addClass('has_expand');
		}

		if ($thisBox.is('.expand'))
		{
			$thisBox.removeClass('expand');
			$otherboxes.removeClass('shrunk');
		}else{
			$thisBox.addClass('expand');
			$otherboxes.addClass('shrunk');			
		}

		if (!isExpanding)
		{
			$parent.removeClass('has_expand');
		}
	});

	$(".suggest_btn").click(function(e) {
		$("#myModalLabel").text("Suggest Something");
		var modalContent = "<table><tr height='50px;'><td>What do you think we should add?</td><td><input class='modalInput' id='myModalInput1'></input></td><tr>";
		modalContent = modalContent + "<tr height='50px;'><td>How will it help?</td><td><input class='modalInput' id='myModalInput2'></input></td><tr>";
		modalContent = modalContent + "<tr height='50px;'><td>Your Email?<br/><span style='font-size:75%;'>(Optional - we might have questions)</span></td><td><input class='modalInput' id='myModalInput3'></input></td><tr>";
		$("#myModalBody").html(modalContent);
		var context = $(this).data("suggestcontext");
		$("#myModalButton").html("Send Suggestion");
		$(".modalInput").keyup(function(event){
			if(event.keyCode == 13){ $("#myModalButton").click(); }
		});
		$("#myModal").modal("show");
		//$('#myModalInput').focus();
		$("#myModalButton").click(function() {
			ga('create', 'UA-73623567-1', 'auto');
			var send_back = context+":"+$('#myModalInput1').val()+"("+$('#myModalInput2').val()+")--"+$('#myModalInput3').val();
			ga('send', 'event', 'Suggest', send_back);
		});
		e.stopPropagation();
	});
	$(".FindAlternatives").click(function(e) {
		$("#myModalLabel").text("Look for Alternative Options");
		var modalContent = "This will search Google for alternatives to whatever product you're considering.";
		modalContent = modalContent + "<br/><br/>Enter the name of that product below.";
		modalContent = modalContent + "<br/><br/><input id='myModalInput'></input>"
		$("#myModalBody").html(modalContent);
		$("#myModalButton").html("Search");
		$("#myModalInput").keyup(function(event){
			if(event.keyCode == 13){ $("#myModalButton").click(); }
		});
		$("#myModal").modal({
		});
		//$('#myModalInput').focus();
		$("#myModalButton").click(function() {
			window.open("https://www.google.com/#q="+$("#myModalInput").val()+"+vs+");
		});
		ga('create', 'UA-73623567-1', 'auto');
		ga('send', 'event', "Google Search", "Versus", $("#myModalInput").val());	
		e.stopPropagation();
	});
	$(".ReadReviews").click(function(e) {
		SearchTwitter("Find Product Reviews","IIt's even better if you enter some search terms in the box below.","Search","Find Reviews");
		e.stopPropagation();
	});
	$(".ReadAboutCompanies").click(function(e) {
		SearchTwitter("Research a Tech Company","It's even better if you enter the company name into the box below.","Research Company");
		e.stopPropagation();
	});
	$(".ReadAboutProduct").click(function(e) {
		SearchTwitter("Research the Product","It's even better if you enter the name of the product into the box below.","Research Product","");
		e.stopPropagation();
	});
	$(".FindHowTos").click(function(e) {
		SearchTwitter("Find How-To's","It's even better if you enter some search terms into the box below.","Find How-To's","How To");
		e.stopPropagation();
	});
	$(".FindDeals").click(function(e) {
		SearchTwitter("Find Deals","It's even better if you enter some search terms into the box below.","Find Deals","Deal");
		e.stopPropagation();
	});
	$(".HowToGeekLink").click(function(e) {openLink('http://howtogeek.com','How-To Geek');e.stopPropagation();});
	$(".ZapierLink").click(function(e) {openLink('http://zapier.com','Zapier');e.stopPropagation();});
	$(".IFTTTLink").click(function(e) {openLink('http://ifttt.com','IFTTT');e.stopPropagation();});
	$(".BestBuyLink").click(function(e) {openLink('http://bestbuy.com','Best Buy');e.stopPropagation();});
	$(".AmazonLink").click(function(e) {openLink('http://amazon.com','Amazon');e.stopPropagation();});
	$(".SuperUserLink").click(function(e) {openLink('http://superuser.com','SuperUser');e.stopPropagation();});
	$(".WebAppsLink").click(function(e) {openLink('http://webapps.stackexchange.com','WebApps@SE');e.stopPropagation();});
	$(".ReadAboutTechLink").click(function(e) {openLink('https://twitter.com/search?src=typd&q=list%3ALevenTechTweets%2FSources','Twitter Tech Articles');e.stopPropagation();});
});

$(window).on('#myModal', 'shown.bs.modal', function () {
	$('#myModalInput').focus();
});
/*
function closeSlide(time) {
	$("#main_title_bars").animate({width: $('body').width()},time);
	$(".main_title_bar").css('cursor','');
	$(".content_box").hide();
}*/

function openLink(url,eventName) {
	window.open(url)
	ga('create', 'UA-73623567-1', 'auto');
	ga('send', 'event', 'External Link', eventName);
}

function SearchTwitter(title, content, buttonName, searchTerms) {
	$("#myModalLabel").text(title);
	var modalContent = "This will search Twitter for articles from approved Tech sources.";
	modalContent = modalContent + "<br/><br/>" + content;
	modalContent = modalContent + "<br/><br/><input id='myModalInput'></input>"
	$("#myModalBody").html(modalContent);
	$("#myModalButton").html(buttonName);
	$("#myModalInput").keyup(function(event){
		if(event.keyCode == 13){ $("#myModalButton").click(); }
	});
	$("#myModal").modal();
	//$('#myModalInput').focus();
	$("#myModalButton").click(function() {
		window.open("https://twitter.com/search?src=typd&q=list%3ALevenTechTweets%2FSources%20"+searchTerms+"%20"+$("#myModalInput").val());
	});
	ga('create', 'UA-73623567-1', 'auto');
	ga('send', 'event', 'Twitter Search', buttonName, $("#myModalInput").val());				
}

