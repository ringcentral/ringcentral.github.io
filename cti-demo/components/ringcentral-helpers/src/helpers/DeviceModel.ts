/// <reference path="../externals.d.ts" />

import helper = require('../core/Helper');

export class DeviceModel extends helper.Helper {


    getId(device:IDeviceModel) {

        return device ? device.sku : null;

    }

    createUrl(options?:any, id?:string) {

        return '/dictionary/device';

    }

}

export interface IDeviceModel extends helper.IHelperObject {
    sku?:string;
    type?:string;
    model?:{
        id?:string;
        name?:string;
        deviceClass?:string;
        lineCount?:number;
        addons?:IDeviceModelAddon[];
    };
}

export interface IDeviceModelAddon extends helper.IHelperObject {
    name?:string;
    count?:string;
}