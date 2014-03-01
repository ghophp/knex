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

Take a look at: https://github.com/ghophp/test-knex-nonode you can find a fully functional example.

Open a connection with the url that translate the queries:

``` javascript
var knex = null;
var Knex = require('knex');
Knex.knex = Knex.initialize({
	client: 'catalog',
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

Create a server that handle /db/, that will receive the SQL to perform at the sqlite3 database. 

Current example use python sample (server.py):

``` python
# -*- coding: utf-8 -*-

import os
import sys
import handlers
import mimetypes
import cyclone.web
from twisted.python import log

def run():
    mimetypes.init()
    settings = dict(
        assets_path="../data",
        assets_url="/static",
        template_path="../data/templates",
        debug=True,
        xheaders=True,
        xsrf_cookies=False,
        cookie_secret="TTXFxQWGVR37Tk4jq1L46KcobLz0N2"
    )

    current_path = os.getcwd()
    sys.path.append(current_path)

    routes = [
        (r'/db/', handlers.DbHandler),  
    ]

    application = cyclone.web.Application(routes, **settings)

    from twisted.internet import reactor

    log.startLogging(sys.stdout)
    reactor.listenTCP(8888, application)
    reactor.run()


if __name__ == '__main__':
    run()

```

And the handlers.py:

``` python
# -*- coding: utf-8 -*-

import os
import pystache
import cyclone.web

class DbHandler(cyclone.web.RequestHandler):

	def post(self):

		sql = self.get_argument('sql', None)
		bindings = self.get_argument('bindings[]', None)
		if sql is not None:
			print sql

		if bindings is not None:
			print bindings

		self.write('{\
		    "success": true,\
		    "data": {\
		        "count": 1,\
		        "rows": [\
		            {"id": 2, "name": "guilherme", "blah": false}\
		        ]\
		    }\
		}')
```

At this sample, the client side will request a SQL to the 

To see more about, check out the example folder.

Why?
====

We want to give real powers to client side with single page apps based on ```Backbone.JS``` and ```Marionette.JS```.
With this fork you can allow the client side to interact with database, with a high level query builder interface.


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