/// <reference path="../externals.d.ts" />

import helper = require('../core/Helper');
import validator = require('../core/Validator');

export class ContactGroup extends helper.Helper {

    createUrl(options?:any, id?:string) {
        return '/account/~/extension/~/address-book/group' + (id ? '/' + id : '');
    }

    validate(item:IContactGroup) {

        return this.validator.validate([
            {field: 'groupName', validator: this.validator.required(item && item.groupName)}
        ]);

    }

}

export interface IContactGroup extends helper.IHelperObject {
    notes?:string;
    groupName?:string;
    contactsCount?:number;
}
