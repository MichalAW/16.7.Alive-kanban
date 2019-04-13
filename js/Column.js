// Column
var prefix = 'https://cors-anywhere.herokuapp.com/';

function Column(name) {
  	var self = this;
	var data = new FormData();
  	this.id = randomString();
  	this.name = name || 'No name given';
  	this.element = generateTemplate('column-template', { name: this.name, id: this.id });

  	this.element.querySelector('.column').addEventListener('click', function (event) {
	    if (event.target.classList.contains('btn-delete')) {
	      	self.removeColumn();
	    }
	
		if (event.target.classList.contains('add-card')) {
		  	var cardName = prompt("Enter the name of the card");
		  	event.preventDefault();

		  	fetch(prefix + baseUrl + '/card', {
		      	method: 'POST',
		      	headers: myHeaders,
		      	body: data,
	    	})
	    	.then(function(res) {
	      		return res.json();
	    	})
	    	.then(function() {
				//create a new client side card
				data.append('name', cardName);
				data.append('bootcamp_kanban_column_id', self.id);

				fetch(prefix + baseUrl + '/card', {
				    method: 'POST',
				    headers: myHeaders,
				    body: data,
				})
				.then(function(res) {
				   	return res.json();
				})
				.then(function(resp) {
					var card = new Card(resp.id, cardName);
					self.addCard(card);
				});
	    	});
		self.addCard(new Card(cardName));
		}
	});
}

Column.prototype = {
	addCard: function(card) {
	  	this.element.querySelector('ul').appendChild(card.element);
	},
	// remove column by clicking red "X"
	removeColumn: function() {
  	var self = this;
	fetch(prefix + baseUrl + '/column/' + self.id, { method: 'DELETE', headers: myHeaders })
	    .then(function(resp) {
	      	return resp.json();
	    })
	    .then(function(resp) {
	      	self.element.parentNode.removeChild(self.element);
	    });
	}
};