// SQLite3
// -------

// Other dependencies, including the `sqlite3` library,
// which needs to be added as a dependency to the project
// using this database.
var _       = require('lodash');

// All other local project modules needed in this scope.
var ServerBase      = require('./base').ServerBase;
var Builder         = require('../../lib/builder').Builder;
var Transaction     = require('../../lib/transaction').Transaction;
var SchemaInterface = require('../../lib/schemainterface').SchemaInterface;
var Helpers         = require('../../lib/helpers').Helpers;
var Promise         = require('../../lib/promise').Promise;

var grammar         = require('./sqlite3/grammar').grammar;
var schemaGrammar   = require('./sqlite3/schemagrammar').schemaGrammar;

// Constructor for the RestClient.
var RestClient = exports.Client = ServerBase.extend({

  dialect: 'sqlite3',

  // Attach the appropriate grammar definitions onto the current client.
  attachGrammars: function() {
    this.grammar = grammar;
    this.schemaGrammar = schemaGrammar;
  },

  // Runs the query on the specified connection, providing the bindings
  // and any other necessary prep work.
  runQuery: function(connection, sql, bindings, builder) {

    if (typeof this.connectionSettings.url === 'undefined') throw new Error('No endpoint exists for the query');
    var method = (builder.type === 'insert' || builder.type === 'update' || builder.type === 'delete') ? 'run' : 'all';

    var dfd = Promise.pending();
    $.post(this.connectionSettings.url, {sql: sql, bindings: bindings}, function(result){
      return dfd.fulfill([result, this]);
    }, 'json');
    return dfd.promise;
  },

  poolDefaults: {
    max: 1,
    min: 1,
    destroy: function(client){}
  },

  ddl: function(connection, sql, bindings, builder) {
    var client = this;
  },

  getRawConnection: function() {
    var dfd = Promise.pending();
    dfd.fulfill({});
    return dfd.promise;
  },

  close: function() {
    console.log('try to close');
  },

  // Used to explicitly close a connection, called internally by the pool
  // when a connection times out or the pool is shutdown.
  destroyRawConnection: function(connection) {
    console.log('try to destroy');
  },

  // Begins a transaction statement on the instance,
  // resolving with the connection of the current transaction.
  startTransaction: function(connection) {
    console.log('try to startTransaction');
  },

  // Finishes the transaction statement on the instance.
  finishTransaction: function(type, transaction, msg) {
    var client = this;
    var dfd    = transaction.dfd;

    console.log('try to finishTransaction');
  },

  // This needs to be refactored... badly.
  alterSchema: function(builder, trx) {
    var currentCol, command;
    console.log('try to alterSchema');
  }

});
