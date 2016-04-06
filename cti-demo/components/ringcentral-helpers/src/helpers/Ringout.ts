/// <reference path="../externals.d.ts" />

import helper = require('../core/Helper');
import validator = require('../core/Validator');
import call = require('./Call');

export class Ringout extends helper.Helper {

    createUrl(options?:{extensionId?:string}, id?:string) {

        options = options || {};

        return '/account/~/extension/' + (options.extensionId || '~') + '/ringout' + (id ? '/' + id : '');

    }

    resetAsNew(object:IRingout) {
        object = super.resetAsNew(object);
        if (object) {
            delete object.status;
        }
        return object;
    }

    isInProgress(ringout:IRingout) {
        return ringout && !this.isNew(ringout) && ringout.status && ringout.status.callStatus == 'InProgress';
    }

    isSuccess(ringout:IRingout) {
        return ringout && !this.isNew(ringout) && ringout.status && ringout.status.callStatus == 'Success';
    }

    isError(ringout:IRingout) {
        return !this.isNew(ringout) && !this.isInProgress(ringout) && !this.isSuccess(ringout);
    }

    validate(item:IRingout) {

        return this.validator.validate([
            {field: 'to', validator: this.validator.required(item && item.to && item.to.phoneNumber)},
            {field: 'from', validator: this.validator.required(item && item.from && item.from.phoneNumber)}
        ]);

    }

}

export interface IRingout extends helper.IHelperObject {
    from?:call.ICallerInfo; // (!) ONLY PHONE NUMBER
    to?:call.ICallerInfo; // (!) ONLY PHONE NUMBER
    callerId?:call.ICallerInfo; // (!) ONLY PHONE NUMBER
    playPrompt?:boolean;
    status?:{
        callStatus?:string;
        callerStatus?:string;
        calleeStatus?:string
    };
}