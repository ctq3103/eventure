import { CREATE_EVENT, UPDATE_EVENT, DELETE_EVENT } from './events.types';

const INITIAL_STATE = [
	{
		id: '6',
		category: 'Charity & Causes',
		date: '2020-04-27T07:25:37Z',
		venue: 'Hanoi',
		title:
			'Atomic Habits: An Easy & Proven Way to Build Good Habits & Break Bad Ones',
		imageUrl:
			'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
		creator: 'Keira',
		creatorPhotoURL: 'https://randomuser.me/api/portraits/women/26.jpg',
		attendees: [
			{
				id: 'a',
				name: 'Bob',
				photoURL: 'https://randomuser.me/api/portraits/men/20.jpg',
			},
			{
				id: 'b',
				name: 'Tom',
				photoURL: 'https://randomuser.me/api/portraits/men/22.jpg',
			},
		],
	},
	{
		id: '7',
		category: 'Charity & Causes',
		date: '2020-04-27T07:25:37Z',
		venue: 'Hanoi',
		title:
			'Atomic Habits: An Easy & Proven Way to Build Good Habits & Break Bad Ones',
		imageUrl:
			'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
		creator: 'Keira',
		creatorPhotoURL: 'https://randomuser.me/api/portraits/women/26.jpg',
		attendees: [
			{
				id: 'a',
				name: 'Bob',
				photoURL: 'https://randomuser.me/api/portraits/men/20.jpg',
			},
			{
				id: 'b',
				name: 'Tom',
				photoURL: 'https://randomuser.me/api/portraits/men/22.jpg',
			},
		],
	},
	{
		id: '8',
		category: 'Charity & Causes',
		date: '2020-04-27T07:25:37Z',
		venue: 'Hanoi',
		title:
			'Atomic Habits: An Easy & Proven Way to Build Good Habits & Break Bad Ones',
		imageUrl:
			'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
		creator: 'Keira',
		creatorPhotoURL: 'https://randomuser.me/api/portraits/women/26.jpg',
		attendees: [
			{
				id: 'a',
				name: 'Bob',
				photoURL: 'https://randomuser.me/api/portraits/men/20.jpg',
			},
			{
				id: 'b',
				name: 'Tom',
				photoURL: 'https://randomuser.me/api/portraits/men/22.jpg',
			},
		],
	},
	{
		id: '9',
		category: 'Charity & Causes',
		date: '2020-04-27T07:25:37Z',
		venue: 'Hanoi',
		title:
			'Atomic Habits: An Easy & Proven Way to Build Good Habits & Break Bad Ones',
		imageUrl:
			'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
		creator: 'Keira',
		creatorPhotoURL: 'https://randomuser.me/api/portraits/women/26.jpg',
		attendees: [
			{
				id: 'a',
				name: 'Bob',
				photoURL: 'https://randomuser.me/api/portraits/men/20.jpg',
			},
			{
				id: 'b',
				name: 'Tom',
				photoURL: 'https://randomuser.me/api/portraits/men/22.jpg',
			},
		],
	},
	{
		id: '10',
		category: 'Charity & Causes',
		date: '2020-04-27T07:25:37Z',
		venue: 'Hanoi',
		title:
			'Atomic Habits: An Easy & Proven Way to Build Good Habits & Break Bad Ones',
		imageUrl:
			'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
		description:
			'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
		creator: 'Keira',
		creatorPhotoURL: 'https://randomuser.me/api/portraits/women/26.jpg',
		attendees: [
			{
				id: 'a',
				name: 'Bob',
				photoURL: 'https://randomuser.me/api/portraits/men/20.jpg',
			},
			{
				id: 'b',
				name: 'Tom',
				photoURL: 'https://randomuser.me/api/portraits/men/22.jpg',
			},
		],
	},
];

export const eventsReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case CREATE_EVENT:
			return [...state, action.payload.event];
		case UPDATE_EVENT:
			return [
				...state.filter((event) => event.id !== action.payload.event.id),
				action.payload.event,
			];
		case DELETE_EVENT:
			return [...state.filter((event) => event.id !== action.payload.event.id)];
		default:
			return state;
	}
};
