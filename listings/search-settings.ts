// ordering here is important!
export enum SpecificDay {
	'any',			// flag 0 any
	'Monday',		// 1 ISO Monday
	'Tuesday',
	'Wednesday',
	'Thursday',
	'Friday',
	'Saturday',
	'Sunday',		// 7 ISO Sunday
	'today'			// flag 8 today
};

export enum SearchType {
	'search',
	'live',
	'owned',
	'favorite'
};

export interface ISearchSettings {
	searchType: SearchType,
	
	bySpecificDay: SpecificDay,
	// bySpecificTime: any,        	// null || ISO DateTime String
	byRelativeTime: any,        	// null || { start: string, end: string }
	bySpecificTimeRange: any,   	// null || { start: string, end: string }
	
	live: boolean,					// Include live meetings in search results
	continuous: boolean,			// Include continuous meetings in search results

	id: string,						// TODO change to zid
	name: string,					// TODO expand to name_word[] matching
	zipcode: string,				// TODO
	language: string,
	groupType: string,
	meetingType: string,
	tags: string[],
	tagsAny: boolean,
};

export class SearchSettings implements ISearchSettings {
	searchType = SearchType.search;

	bySpecificDay = SpecificDay.today;
	// bySpecificTime: any = null;
	byRelativeTime = { early: 1, late: 0 };
	bySpecificTimeRange = null;
	
	live = true;
	continuous = true;

	id = <any>null;
	name = <any>null;
	zipcode = <any>null;
	language = <any>null;
	groupType = <any>null;
	meetingType = <any>null;
	tags: string[] = [];
	tagsAny: boolean = false;

	constructor() {}
};