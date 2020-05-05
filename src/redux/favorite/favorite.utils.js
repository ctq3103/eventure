export const toggleAddRemoveItem = (favItems, favItemToToggle) => {
	return favItems.includes(favItemToToggle)
		? favItems.filter((item) => item.id !== favItemToToggle.id) // remove item
		: [...favItems, favItemToToggle]; // else: add item
};
