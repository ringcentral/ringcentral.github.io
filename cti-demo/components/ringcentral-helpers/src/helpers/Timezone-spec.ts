/// <reference path="../externals.d.ts" />

export import mocha = require('../test/mocha');
var expect = mocha.chai.expect;
var spy = mocha.sinon.spy;
var sdk = mocha.sdk;
var helpers = mocha.helpers;

describe('RingCentralHelpers.dictionaries.Timezone', function() {

    'use strict';

    var Timezone = helpers.timezone();

    describe('createUrl', function() {

        it('returns URL depending on options', function() {

            expect(Timezone.createUrl()).to.equal('/dictionary/timezone');

        });

    });

});
