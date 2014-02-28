Knex.js is originally a multi-dialect query builder for Node.js ```but```, this fork cut the Node.js part, and allow the use of his power and fun query builder at the client side. Also, the fork allow you to use a rest service, to send the query, and receive the result, take a look bellow to see how.

Usage
=====

Install this modules at your project with npm:

	npm install lodash
	npm install bluebird
	npm install generic-pool-redux

They will be automatically reconized by knex-bundle.js with ```node-resolve```, so no need to move to any folder, just npm install each one.

Put this scripts at your html:

``` html
<script src="jquery.js"></script>
<script src="knex-bundle.js"></script>
```

Open a connection with the url that translate the queries:

``` javascript
var knex = null;
var Knex = require('knex');
Knex.knex = Knex.initialize({
	client: 'sqlite3',
	connection: {
		url: '/db/'
	}
});

knex = Knex.knex;
knex('books')
	.column('title', 'author', 'year')
	.select()
	.then(function(result){
		// handle the result as you want
	});
```

To see more about, check out the example folder.

Why?
====

We want to give real powers to client side with single page apps based on ```Backbone.JS``` and ```Marionette.JS```. And we are not fans of Node.JS either :)


Strip off the Node.JS
=====================

To do this we use ```browserify```, and strip off the dependencies that are only able to use with node, such as mysql, sqlite3 and pgsql clients.
Browserify make a important part here, when we finish the code editing, we generate a bundle with:
	
	npm install -g browserify
	browserify -r ./knex.js:knex > gen/knex-bundle.js


No Knex contribution here
=========================

For tests and the original knex.js functionalitty, go to the main repository, here you will find just the process to run the ```current``` knexjs version on client side. This means that we will keep the repo updated with the final version, building, but if you want to ```contribute``` to knex, go to the ```original```repository.


Original Knex
=============

```
._____.                                                                        ______
|     |                                                                       /     /
|     |                                                                      /     /
|     |     _____   ._____      ._____.     ,_____________.   ______        /     /
|     |    /    /   |     \     |     |     /             \   \     \      /     /
|     |   /    /    |      \    |     |    /               \   \     \    /     /
|     |  /    /     |       \   |     |   /     ,______.    \   \     \  /     /
|     | /    /      |        \  |     |  /     /       \     \   \     \/     /
|     |/    \       |         \ |     |  |     |    ____\    |    \          /
|     |\     \      |          \|     |  |     |   /         |     \         \
|     | \     \     |     |\          |  |     |  /__________|     /          \
|     |  \     \    |     | \         |  \     \                  /     /\     \
|     |   \     \   |     |  \        |   \     \__________/\    /     /  \     \
|     |    \     \  |     |   \       |    \                 \  /     /    \     \
|_____|     \_____\ |_____|    \______|     \_______________/  /_____/      \_____\
```
[![Build Status](https://travis-ci.org/tgriesser/knex.png?branch=master)](https://travis-ci.org/tgriesser/knex)

For Docs, License, Tests, FAQ, and other information, see: http://knexjs.org

For a full ORM, see: http://bookshelfjs.org

To suggest a feature, report a bug, or general discussion: http://github.com/tgriesser/knex/issues/