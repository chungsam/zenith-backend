import { ActivityType } from './activity-type';

export class Event {
    eventDate: Date;
    eventTimeFrom: Date;
    eventTimeTo: Date;
    activityType: ActivityType;
    isActive: boolean;
    creationDate: Date;
    
}
