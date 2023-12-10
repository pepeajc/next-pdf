import mitt, { Emitter, EventType } from 'mitt';

export type Event = {
	eventCode?: string;
	eventCategory?: string;
	eventName: string;
	data: any;
};

export const emitter: Emitter<Record<EventType, Event>> = mitt();
