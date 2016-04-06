/// <reference path="../externals.d.ts" />

export import mocha = require('../test/mocha');
var expect = mocha.chai.expect;
var spy = mocha.sinon.spy;
var sdk = mocha.sdk;
var helpers = mocha.helpers;

describe('RingCentralHelpers.Account', function() {

    'use strict';

    var Account = helpers.account();

    describe('createUrl', function() {

        it('returns URL depending on options', function() {

            expect(Account.createUrl()).to.equal('/account/~');

        });

    });

});
