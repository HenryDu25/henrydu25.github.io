var totalPrice = 0;
var numProducts = 0;

$( document ).ready(function() {
    $("#button").click(function () {
    	$("#button").click(function(){});
    	load6Pages(1);
    });
});

// Loads six pages at a time and checks to see if he program has reached the end of the store.
// This allows the program to speed up the process by loading many pages at once instead of waiting for one to complete before starting the next one
// It also avoids the issue where the program does not know when to stop loading more pages
// This program accounts for an arbitrary amount of pages in a shopify store
function load6Pages (startingPageNum) {
	$.when(loadPage(startingPageNum),
		loadPage(startingPageNum + 1),
		loadPage(startingPageNum + 2),
		loadPage(startingPageNum + 3),
		loadPage(startingPageNum + 4),
		loadPage(startingPageNum + 5)
		)
	.done(function (pg1, pg2, pg3, pg4, pg5, pg6) {
		addPrices(pg1[0]);
		addPrices(pg2[0]);
		addPrices(pg3[0]);
		addPrices(pg4[0]);
		addPrices(pg5[0]);
		addPrices(pg6[0]);
		if (!(pg1[0].products.length != pg6[0].products.length || pg6[0].products.length == 0)) {
			load6Pages(startingPageNum + 6);
		} else {
			$("#price").text((totalPrice / 100).toFixed(2));
			$("#products").text(numProducts);
			totalPrice = 0;
			numProducts = 0;
		}
	});
}

function addPrices (pageObject, num) {
	for (var i = pageObject.products.length - 1; i >= 0; i--) {
		for (var j = pageObject.products[i].variants.length - 1; j >= 0; j--) {
			numProducts++;
			// The rounding is due to the errors found in floating numbers by making it into an integer
			totalPrice += Math.round(parseFloat(pageObject.products[i].variants[j].price) * 100);
		}
	}
}

var loadPage = function (pageNum) {
	var url = "http://shopicruit.myshopify.com/products.json?page=" + pageNum;
	return $.getJSON(url);
}