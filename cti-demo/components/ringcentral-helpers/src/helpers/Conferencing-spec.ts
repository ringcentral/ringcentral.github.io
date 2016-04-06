/// <reference path="../externals.d.ts" />

export import mocha = require('../test/mocha');
var expect = mocha.chai.expect;
var spy = mocha.sinon.spy;
var sdk = mocha.sdk;
var helpers = mocha.helpers;

describe('RingCentralHelpers.Conferencing', function() {

    'use strict';

    var Conferencing = helpers.conferencing();

    describe('createUrl', function() {

        it('returns URL depending on options', function() {

            expect(Conferencing.createUrl()).to.equal('/account/~/extension/~/conferencing');

        });

    });

});
