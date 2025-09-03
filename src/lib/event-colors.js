/**
 * Event Colors Management Module
 * Handles event color customization, storage, and rendering logic
 */

/**
 * Global color state and storage
 * @type {Object<string, string>}
 */
let eventColors = {};

/**
 * Default colors for event categorization
 * @type {Object<string, string>}
 */
export const defaultEventColors = {
	user1: '#667eea', // My events - purple/blue
	user2: '#ff9a8b', // Partner's events - pink/coral
	shared: 'var(--secondary-gradient)'  // Shared events - theme gradient
};

/**
 * Event color status
 * @type {boolean}
 */
let colorsInitialized = false;

/**
 * Enhanced color initialization with promise-based loading
 * @returns {Promise<Object<string, string>>} Promise resolving to the loaded colors
 */
export function initializeEventColors() {
	return new Promise((resolve, reject) => {
		console.log('🔧 initializeEventColors called');

		try {
			console.log('🔧 Checking localStorage for eventColors...');
			const savedColors = localStorage.getItem('eventColors');

			if (savedColors) {
				const parsedColors = JSON.parse(savedColors);
				// Validate the parsed data structure
				if (typeof parsedColors === 'object' && parsedColors !== null) {
					eventColors = parsedColors;
					// Also update window.eventColors for cross-module access
					window.eventColors = eventColors;
					console.log('✅ Event colors loaded from localStorage:', eventColors);
					console.log('✅ window.eventColors updated:', window.eventColors);
				} else {
					console.warn('⚠️ Invalid color data structure, using defaults');
					eventColors = {};
					window.eventColors = {};
					localStorage.setItem('eventColors', JSON.stringify(eventColors));
				}
			} else {
				// If no saved colors, initialize as empty object
				eventColors = {};
				window.eventColors = {};
				localStorage.setItem('eventColors', JSON.stringify({}));
				console.log('ℹ️ No saved event colors found, initialized empty');
			}

			// Mark as initialized
			colorsInitialized = true;

			// Verify the colors were properly loaded
			console.log('🔍 Verification - eventColors contents:', {
				localStorage: JSON.parse(localStorage.getItem('eventColors') || '{}'),
				memoryEventColors: eventColors,
				windowEventColors: window.eventColors
			});

			console.log('✅ Colors loaded successfully - ready for immediate use');
			resolve(eventColors);
		} catch (error) {
			console.warn('❌ Error loading event colors from localStorage:', error);
			eventColors = {};
			window.eventColors = {};
			colorsInitialized = true; // Still mark as initialized to prevent infinite waiting
			console.log('⚠️ Color loading error handled, using default colors');
			resolve(eventColors); // Resolve anyway to prevent blocking
		}
	});
}

/**
 * Helper function to wait for colors to be ready
 * @param {number} [maxWaitMs=3000] Maximum wait time in milliseconds
 * @returns {Promise<Object<string, string>>} Promise resolving to the color object
 */
export function waitForColors(maxWaitMs = 3000) {
	return new Promise((resolve) => {
		if (colorsInitialized) {
			resolve(eventColors);
			return;
		}

		let attempts = 0;
		const checkInterval = setInterval(() => {
			attempts += 100;

			if (colorsInitialized) {
				clearInterval(checkInterval);
				resolve(eventColors);
			} else if (attempts >= maxWaitMs) {
				clearInterval(checkInterval);
				console.warn('⚠️ Color initialization timeout, proceeding with defaults');
				resolve(eventColors);
			}
		}, 100);
	});
}

/**
 * Opens the event colors modal for customization
 * @param {Function} showNotification - Notification function from notifications module
 */
