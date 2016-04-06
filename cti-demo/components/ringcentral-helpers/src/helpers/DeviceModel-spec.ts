/// <reference path="../externals.d.ts" />

export import mocha = require('../test/mocha');
var expect = mocha.chai.expect;
var spy = mocha.sinon.spy;
var sdk = mocha.sdk;
var helpers = mocha.helpers;

describe('RingCentralHelpers.dictionaries.DeviceModel', function() {

    'use strict';

    var DeviceModel = helpers.deviceModel();

    describe('getId', function() {

        it('provides artificial IDs', function() {

            expect(DeviceModel.getId({
                sku: '23',
                name: 'Polycom IP 321 Basic IP phone',
                deviceClass: 'Desk Phone'
            })).to.equal('23');

        });

    });

});
