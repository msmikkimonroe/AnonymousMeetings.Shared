import * as _ from 'lodash';
import { IUserPosition, UserPosition } from './user.class';
import { IUserBadge } from './userBadge.class';

import { IUserBase, UserBase } from './userBase.class';
import { IUserOnline } from './userOnline.class';

export interface IUserActivity {
    base: IUserBase;
    lid: string; // LastUserActivity id
    aid: string;
    bid: IUserBadge; // If is an AdminActivity : null
    olid: IUserOnline;

    activity: {};
    lastPosition: IUserPosition;
    lastLogon: string;
    lastTime: string;
    serverTimestamp: string;
}

export class UserActivity extends UserBase implements IUserActivity {

    constructor(user?: any) {
        super(_.mergeWith({
            base: {},
            lid: '',
            aid: '',
            bid: {},
            olid: {},
            lastPosition: new UserPosition(),
            lastLogon: '',
            lastTime: '',
            activity: {},
            serverTimestamp: '',
        }, user));
    }
    base!: IUserBase;
    lid!: string;
    aid!: string;
    bid!: IUserBadge;
    olid!: IUserOnline;
    lastPosition!: IUserPosition;
    lastLogon!: string;
    lastTime!: string;
    activity!: {};
    serverTimestamp!: string;
}