export function showEventColorsModal(showNotification) {
	console.log('🎨 Opening event colors modal');
	console.log('🎨 Current eventColors:', eventColors);
	console.log('🎨 Default colors:', defaultEventColors);

	// Load current colors, use defaults if not set
	const colors = { ...defaultEventColors, ...eventColors };
	console.log('🎨 Combined colors for display:', colors);

	// Update color previews (only for personal events, shared excluded)
	document.querySelectorAll('.color-item').forEach((item, index) => {
		const userType = ['user1', 'user2'][index]; // Only personal event types
		const colorValue = colors[userType];
		const colorPreview = item.querySelector('.color-preview');
		const colorInput = item.querySelector('input[type="color"]');

		console.log(`🎨 Setting ${userType} to ${colorValue}`);

		if (colorPreview && colorInput) {
			colorPreview.style.background = `linear-gradient(135deg, ${colorValue} 0%, ${colorValue}EE 100%)`;
			colorInput.value = colorValue;

			// Add visual feedback for updated colors
			setTimeout(() => {
				colorPreview.classList.add('updated');
				setTimeout(() => colorPreview.classList.remove('updated'), 1000);
			}, 200 * index);
		}
	});

	showModal('eventColorsModal');

	console.log('🎨 Personal event colors modal opened successfully');
}

/**
 * Opens the color picker overlay for a specific user type
 * @param {string} userType - The user type ('user1' or 'user2')
 */
export function openEventColorPicker(userType) {
	// Create and show color picker overlay
	const overlay = document.createElement('div');
	overlay.className = 'color-picker-overlay';
	overlay.id = 'color-picker-overlay';
	overlay.innerHTML = `
		<div class="color-picker-modal">
			<div class="color-picker-header">
				<h3 class="color-picker-title">Choose Color</h3>
				<p class="color-picker-subtitle">Pick a color for your calendar events</p>
			</div>
			<div class="color-picker-container">
				<input type="color" class="color-picker-input" value="${eventColors[userType] || defaultEventColors[userType]}">
			</div>
			<div class="color-picker-actions">
				<button class="btn btn-secondary" onclick="closeEventColorPicker()">Cancel</button>
				<button class="btn btn-primary" onclick="applyEventColor('${userType}')">Apply</button>
			</div>
		</div>
	`;

	document.body.appendChild(overlay);
	setTimeout(() => overlay.classList.add('active'), 10);
}

/**
 * Closes the color picker overlay
 */
export function closeEventColorPicker() {
	const overlay = document.getElementById('color-picker-overlay');
	if (overlay) {
		overlay.classList.remove('active');
		setTimeout(() => overlay.remove(), 300);
	}
}

/**
 * Applies the selected color for a user type
 * @param {string} userType - The user type to apply color to
 * @param {Function} showNotification - Notification function from notifications module
 */
export function applyEventColor(userType, showNotification) {
	const colorInput = document.querySelector('.color-picker-modal .color-picker-input');
	if (colorInput) {
		const selectedColor = colorInput.value;

		// Update the color preview in the main modal (only for personal events)
		const colorItem = Array.from(document.querySelectorAll('.color-item'))[
			['user1', 'user2'].indexOf(userType)
		];
		const colorPreview = colorItem.querySelector('.color-preview');

		if (colorPreview) {
			colorPreview.style.background = `linear-gradient(135deg, ${selectedColor} 0%, ${selectedColor}EE 100%)`;

			// Show success feedback
			colorPreview.classList.add('active');
			setTimeout(() => colorPreview.classList.remove('active'), 1000);
		}

		closeEventColorPicker();
		showNotification('🎨 Event color updated! Your calendar events will use the new color.', 'success');
	}
}

/**
 * Saves the event color preferences to localStorage
 * @param {Function} showNotification - Notification function from notifications module
 */
