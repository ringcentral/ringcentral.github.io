/// <reference path="./externals.d.ts" />
import validator = require('./core/Validator');
import list = require('./core/List');
import utils = require('./core/Utils');

import accountHelper = require('./helpers/Account');
import blockedNumberHelper = require('./helpers/BlockedNumber');
import callHelper = require('./helpers/Call');
import contactHelper = require('./helpers/Contact');
import contactGroupHelper = require('./helpers/ContactGroup');
import conferencingHelper = require('./helpers/Conferencing');
import countryHelper = require('./helpers/Country');
import deviceHelper = require('./helpers/Device');
import deviceModelHelper = require('./helpers/DeviceModel');
import extensionHelper = require('./helpers/Extension');
import forwardingNumberHelper = require('./helpers/ForwardingNumber');
import languageHelper = require('./helpers/Language');
import locationHelper = require('./helpers/Location');
import messageHelper = require('./helpers/Message');
import phoneNumberHelper = require('./helpers/PhoneNumber');
import presenceHelper = require('./helpers/Presence');
import ringoutHelper = require('./helpers/Ringout');
import serviceHelper = require('./helpers/Service');
import shippingMethodHelper = require('./helpers/ShippingMethod');
import stateHelper = require('./helpers/State');
import timezoneHelper = require('./helpers/Timezone');

class RingCentralHelpers {

    public version = '0.1.0';

    protected _validator:validator.Validator;
    protected _list:list.List;
    protected _utils:utils.Utils;

    protected _account;
    protected _blockedNumber;
    protected _call;
    protected _conferencing;
    protected _contact;
    protected _contactGroup;
    protected _country;
    protected _device;
    protected _deviceModel;
    protected _extension;
    protected _forwardingNumber;
    protected _language;
    protected _location;
    protected _message;
    protected _phoneNumber;
    protected _presence;
    protected _ringout;
    protected _service;
    protected _shippingMethod;
    protected _state;
    protected _timezone;

    constructor() {

        this._utils = new utils.Utils();
        this._validator = new validator.Validator(this._utils);
        this._list = new list.List(this._utils);

        this._account = new accountHelper.Account(this._utils, this._validator, this._list);
        this._blockedNumber = new blockedNumberHelper.BlockedNumber(this._utils, this._validator, this._list);
        this._conferencing = new conferencingHelper.Conferencing(this._utils, this._validator, this._list);
        this._contact = new contactHelper.Contact(this._utils, this._validator, this._list);
        this._contactGroup = new contactGroupHelper.ContactGroup(this._utils, this._validator, this._list);
        this._country = new countryHelper.Country(this._utils, this._validator, this._list);
        this._extension = new extensionHelper.Extension(this._utils, this._validator, this._list);
        this._deviceModel = new deviceModelHelper.DeviceModel(this._utils, this._validator, this._list);
        this._device = new deviceHelper.Device(this._utils, this._validator, this._list, this._extension, this._deviceModel);
        this._presence = new presenceHelper.Presence(this._utils, this._validator, this._list, this._extension);
        this._call = new callHelper.Call(this._utils, this._validator, this._list, this._presence, this._contact);
        this._forwardingNumber = new forwardingNumberHelper.ForwardingNumber(this._utils, this._validator, this._list);
        this._language = new languageHelper.Language(this._utils, this._validator, this._list);
        this._state = new stateHelper.State(this._utils, this._validator, this._list, this._country);
        this._location = new locationHelper.Location(this._utils, this._validator, this._list, this._state);
        this._message = new messageHelper.Message(this._utils, this._validator, this._list, this._contact);
        this._phoneNumber = new phoneNumberHelper.PhoneNumber(this._utils, this._validator, this._list);
        this._ringout = new ringoutHelper.Ringout(this._utils, this._validator, this._list);
        this._service = new serviceHelper.Service(this._utils, this._validator, this._list);
        this._shippingMethod = new shippingMethodHelper.ShippingMethod(this._utils, this._validator, this._list);
        this._timezone = new timezoneHelper.Timezone(this._utils, this._validator, this._list);

    }

    country() { return this._country; }

    deviceModel() { return this._deviceModel; }

    language() { return this._language; }

    location() { return this._location; }

    shippingMethod() { return this._shippingMethod; }

    state() { return this._state; }

    timezone() { return this._timezone; }

    account() { return this._account; }

    blockedNumber() { return this._blockedNumber; }

    call() { return this._call; }

    conferencing() { return this._conferencing; }

    contact() { return this._contact; }

    contactGroup() { return this._contactGroup; }

    device() { return this._device; }

    extension() { return this._extension; }

    forwardingNumber() { return this._forwardingNumber; }

    message() { return this._message; }

    phoneNumber() { return this._phoneNumber; }

    presence() { return this._presence; }

    ringout() { return this._ringout; }

    service() { return this._service; }

}

export = new RingCentralHelpers();