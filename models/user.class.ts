import * as _ from 'lodash';
import { DateTime } from 'luxon';

import { UserBase } from './userBase.class';
import { Base } from './base.class';
import { IUserMember, UserMember } from './userMember.class';
import { IUserFavorite } from './userFavorite.class';
import { IUserFriend } from './userFriend.class';
import { IUserActivity, UserActivity } from './userActivity.class';
import { HomeGroup, IGroup, IHomeGroup } from './group.class';

// this data never goes to !uid
export interface IUserProfile {
    anonymous: boolean;
    firstName: string;
    lastInitial: string;
    bday: string;
}

export class UserProfile extends Base implements IUserProfile {
    anonymous: boolean             = true;
    firstName: string              = 'Anonymous';
    lastInitial: string            = 'A';
    bday: string                   = '';

    // ignore provided values that don't exist on object
    // overwrite defaults with provided values

    constructor(user?: any) {
        super();

        this.initialize(this, user)
    }
}

export interface IUser {
    profile: IUserProfile;
    activity: IUserActivity;
    member: IUserMember;
    homeGroup: IHomeGroup;
    favGroups: IUserFavorite[];
    friends: IUserFriend[];
    created: string;
}

declare const ONLINE_ACTIVITY = 15;
export class User extends UserBase implements IUser {
    profile!: IUserProfile;
    activity!: IUserActivity;
    member!: IUserMember;
    homeGroup!: IHomeGroup;
    favGroups: IUserFavorite[]      = [];
    friends: IUserFriend[]          = [];
    created: string                 = DateTime.local().toISO();

    public get isOnline(): boolean {
        const lastActivity: DateTime = DateTime.fromISO(this.activity.lastTime).toLocal();
        return DateTime.local().diff(lastActivity).minutes < ONLINE_ACTIVITY;
    }

    public get daysSinceBday() {
        const bday: DateTime = DateTime.fromISO(this.profile.bday);
        return DateTime.local().toUTC().diff(bday).days;
    }

    constructor(user?: any) {
        super(user);
        this.initialize(this, user);
        if( _.has(user, 'profile')) this.profile = new UserProfile(user.profile);
        if( _.has(user, 'activity')) this.activity = new UserActivity(user.activity);
        if( _.has(user, 'member')) this.member = new UserMember(user.member);
        if( _.has(user, 'homeGroup')) this.homeGroup = new HomeGroup(user.homeGroup);
    }

    public isHomeGroup(group: IGroup): boolean {
        return group.id === (_.has(this, 'homeGroup.gid') ? this.homeGroup.gid : false);
    }

    public setUserAuthNames(displayName?: string): boolean {
        if (this.profile.anonymous
            // || TODO displayName is all whitespace
            || displayName === undefined
            || displayName === null
            || !displayName.includes(' ')
            || displayName.length < 3
            || displayName.split(' ').length < 2) {
            this.profile.firstName = 'Anonymous';
            this.profile.lastInitial = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'[Math.floor(Math.random() * 26)];
        } else {
            const names = displayName.split(' ');
            this.profile.firstName = names[0];
            this.profile.lastInitial = names[1][0].toUpperCase();
        }
        this.name = `${this.profile.firstName} ${this.profile.lastInitial}.`;
        return true;
    }

    public setUserNames(firstName: string, lastInitial: string): boolean {
        if (!firstName
            || !lastInitial
            || firstName.length > 25
            || lastInitial.length !== 1) {
            return false;
        }
        this.profile.firstName = firstName;
        this.profile.lastInitial = lastInitial;
        this.name = `${firstName} ${lastInitial}.`;
        return true;
    }

    public makeHomeGroup(group: IGroup) {
        // TODO error check not duplicate add
        if (!group.members) group.members = [];
        group.members.push(new UserMember(this).toObject());
        this.homeGroup = new HomeGroup(group).toObject();
    }
}