export function saveEventColors(showNotification) {
	console.log('🎨 saveEventColors function called');

	const currentUser = window.$currentUser?.get();
	console.log('👤 Current user:', currentUser);

	if (!currentUser) {
		console.log('❌ No current user, showing error');
		showNotification('Please log in to save color preferences', 'error');
		return;
	}

	// Get new color values (only for personal events)
	const newColors = {};
	const colorInputs = document.querySelectorAll('.color-item input[type="color"]');

	console.log('🎨 Found color inputs (personal events only):', colorInputs.length);

	colorInputs.forEach((input, index) => {
		const userType = ['user1', 'user2'][index]; // Only personal event types
		console.log(`🎨 ${userType} input value:`, input.value);
		newColors[userType] = input.value;
	});

	console.log('💾 Saving event colors:', newColors);

	// Validate color values
	const validColors = {};
	Object.keys(newColors).forEach(key => {
		if (newColors[key] && /^#[0-9A-F]{6}$/i.test(newColors[key])) {
			validColors[key] = newColors[key];
		}
	});

	console.log('✅ Valid colors after validation:', validColors);

	if (Object.keys(validColors).length === 0) {
		console.log('❌ No valid colors to save');
		showNotification('No valid colors to save', 'error');
		return;
	}

	try {
		console.log('🔄 Updating eventColors object...');
		// Update local storage
		eventColors = { ...eventColors, ...validColors };

		console.log('💾 Setting localStorage...');
		localStorage.setItem('eventColors', JSON.stringify(eventColors));

		// Verify localStorage was set
		const savedColors = localStorage.getItem('eventColors');
		console.log('🔍 Verification - localStorage contains:', savedColors);

		console.log('✅ Event colors saved to localStorage:', eventColors);

		// Close modal
		closeModal('eventColorsModal');

		// Show success notification
		showNotification('✨ Event color preferences saved successfully!', 'success');

		// Synchronize colors across all components immediately
		updateAllEventColors();

		// Also regenerate calendar to immediately apply new colors
		if (typeof generateCalendar === 'function') {
			console.log('🔄 Regenerating calendar with new event colors');
			generateCalendar(window.currentDate || new Date());
		}

		// Dispatch event to notify other parts of the app
		document.dispatchEvent(new CustomEvent('eventColorsUpdated'));

	} catch (error) {
		console.error('❌ Error saving event colors:', error);
		console.error('❌ Error details:', {
			message: error.message,
			name: error.name,
			stack: error.stack
		});
		showNotification('Error saving color preferences', 'error');
	}
}

/**
 * Cleans up shared event colors from localStorage
 * @param {Function} showNotification - Notification function from notifications module
 */
export function cleanupSharedEventColors(showNotification) {
	console.log('🧹 Cleaning up shared event colors from localStorage');

	try {
		const currentColors = JSON.parse(localStorage.getItem('eventColors') || '{}');

		// Remove shared event color if it exists
		if (currentColors.shared) {
			delete currentColors.shared;
			localStorage.setItem('eventColors', JSON.stringify(currentColors));
			console.log('✅ Shared event color removed from localStorage');
		}

		// Update in-memory colors
		if (eventColors.shared) {
			delete eventColors.shared;
		}

		showNotification('🏹 Shared event color customization removed!', 'success');
	} catch (error) {
		console.error('❌ Error cleaning up shared event colors:', error);
		showNotification('Error cleaning up colors', 'error');
	}
}

/**
 * Resets event colors to defaults
 * @param {Function} showNotification - Notification function from notifications module
 */
export function resetEventColors(showNotification) {
	console.log('🔄 Resetting event colors to defaults');

	try {
		eventColors = {};
		localStorage.setItem('eventColors', JSON.stringify({}));
		console.log('✅ Event colors reset in localStorage');

		showEventColorsModal(showNotification); // Refresh the modal with defaults
		showNotification('🎨 Event colors reset to defaults!', 'success');

		// Synchronize colors across all components
		setTimeout(() => {
			updateAllEventColors();
		}, 200);
	} catch (error) {
		console.error('❌ Error resetting event colors:', error);
		showNotification('Error resetting colors', 'error');
	}
}

