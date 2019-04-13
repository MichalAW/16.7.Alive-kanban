var prefix = 'https://cors-anywhere.herokuapp.com/';
var baseUrl = 'https://kodilla.com/pl/bootcamp-api';
var myHeaders = {
  'X-Client-Id': '3766',
  'X-Auth-Token': '4343329422ea3fb07a9ba7238f375c4f'
};

fetch(prefix + baseUrl + '/board', { headers: myHeaders })
  .then(function(resp) {
    return resp.json();
  })
  .then(function(resp) {
    setupColumns(resp.columns);
  });

	function setupColumns(columns) {
    columns.forEach(function(column) {
  		var col = new Column(column.id, column.name);
    	board.addColumn(col);
    	setupCards(col, column.cards);
  });
}

function setupCards(col, cards) {
	cards.forEach(function (card) {
  	var cardObj = new Card(card.id, card.name);
		col.addCard(cardObj);
	});
}

// OGÓLNA FUNKCJA
function randomString() {
	var chars = '0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ';
	var str = '';
	for (var i = 0; i < 10; i++) {
	  str += chars[Math.floor(Math.random() * chars.length)];
	}
  console.log('str', str)
	return str;
}

function generateTemplate(name, data, basicElement) {
	var template = document.getElementById(name).innerHTML;
	var element = document.createElement(basicElement || 'div');

	Mustache.parse(template);
	element.innerHTML = Mustache.render(template, data);

	return element;
}
