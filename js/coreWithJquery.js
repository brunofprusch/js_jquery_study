
		//É necessário carregar o evento.
		//A função .ready é executada assim que o documento termina de ser carregado, executando assim a função passada como callback.
		$(document).ready(function() {
			$(".quantity").change(function() {
				calculateTotalProducts();
			});
		});

		function moneyTextToFloat(text) {
			var cleanText = text.replace("R$ ", "").replace(",", ".");
			return parseFloat(cleanText);
		}

		function floatToMoneyText(value) {
			var text = (value < 1 ? "00" : "") + Math.floor(value * 100);
			text = "R$ " + text;
			return text.substr(0, text.length - 2) + "," + text.substr(-2);
		}

		function readTotal() {
			//Código antigo sem jquery
			//var total = document.getElementById("total");
			//return moneyTextToFloat(total.innerHTML);
			var total = $("#total").text();
			return moneyTextToFloat(total);
		}

		function writeTotal(value) {
			var newTotalText = floatToMoneyText(value);
			$("#total").text(newTotalText);

		}

		function calculateTotalProducts() {

			var products = $(".product");
			var total = parseFloat("0");

			//Utilizado a função each para realiza a iteração, bem como passado uma função para callback que é a função que fará o calculo do total. 
			$(products).each(function(pos, product) {
				//É necessário utilizar a variavel produto com o $ na frente pois desta maneira é considerado um objeto do jquery.
				//É necessário que seja um obejto do jquery para que possamos utilizar o método find() ou outros que são do jquery.
				var $product = $(product);
				var price = moneyTextToFloat($product.find(".price").text());
				var quantity = moneyTextToFloat($product.find(".quantity").val());
				total += parseFloat(quantity * price);
			});
			
			console.log(total);
			writeTotal(total);
		}