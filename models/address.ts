
import * as _ from 'lodash';
import { Base } from "./base.class";

export interface IAddress {
    address1: string;
    address2: string;
    city: string;
    state: string;
    zip: string;
}
export class Address extends Base implements IAddress {
    address1!: string;
    address2!: string;
    city!: string;
    state!: string;
    zip!: string;

    constructor(address?: IAddress) {
        super(_.merge({
            address1: '',
            address2: '',
            city: '',
            state: '',
            zip: '',
        }, address));
    }
}