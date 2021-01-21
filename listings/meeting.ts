import * as _ from 'lodash';

import { Id, IId } from "../models/id.class";
import { Schedule, ISchedule } from '../models/schedule.class';
import { IRecurrence, Recurrence } from './recurrence';

export interface IMeeting extends IId {
    zid: string;
    uid: string;
    isZoomOwner: boolean;
    name: string;
    password: string;
    topic: string;
    continuous: boolean;

    timezone: string;
    startTime: string;
    duration: number;

    recurrence: IRecurrence;
    schedule: ISchedule;
}

export interface IZoomMeeting extends IMeeting {
    zid: string;
    zUsersAttend: string[]; // Zoom users in attendance
}

export class Meeting extends Id implements IMeeting {
    zid: string                 = '';
    uid: string                 = '';
    isZoomOwner: boolean        = false;
    name: string                = '';
    password: string            = '';
    topic: string               = '';
    continuous: boolean         = false;

    timezone: string            = "-5";
    startTime: string           = "00:00";
    duration: number            = 60;

    recurrence: IRecurrence     = new Recurrence()
    schedule: ISchedule         = new Schedule();

    constructor(meeting?: IMeeting) {
        super(meeting);
        this.initialize(this, meeting);
    }
}