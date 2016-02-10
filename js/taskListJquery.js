var $lastClicked;

$(document).ready(function() {
	
	$("#tarefa").keydown(function(event) {
		if(event.which === 13) {
			//onTarefaPendingEdition($("#tarefa"))
		}
	});

	$(".tarefa-delete").click(onTarefaDeleteClick);
	$(".tarefa-item").click(onTarefaItemClick);

});

function onTarefaItemClick() {
	
	if(!$(this).is($lastClicked)) {
		if($lastClicked !== undefined) {
			savePendingEdition($lastClicked);
		}
	
		$lastClicked = $(this);

		var text = $(this).children('.tarefa-texto').text();
		var html = "<input type='text' " +
				   "class='tarefa-edit' value='" +
				   text + "'>";
		$lastClicked.html(html);
		$(".tarefa-edit").keydown(onTarefaEditKeydown);
	}
}

function onTarefaEditKeydown(event) {
	if(event.which === 13) {
		savePendingEdition($lastClicked);
		$lastClicked = undefined;
	}
}

function onTarefaDeleteClick() {
	//Está sendo realizado o hide porém de forma lenta e logo após é realizada a remoção do item.
	//Também está sendo utilizada a função .off para desassociar todos os eventos click do elemento com a classe tarefa-item.
	$(this).parent('.tarefa-item').off('click').hide('slow', function() {
		$(this).remove();
	});
}

function savePendingEdition($tarefa) {
	var text = $tarefa.children('.tarefa-edit').val();
	$tarefa.empty();

	//$tarefa.append("<div class='tarefa-texto'>" + text + "</div>")
	//.append("<div class='tarefa-delete'>X</div>")
	//.append("<div class='clear'></div>");

	//O código abaixo tem exatamente a mesma função do código a cima.
	//Porém é de uma forma diferente, que utiliza mais funcões do Jquery, como por exemplo .addClass() e .text() 
	$tarefa.append($("<div />")
		   		.addClass("tarefa-texto")
		   		.text(text))
			.append($("<div />")
				.addClass("tarefa-delete")
				.text("X"))
			.append($("<div />")
				.addClass("clear"));


	$(".tarefa-delete").click(onTarefaDeleteClick);
	$tarefa.click(onTarefaItemClick);
}

