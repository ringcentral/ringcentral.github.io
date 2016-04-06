/// <reference path="../externals.d.ts" />

import helper = require('../core/Helper');

export class Conferencing extends helper.Helper {

    createUrl() {
        return '/account/~/extension/~/conferencing';
    }

}