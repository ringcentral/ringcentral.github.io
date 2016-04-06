/// <reference path="../externals.d.ts" />

export import mocha = require('../test/mocha');
var expect = mocha.chai.expect;
var spy = mocha.sinon.spy;
var sdk = mocha.sdk;
var helpers = mocha.helpers;

describe('RingCentralHelpers.BlockedNumber', function() {

    'use strict';

    var BlockedNumber = helpers.blockedNumber();

    describe('createUrl', function() {

        it('returns URL depending on options', function() {

            expect(BlockedNumber.createUrl()).to.equal('/account/~/extension/~/blocked-number');
            expect(BlockedNumber.createUrl({extensionId: 'foo'})).to.equal('/account/~/extension/foo/blocked-number');
            expect(BlockedNumber.createUrl({extensionId: 'foo'}, 'bar')).to.equal('/account/~/extension/foo/blocked-number/bar');

        });

    });

});
