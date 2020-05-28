export const createNewEvent = (user, photoURL, event) => {
	return {
		...event,
		creatorUid: user.uid,
		creator: user.displayName,
		creatorPhotoURL: photoURL || require('../assets/user.png'),
		createdAt: new Date(),
		attendees: {
			[user.uid]: {
				going: true,
				joinDate: new Date(),
				photoURL: photoURL || require('../assets/user.png'),
				name: user.displayName,
				isCreator: true,
			},
		},
	};
};

export const objectToArray = (object) => {
	if (object) {
		return Object.entries(object).map((e) =>
			Object.assign({}, e[1], { id: e[0] })
		);
	}
};