/**
 * Maps user IDs to event types for color determination
 * @param {Object} event - The event object
 * @param {string} event.createdBy - ID of user who created the event
 * @param {boolean} event.shared - Whether the event is shared
 * @returns {string} Event type ('shared', 'user1', or 'user2')
 */
export function getEventTypeForUser(event) {
	// If event is shared, use shared color
	if (event.shared) {
		return 'shared';
	}

	// If event is personal, map creator to appropriate user type
	const currentUser = window.$currentUser?.get();
	if (!event.createdBy || !currentUser || !window.workspaceMembers || window.workspaceMembers.length === 0) {
		return 'user1'; // fallback
	}

	try {
		// Use stored workspace members to determine user type
		// For now, use first member as user1, second as user2
		const currentUserIndex = window.workspaceMembers.indexOf(currentUser.uid);
		const eventCreatorIndex = window.workspaceMembers.indexOf(event.createdBy);

		// Map relative to current user for better UX
		if (currentUserIndex !== -1 && eventCreatorIndex !== -1) {
			// If event creator is current user, use 'user1' color
			if (event.createdBy === currentUser.uid) {
				return 'user1';
			}
			// If event creator is another user, use 'user2' color
			else {
				return 'user2';
			}
		} else {
			// Fallback for unknown users
			return 'user1';
		}
	} catch (error) {
		console.warn('Error determining event user type:', error);
		return 'user1'; // fallback
	}
}

/**
 * Gets the color for a specific event type
 * @param {string} eventType - The event type ('shared', 'user1', 'user2')
 * @returns {string} Color value for the event type
 */
export function getEventColor(eventType) {
	console.log('🎨 getEventColor called with eventType:', eventType);
	console.log('🎨 Current eventColors:', eventColors);
	console.log('🎨 Default colors:', defaultEventColors);

	// For shared events, always use theme gradient - never custom colors
	if (eventType === 'shared') {
		const themeGradient = 'var(--secondary-gradient)';
		console.log('🎨 Returning shared event theme gradient:', themeGradient);
		return themeGradient;
	}

	// For personal events, use the user-specific custom colors
	const colors = { ...defaultEventColors, ...eventColors };
	const selectedColor = colors[eventType] || defaultEventColors.user1;

	console.log('🎨 Combined colors:', colors);
	console.log('🎨 Selected color for ' + eventType + ':', selectedColor);
	return selectedColor;
}

/**
 * Enhanced function to synchronize color updates across the app
 */
export function updateAllEventColors() {
	console.log('🔄 Synchronizing all event colors...');

	// Force refresh calendar with current colors
	if (typeof window.generateCalendar === 'function') {
		console.log('🔄 Regenerating calendar with updated colors');
		window.generateCalendar(window.currentDate || new Date());
	}

	// Update any open event modals or previews
	if (document.getElementById('eventColorsModal') && document.getElementById('eventColorsModal').classList.contains('active')) {
		console.log('🔄 Refreshing event colors modal');
		// We'll call this from outside since showEventColorsModal is now imported
	}

	console.log('✅ Event colors synchronized');
}

/**
 * Test function to verify shared events use theme gradients
 * @param {Function} showNotification - Notification function from notifications module
 */
export function testSharedColorCustomization(showNotification) {
	console.log('🔍 Testing shared event color behavior...');

	// Test 1: Check if getEventColor returns theme gradient for shared events
	const sharedColor = getEventColor('shared');
	console.log('✅ Shared event color:', sharedColor);

	// Test 2: Check localStorage doesn't contain shared colors
	const stored = JSON.parse(localStorage.getItem('eventColors') || '{}');
	console.log('✅ Stored event colors:', stored);
	console.log('✅ Shared color in storage:', !!stored.shared);

	// Test 3: Check eventColors object doesn't contain shared
	console.log('✅ Shared color in memory:', !!eventColors.shared);

	showNotification('🔍 Color test completed! Check console for details.', 'info');
}