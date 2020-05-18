export const createNewEvent = (user, photoURL, event) => {
	return {
		...event,
		creatorUid: user.uid,
		creator: user.displayName,
		creatorPhotoURL: photoURL || '../assets/user.png',
		date: new Date(),
		attendees: {
			[user.uid]: {
				going: true,
				joinDate: new Date(),
				photoURL: photoURL || './assets/user.png',
				name: user.displayName,
				isCreator: true,
			},
		},
	};
};
