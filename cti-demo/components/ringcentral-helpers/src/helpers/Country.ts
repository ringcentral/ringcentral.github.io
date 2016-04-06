/// <reference path="../externals.d.ts" />

import helper = require('../core/Helper');

export class Country extends helper.Helper {

    createUrl(options?:any, id?:string) {
        return '/dictionary/country';
    }

}

export interface ICountry extends helper.IHelperObject {
    name?:string;
    isoCode?:string;
    callingCode?:string;
}