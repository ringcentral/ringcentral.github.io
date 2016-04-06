/// <reference path="../externals.d.ts" />

import helper = require('../core/Helper');

export class BlockedNumber extends helper.Helper {

    createUrl(options?:IBlockedNumberOptions, id?:string) {

        options = options || {};

        return '/account/~/extension/' +
               (options.extensionId ? options.extensionId : '~') +
               '/blocked-number' +
               (id ? '/' + id : '');

    }

    validate(item:IBlockedNumber) {

        return this.validator.validate([
            {field: 'phoneNumber', validator: this.validator.phone(item.phoneNumber)},
            {field: 'phoneNumber', validator: this.validator.required(item.phoneNumber)},
            {field: 'name', validator: this.validator.required(item.name)}
        ]);

    }

}

export interface IBlockedNumber extends helper.IHelperObject {
    name:string;
    phoneNumber:string;
}

export interface IBlockedNumberOptions {
    extensionId?:string;
}
