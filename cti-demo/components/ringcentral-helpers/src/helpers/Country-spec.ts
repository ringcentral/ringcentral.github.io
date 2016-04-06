/// <reference path="../externals.d.ts" />

export import mocha = require('../test/mocha');
var expect = mocha.chai.expect;
var spy = mocha.sinon.spy;
var sdk = mocha.sdk;
var helpers = mocha.helpers;

describe('RingCentralHelpers.dictionaries.Country', function() {

    'use strict';

    var Country = helpers.country();

    describe('createUrl', function() {

        it('returns URL depending on options', function() {

            expect(Country.createUrl()).to.equal('/dictionary/country');

        });

    });

});
