/// <reference path="../externals.d.ts" />

import helper = require('../core/Helper');
import list = require('../core/List');

export class ForwardingNumber extends helper.Helper {

    createUrl(options?:{extensionId?:string}, id?:string) {

        options = options || {};

        return '/account/~/extension/' + (options.extensionId || '~') + '/forwarding-number' + (id ? '/' + id : '');

    }

    getId(forwardingNumber:IForwardingNumber) {
        return forwardingNumber && (forwardingNumber.id || (forwardingNumber.phoneNumber)); //TODO @exceptionalCase
    }

    hasFeature(phoneNumber:IForwardingNumber, feature) {
        return (!!phoneNumber && !!phoneNumber.features && phoneNumber.features.indexOf(feature) != -1);
    }

    comparator(options?:list.IListComparatorOptions) {

        return this.list.comparator(this.utils.extend({
            sortBy: 'label'
        }, options));

    }

    filter(options?:{features:string[]}) {

        options = this.utils.extend({
            features: []
        }, options);

        return this.list.filter([{
            condition: options.features.length,
            filterFn: (item) => {

                return options.features.some((feature) => {
                    return this.hasFeature(item, feature);
                });

            }
        }]);

    }

}

export interface IForwardingNumber extends helper.IHelperObject {
    label?:string;
    phoneNumber?:string;
    flipNumber?:string;
    features?:string[];
}
