import { useState } from 'react';

const useDropdown = (initialOpen = false) => {
	const [isOpen, setIsOpen] = useState(initialOpen);

	const openDropdown = () => setIsOpen(true);
	const closeDropdown = () => setIsOpen(false);
	const toggleDropdown = () => setIsOpen((prev) => !prev);

	return {
		isOpen,
		openDropdown,
		closeDropdown,
		toggleDropdown,
	};
};

export default useDropdown;
