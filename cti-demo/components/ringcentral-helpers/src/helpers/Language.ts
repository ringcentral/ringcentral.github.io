/// <reference path="../externals.d.ts" />

import helper = require('../core/Helper');

export class Language extends helper.Helper {

    createUrl(options?:any, id?:string) {

        return '/dictionary/language';

    }

}

export interface ILanguage extends helper.IHelperObject {
    name?:string;
    isoCode?:string;
    localeCode?:string;
}
