/// <reference path="../externals.d.ts" />

import helper = require('../core/Helper');

export class Account extends helper.Helper {

    createUrl() {
        return '/account/~';
    }

}