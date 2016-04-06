/// <reference path="../externals.d.ts" />

import helper = require('../core/Helper');

export class Timezone extends helper.Helper {

    createUrl() {
        return '/dictionary/timezone';
    }

}

export interface ITimezone extends helper.IHelperObject {
    name?:string;
    description?:string;
}