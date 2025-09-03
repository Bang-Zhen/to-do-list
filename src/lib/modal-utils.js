/**
 * Modal Utilities Module
 *
 * This module provides core modal functionality for opening and closing modals,
 * along with event handling for backdrop clicks and keyboard interactions.
 */

/**
 * Opens a modal by adding the 'active' class and setting up necessary event listeners.
 *
 * This function handles the core modal opening logic including:
 * - Adding the 'active' class to make the modal visible
 * - Adding modal-open class to body to prevent scrolling
 * - Setting up backdrop click handling to close modal when clicking outside
 * - Setting up event propagation prevention for modal content
 *
 * @param {string} modalId - The ID of the modal element to open
 * @throws {Error} Throws if modal element is not found
 */
export function openModal(modalId) {
	const modalElement = document.getElementById(modalId);
	if (modalElement) {
		modalElement.classList.add('active');
		// Add modal-open class to body to prevent scrolling and improve interaction blocking
		document.body.classList.add('modal-open');

		// Add event listeners to prevent event bubbling from form elements that might interfere with blocking
		const modalContent = modalElement.querySelector('.modal-content');
		if (modalContent) {
			// Prevent event bubbling from modal content to maintain blocking
			const stopPropagation = (e) => {
				// Only stop propagation for elements that should not trigger background interactions
				if (!e.target.classList.contains('close-btn') &&
					!e.target.closest('.btn') &&
					!e.target.closest('input') &&
					!e.target.closest('textarea') &&
					!e.target.closest('select')) {
					e.stopPropagation();
				}
			};

			modalContent.addEventListener('click', stopPropagation, true); // Use capture phase
			modalContent.addEventListener('mousedown', stopPropagation, true);
			modalContent.addEventListener('touchstart', stopPropagation, true);
			modalContent.addEventListener('pointerdown', stopPropagation, true);

			// Add backdrop click handler to close modal when clicking outside content area
			const handleBackdropClick = (e) => {
				// Close modal if clicked on modal backdrop (not on modal content)
				if (e.target === modalElement) {
					console.log(`🔘 Backdrop clicked on modal: ${modalId}, closing...`);
					closeModal(modalId);
				}
			};

			modalElement.addEventListener('click', handleBackdropClick);
		}

		console.log(`✅ Modal opened: ${modalId}`);
	} else {
		console.error(`❌ Modal not found: ${modalId}`);
		throw new Error(`Modal with ID '${modalId}' not found`);
	}
}

/**
 * Closes a modal by removing the 'active' class and cleaning up event listeners.
 *
 * This function handles the core modal closing logic including:
 * - Removing the 'active' class to hide the modal
 * - Removing modal-open class from body to restore scrolling
 * - Dynamically removing auto-created modals after animation
 * - Resetting form fields within the modal
 * - Clearing file inputs
 *
 * @param {string} modalId - The ID of the modal element to close
 */
export function closeModal(modalId) {
	const modal = document.getElementById(modalId);
	if (!modal) {
		// For dynamically created modals like daily-events-modal, don't show warnings
		// as they may be removed by previous close operations or race conditions
		if (modalId !== 'daily-events-modal') {
			console.warn(`⚠️ Modal not found for closing: ${modalId}`);
		} else {
			console.log(`ℹ️ Daily events modal already closed or removed: ${modalId}`);
		}
		return;
	}

	modal.classList.remove('active');
	// Remove modal-open class to restore scrolling and interaction
	document.body.classList.remove('modal-open');

	// For dynamically created modals, remove them after animation
	if (modalId === 'daily-events-modal') {
		setTimeout(() => {
			if (modal && modal.parentNode) {
				modal.parentNode.removeChild(modal);
			}
		}, 300);
		return;
	}

	// Reset forms
	const forms = modal.querySelectorAll('form');
	forms.forEach((form) => form.reset());

	// Clear file inputs
	const fileInputs = modal.querySelectorAll('input[type="file"]');
	fileInputs.forEach((input) => {
		input.value = '';
	});

	console.log(`✅ Modal closed: ${modalId}`);
}

/**
 * Sets up keyboard event listeners for modal management.
 *
 * Currently handles the Escape key to close active modals, excluding the auth modal.
 * This function should be called once during application initialization.
 */
export function setupModalKeyboardHandlers() {
	document.addEventListener('keydown', (e) => {
		if (e.key === 'Escape') {
			const activeModal = document.querySelector(
				'.modal.active:not(#auth-modal)',
			);
			if (activeModal) {
				const modalId = activeModal.id;
				console.log(`🎹 Escape key pressed, closing modal: ${modalId}`);
				closeModal(modalId);
			}
		}
	});

	console.log('⌨️ Modal keyboard handlers initialized');
}

/**
 * Sets up global click event listener for modal backdrop interactions.
 *
 * This function handles clicking outside modals to close them, excluding the auth modal.
 * It should be called once during application initialization.
 */
export function setupModalClickHandlers() {
	document.addEventListener('click', (e) => {
		if (
			e.target.classList.contains('modal') &&
			!e.target.classList.contains('auth-modal')
		) {
			const modalId = e.target.id;
			console.log(`👆 Backdrop click detected on modal: ${modalId}`);
			closeModal(modalId);
		}
	});

	console.log('👆 Modal click handlers initialized');
}

/**
 * Initializes all modal-related event handlers.
 *
 * This is a convenience function that sets up both keyboard and click handlers
 * for modal management. Should be called during application initialization.
 */
export function initializeModalSystem() {
	setupModalKeyboardHandlers();
	setupModalClickHandlers();
	console.log('🎬 Modal system fully initialized');
}

/**
 * Checks if a modal is currently open/active.
 *
 * @param {string} modalId - The ID of the modal to check
 * @returns {boolean} True if the modal is active, false otherwise
 */
export function isModalActive(modalId) {
	const modal = document.getElementById(modalId);
	return modal ? modal.classList.contains('active') : false;
}

/**
 * Gets the currently active modal element.
 *
 * @returns {Element|null} The active modal element, or null if no modal is active
 */
export function getActiveModal() {
	return document.querySelector('.modal.active:not(#auth-modal)');
}

/**
 * Closes all active modals except the specified one.
 *
 * Useful when opening a new modal to ensure only one modal is visible at a time.
 *
 * @param {string} [excludeModalId] - The ID of a modal to exclude from closing
 */
export function closeAllModals(excludeModalId = null) {
	const activeModals = document.querySelectorAll('.modal.active:not(#auth-modal)');

	activeModals.forEach(modal => {
		if (!excludeModalId || modal.id !== excludeModalId) {
			closeModal(modal.id);
		}
	});

	if (activeModals.length > 0) {
		console.log(`🗂️ Closed ${activeModals.length} active modals${excludeModalId ? ` (excluding ${excludeModalId})` : ''}`);
	}
}

/**
 * Validates if a modal element exists in the DOM.
 *
 * @param {string} modalId - The ID of the modal to validate
 * @returns {boolean} True if the modal exists, false otherwise
 */
export function validateModal(modalId) {
	const modal = document.getElementById(modalId);
	if (!modal) {
		console.error(`❌ Modal validation failed: Modal with ID '${modalId}' not found in DOM`);
		return false;
	}

	if (!modal.classList.contains('modal')) {
		console.warn(`⚠️ Modal validation warning: Element with ID '${modalId}' doesn't have 'modal' class`);
	}

	return true;
}

// Export default object for convenience
export default {
	openModal,
	closeModal,
	setupModalKeyboardHandlers,
	setupModalClickHandlers,
	initializeModalSystem,
	isModalActive,
	getActiveModal,
	closeAllModals,
	validateModal
};