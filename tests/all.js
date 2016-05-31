var expect = require("chai").expect,
		assert = require("chai").assert;

var ChotaDB = require("../src/chotadb.js");

describe('ChotaDB instance', function() {

	var DB = new ChotaDB();

	it('should be an object', function(){
		expect(DB).to.be.an('object');
	});

	it('should throw an error if tried to create collection with invalid name', function(done){
		DB.on('error', function (err) {
			expect(err).to.be.an('object');
			done();
		});
		DB.create('create');
	});

	it('should not throw an error if tried to create collection with valid name', function(done){
		var errTimeout = setTimeout(function () {
	    assert.ok();
	    done();
	  }, 1000);

		DB.on('error', function (err) {
			clearTimeout(errTimeout);
    	assert.fail();
    	done();
		});
		DB.create('Test');
	});

	it('"create" should create property on DB instance', function(){
		DB.create('Test');
		expect(DB.Test).to.not.equal(undefined);
	});
	//
	// it('"insert" should add record', function(done){
	// 	DB.Test.insert({
	// 		name: 'Test',
	// 		age: null
	// 	}).then(function (rec) {
	// 		expect(rec).to.not.equal(undefined);
	// 		done();
	// 	});
	// });

});
