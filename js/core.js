function moneyTextToFloat(text) {
	var cleanText = text.replace("R$ ", "").replace(",", ".");
	return parseFloat(cleanText);
}

function floatToMoneyText(value) {
	var text = (value < 1 ? "0" : "") + Math.floor(value * 100);
	text = "R$ " + text;
	return text.substr(0, text.length - 2) + "," + text.substr(-2);
}

function readTotal() {
	var total = document.getElementById("total");
	return moneyTextToFloat(total.innerHTML);
}

function writeTotal(value) {
	var total = document.getElementById("total");
	total.innerHTML = floatToMoneyText(value);
}

function calculationTotal() {

	var produtos = document.getElementsByClassName("product");

	var total = parseFloat("0");

	for(var i = 0; i < produtos.length; i++) {
		var priceElement = produtos[i].getElementsByClassName("price");
		var priceText = priceElement[0].innerHTML;
		var price = moneyTextToFloat(priceText);

		console.log(price);

		var quantityElement = produtos[i].getElementsByClassName("quantity");
		var quantityText = quantityElement[0].value;
		var quantity = moneyTextToFloat(quantityText);

		console.log(quantity);

		total = total + (quantity * price);
	}

	writeTotal(total);
}