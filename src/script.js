// Immediate global function definitions to prevent race condition errors
// These are executed even before the module is fully loaded

// Define showEventColorsModal function immediately to prevent ReferenceError
if (typeof window.showEventColorsModal === 'undefined') {
    window.showEventColorsModal = function() {
        console.log('⏳ Event colors modal requested but still loading...');
        showNotification('Loading interface...', 'info');

        // Wait a moment then try to call the real function
        setTimeout(() => {
            if (typeof showEventColorsModal !== 'undefined') {
                showEventColorsModal();
            } else {
                console.error('❌ showEventColorsModal function failed to load');
                showNotification('Unable to load event colors. Please refresh the page.', 'error');
            }
        }, 100);
       };
     }
     
     // Define showThemeModal function immediately to prevent ReferenceError
     if (typeof window.showThemeModal === 'undefined') {
         window.showThemeModal = function() {
             console.log('⏳ Theme modal requested but still loading...');
             showNotification('Loading interface...', 'info');
     
             // Wait a moment then try to call the real function
             setTimeout(() => {
                 if (typeof showThemeModal !== 'undefined') {
                     showThemeModal();
                 } else {
                     console.error('❌ showThemeModal function failed to load');
                     showNotification('Unable to load theme settings. Please refresh the page.', 'error');
                 }
             }, 100);
         };
     }
     
     // Define showMembersModal function immediately to prevent ReferenceError
     if (typeof window.showMembersModal === 'undefined') {
         window.showMembersModal = function() {
             console.log('⏳ Members modal requested but still loading...');
             showNotification('Loading interface...', 'info');
     
             // Wait a moment then try to call the real function
             setTimeout(() => {
                 if (typeof showMembersModal !== 'undefined') {
                     showMembersModal();
                 } else {
                     console.error('❌ showMembersModal function failed to load');
                     showNotification('Unable to load members list. Please refresh the page.', 'error');
                 }
             }, 100);
         };
     }
     
     // Define showInviteModal function immediately to prevent ReferenceError
     if (typeof window.showInviteModal === 'undefined') {
         window.showInviteModal = function() {
             console.log('⏳ Invite modal requested but still loading...');
             showNotification('Loading interface...', 'info');
     
             // Wait a moment then try to call the real function
             setTimeout(() => {
                 if (typeof showInviteModal !== 'undefined') {
                     showInviteModal();
                 } else {
                     console.error('❌ showInviteModal function failed to load');
                     showNotification('Unable to load invite settings. Please refresh the page.', 'error');
                 }
             }, 100);
         };
     }
     
     // Define showJoinModal function immediately to prevent ReferenceError
     if (typeof window.showJoinModal === 'undefined') {
         window.showJoinModal = function() {
             console.log('⏳ Join modal requested but still loading...');
             showNotification('Loading interface...', 'info');
     
             // Wait a moment then try to call the real function
             setTimeout(() => {
                 if (typeof showJoinModal !== 'undefined') {
                     showJoinModal();
                 } else {
                     console.error('❌ showJoinModal function failed to load');
                     showNotification('Unable to load join workspace. Please refresh the page.', 'error');
                 }
             }, 100);
         };
     }
     
     // Define openEventModal function immediately to prevent ReferenceError
     if (typeof window.openEventModal === 'undefined') {
         window.openEventModal = function(selectedDate, isNewEvent = false, isShared = true) {
             console.log('⏳ Event modal requested but still loading...');
             showNotification('Loading interface...', 'info');
     
             // Wait a moment then try to call the real function
             setTimeout(() => {
                 if (typeof openEventModal !== 'undefined') {
                     openEventModal(selectedDate, isNewEvent, isShared);
                 } else {
                     console.error('❌ openEventModal function failed to load');
                     showNotification('Unable to load event creator. Please refresh the page.', 'error');
                 }
             }, 100);
         };
     }
      // Define deleteEvent function immediately to prevent ReferenceError
      if (typeof window.deleteEvent === 'undefined') {
          window.deleteEvent = function(eventId) {
              console.log('⏳ deleteEvent requested but still loading...');
              setTimeout(() => {
                  if (typeof deleteEvent !== 'undefined') {
                      deleteEvent(eventId);
                  } else {
                      console.error('❌ deleteEvent function failed to load');
                      if (window.showNotification) {
                          window.showNotification('Unable to delete event. Please refresh the page.', 'error');
                      }
                  }
              }, 100);
          };
      }

      // Define openEventDetails function immediately to prevent ReferenceError
      if (typeof window.openEventDetails === 'undefined') {
          window.openEventDetails = function(eventId) {
              console.log('⏳ openEventDetails requested but still loading...');
              setTimeout(() => {
                  if (typeof openEventDetails !== 'undefined') {
                      openEventDetails(eventId);
                  } else {
                      console.error('❌ openEventDetails function failed to load');
                      if (window.showNotification) {
                          window.showNotification('Unable to load event details. Please refresh the page.', 'error');
                      }
                  }
              }, 100);
          };
      // Define setTheme function immediately to prevent ReferenceError
      if (typeof window.setTheme === 'undefined') {
          window.setTheme = function(themeName) {
              console.log('⏳ Theme switch requested but still loading...');
              showNotification('Loading interface...', 'info');

              // Wait a moment then try to call the real function
              setTimeout(() => {
                  if (typeof setTheme !== 'undefined') {
                      setTheme(themeName);
                  } else {
                      console.error('❌ setTheme function failed to load');
                      showNotification('Unable to switch theme. Please refresh the page.', 'error');
                  }
              }, 100);
          };
      }
      }
     
     // Define other commonly used functions to prevent similar errors
if (typeof window.openModal === 'undefined') {
    window.openModal = function(modalId) {
        console.log('⏳ Modal requested but still loading:', modalId);
        setTimeout(() => {
            if (typeof openModal !== 'undefined') {
                openModal(modalId);
            } else {
                console.warn('❌ Modal function not available:', modalId);
            }
        }, 100);
    };
}

// Define closeModal function
if (typeof window.closeModal === 'undefined') {
    window.closeModal = function(modalId) {
        console.log('⏳ Close modal requested but still loading:', modalId);
        setTimeout(() => {
            if (typeof closeModal !== 'undefined') {
                closeModal(modalId);
            } else {
                // Fallback: try to find and close modal manually
                const modal = document.getElementById(modalId);
                if (modal && modal.classList.contains('active')) {
                    modal.classList.remove('active');
                    console.log('✅ Successfully closed modal:', modalId);
                }
            }
        }, 100);
    };
}

// Define showNotification function to prevent errors
if (typeof window.showNotification === 'undefined') {
    window.showNotification = function(message, type = 'info') {
        console.log('📝 Notification (while loading):', message);

        // Fallback: create a simple in-page notification
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            z-index: 9999;
            font-family: sans-serif;
            box-shadow: 0 2px 10px rgba(0,0,0,0.2);
            max-width: 300px;
            word-wrap: break-word;
        `;
        notification.textContent = message;
        document.body.appendChild(notification);

        // Auto-remove after 3 seconds
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 3000);
    };
}

// Firebase imports - these are loaded from the HTML
// Firebase imports - these are loaded from the HTML

// Import Firebase functions
import {
	createUserWithEmailAndPassword,
	signOut as firebaseSignOut,
	GoogleAuthProvider,
	onAuthStateChanged,
	signInWithEmailAndPassword,
	signInWithPopup,
	updateProfile,
} from 'firebase/auth';
import {
	addDoc,
	collection,
	deleteDoc,
	doc,
	getDoc,
	getDocs,
	onSnapshot,
	orderBy,
	query,
	serverTimestamp,
	setDoc,
	updateDoc,
	where,
} from 'firebase/firestore';
import { auth, db } from './lib/fb';

import { $currentUser, $todos, setCurrentUser, setTodos } from './lib/stores';

const currentDate = new Date();

// App State
// let currentUser = null;
let currentWorkspace = null;
let workspaceMembers = []; // Store workspace members for synchronous access
let events = [];
// let todos = [];
let unsubscribeEvents = null;
let unsubscribeTodos = null;
let unsubscribeWorkspace = null;

$todos.subscribe((todos) => {
	console.log('📡 $todos.subscribe triggered with', todos.length, 'todos');
	renderTodos(todos);

	// Also refresh the current active tab's content when todos change
	const activeTab = document.querySelector('.tab-btn.active');
	console.log('🔍 Active tab found:', !!activeTab);

	if (activeTab) {
		const activeTabText = activeTab.textContent.trim();
		let tabName = 'my-tasks'; // default

		if (activeTabText.includes('Calendar')) {
			tabName = 'calendar';
		} else if (activeTabText.includes('My Tasks')) {
			tabName = 'my-tasks';
		} else if (activeTabText.includes('Partner')) {
			tabName = 'partner-tasks';
		} else if (activeTabText.includes('Shared')) {
			tabName = 'shared-tasks';
		}

		console.log('🎯 Active tab name:', tabName, 'from text:', activeTabText);

		// Only refresh task tabs, not calendar
		if (tabName !== 'calendar') {
			console.log('🔄 Refreshing filtered todos for tab:', tabName);
			renderFilteredTodos(tabName).catch(console.error);

			// Update progress bars for all task tabs when todos change
			updateProgress('my-tasks');
			updateProgress('partner-tasks');
			updateProgress('shared-tasks');
		} else {
			console.log('📅 Skipping calendar tab refresh');
		}
	} else {
		console.log('❌ No active tab found, cannot refresh filtered todos');
	}
});

$currentUser.subscribe((user) => {
	if (user) {
		console.log('Current user:', user);
		checkUserWorkspace(user);
	} else {
		console.log('No user logged in');
		showAuthModal();
		hideMainApp();
	}
});

window.addEventListener('load', async () => {
	// Initialize colors immediately when DOM is ready
	await initializeEventColors();
	initializeApp();
	loadSavedTheme();
});

// Authentication Functions
function initializeApp() {
	console.log('Initializing app...');
	showLoadingScreen();

	// Show auth modal by default until we confirm a user is logged in
	showAuthModal();

	onAuthStateChanged(auth, async (user) => {
		console.log(
			'Auth state changed:',
			user ? 'User logged in' : 'User logged out',
		);
		hideLoadingScreen();

		if (user) {
			hideAuthModal();
			setCurrentUser(user);

			// Check if user has completed profile
			const userDoc = await getDoc(doc(db, 'users', user.uid));
			if (!userDoc.exists() || !userDoc.data().profileCompleted) {
				showProfileSetup();
			}
		} else {
			setCurrentUser(null);
			showAuthModal();
			hideMainApp();
		}
	});
}

function showProfileSetup() {
	const profileHTML = `
        <div class="modal active" id="profile-modal">
            <div class="modal-content">
                <div class="modal-header">
                    <h3 class="modal-title">Complete Your Profile</h3>
                </div>
                <div class="profile-avatar" id="profile-avatar">
                    ${$currentUser.get().email.charAt(0).toUpperCase()}
                </div>
                <form id="profile-form" class="profile-form">
                    <div class="form-group">
                        <label>Display Name</label>
                        <input type="text" id="profile-name" value="${$currentUser.get().displayName || ''}" required>
                    </div>
                    <div class="form-group">
                        <label>Birthday</label>
                        <input type="date" id="profile-birthday" required>
                    </div>
                    <div class="form-group">
                        <label>Bio (Optional)</label>
                        <textarea id="profile-bio" rows="3"></textarea>
                    </div>
                    <div class="btn-group">
                        <button type="submit" class="btn btn-primary">
                            <span>Save Profile</span>
                            <span class="button-loader" style="display: none;"></span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    `;

	// Add the profile modal to the document
	const div = document.createElement('div');
	div.innerHTML = profileHTML;
	document.body.appendChild(div.firstChild);

	// Add event listener for form submission with a small delay to ensure DOM is ready
	setTimeout(() => {
		const profileForm = document.getElementById('profile-form');
		if (profileForm) {
			profileForm.addEventListener('submit', async (e) => {
				e.preventDefault();
				const button = e.target.querySelector('button');
				showButtonLoading(button, true);

				try {
					const currentUser = $currentUser.get();
					const profileData = {
						displayName: document.getElementById('profile-name').value,
						birthday: document.getElementById('profile-birthday').value,
						bio: document.getElementById('profile-bio').value,
						profileCompleted: true,
						updatedAt: serverTimestamp(),
					};

					await updateProfile(currentUser, {
						displayName: profileData.displayName,
					});
					await setDoc(doc(db, 'users', currentUser.uid), profileData, {
						merge: true,
					});

					document.getElementById('profile-modal').remove();
					showNotification('Profile updated successfully!', 'success');
					updateUserAvatar();
				} catch (error) {
					console.error('Error updating profile:', error);
					showNotification('Error updating profile', 'error');
				} finally {
					showButtonLoading(button, false);
				}
			});
		}
	}, 100);
}

function showLoadingScreen() {
	document.getElementById('loading-screen').style.display = 'flex';
}

function hideLoadingScreen() {
	document.getElementById('loading-screen').style.display = 'none';
}

function showAuthModal() {
	document.getElementById('auth-modal').classList.add('active');
}

function hideAuthModal() {
	document.getElementById('auth-modal').classList.remove('active');
}

function showMainApp() {
	document.getElementById('main-app').style.display = 'block';
	updateUserAvatar();
}

function hideMainApp() {
	document.getElementById('main-app').style.display = 'none';
}

// Auth Modal Switching
document.getElementById('show-signup').addEventListener('click', (e) => {
	e.preventDefault();
	document.getElementById('login-form').style.display = 'none';
	document.getElementById('signup-form').style.display = 'block';
});

document.getElementById('show-login').addEventListener('click', (e) => {
	e.preventDefault();
	document.getElementById('signup-form').style.display = 'none';
	document.getElementById('login-form').style.display = 'block';
});

// Email/Password Authentication
document
	.getElementById('email-login-form')
	.addEventListener('submit', async (e) => {
		e.preventDefault();
		const email = document.getElementById('login-email').value;
		const password = document.getElementById('login-password').value;

		try {
			showButtonLoading(e.target.querySelector('button'), true);
			await signInWithEmailAndPassword(auth, email, password);
			showNotification('Welcome back!', 'success');
		} catch (error) {
			console.error('Login error:', error);
			showNotification(getErrorMessage(error), 'error');
		} finally {
			showButtonLoading(e.target.querySelector('button'), false);
		}
	});

document
	.getElementById('email-signup-form')
	.addEventListener('submit', async (e) => {
		e.preventDefault();
		const name = document.getElementById('signup-name').value;
		const email = document.getElementById('signup-email').value;
		const password = document.getElementById('signup-password').value;

		try {
			showButtonLoading(e.target.querySelector('button'), true);
			const result = await createUserWithEmailAndPassword(
				auth,
				email,
				password,
			);
			await updateProfile(result.user, { displayName: name });
			showNotification('Account created successfully!', 'success');
		} catch (error) {
			console.error('Signup error:', error);
			showNotification(getErrorMessage(error), 'error');
		} finally {
			showButtonLoading(e.target.querySelector('button'), false);
		}
	});

// Google Authentication
document
	.getElementById('google-login-btn')
	.addEventListener('click', signInWithGoogle);
document
	.getElementById('google-signup-btn')
	.addEventListener('click', signInWithGoogle);

async function signInWithGoogle() {
	const provider = new GoogleAuthProvider();
	try {
		await signInWithPopup(auth, provider);
		showNotification('Welcome!', 'success');
	} catch (error) {
		console.error('Google sign-in error:', error);
		showNotification(getErrorMessage(error), 'error');
	}
}

// Sign Out
async function signOut() {
	try {
		// Clean up listeners
		if (unsubscribeEvents) unsubscribeEvents();
		if (unsubscribeTodos) unsubscribeTodos();
		if (unsubscribeWorkspace) unsubscribeWorkspace();

		await firebaseSignOut(auth);
		showNotification('Signed out successfully', 'success');
	} catch (error) {
		console.error('Sign out error:', error);
		showNotification('Error signing out', 'error');
	}
}

// Workspace Management
async function checkUserWorkspace(currentUser) {
	try {
		console.log('Checking user workspace for:', currentUser.uid);
		const userDoc = await getDoc(doc(db, 'users', currentUser.uid));

		if (userDoc.exists() && userDoc.data().workspaceId) {
			currentWorkspace = userDoc.data().workspaceId;
			console.log('User has existing workspace:', currentWorkspace);
			await loadWorkspace();
		} else {
			console.log('No existing workspace, showing setup');
			showWorkspaceSetup();
		}
	} catch (error) {
		console.error('Error checking workspace:', error);
		showNotification(`Error checking workspace: ${error.message}`, 'error');
		showWorkspaceSetup();
	}
}

function showWorkspaceSetup() {
	hideAuthModal();
	document.getElementById('workspace-modal').classList.add('active');
	setupThemeSelector();
}

function setupThemeSelector() {
	document.querySelectorAll('.theme-option').forEach((option) => {
		option.addEventListener('click', () => {
			document
				.querySelectorAll('.theme-option')
				.forEach((o) => o.classList.remove('active'));
			option.classList.add('active');

			// Apply theme preview
			const theme = option.dataset.theme;
			document.body.setAttribute('data-theme', theme);
		});
	});
}

// Workspace Form
document
	.getElementById('workspace-form')
	.addEventListener('submit', async (e) => {
		e.preventDefault();

		const name = document.getElementById('workspace-name').value.trim();
		const theme = document.querySelector('.theme-option.active').dataset.theme;

		if (!name) {
			showNotification('Please enter a workspace name', 'error');
			return;
		}

		try {
			console.log('Creating workspace with name:', name, 'theme:', theme);
			showButtonLoading(e.target.querySelector('button'), true);

			// Generate unique invite code
			const inviteCode = generateInviteCode();

			const currentUser = $currentUser.get();

			// Create workspace document
			const workspaceData = {
				name: name,
				theme: theme,
				createdBy: currentUser.uid,
				createdAt: serverTimestamp(),
				members: [currentUser.uid],
				inviteCode: inviteCode,
			};

			console.log('Creating workspace with data:', workspaceData);
			const workspaceRef = await addDoc(
				collection(db, 'workspaces'),
				workspaceData,
			);
			console.log('Workspace created with ID:', workspaceRef.id);

			// Update user document
			const userData = {
				displayName: currentUser.displayName || currentUser.email,
				email: currentUser.email,
				workspaceId: workspaceRef.id,
				joinedAt: serverTimestamp(),
			};

			console.log('Updating user document with data:', userData);
			// Set default theme and other user data
			userData.theme = 'cosmic';
			await setDoc(doc(db, 'users', currentUser.uid), userData);
			console.log('User document updated');

			currentWorkspace = workspaceRef.id;
			await loadWorkspace();

			document.getElementById('workspace-modal').classList.remove('active');
			showNotification('Workspace created successfully!', 'success');
		} catch (error) {
			console.error('Detailed error creating workspace:', error);
			console.error('Error code:', error.code);
			console.error('Error message:', error.message);

			let errorMessage = 'Error creating workspace';
			if (error.code === 'permission-denied') {
				errorMessage =
					'Permission denied. Please check Firebase security rules.';
			} else if (error.code === 'unavailable') {
				errorMessage = 'Firebase service unavailable. Please try again.';
			} else if (error.message) {
				errorMessage = `Error: ${error.message}`;
			}

			showNotification(errorMessage, 'error');
		} finally {
			showButtonLoading(e.target.querySelector('button'), false);
		}
	});

async function loadWorkspace() {
	try {
		console.log('Loading workspace:', currentWorkspace);

		// Verify workspace exists
		const workspaceDoc = await getDoc(doc(db, 'workspaces', currentWorkspace));
		if (!workspaceDoc.exists()) {
			throw new Error('Workspace not found');
		}

		// Load workspace data and start listeners
		unsubscribeWorkspace = onSnapshot(
			doc(db, 'workspaces', currentWorkspace),
			async (docSnapshot) => {
				if (docSnapshot.exists()) {
					const workspace = docSnapshot.data();
					console.log('Workspace data loaded:', workspace);
					document.getElementById('workspace-title').textContent =
						workspace.name;
					document.getElementById('workspace-subtitle').textContent =
						`${workspace.members.length} member(s)`;

					// Get user's theme preference
					const currentUser = auth.currentUser;
					const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
					const userTheme = userDoc.exists() ? userDoc.data().theme : null;
					const savedTheme = localStorage.getItem('selectedTheme');
					const themeToApply = userTheme || savedTheme || 'cosmic';

					document.body.setAttribute('data-theme', themeToApply);
					localStorage.setItem('selectedTheme', themeToApply);

					// Update invite code
					document.getElementById('invite-code-text').textContent =
						workspace.inviteCode;

					// Store members for synchronous access
					workspaceMembers = workspace.members || [];

					// Update partner avatar if there are 2 members
					updatePartnerInfo(workspace.members);
				}
			},
		);

		setupEventListener();
		setupTodoListener();
		showMainApp();
		hideAuthModal();

		// Wait for colors to be initialized before generating calendar
		waitForColors().then(() => {
			console.log('🎨 Colors ready, generating calendar with custom colors');
			generateCalendar(currentDate);
			console.log('✅ Calendar generated successfully with colors');

			// Set default tab to "My Tasks" if no tab is active
			const activeTab = document.querySelector('.tab-btn.active');
			console.log('🚀 Checking for active tab after workspace load. Active tab found:', !!activeTab);
			if (!activeTab) {
				console.log('🎯 No active tab found, setting default to my-tasks');
				switchTab('my-tasks').catch(console.error);
			} else {
				console.log('✅ Active tab already exists:', activeTab.textContent.trim());
			}
		});

		console.log('Workspace loaded successfully');
	} catch (error) {
		console.error('Error loading workspace:', error);
		showNotification(`Error loading workspace: ${error.message}`, 'error');
	}
}

async function updatePartnerInfo(members) {
	const partnerAvatar = document.getElementById('partner-avatar');

	if (members.length > 1) {
		if (partnerAvatar) {
			partnerAvatar.style.display = 'flex';
			partnerAvatar.classList.add('online');
		}
	} else {
		if (partnerAvatar) {
			partnerAvatar.style.display = 'none';
		}
	}

	// Update partner name in tab (this will be handled by updatePartnerTabName)
	await updatePartnerTabName();
}

// Real-time Event Listener
function setupEventListener() {
	console.log('🔧 Setting up event listener for workspace:', currentWorkspace);
	console.log('🔧 Current user:', $currentUser.get()?.uid);
	console.log('🔧 Auth user:', auth.currentUser?.uid);

	if (!currentWorkspace) {
		console.error('❌ No current workspace set for event listener');
		return;
	}

	console.log('🔧 Workspace exists, proceeding with listener setup');

	const eventsQuery = query(
		collection(db, 'events'),
		where('workspaceId', '==', currentWorkspace),
		orderBy('startDate', 'asc'),
	);

	console.log('🔧 Event query created:', eventsQuery);

	unsubscribeEvents = onSnapshot(eventsQuery, (snapshot) => {
		console.log('📡 EVENT LISTENER TRIGGERED');
		console.log('📊 Snapshot docs count:', snapshot.docs.length);
		console.log('📊 Snapshot metadata:', snapshot.metadata);
		console.log('📊 Query details:', eventsQuery);

		const newEvents = snapshot.docs.map((doc) => {
			const data = doc.data();
			console.log('📄 Processing event doc:', doc.id, {
				...data,
				startDate: data.startDate,
				endDate: data.endDate,
				workspaceId: data.workspaceId
			});
			return {
				id: doc.id,
				...data,
				startDate: data.startDate || '',
				endDate: data.endDate || data.startDate || '',
			};
		});

		console.log('✅ Event listener processed. Events count:', newEvents.length);
		console.log('✅ Global events array before assignment:', events.length);
		console.log('✅ Events data:', newEvents);

		events = newEvents;
		console.log('✅ Global events array after assignment:', events.length);

		const calendarView = document.getElementById('calendar-view');
		const isCalendarVisible =
			calendarView && !calendarView.classList.contains('hidden');
		console.log('📅 Calendar view visible:', isCalendarVisible);
		console.log('📅 Calendar element found:', !!calendarView);

		// Always regenerate calendar when events change to ensure new events appear
		// regardless of which tab is currently active
		console.log('🔄 Regenerating calendar with new events');
		console.log('🔄 Total events to render:', events.length);
		events.forEach((event, index) => {
			console.log(`🔄 Event ${index + 1}:`, {
				id: event.id,
				title: event.title,
				startDate: event.startDate,
				endDate: event.endDate,
				workspaceId: event.workspaceId
			});
		});

		console.log('🔄 Calling generateCalendar...');
		generateCalendar(currentDate);
		console.log('🔄 generateCalendar completed');
	}, (error) => {
		console.error('❌ Error in event listener:', error);
		console.error('❌ Error code:', error.code);
		console.error('❌ Error message:', error.message);
	});
}

// Real-time Todo Listener
function setupTodoListener() {
	const todosQuery = query(
		collection(db, 'todos'),
		where('workspaceId', '==', currentWorkspace),
		orderBy('createdAt', 'desc'),
	);

	unsubscribeTodos = onSnapshot(todosQuery, (snapshot) => {
		const _todos = snapshot.docs.map((doc) => ({
			id: doc.id,
			...doc.data(),
		}));

		setTodos(_todos);
	});
}

// Helper function to convert hex colors to HSLA for better opacity control
function hexToHsla(hex, alpha = 1) {
	// Remove # if present
	hex = hex.replace('#', '');

	// Convert to RGB
	const r = parseInt(hex.substr(0, 2), 16);
	const g = parseInt(hex.substr(2, 2), 16);
	const b = parseInt(hex.substr(4, 2), 16);

	// Convert to HSL
	const rNorm = r / 255;
	const gNorm = g / 255;
	const bNorm = b / 255;

	const max = Math.max(rNorm, gNorm, bNorm);
	const min = Math.min(rNorm, gNorm, bNorm);
	let h, s, l = (max + min) / 2;

	if (max === min) {
		h = s = 0; // achromatic
	} else {
		const d = max - min;
		s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
		switch (max) {
			case rNorm: h = (gNorm - bNorm) / d + (gNorm < bNorm ? 6 : 0); break;
			case gNorm: h = (bNorm - rNorm) / d + 2; break;
			case bNorm: h = (rNorm - gNorm) / d + 4; break;
		}
		h /= 6;
	}

	return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
}

// Enhanced Event Duration Categorization System
function categorizeEventDuration(event) {
	if (!event.endDate || event.startDate === event.endDate) {
		return 'single-day';
	}

	const startDate = new Date(event.startDate);
	const endDate = new Date(event.endDate);
	const durationDays = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1;

	if (durationDays >= 2 && durationDays <= 3) {
		return 'short-multiday';
	} else if (durationDays >= 4) {
		return 'long-multiday';
	}

	return 'single-day';
}

// Enhanced Event Stacking Algorithm with Priority Order
function sortEventsByPriority(events) {
	return [...events].sort((a, b) => {
		const categoryA = categorizeEventDuration(a);
		const categoryB = categorizeEventDuration(b);

		// Priority order: short-multiday → long-multiday → single-day
		const priorityOrder = {
			'short-multiday': 1,
			'long-multiday': 2,
			'single-day': 3
		};

		const priorityA = priorityOrder[categoryA] || 3;
		const priorityB = priorityOrder[categoryB] || 3;

		return priorityA - priorityB;
	});
}

// Dynamic Event Sorting System with Enhanced Collision Prevention
function sortEventsDynamically(events) {
	console.log('🔄 sortEventsDynamically called with', events.length, 'events');

	return [...events].sort((a, b) => {
		// Primary sort: Date (earliest first)
		const dateA = new Date(a.startDate);
		const dateB = new Date(b.startDate);

		if (dateA.getTime() !== dateB.getTime()) {
			return dateA.getTime() - dateB.getTime();
		}

		// Secondary sort: Time (earliest first, if available)
		const timeA = a.time || '00:00';
		const timeB = b.time || '00:00';

		if (timeA !== timeB) {
			return timeA.localeCompare(timeB);
		}

		// Tertiary sort: Duration priority (short-multiday → long-multiday → single-day)
		const categoryA = categorizeEventDuration(a);
		const categoryB = categorizeEventDuration(b);

		const priorityOrder = {
			'short-multiday': 1,
			'long-multiday': 2,
			'single-day': 3
		};

		const priorityA = priorityOrder[categoryA] || 3;
		const priorityB = priorityOrder[categoryB] || 3;

		if (priorityA !== priorityB) {
			return priorityA - priorityB;
		}

		// Final sort: Title alphabetically for consistent ordering
		return a.title.localeCompare(b.title);
	});
}

// Advanced Event Positioning System with Enhanced Collision Detection and Multi-Day Correction
function calculateEventPosition(event, dayEvents, dayElement, maxVisibleEvents = 3) {
	const dayRect = dayElement.getBoundingClientRect();
	const eventCategory = categorizeEventDuration(event);
	const isMultiDay = eventCategory !== 'single-day';

	// Base positioning
	let topOffset = 4; // Start below day number

	// Enhanced multi-day event positioning with dual correction
	if (isMultiDay) {
		// Apply existing 79px row correction for proper vertical alignment
		topOffset += 79;
	}

	const eventHeight = 22
	let eventSpacing = 6;

	// Check for existing events in this day
	const existingEvents = dayEvents.filter(e => e.id !== event.id);
	const collisions = existingEvents.filter(existing => {
	    const existingCategory = categorizeEventDuration(existing);
	    const existingTop = existing.top || topOffset;
	    const existingBottom = existingTop + eventHeight; // Use standardized height

	    // Check vertical overlap
	    return (topOffset < existingBottom && topOffset + eventHeight > existingTop);
	});

	// Automatic shifting logic
	if (collisions.length > 0) {
		// Find the highest collision and position below it
		const maxCollisionBottom = Math.max(...collisions.map(c =>
			(c.top || topOffset) + (categorizeEventDuration(c) !== 'single-day' ? 20 : 18)
		));

		topOffset = maxCollisionBottom + eventSpacing;
	}

	// Check if we exceed the day's available space
	const dayMaxHeight = dayRect.height - 10; // Leave some margin
	const totalHeightNeeded = topOffset + eventHeight;

	if (totalHeightNeeded > dayMaxHeight && dayEvents.length > maxVisibleEvents) {
		// Enable scrollable view for crowded days
		dayElement.classList.add('scrollable-events');
		dayElement.style.overflowY = 'auto';
		dayElement.style.maxHeight = `${dayMaxHeight}px`;
	}

	return {
		top: topOffset,
		height: eventHeight,
		category: eventCategory,
		isColliding: collisions.length > 0
	};
}

// Enhanced Event Rendering with Positioning and Improved Color System
function renderEventWithPositioning(event, dayEvents, dayElement) {
	const position = calculateEventPosition(event, dayEvents, dayElement);
	const eventCategory = position.category;
	const isMultiDay = eventCategory !== 'single-day';

	// Create event element with enhanced styling
	const eventElement = document.createElement('div');
	eventElement.className = `event-pill enhanced-event ${event.shared ? 'shared' : ''} ${eventCategory} ${position.isColliding ? 'shifted' : ''}`;
	eventElement.setAttribute('data-event-id', event.id);
	eventElement.setAttribute('data-event-category', eventCategory);
	eventElement.style.top = `${position.top}px`;
	eventElement.style.height = `${position.height}px`;
	eventElement.style.position = 'absolute';

	// Enhanced visual styling for premium feel with HSLA opacity and improved borders
	const eventUserType = event.shared ? 'shared' : getEventTypeForUser(event);
	const eventColor = event.color || getEventColor(eventUserType);
	const borderColor = event.borderColor || getEventColor(eventUserType);

	// Convert hex colors to HSLA for better opacity control
	const baseColor = hexToHsla(eventColor);
	const borderColorHsla = hexToHsla(borderColor);

	// Apply enhanced glass-like effects and gradients with HSLA
	if (eventUserType === 'shared') {
		// Shared events: Use theme gradient with HSLA for better opacity control
		eventElement.style.background = `linear-gradient(135deg, ${baseColor.replace('hsl', 'hsla').replace(')', ', 0.9)')} 0%, ${baseColor.replace('hsl', 'hsla').replace(')', ', 0.7)')} 70%, ${baseColor.replace('hsl', 'hsla').replace(')', ', 0.6)')} 100%)`;
		eventElement.style.border = `1px solid ${borderColorHsla.replace('hsl', 'hsla').replace(')', ', 0.4)')}`;
		eventElement.style.boxShadow = `0 2px 8px ${borderColorHsla.replace('hsl', 'hsla').replace(')', ', 0.2)')}, inset 0 1px 0 rgba(255, 255, 255, 0.25)`;
	} else {
		// Personal events: Use personalized colors with enhanced contrast
		eventElement.style.background = `linear-gradient(135deg, ${baseColor} 0%, ${baseColor.replace('hsl', 'hsla').replace(')', ', 0.85)')} 100%)`;
		eventElement.style.border = `1px solid ${borderColorHsla.replace('hsl', 'hsla').replace(')', ', 0.6)')}`;
		eventElement.style.boxShadow = `0 1px 4px ${borderColorHsla.replace('hsl', 'hsla').replace(')', ', 0.25)')}, inset 0 1px 0 rgba(255, 255, 255, 0.15)`;
	}

	// Add category-specific styling with enhanced visual hierarchy
	if (eventCategory === 'short-multiday') {
		eventElement.style.borderLeft = `3px solid ${borderColorHsla}`;
		eventElement.style.paddingLeft = '6px';
	} else if (eventCategory === 'long-multiday') {
		eventElement.style.borderLeft = `3px solid ${borderColorHsla}`;
		eventElement.style.paddingLeft = '6px';
		eventElement.style.fontWeight = '600';
	}

	eventElement.textContent = event.title || 'Untitled Event';

	// Enhanced hover effects and animations
	eventElement.addEventListener('mouseenter', function() {
		this.style.transform = 'translateX(2px) scale(1.02)';
		this.style.transition = 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)';
		this.style.boxShadow = `0 4px 12px ${borderColor}44, inset 0 1px 0 rgba(255, 255, 255, 0.3)`;
		this.style.zIndex = '10';
	});

	eventElement.addEventListener('mouseleave', function() {
		this.style.transform = 'translateX(0) scale(1)';
		this.style.boxShadow = eventUserType === 'shared' ?
			`0 2px 8px ${borderColor}33, inset 0 1px 0 rgba(255, 255, 255, 0.2)` :
			`0 1px 4px ${borderColor}44`;
		this.style.zIndex = '2';
	});

	// Click handler
	eventElement.addEventListener('click', (e) => {
		e.stopPropagation();
		openEventDetails(event.id);
	});

	// Store position data for collision detection
	event.top = position.top;
	event.height = position.height;
	event.category = eventCategory;

	return eventElement;
}

// Calendar Functions
function generateCalendar(date) {
	const grid = document.getElementById('calendarGrid');
	const monthYear = document.getElementById('monthYear');

	const year = date.getFullYear();
	const month = date.getMonth();

	monthYear.textContent = new Intl.DateTimeFormat('en-US', {
		month: 'long',
		year: 'numeric',
	}).format(date);

	grid.innerHTML = '';

	// Day headers
	const dayHeaders = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
	dayHeaders.forEach((day) => {
		const header = document.createElement('div');
		header.className = 'day-header';
		header.textContent = day;
		grid.appendChild(header);
	});

	// Generate calendar days
	const firstDay = new Date(year, month, 1).getDay();
	const daysInMonth = new Date(year, month + 1, 0).getDate();
	const daysInPrevMonth = new Date(year, month, 0).getDate();

	// Create array to store all calendar days
	const calendarDays = [];

	// Previous month's trailing days
	for (let i = firstDay - 1; i >= 0; i--) {
		const dayElement = document.createElement('div');
		dayElement.className = 'calendar-day other-month';
		dayElement.innerHTML = `
            <div class="day-number">${daysInPrevMonth - i}</div>
            <div class="day-events"></div>
        `;
		calendarDays.push(dayElement);
	}

	// Current month's days
	const today = new Date();
	for (let day = 1; day <= daysInMonth; day++) {
		const dayElement = document.createElement('div');
		const currentDateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

		dayElement.className = 'calendar-day';
		dayElement.dataset.date = currentDateStr;

		if (
			year === today.getFullYear() &&
			month === today.getMonth() &&
			day === today.getDate()
		) {
			dayElement.classList.add('today');
		}

		dayElement.innerHTML = `
			<div class="day-number">${day}</div>
			<div class="day-events">
				<div class="multi-day-events"></div>
				<div class="single-day-events"></div>
			</div>
		`;

		// Add styles for better event organization
		const style = document.createElement('style');
		style.textContent = `
			.calendar-day {
				min-height: 150px;
				padding: 8px;
				background: rgba(255, 255, 255, 0.03);
				border-radius: 12px;
				transition: all 0.2s ease;
			}
			.calendar-day:hover {
				background: rgba(255, 255, 255, 0.06);
				transform: translateY(-1px);
			}
			.day-number {
				font-size: 0.9rem;
				margin-bottom: 8px;
				color: var(--text-secondary);
			}
			.day-events {
				display: flex;
				flex-direction: column;
				gap: 4px;
			}
			.multi-day-events {
				margin-bottom: 4px;
			}
			.single-day-events {
				display: flex;
				flex-direction: column;
				gap: 2px;
			}
			.event-pill {
				font-size: 0.8rem;
				padding: 2px 6px;
				border-radius: 4px;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
				cursor: pointer;
				transition: all 0.2s ease;
				background: rgba(255, 255, 255, 0.1);
			}
			.event-pill:hover {
				transform: translateX(2px);
				background: rgba(255, 255, 255, 0.15);
			}
			.event-pill.shared {
				background: var(--primary-gradient);
				color: white;
			}
			.event-pill:nth-child(n+5) {
				display: none;
			}
			.has-more-events::after {
				content: "•••";
				display: block;
				text-align: center;
				color: var(--text-secondary);
				font-size: 0.8rem;
				margin-top: 2px;
			}
		`;
		document.head.appendChild(style);

		// Check if this day has events and add indicator
		const dayEvents = getEventsForDate(currentDateStr);
		if (dayEvents.length > 0) {
			const multiDayEvents = dayEvents.filter(event => event.endDate && event.startDate !== event.endDate);
			const singleDayEvents = dayEvents.filter(event => !event.endDate || event.startDate === event.endDate);

			dayElement.classList.add('has-events');
			dayElement.classList.add('has-events');
		} else {
			dayElement.classList.add('no-events');
		}

		dayElement.addEventListener('click', (e) => {
			if (
				!e.target.classList.contains('event-pill') &&
				!e.target.classList.contains('event-span')
			) {
				// Check if there are events on this date
				const dayEvents = getEventsForDate(currentDateStr);
				if (dayEvents.length > 0) {
					// If there are events, show the day events modal
					openDayEventsModal(currentDateStr);
				} else {
					// If no events, open the event creation modal directly
					openEventModal(currentDateStr);
				}
			}
		});

		calendarDays.push(dayElement);
	}

	// Next month's leading days
	const totalDays = calendarDays.length;
	for (let day = 1; day <= 42 - totalDays; day++) {
		const dayElement = document.createElement('div');
		dayElement.className = 'calendar-day other-month';
		dayElement.innerHTML = `
			<div class="day-number">${day}</div>
			<div class="day-events"></div>
		`;

		// Calculate the date for next month
		const nextMonthDate = new Date(year, month + 1, day);
		const nextMonthDateStr = `${nextMonthDate.getFullYear()}-${String(nextMonthDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

		// Check if this day has events and add indicator
		const dayEvents = getEventsForDate(nextMonthDateStr);
		if (dayEvents.length > 0) {
			dayElement.classList.add('has-events');
		}
		calendarDays.push(dayElement);
	}

	// Add all days to the grid
	calendarDays.forEach((day) => grid.appendChild(day));

	// Clear existing events first
	console.log('🧹 Clearing existing events from calendar');
	const allDayElements = grid.querySelectorAll('.calendar-day');
	allDayElements.forEach(dayElement => {
		const eventsContainer = dayElement.querySelector('.day-events');
		if (eventsContainer) {
			eventsContainer.innerHTML = '';
		}
	});

	// Use enhanced dynamic sorting with date, time, and priority order: short-multiday → long-multiday → single-day
	const sortedEvents = sortEventsDynamically(events);

	console.log('🎨 RENDERING EVENTS ON CALENDAR');
	console.log('📊 Total events to render:', sortedEvents.length);
	console.log('📊 Current date being rendered:', date.toISOString().split('T')[0]);
	console.log('📊 Current month/year:', date.getFullYear(), date.getMonth() + 1);

	// Enhanced Event Rendering with Advanced Positioning
	sortedEvents.forEach((event, index) => {
		console.log(`📅 Processing event ${index + 1}:`, {
			id: event.id,
			title: event.title,
			startDate: event.startDate,
			endDate: event.endDate,
			category: categorizeEventDuration(event),
			workspaceId: event.workspaceId,
			shared: event.shared
		});

		if (!event.endDate || event.startDate === event.endDate) {
			// Single-day event rendering with enhanced positioning
			console.log(`🔍 Looking for day element with date: ${event.startDate}`);
			const dayElement = grid.querySelector(`[data-date="${event.startDate}"]`);
			console.log(`✅ Day element found: ${dayElement ? 'YES' : 'NO'}`);

			if (dayElement) {
				const eventsContainer = dayElement.querySelector('.day-events');
				console.log(`📦 Events container found: ${eventsContainer ? 'YES' : 'NO'}`);
				console.log(`📦 Events container children before:`, eventsContainer?.children.length || 0);
				console.log(`📦 Events container HTML structure:`, eventsContainer?.innerHTML || 'N/A');
				console.log(`📦 Day element classes before:`, dayElement.className);

				if (eventsContainer) {
					// Check if event already exists to avoid duplicates
					const existingEvent = eventsContainer.querySelector(`[data-event-id="${event.id}"]`);
					if (existingEvent) {
						console.log(`⚠️ Event already exists on calendar, skipping: ${event.title}`);
						return;
					}

					// Get all events for this day for collision detection
					const dayEvents = getEventsForDate(event.startDate);
					console.log(`🎯 Day events for collision detection: ${dayEvents.length}`);

					// Use enhanced rendering with positioning
					console.log(`🎨 Calling renderEventWithPositioning for: "${event.title}"`);
					const eventElement = renderEventWithPositioning(event, dayEvents, dayElement);
					console.log(`🎨 Event element created: ${eventElement ? 'SUCCESS' : 'FAILED'}`);
					console.log(`🎨 Event element details:`, {
						tagName: eventElement?.tagName,
						className: eventElement?.className,
						innerHTML: eventElement?.innerHTML,
						style: eventElement?.style.cssText
					});

					// Store reference to this event for collision detection
					dayEvents.push(event);
					console.log(`📊 Day events array after push: ${dayEvents.length}`);

					console.log(`🔧 Attempting to append event element to DOM...`);
					eventsContainer.appendChild(eventElement);
					console.log(`✅ Enhanced event element appended to calendar for: "${event.title}"`);
					console.log(`📦 Events container children after:`, eventsContainer.children.length);
					console.log(`📦 Events container HTML after:`, eventsContainer.innerHTML);

					// Add has-events class to day element
					console.log(`🏷️ Adding has-events class to day element...`);
					dayElement.classList.add('has-events');
					dayElement.classList.remove('no-events');
					console.log(`🏷️ Added has-events class to day element for: "${event.title}"`);
					console.log(`🏷️ Day element classes after:`, dayElement.className);

					// Verify the event element is actually in the DOM
					const verifyElement = eventsContainer.querySelector(`[data-event-id="${event.id}"]`);
					console.log(`🔍 Verification: Event element found in DOM: ${verifyElement ? 'YES' : 'NO'}`);
					if (verifyElement) {
						console.log(`🔍 Verification: Event element position:`, verifyElement.style.top, verifyElement.style.left);
					}
				} else {
					console.error(`❌ Events container not found in day element for date: ${event.startDate}`);
					console.error(`❌ Day element innerHTML:`, dayElement.innerHTML);
				}
			} else {
				console.log(`❌ No day element found for date: ${event.startDate}`);
				console.log(`❌ Available data-date attributes:`, Array.from(grid.querySelectorAll('[data-date]')).map(el => el.getAttribute('data-date')).slice(0, 5));
			}
		} else {
			console.log(`🔗 Processing multi-day event: ${event.title} (${event.startDate} to ${event.endDate})`);
			// Multi-day events will be handled in the next section
		}
	});

	// Enhanced Multi-day Event Rendering with Advanced Positioning
	const multiDayEvents = sortedEvents.filter((event) => event.endDate && event.startDate !== event.endDate);

	multiDayEvents.forEach((event) => {
		console.log(`🔗 Processing enhanced multi-day event: ${event.title} (${event.startDate} to ${event.endDate})`);
		const startDate = new Date(event.startDate);
		const endDate = new Date(event.endDate);
		const eventCategory = categorizeEventDuration(event);

		const currentDate = new Date(startDate);
		let currentWeekSpan = null;
		let lastWeekIndex = -1;
		let spanStartDay = -1;
		let spanTop = -1;

		while (currentDate <= endDate) {
			const dateStr = currentDate.toISOString().split('T')[0];
			const dayElement = grid.querySelector(`[data-date="${dateStr}"]`);

			if (dayElement) {
				const dayIndex = Array.from(grid.children).indexOf(dayElement) - 7; // Subtract header row
				const weekIndex = Math.floor(dayIndex / 7);
				const dayInWeek = dayIndex % 7;

				// Get events for this day for collision detection
				const dayEvents = getEventsForDate(dateStr);

				// If we're in a new week or this is the first day
				if (weekIndex !== lastWeekIndex) {
					if (currentWeekSpan) {
						// Finalize the previous week's span
						const weekEnd = lastWeekIndex * 7 + 6;
						const spanEnd = Math.min(weekEnd, currentWeekSpan._lastDayIndex);
						const spanStart = (lastWeekIndex * 7) + (currentWeekSpan._startDay % 7);
						const width = ((spanEnd - spanStart + 1) * 14.28);
						currentWeekSpan.style.width = `${width}%`;
					}

					// Start new span for this week with enhanced positioning
					currentWeekSpan = document.createElement('div');
					currentWeekSpan.className = `event-span enhanced-multiday ${event.shared ? 'shared' : ''} ${eventCategory} ${dateStr === event.startDate ? 'start' : ''}`;

					// Get the grid's dimensions
					const dayRect = dayElement.getBoundingClientRect();
					const gridRect = grid.getBoundingClientRect();
					const cellHeight = dayRect.height;

					// Enhanced positioning with collision detection
					const position = calculateEventPosition(event, dayEvents, dayElement);
					const topPosition = position.top;

					// Get the dynamic color for the event
					const eventUserType = event.shared ? 'shared' : getEventTypeForUser(event);
					const eventColor = event.color || getEventColor(eventUserType);
					const borderColor = event.borderColor || getEventColor(eventUserType);

					// Enhanced multi-day styling with proper CSS variable handling
					let backgroundStyle;
					if (eventUserType === 'shared') {
						// For shared events, check if using CSS variable or hex color
						if (eventColor.startsWith('var(')) {
							// CSS variables don't support hex modification, use directly
							backgroundStyle = eventColor;
						} else {
							// Apply HSLA conversion for hex colors
							const baseColor = hexToHsla(eventColor);
							backgroundStyle = `linear-gradient(135deg, ${baseColor.replace('hsl', 'hsla').replace(')', ', 0.9)')} 0%, ${baseColor.replace('hsl', 'hsla').replace(')', ', 0.7)')} 70%, ${baseColor.replace('hsl', 'hsla').replace(')', ', 0.6)')} 100%)`;
						}
					} else {
						// Personal events: Apply HSLA conversion for hex colors
						const baseColor = hexToHsla(eventColor);
						backgroundStyle = `linear-gradient(135deg, ${baseColor} 0%, ${baseColor.replace('hsl', 'hsla').replace(')', ', 0.85)')} 100%)`;
					}

					const styles = {
						position: 'absolute',
						left: `${dayInWeek * 14.28}%`,
						width: '14.28%', // Initial width of one day
						top: `${(weekIndex * cellHeight) + topPosition}px`,
						height: position.height + 'px',
						background: backgroundStyle,
						padding: '2px 6px',
						fontSize: '0.75rem',
						borderRadius: '6px',
						border: `1px solid ${borderColor}99`,
						borderLeft: eventCategory === 'short-multiday' ? `3px solid ${borderColor}` : `3px solid ${borderColor}`,
						boxShadow: `0 2px 6px ${borderColor}33, inset 0 1px 0 rgba(255, 255, 255, 0.2)`,
						cursor: 'pointer',
						zIndex: '3', // Higher z-index for multi-day events
						color: '#FFFFFF',
						whiteSpace: 'nowrap',
						overflow: 'hidden',
						textOverflow: 'ellipsis',
						transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
						fontWeight: eventCategory === 'long-multiday' ? '600' : '500'
					};

					// Apply styles
					Object.assign(currentWeekSpan.style, styles);

					currentWeekSpan.textContent = event.title;
					currentWeekSpan.onclick = () => openEventDetails(event.id);
					currentWeekSpan._startDay = dayIndex;
					currentWeekSpan._lastDayIndex = dayIndex;

					// Enhanced hover effects for multi-day events
					currentWeekSpan.onmouseenter = function() {
						this.style.transform = 'translateY(-3px) scale(1.02)';
						this.style.boxShadow = `0 6px 16px ${borderColor}44, inset 0 1px 0 rgba(255, 255, 255, 0.3)`;
						this.style.zIndex = '10';
					};
					currentWeekSpan.onmouseleave = function() {
						this.style.transform = 'translateY(0) scale(1)';
						this.style.boxShadow = `0 2px 6px ${borderColor}33, inset 0 1px 0 rgba(255, 255, 255, 0.2)`;
						this.style.zIndex = '3';
					};

					// Append to the grid
					grid.appendChild(currentWeekSpan);

					lastWeekIndex = weekIndex;
				} else if (currentWeekSpan) {
					// Update the last day index as we move through the week
					currentWeekSpan._lastDayIndex = dayIndex;
				}
			}

			// Move to next day
			currentDate.setDate(currentDate.getDate() + 1);

			// If this was the last day, finish the current span
			if (currentWeekSpan && (dateStr === event.endDate || currentDate > endDate)) {
				const weekEnd = lastWeekIndex * 7 + 6;
				const spanEnd = Math.min(weekEnd, currentWeekSpan._lastDayIndex);
				const spanStart = (lastWeekIndex * 7) + (currentWeekSpan._startDay % 7);
				const width = ((spanEnd - spanStart + 1) * 14.28);
				currentWeekSpan.style.width = `${width}%`;

				if (dateStr === event.endDate) {
					currentWeekSpan.classList.add('end');
				}
			}
		}
	});
}

function changeMonth(direction) {
	currentDate.setMonth(currentDate.getMonth() + direction);
	generateCalendar(currentDate);
}

// Function to clear all events from calendar
function clearAllCalendarEvents() {
	console.log('🧹 Clearing all events from calendar');
	const grid = document.getElementById('calendarGrid');
	if (grid) {
		const allDayElements = grid.querySelectorAll('.calendar-day');
		allDayElements.forEach(dayElement => {
			const eventsContainer = dayElement.querySelector('.day-events');
			if (eventsContainer) {
				eventsContainer.innerHTML = '';
			}
		});
		console.log('✅ All calendar events cleared');
	}
}

// Tab Switching
async function switchTab(tab) {
	console.log(`🔄 switchTab called with tab: ${tab}`);

	const calendarView = document.getElementById('calendar-view');
	const myTasksView = document.getElementById('my-tasks-view');
	const partnerTasksView = document.getElementById('partner-tasks-view');
	const sharedTasksView = document.getElementById('shared-tasks-view');
	const tabBtns = document.querySelectorAll('.tab-btn');

	console.log('📋 Views found:', {
		calendar: !!calendarView,
		myTasks: !!myTasksView,
		partnerTasks: !!partnerTasksView,
		sharedTasks: !!sharedTasksView
	});
	console.log('🔘 Tab buttons found:', tabBtns.length);

	// Hide all views
	const allViews = [calendarView, myTasksView, partnerTasksView, sharedTasksView];
	allViews.forEach(view => {
		if (view) {
			view.classList.add('hidden');
			view.classList.remove('active');
		}
	});

	// Remove active class from all tabs
	tabBtns.forEach((btn) => btn.classList.remove('active'));

	// Activate the selected tab
	switch (tab) {
		case 'calendar':
			if (calendarView) {
				calendarView.classList.remove('hidden');
				calendarView.classList.add('active');
			}
			tabBtns[0].classList.add('active');
			break;
		case 'my-tasks':
			console.log('🎯 Activating My Tasks tab');
			if (myTasksView) {
				myTasksView.classList.remove('hidden');
				myTasksView.classList.add('active');
				console.log('✅ My Tasks view activated');
			} else {
				console.log('❌ My Tasks view not found');
			}
			if (tabBtns[1]) {
				tabBtns[1].classList.add('active');
				console.log('✅ My Tasks tab button activated');
			} else {
				console.log('❌ My Tasks tab button not found');
			}
			console.log('🔄 Calling renderFilteredTodos for my-tasks');
			await renderFilteredTodos('my-tasks');
			// Update progress bar for My Tasks
			updateProgress('my-tasks');
			break;
		case 'partner-tasks':
			if (partnerTasksView) {
				partnerTasksView.classList.remove('hidden');
				partnerTasksView.classList.add('active');
			}
			tabBtns[2].classList.add('active');
			await renderFilteredTodos('partner-tasks');
			// Update progress bar for Partner Tasks
			updateProgress('partner-tasks');
			break;
		case 'shared-tasks':
			if (sharedTasksView) {
				sharedTasksView.classList.remove('hidden');
				sharedTasksView.classList.add('active');
			}
			tabBtns[3].classList.add('active');
			await renderFilteredTodos('shared-tasks');
			// Update progress bar for Shared Tasks
			updateProgress('shared-tasks');
			break;
	}

	// Update partner name in tab
	updatePartnerTabName();
}

// Function to render filtered todos based on selected tab
async function renderFilteredTodos(tab) {
	const currentUser = $currentUser.get();
	const todos = $todos.get();

	console.log(`🔄 renderFilteredTodos called for tab: ${tab}`);
	console.log(`👤 Current user:`, currentUser?.uid);
	console.log(`📊 Total todos in store:`, todos.length);

	if (!currentUser) {
		console.log('❌ No current user, returning early');
		return;
	}

	// Get the target container based on tab
	let targetContainer;
	switch (tab) {
		case 'my-tasks':
			targetContainer = document.getElementById('user1-todos');
			console.log(`🎯 My Tasks container (user1-todos) found:`, !!targetContainer);
			break;
		case 'partner-tasks':
			targetContainer = document.getElementById('user2-todos');
			console.log(`🎯 Partner Tasks container (user2-todos) found:`, !!targetContainer);
			break;
		case 'shared-tasks':
			targetContainer = document.getElementById('shared-todos');
			console.log(`🎯 Shared Tasks container (shared-todos) found:`, !!targetContainer);
			break;
		default:
			console.log(`❌ Unknown tab: ${tab}`);
			return;
	}

	if (!targetContainer) {
		console.log(`❌ Target container not found for tab: ${tab}`);
		return;
	}

	console.log(`🧹 Clearing container for tab: ${tab}`);
	// Clear the container
	targetContainer.innerHTML = '';

	// Filter todos based on tab
	let filteredTodos = [];
	switch (tab) {
		case 'my-tasks':
			filteredTodos = todos.filter(todo => todo.assignee === currentUser.uid);
			console.log(`✅ My Tasks filtered: ${filteredTodos.length} todos`);
			break;
		case 'partner-tasks':
			// Get partner ID
			const partnerId = await getPartnerId();
			console.log(`👥 Partner ID:`, partnerId);
			filteredTodos = todos.filter(todo => todo.assignee === partnerId);
			console.log(`✅ Partner Tasks filtered: ${filteredTodos.length} todos`);
			break;
		case 'shared-tasks':
			filteredTodos = todos.filter(todo => todo.assignee === 'shared');
			console.log(`✅ Shared Tasks filtered: ${filteredTodos.length} todos`);
			break;
	}

	console.log(`📝 Rendering ${filteredTodos.length} todos for tab: ${tab}`);

	// Render filtered todos
	filteredTodos.forEach(todo => {
		const todoElement = createTodoElement(todo);
		targetContainer.appendChild(todoElement);
		console.log(`➕ Added todo element: ${todo.title} (ID: ${todo.id})`);
	});

	// Update empty state message
	updateEmptyState(tab, filteredTodos.length === 0);
	console.log(`✅ renderFilteredTodos completed for tab: ${tab}`);
}

// Helper function to get partner ID
async function getPartnerId() {
	const currentUser = $currentUser.get();
	if (!currentUser || !currentWorkspace) return null;

	try {
		const workspaceDoc = await getDoc(doc(db, 'workspaces', currentWorkspace));
		if (workspaceDoc.exists()) {
			const workspaceData = workspaceDoc.data();
			const partnerId = workspaceData.members.find(memberId => memberId !== currentUser.uid);
			return partnerId || null;
		}
	} catch (error) {
		console.error('Error getting partner ID:', error);
	}
	return null;
}

// Function to update partner name in tab
async function updatePartnerTabName() {
	const partnerTabName = document.getElementById('partner-tab-name');
	if (!partnerTabName) return;

	try {
		const currentUser = $currentUser.get();
		if (!currentUser || !currentWorkspace) {
			partnerTabName.textContent = "Partner's Tasks";
			return;
		}

		// Get workspace data to find partner
		const workspaceDoc = await getDoc(doc(db, 'workspaces', currentWorkspace));
		if (workspaceDoc.exists()) {
			const workspaceData = workspaceDoc.data();
			const partnerId = workspaceData.members.find(memberId => memberId !== currentUser.uid);

			if (partnerId) {
				const partnerDoc = await getDoc(doc(db, 'users', partnerId));
				if (partnerDoc.exists()) {
					const partnerData = partnerDoc.data();
					const partnerName = partnerData.displayName || partnerData.email || 'Partner';
					partnerTabName.textContent = `${partnerName}'s Tasks`;
				} else {
					partnerTabName.textContent = "Partner's Tasks";
				}
			} else {
				partnerTabName.textContent = "Partner's Tasks";
			}
		}
	} catch (error) {
		console.error('Error updating partner tab name:', error);
		partnerTabName.textContent = "Partner's Tasks";
	}
}

// Function to update empty state messages
function updateEmptyState(tab, isEmpty) {
	const emptyStateSelector = `#${tab}-view .empty-state`;
	const containerSelector = `#${tab}-container`;

	const emptyStateElement = document.querySelector(emptyStateSelector);
	const containerElement = document.querySelector(containerSelector);

	if (!emptyStateElement || !containerElement) return;

	if (isEmpty) {
		emptyStateElement.style.display = 'block';
		containerElement.style.display = 'none';
	} else {
		emptyStateElement.style.display = 'none';
		containerElement.style.display = 'block';
	}
}

// Modal Functions
function openModal(modalId) {
	document.getElementById(modalId).classList.add('active');
}

function closeModal(modalId) {
	const modal = document.getElementById(modalId);
	if (!modal) return;
	
	modal.classList.remove('active');

	// For dynamically created modals, remove them after animation
	if (modalId === 'daily-events-modal') {
		setTimeout(() => {
			modal.remove();
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
}

function openEventModal(selectedDate = null, isNewEvent = false, isShared = true) {
    if (isNewEvent) {
        // Clear and set up form fields
        const eventStartDate = document.getElementById('eventStartDate');
        const eventEndDate = document.getElementById('eventEndDate');
        const eventTitle = document.getElementById('eventTitle');
        const eventStartTime = document.getElementById('eventStartTime');
        const eventEndTime = document.getElementById('eventEndTime');
        const eventLocation = document.getElementById('eventLocation');
        const eventNotes = document.getElementById('eventNotes');
        const modalTitle = document.getElementById('event-modal-title');
        const eventModal = document.getElementById('eventModal');

        // Clear form fields
        if (eventTitle) eventTitle.value = '';
        if (eventStartTime) eventStartTime.value = '';
        if (eventEndTime) eventEndTime.value = '';
        if (eventLocation) eventLocation.value = '';
        if (eventNotes) eventNotes.value = '';

        // Format and set dates if provided
        if (selectedDate) {
            let formattedDate = selectedDate;
            if (selectedDate.includes('/')) {
                const parts = selectedDate.split('/');
                if (parts.length === 3) {
                    formattedDate = `${parts[2]}-${parts[0].padStart(2, '0')}-${parts[1].padStart(2, '0')}`;
                }
            }

            if (eventStartDate) eventStartDate.value = formattedDate;
            if (eventEndDate) eventEndDate.value = formattedDate;
        }

        // Set modal settings and data attribute for shared status
        const isMultiDay = document.getElementById('isMultiDay');
        if (isMultiDay) isMultiDay.checked = false;

        // Set data attribute to track event type and update title
        if (eventModal) {
            eventModal.setAttribute('data-event-type', isShared ? 'memory' : 'personal');
        }

        if (modalTitle) {
            modalTitle.textContent = isShared ? '✨ Create New Memory ✨' : '✨ Create Personal Event ✨';
        }

        // Open the event form modal
        openModal('eventModal');
        closeModal('daily-events-modal');
        return;
    }

    // Check if there are events for the selected date
    const dateEvents = events.filter(event => {
        const startDate = event.startDate;
        const endDate = event.endDate || event.startDate;
        return selectedDate >= startDate && selectedDate <= endDate;
    });

    // Detect mobile screen size
    const isMobile = window.innerWidth < 768;

    // Create events preview modal
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.id = 'daily-events-modal';
    if (isMobile) {
        modal.classList.add('add-event-choice-modal');
        modal.classList.add('mobile-add-event-modal');
    }

    const formattedDate = selectedDate ? new Date(selectedDate).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }) : '';

    const content = `
        <div class="modal-content daily-events-content">
            <div class="modal-header" style="border-bottom: 1px solid rgba(0, 0, 0, 0.1); padding-bottom: 15px; margin-bottom: 20px;">
                <span class="selected-date" style="color: #333; font-size: 1.2rem; font-weight: 600; font-family: var(--font-family-primary);">${formattedDate}</span>
                <button class="close-btn" onclick="closeModal('daily-events-modal')">&times;</button>
            </div>
            <div class="events-content">
                ${dateEvents.length > 0 ? `
                    <div class="events-list">
                        ${dateEvents.map(event => `
                            <div class="event-item ${event.shared ? 'shared' : ''}">
                                <div class="event-item-content">
                                    <div class="event-item-header">
                                        <h4>${event.title}</h4>
                                        ${event.shared ? `<span class="shared-tag event-type-toggle" data-event-id="${event.id}" onclick="event.stopPropagation(); toggleEventType('${event.id}')" style="cursor: pointer;">💑 Together</span>` : `<span class="personal-tag event-type-toggle" data-event-id="${event.id}" onclick="event.stopPropagation(); toggleEventType('${event.id}')" style="cursor: pointer;">📝 Personal</span>`}
                                    </div>
                                    <div class="event-item-details">
                                        ${event.time ? `<span class="detail-item">⏰ ${event.time}</span>` : ''}
                                        ${event.location ? `<span class="detail-item">📍 ${event.location}</span>` : ''}
                                    </div>
                                    ${event.notes ? `<div class="event-item-notes">${event.notes}</div>` : ''}
                                    ${event.attachmentUrl ? `
                                        <div class="event-item-attachment">
                                            <a href="${event.attachmentUrl}" target="_blank">
                                                📎 ${event.attachmentName || 'Attachment'}
                                            </a>
                                        </div>
                                    ` : ''}
                                </div>
                                <div class="event-item-actions">
                                    <button class="action-btn" onclick="event.stopPropagation(); openEventDetails('${event.id}')" title="Edit">✏️</button>
                                    <button class="action-btn delete" onclick="event.stopPropagation(); deleteEvent('${event.id}')" title="Delete">🗑️</button>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                ` : `
                    <div class="no-events-message">
                        <div class="empty-state-icon">💝</div>
                        <p>No plans yet for this special day!</p>
                        <p class="empty-state-subtext">Add something memorable to share together.</p>
                    </div>
                `}
            </div>
			<div class="modal-footer">
				<div class="button-group">
					<button class="btn btn-secondary personal-event-btn" onclick="openEventModal('${selectedDate}', true, false)" style="background: linear-gradient(135deg, rgba(255, 235, 235, 0.9) 0%, rgba(255, 215, 215, 0.6) 100%) !important; border: 2px solid rgba(255, 107, 107, 0.4) !important; color: #333 !important; box-shadow: 0 4px 12px rgba(255, 107, 107, 0.15) !important;">
						<span>Personal Event</span>
						<span>📝</span>
					</button>
					<button class="btn btn-primary shared-memory-btn" onclick="openEventModal('${selectedDate}', true, true)" style="background: linear-gradient(135deg, rgba(245, 240, 255, 0.9) 0%, rgba(235, 220, 255, 0.6) 100%) !important; border: 2px solid rgba(139, 92, 246, 0.4) !important; color: #333 !important; box-shadow: 0 4px 12px rgba(139, 92, 246, 0.15) !important;">
						<span>Create New Memory</span>
						<span>💝</span>
					</button>
				</div>
			</div>
        </div>
    `;

    modal.innerHTML = content;
    document.body.appendChild(modal);

    // Add styles for the new modal
    const styleElement = document.createElement('style');
    styleElement.textContent = `
        .daily-events-content {
            max-width: 600px;
            padding: 30px;
            background: rgba(255, 255, 255, 0.95);
            color: #333;
        }
        .daily-events-content .modal-title,
        .daily-events-content .date-header,
        .daily-events-content .event-item-header h4 {
            color: #333 !important;
        }
        .daily-events-content .detail-item,
        .daily-events-content .event-item-notes,
        .daily-events-content .event-item-attachment a,
        .daily-events-content .personal-tag,
        .daily-events-content .empty-state-subtext,
        .daily-events-content .no-events-message {
            color: #666 !important;
        }
        .daily-events-content input[type="text"],
        .daily-events-content input[type="date"],
        .daily-events-content input[type="time"],
        .daily-events-content textarea {
            font-family: "Space Grotesk", sans-serif;
            font-size: 1rem;
            color: #333;
        }
        .date-header {
            text-align: center;
            margin: 15px 0 25px;
            color: var(--text-primary);
            font-family: "Space Grotesk", sans-serif;
            font-size: 1.2rem;
            padding-bottom: 15px;
            border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        }
        .events-list {
            display: flex;
            flex-direction: column;
            gap: 15px;
            max-height: 400px;
            overflow-y: auto;
            padding-right: 10px;
            margin: 20px 0;
        }
        .event-item {
            background: white;
            border-radius: 12px;
            padding: 16px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
            border: 1px solid rgba(0, 0, 0, 0.1);
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            gap: 12px;
        }
        .event-item-content {
            flex: 1;
        }
        .event-item-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 8px;
        }
        .event-item-header h4 {
            margin: 0;
            font-size: 1.1rem;
            color: var(--text-primary);
            font-weight: 600;
        }
        .event-item-details {
            display: flex;
            gap: 12px;
            flex-wrap: wrap;
            margin: 8px 0;
        }
        .detail-item {
            font-size: 0.9rem;
            color: var(--text-secondary);
            display: flex;
            align-items: center;
            gap: 4px;
        }
        .shared-tag, .personal-tag {
            font-size: 0.8rem;
            padding: 4px 8px;
            border-radius: 12px;
            font-weight: 500;
        }
        .shared-tag {
            background: var(--secondary-gradient);
            color: white;
        }
        .personal-tag {
            background: rgba(0, 0, 0, 0.05);
            color: var(--text-secondary);
        }
        .event-location, .event-notes {
            margin-top: 8px;
            font-size: 0.9rem;
            color: inherit;
            opacity: 0.9;
        }
        .event-footer {
            margin-top: 15px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            gap: 10px;
        }
        .event-actions {
            display: flex;
            gap: 8px;
        }
        .event-item-actions {
            display: flex;
            gap: 8px;
        }
        .action-btn {
            background: none;
            border: none;
            width: 32px;
            height: 32px;
            border-radius: 8px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1rem;
            color: var(--text-secondary);
            transition: all 0.2s ease;
        }
        .action-btn:hover {
            background: rgba(0, 0, 0, 0.05);
            transform: translateY(-1px);
        }
        .action-btn.delete:hover {
            background: rgba(255, 87, 87, 0.1);
            color: #ff5757;
        }
        .event-item-notes {
            margin-top: 8px;
            padding-top: 8px;
            border-top: 1px solid rgba(0, 0, 0, 0.1);
            font-size: 0.9rem;
            color: var(--text-secondary);
            line-height: 1.4;
        }
        .event-item-attachment {
            margin-top: 8px;
            font-size: 0.9rem;
        }
        .event-item-attachment a {
            color: var(--text-secondary);
            text-decoration: none;
            display: inline-flex;
            align-items: center;
            gap: 4px;
        }
        .event-item-attachment a:hover {
            text-decoration: underline;
        }
        .shared-badge {
            background: rgba(255, 255, 255, 0.2);
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 0.8rem;
            color: white;
        }
        .no-events-message {
            text-align: center;
            padding: 40px 20px;
            color: var(--text-secondary);
        }
        .empty-state-icon {
            font-size: 3rem;
            margin-bottom: 15px;
            animation: pulse 2s infinite;
        }
        .empty-state-subtext {
            font-size: 0.9rem;
            margin-top: 5px;
            opacity: 0.8;
        }
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); }
        }
        .modal-footer {
            margin-top: 25px;
            text-align: center;
            border-top: 1px solid rgba(0, 0, 0, 0.1);
            padding-top: 20px;
        }
        .modal-footer .button-group {
            display: flex;
            gap: 15px;
            justify-content: center;
        }
        .modal-footer .btn {
            padding: 12px 24px;
            border-radius: 25px;
            border: none;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            font-family: "Space Grotesk", sans-serif;
            font-size: 1rem;
            min-width: 180px;
        }
        .modal-footer .btn-primary {
            background: var(--secondary-gradient);
            color: white;
        }
        .modal-footer .btn-secondary {
            background: rgba(255, 255, 255, 0.1);
            color: var(--text-primary);
            border: 1px solid rgba(0, 0, 0, 0.1);
        }
        .modal-footer .btn-primary:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
        }
    `;
    document.head.appendChild(styleElement);

    // Show the modal
    setTimeout(() => modal.classList.add('active'), 10);
}

function openNewEventModal(selectedDate, isShared = true) {
    closeModal('daily-events-modal');

    // Set up new event form and validate elements exist
    const eventStartDate = document.getElementById('eventStartDate');
    const eventEndDate = document.getElementById('eventEndDate');
    const eventTitle = document.getElementById('eventTitle');
    const eventStartTime = document.getElementById('eventStartTime');
    const eventEndTime = document.getElementById('eventEndTime');
    const eventLocation = document.getElementById('eventLocation');
    const eventNotes = document.getElementById('eventNotes');
    const modalTitle = document.getElementById('event-modal-title');
    const eventModal = document.getElementById('eventModal');

    // Log form elements for debugging
    console.log('Form elements found:', {
        eventStartDate: !!eventStartDate,
        eventEndDate: !!eventEndDate,
        eventTitle: !!eventTitle,
        eventStartTime: !!eventStartTime,
        eventEndTime: !!eventEndTime,
        eventLocation: !!eventLocation,
        eventNotes: !!eventNotes
    });

    // Clear and set up form fields
    if (eventTitle) eventTitle.value = '';
    if (eventStartTime) eventStartTime.value = '';
    if (eventEndTime) eventEndTime.value = '';
    if (eventLocation) eventLocation.value = '';
    if (eventNotes) eventNotes.value = '';

    // Format and set dates if provided
    if (selectedDate) {
        console.log('Setting date values to:', selectedDate);
        // Ensure the date is in YYYY-MM-DD format
        let formattedDate = selectedDate;
        if (selectedDate.includes('/')) {
            const parts = selectedDate.split('/');
            if (parts.length === 3) {
                formattedDate = `${parts[2]}-${parts[0].padStart(2, '0')}-${parts[1].padStart(2, '0')}`;
            }
        }
        console.log('Formatted date:', formattedDate);

        if (eventStartDate) eventStartDate.value = formattedDate;
        if (eventEndDate) eventEndDate.value = formattedDate;
    }

    // Set modal settings and data attribute
    const isMultiDay = document.getElementById('isMultiDay');
    if (isMultiDay) isMultiDay.checked = false;

    // Set data attribute for event type
    if (eventModal) {
        eventModal.setAttribute('data-event-type', isShared ? 'memory' : 'personal');
    }

    if (modalTitle) {
        modalTitle.textContent = isShared ? '✨ Create New Memory ✨' : '✨ Create Personal Event ✨';
    }

    // Open modal and log final state
    openModal('eventModal');
    console.log('Final form values:', {
        startDate: eventStartDate?.value,
        endDate: eventEndDate?.value,
        title: eventTitle?.value,
        eventType: eventModal?.getAttribute('data-event-type')
    });
}

// Day Events Modal Functions
function openDayEventsModal(selectedDate) {
    // Create events preview modal
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.id = 'daily-events-modal';

    const formattedDate = selectedDate ? new Date(selectedDate).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }) : '';

    const dateEvents = events.filter(event => {
        const startDate = event.startDate;
        const endDate = event.endDate || event.startDate;
        return selectedDate >= startDate && selectedDate <= endDate;
    });

    const content = `
        <div class="modal-content daily-events-content" style="color: #333;">
            <div class="modal-header" style="border-bottom: 1px solid rgba(0, 0, 0, 0.1); padding-bottom: 15px; margin-bottom: 20px;">
                <span class="selected-date" style="color: #333; font-size: 1.2rem; font-weight: 600; font-family: var(--font-family-primary);">${formattedDate}</span>
                <button class="close-btn" onclick="closeModal('daily-events-modal')">&times;</button>
            </div>
            <div class="events-content">
                ${dateEvents.length > 0 ? `
                    <div class="events-list">
                        ${dateEvents.map(event => `
                            <div class="event-item ${event.shared ? 'shared' : ''}">
                                <div class="event-item-content">
                                    <div class="event-item-header">
                                        <h4>${event.title}</h4>
                                        ${event.shared ? `<span class="shared-tag event-type-toggle" data-event-id="${event.id}" onclick="event.stopPropagation(); toggleEventType('${event.id}')" style="cursor: pointer;">💑 Together</span>` : `<span class="personal-tag event-type-toggle" data-event-id="${event.id}" onclick="event.stopPropagation(); toggleEventType('${event.id}')" style="cursor: pointer;">📝 Personal</span>`}
                                    </div>
                                    <div class="event-item-details">
                                        ${event.time ? `<span class="detail-item">⏰ ${event.time}</span>` : ''}
                                        ${event.location ? `<span class="detail-item">📍 ${event.location}</span>` : ''}
                                    </div>
                                    ${event.notes ? `<div class="event-item-notes">${event.notes}</div>` : ''}
                                    ${event.attachmentUrl ? `
                                        <div class="event-item-attachment">
                                            <a href="${event.attachmentUrl}" target="_blank">
                                                📎 ${event.attachmentName || 'Attachment'}
                                            </a>
                                        </div>
                                    ` : ''}
                                </div>
                                <div class="event-item-actions">
                                    <button class="action-btn" onclick="event.stopPropagation(); openEventDetails('${event.id}')" title="Edit">✏️</button>
                                    <button class="action-btn delete" onclick="event.stopPropagation(); deleteEvent('${event.id}')" title="Delete">🗑️</button>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                ` : `
                    <div class="no-events-message">
                        <div class="empty-state-icon">💝</div>
                        <p>No plans yet for this special day!</p>
                        <p class="empty-state-subtext">Add something memorable to share together.</p>
                    </div>
                `}
            </div>
            <div class="modal-footer">
                <div class="button-group">
                    <button class="btn btn-secondary personal-event-btn" onclick="openEventModal('${selectedDate}', true, false)">
                        <span>Personal Event</span>
                        <span>📝</span>
                    </button>
                    <button class="btn btn-primary shared-memory-btn" onclick="openEventModal('${selectedDate}', true, true)">
                        <span>Create New Memory</span>
                        <span>💝</span>
                    </button>
                </div>
            </div>
        </div>
    `;

    modal.innerHTML = content;

    // Add the new white card layout styles
    const styleElement = document.createElement('style');
    styleElement.textContent = `
        .daily-events-content {
            max-width: 600px;
            padding: 30px;
            background: rgba(255, 255, 255, 0.95);
            border-radius: 20px;
            color: #333;
        }
        .date-header {
            text-align: center;
            margin: 15px 0 25px;
            color: #333;
            font-family: "Space Grotesk", sans-serif;
            font-size: 1.2rem;
            padding-bottom: 15px;
            border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        }
        .events-list {
            display: flex;
            flex-direction: column;
            gap: 15px;
            max-height: 400px;
            overflow-y: auto;
            padding-right: 10px;
            margin: 20px 0;
        }
        .event-item {
            background: white;
            border-radius: 12px;
            padding: 16px;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
            border: 1px solid rgba(0, 0, 0, 0.1);
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            gap: 12px;
        }
        .event-item-content {
            flex: 1;
        }
        .event-item-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 8px;
        }
        .event-item-header h4 {
            margin: 0;
            font-size: 1.1rem;
            color: var(--text-primary);
            font-weight: 600;
        }
        .event-item-details {
            display: flex;
            gap: 12px;
            flex-wrap: wrap;
            margin: 8px 0;
        }
        .detail-item {
            font-size: 0.9rem;
            color: var(--text-secondary);
            display: flex;
            align-items: center;
            gap: 4px;
        }
        .shared-tag, .personal-tag {
            font-size: 0.8rem;
            padding: 4px 8px;
            border-radius: 12px;
            font-weight: 500;
        }
        .shared-tag {
            background: var(--secondary-gradient);
            color: white;
        }
        .personal-tag {
            background: #FFFACD;
            color: #8B4513;
            border: 1px solid #F0E68C;
            font-weight: 500;
        }
        .event-item-notes {
            margin-top: 8px;
            padding-top: 8px;
            border-top: 1px solid rgba(0, 0, 0, 0.1);
            font-size: 0.9rem;
            color: var(--text-secondary);
            line-height: 1.4;
        }
        .event-item-attachment {
            margin-top: 8px;
            font-size: 0.9rem;
        }
        .event-item-attachment a {
            color: var(--text-secondary);
            text-decoration: none;
            display: inline-flex;
            align-items: center;
            gap: 4px;
        }
        .event-item-actions {
            display: flex;
            gap: 8px;
        }
        .action-btn {
            background: none;
            border: none;
            width: 32px;
            height: 32px;
            border-radius: 8px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1rem;
            color: var(--text-secondary);
            transition: all 0.2s ease;
        }
        .action-btn:hover {
            background: rgba(0, 0, 0, 0.05);
            transform: translateY(-1px);
        }
        .action-btn.delete:hover {
            background: rgba(255, 87, 87, 0.1);
            color: #ff5757;
        }
        .no-events-message {
            text-align: center;
            padding: 40px 20px;
            color: var(--text-secondary);
        }
        .empty-state-icon {
            font-size: 3rem;
            margin-bottom: 15px;
            animation: pulse 2s infinite;
        }
        .empty-state-subtext {
            font-size: 0.9rem;
            margin-top: 5px;
            opacity: 0.8;
        }
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); }
        }
        .modal-footer {
            margin-top: 25px;
            text-align: center;
            border-top: 1px solid rgba(0, 0, 0, 0.1);
            padding-top: 20px;
        }
        .modal-footer .button-group {
            display: flex;
            gap: 15px;
            justify-content: center;
        }
        .modal-footer .btn {
            padding: 12px 24px;
            border-radius: 25px;
            border: none;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            font-family: "Space Grotesk", sans-serif;
            font-size: 1rem;
            min-width: 180px;
        }
        .modal-footer .btn-primary {
            background: var(--secondary-gradient);
            color: white;
        }
        .modal-footer .btn-secondary {
            background: rgba(255, 255, 255, 0.1);
            color: var(--text-primary);
            border: 1px solid rgba(0, 0, 0, 0.1);
        }
        .modal-footer .btn-primary:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
        }
    `;

    document.head.appendChild(styleElement);
    document.body.appendChild(modal);

    // Show the modal with a small delay for animation
    setTimeout(() => modal.classList.add('active'), 10);
}



function getEventsForDate(selectedDate) {
	console.log(`🔍 getEventsForDate called with: ${selectedDate}`);
	console.log(`🔍 Total events in global array: ${events.length}`);

	// Filter events that occur on the selected date
	const matchingEvents = events.filter(event => {
		const eventStart = new Date(event.startDate);
		const eventEnd = new Date(event.endDate || event.startDate);
		const checkDate = new Date(selectedDate);

		const isMatch = checkDate >= eventStart && checkDate <= eventEnd;
		console.log(`🔍 Checking event "${event.title}": start=${event.startDate}, end=${event.endDate}, check=${selectedDate}, match=${isMatch}`);

		return isMatch;
	});

	console.log(`🔍 Found ${matchingEvents.length} matching events for date ${selectedDate}`);
	return matchingEvents;
}



async function deleteEvent(eventId) {
	console.log('deleteEvent called with ID:', eventId);

	if (!confirm('Are you sure you want to delete this event?')) {
		console.log('Delete cancelled by user');
		return;
	}

	try {
		console.log('Attempting to delete event from database:', eventId);
		await deleteDoc(doc(db, 'events', eventId));
		console.log('Successfully deleted event from database:', eventId);

		// Close the day events modal
		closeModal('day-events-modal');

		// Show success notification
		showNotification('Event deleted successfully!', 'success');

		console.log('Event deletion completed');
	} catch (error) {
		console.error('Error deleting event:', error);
		showNotification('Error deleting event', 'error');
	}
}

function openTodoModal(assignee = null, todoId = null) {
	const assigneeSelect = document.getElementById('todoAssignee');
	const todoTitle = document.getElementById('todoTitle');
	const todoDueDate = document.getElementById('todoDueDate');
	const todoNotes = document.getElementById('todoNotes');
	const modalTitle = document.getElementById('todo-modal-title');

	if (todoId) {
		// Find the todo to edit
		const todos = $todos.get();
		const todo = todos.find((t) => t.id === todoId);
		if (todo) {
			// Pre-fill form fields for editing
			todoTitle.value = todo.title;
			todoDueDate.value = todo.dueDate || '';
			todoNotes.value = todo.notes || '';

			// Set assignee based on todo assignee
			const currentUser = $currentUser.get();
			if (todo.assignee === currentUser.uid) {
				assigneeSelect.value = 'user1';
			} else if (todo.assignee === 'shared') {
				assigneeSelect.value = 'shared';
			} else {
				assigneeSelect.value = 'user2';
			}

			// Update modal title
			if (modalTitle) {
				modalTitle.textContent = '✏️ Edit Task';
			}

			// Store todo ID for updating
			document.getElementById('todoForm').dataset.editingId = todoId;
		}
	} else {
		// Clear form for new task creation
		todoTitle.value = '';
		todoDueDate.value = '';
		todoNotes.value = '';

		// Set assignee based on parameter
		if (assignee) {
			if (assignee === 'user1') {
				assigneeSelect.value = 'user1'; // Set to "Me"
			} else if (assignee === 'user2') {
				assigneeSelect.value = 'user2'; // Set to "Partner"
			} else if (assignee === 'shared') {
				assigneeSelect.value = 'shared'; // Set to "Both (Shared)"
			}
		} else {
			// Default to current user if no specific assignee
			assigneeSelect.value = 'user1';
		}

		// Update modal title
		if (modalTitle) {
			modalTitle.textContent = '✨ Create New Task';
		}

		// Clear any editing ID
		delete document.getElementById('todoForm').dataset.editingId;
	}

	openModal('todoModal');
}

function openEventDetails(eventId) {
	const event = events.find((e) => e.id === eventId);
	if (event) {
		// Fill form with event data for editing
		document.getElementById('eventTitle').value = event.title;
		document.getElementById('eventStartDate').value = event.startDate;
		document.getElementById('eventEndDate').value = event.endDate || event.startDate;
		document.getElementById('eventStartTime').value = event.startTime || '';
		document.getElementById('eventEndTime').value = event.endTime || '';
		document.getElementById('eventLocation').value = event.location || '';
		document.getElementById('eventNotes').value = event.notes || '';

		// Set data attribute and modal title based on shared status
		const eventModal = document.getElementById('eventModal');
		const modalTitle = document.getElementById('event-modal-title');

		if (eventModal) {
			eventModal.setAttribute('data-event-type', event.shared ? 'memory' : 'personal');
		}

		if (modalTitle) {
			modalTitle.textContent = event.shared ? '✨ Edit Memory ✨' : '✨ Edit Personal Event ✨';
		}

		// Store event ID for updating
		document.getElementById('eventForm').dataset.editingId = eventId;

		// Close the daily events modal if it's open
		closeModal('daily-events-modal');

		// Open the event edit modal
		openModal('eventModal');
	}
}

// Event Form Handler
// addEvent
document.getElementById('eventForm').addEventListener('submit', async (e) => {
    console.log('🔥 EVENT FORM SUBMIT TRIGGERED');
    e.preventDefault();
    const currentUser = $currentUser.get();
    const button = e.target.querySelector('button[type="submit"]');

    console.log('📝 Current user:', currentUser);
    console.log('📊 Current workspace:', currentWorkspace);
    console.log('📋 Form data:', {
        title: document.getElementById('eventTitle').value,
        startDate: document.getElementById('eventStartDate').value,
        endDate: document.getElementById('eventEndDate').value,
        startTime: document.getElementById('eventStartTime').value,
        endTime: document.getElementById('eventEndTime').value,
        location: document.getElementById('eventLocation').value,
        notes: document.getElementById('eventNotes').value
    });

    try {
        showButtonLoading(button, true);

        // Format dates properly
        const startDate = document.getElementById('eventStartDate').value;
        const endDate = document.getElementById('eventEndDate').value || startDate;

        console.log('Event form submission - Raw date values:', {
            startDate,
            endDate,
            title: document.getElementById('eventTitle').value,
            currentWorkspace: currentWorkspace
        });

        // Validate dates
        if (new Date(startDate) > new Date(endDate)) {
            showCustomNotification('Start date cannot be after end date', 'error');
            showButtonLoading(button, false);
            return;
        }

        // Validate times
        const startTime = document.getElementById('eventStartTime').value;
        const endTime = document.getElementById('eventEndTime').value;

        // Check if both times are provided or both are empty
        if ((startTime && !endTime) || (!startTime && endTime)) {
            showCustomNotification('Both start time and end time must be provided together', 'error');
            showButtonLoading(button, false);
            return;
        }

        // If both times are provided, validate that start time is before end time
        if (startTime && endTime) {
            const startDateTime = new Date(`${startDate}T${startTime}`);
            const endDateTime = new Date(`${endDate}T${endTime}`);

            if (startDateTime >= endDateTime) {
                showCustomNotification('Start time must be before end time', 'error');
                showButtonLoading(button, false);
                return;
            }
        }

		// Determine shared status based on modal data attribute
		const eventModal = document.getElementById('eventModal');
		const eventType = eventModal ? eventModal.getAttribute('data-event-type') : 'memory';
		const isShared = eventType === 'memory'; // Memory events are shared, personal events are not

		const eventData = {
			title: document.getElementById('eventTitle').value,
			startDate: startDate,
			endDate: endDate,
			startTime: document.getElementById('eventStartTime').value,
			endTime: document.getElementById('eventEndTime').value,
			location: document.getElementById('eventLocation').value,
			notes: document.getElementById('eventNotes').value,
			shared: isShared,
			workspaceId: currentWorkspace,
			createdBy: currentUser.uid,
			createdAt: serverTimestamp(),
			updatedAt: serverTimestamp(),
		};

		const editingId = e.target.dataset.editingId;

		if (editingId) {
			// Update existing event
			console.log('Updating existing event:', editingId, eventData);
			await updateDoc(doc(db, 'events', editingId), eventData);
			showNotification('Event updated!', 'success');
		} else {
			// Create new event
			console.log('🎯 CREATING NEW EVENT');
			console.log('📄 Event data to be saved:', eventData);
			console.log('🏢 Target workspace:', currentWorkspace);
			console.log('👤 Created by user:', currentUser.uid);

			const docRef = await addDoc(collection(db, 'events'), eventData);
			console.log('✅ Event created with ID:', docRef.id);
			console.log('🔄 Event creation successful, waiting for listener...');

			// Manually trigger calendar regeneration after a delay
			console.log('🔄 Scheduling manual calendar regeneration...');
			setTimeout(() => {
				console.log('🔄 Manual calendar regeneration triggered after event creation');
				generateCalendar(currentDate);
			}, 1000);

			showNotification('Event created!', 'success');
		}

		closeModal('eventModal');
		delete e.target.dataset.editingId;

		// Apply dynamic sorting to ensure proper event ordering and positioning
		console.log('🔄 Applying dynamic event sorting for optimal positioning...');
		const sortedEvents = sortEventsDynamically(events);

		// Update the global events array with sorted data
		events = sortedEvents;
		console.log('✅ Events sorted dynamically with', sortedEvents.length, 'events');

		// Wait a moment for the database to update, then regenerate calendar with improved sorting
		console.log('⏳ Waiting for database sync before regenerating calendar with enhanced sorting...');
		setTimeout(() => {
			console.log('🔄 Manual calendar regeneration triggered with dynamic sorting');
			generateCalendar(currentDate); // Refresh the calendar with improved positioning
		}, 500);
	} catch (error) {
		console.error('❌ Error saving event:', error);
		console.error('❌ Error code:', error.code);
		console.error('❌ Error message:', error.message);
		showNotification('Error saving event', 'error');
	} finally {
		showButtonLoading(button, false);
	}
});

// Todo Form Handler
// addTodo / updateTodo
document.getElementById('todoForm').addEventListener('submit', async (e) => {
	e.preventDefault();
	const currentUser = $currentUser.get();

	if (!currentUser) {
		showNotification('Please log in to add tasks', 'error');
		return;
	}

	// Map form values to actual user IDs
	let assigneeValue = document.getElementById('todoAssignee').value;
	if (assigneeValue === 'user1') {
		assigneeValue = currentUser.uid; // Current user
	} else if (assigneeValue === 'user2') {
		// Get partner ID from workspace members
		const workspaceDoc = await getDoc(doc(db, 'workspaces', currentWorkspace));
		const workspaceData = workspaceDoc.data();
		const partnerId = workspaceData.members.find(memberId => memberId !== currentUser.uid);
		assigneeValue = partnerId || 'shared'; // Fallback to shared if no partner
	}
	// 'shared' value remains as is

	const todoData = {
		title: document.getElementById('todoTitle').value,
		dueDate: document.getElementById('todoDueDate').value,
		notes: document.getElementById('todoNotes').value,
		assignee: assigneeValue,
		workspaceId: currentWorkspace,
		updatedAt: serverTimestamp(),
	};

	const editingId = e.target.dataset.editingId;

	try {
		const button = e.target.querySelector('button[type="submit"]');
		showButtonLoading(button, true);

		if (editingId) {
			// Update existing todo
			console.log('Updating existing todo:', editingId, todoData);
			await updateDoc(doc(db, 'todos', editingId), todoData);
			showNotification('Task updated! 🎉', 'success');
		} else {
			// Create new todo
			todoData.completed = false;
			todoData.createdBy = currentUser.uid;
			todoData.createdAt = serverTimestamp();

			const docRef = await addDoc(collection(db, 'todos'), todoData);

			// Create and animate the new task element
			const todoElement = createTodoElement({ ...todoData, id: docRef.id });
			todoElement.style.opacity = '0';
			todoElement.style.transform = 'translateY(20px)';

			// Add to appropriate container based on current active tab
			const activeTab = document.querySelector('.tab-btn.active');
			if (activeTab) {
				const activeTabText = activeTab.textContent.trim();
				let targetContainer = null;

				if (activeTabText.includes('My Tasks') && todoData.assignee === currentUser.uid) {
					targetContainer = document.getElementById('my-tasks-container');
				} else if (activeTabText.includes('Partner') && todoData.assignee !== currentUser.uid && todoData.assignee !== 'shared') {
					targetContainer = document.getElementById('partner-tasks-container');
				} else if (activeTabText.includes('Shared') && todoData.assignee === 'shared') {
					targetContainer = document.getElementById('shared-tasks-container');
				}

				if (targetContainer) {
					targetContainer.insertBefore(todoElement, targetContainer.firstChild);
					// Trigger animation
					requestAnimationFrame(() => {
						todoElement.style.transition = 'all 0.3s ease';
						todoElement.style.opacity = '1';
						todoElement.style.transform = 'translateY(0)';
					});
				}
			}

			showNotification('Task created! 🎉', 'success');
		}

		closeModal('todoModal');
		delete e.target.dataset.editingId;

		// Update progress bar for the active tab
		const currentActiveTab = document.querySelector('.tab-btn.active');
		if (currentActiveTab) {
			const activeTabText = currentActiveTab.textContent.trim();
			let tabName = 'my-tasks'; // default

			if (activeTabText.includes('My Tasks')) {
				tabName = 'my-tasks';
			} else if (activeTabText.includes('Partner')) {
				tabName = 'partner-tasks';
			} else if (activeTabText.includes('Shared')) {
				tabName = 'shared-tasks';
			}

			updateProgress(tabName);
		}
	} catch (error) {
		console.error('Error saving todo:', error);
		showNotification('Error saving task', 'error');
	} finally {
		showButtonLoading(e.target.querySelector('button[type="submit"]'), false);
	}
});

// Todo Functions
function updateProgress(tab = null) {
	const todos = $todos.get();
	const currentUser = $currentUser.get();

	if (!currentUser) return;

	let filteredTodos = [];
	let progressBarId, progressTextId;

	// Filter todos based on tab
	switch (tab) {
		case 'my-tasks':
			filteredTodos = todos.filter(todo => todo.assignee === currentUser.uid);
			progressBarId = 'my-tasks-progress-bar';
			progressTextId = 'my-tasks-progress-text';
			break;
		case 'partner-tasks':
			// Get partner ID
			const partnerId = todos.find(todo => todo.assignee !== currentUser.uid && todo.assignee !== 'shared')?.assignee;
			filteredTodos = todos.filter(todo => todo.assignee === partnerId);
			progressBarId = 'partner-tasks-progress-bar';
			progressTextId = 'partner-tasks-progress-text';
			break;
		case 'shared-tasks':
			filteredTodos = todos.filter(todo => todo.assignee === 'shared');
			progressBarId = 'shared-tasks-progress-bar';
			progressTextId = 'shared-tasks-progress-text';
			break;
		default:
			// Global progress for backward compatibility
			filteredTodos = todos;
			progressBarId = 'task-progress-bar';
			progressTextId = 'progress-text';
			break;
	}

	const totalTasks = filteredTodos.length;
	const completedTasks = filteredTodos.filter((todo) => todo.completed).length;
	const progressPercentage =
		totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 100; // Show 100% when no tasks

	const progressFill = document.getElementById(progressBarId)?.querySelector('.progress-fill');
	const progressText = document.getElementById(progressTextId);

	if (progressFill && progressText) {
		// Animate the progress bar
		progressFill.style.transition = 'width 0.6s ease-in-out';
		progressFill.style.width = `${progressPercentage}%`;
		const progressTextContent = totalTasks > 0
			? `${progressPercentage}% Complete (${completedTasks}/${totalTasks} tasks)`
			: `${progressPercentage}% Complete (no tasks)`;
		progressText.textContent = progressTextContent;
	}
}

function renderTodos(todos) {
	const currentUser = $currentUser.get();
	console.log('Rendering todos for user:', currentUser?.uid);

	// Update progress bar for the active tab
	const currentActiveTab = document.querySelector('.tab-btn.active');
	if (currentActiveTab) {
		const activeTabText = currentActiveTab.textContent.trim();
		let tabName = 'my-tasks'; // default

		if (activeTabText.includes('My Tasks')) {
			tabName = 'my-tasks';
		} else if (activeTabText.includes('Partner')) {
			tabName = 'partner-tasks';
		} else if (activeTabText.includes('Shared')) {
			tabName = 'shared-tasks';
		}

		updateProgress(tabName);
	}

	// Note: Individual container rendering is now handled by renderFilteredTodos()
	// which is called when switching tabs. This prevents conflicts between
	// the old 3-column system and the new 4-tab system.
	console.log('renderTodos completed - individual tabs will be populated by renderFilteredTodos()');
}

function createTodoElement(todo) {
	const div = document.createElement('div');
	div.className = 'todo-item';
	div.setAttribute('data-todo-id', todo.id);

	const attachmentHtml = todo.attachmentUrl
		? `<div class="todo-attachment" onclick="window.open('${todo.attachmentUrl}', '_blank')">
            📎 ${todo.attachmentName || 'Attachment'}
        </div>`
		: '';

	const dueDateHtml = todo.dueDate
		? `<div class="todo-meta">Due: ${new Date(todo.dueDate).toLocaleDateString()}</div>`
		: '';

	// Create the structure
	div.innerHTML = `
	      <div class="todo-checkbox ${todo.completed ? 'checked' : ''}"></div>
	      <div class="todo-text ${todo.completed ? 'completed' : ''}">
	          <strong>${todo.title}</strong>
	          ${todo.notes ? `<div class="todo-meta">${todo.notes}</div>` : ''}
	          ${dueDateHtml}
	          ${attachmentHtml}
	      </div>
	      <button class="edit-todo-btn" type="button" data-todo-id="${todo.id}" title="Edit task">✏️</button>
	      <button class="delete-todo-btn" type="button" data-todo-id="${todo.id}" title="Delete task">🗑️</button>
	  `;

	// Add completed class to the todo item itself
	if (todo.completed) {
	  div.classList.add('completed');
	}

	// Add event listeners after the HTML is set
	const checkbox = div.querySelector('.todo-checkbox');
	const editBtn = div.querySelector('.edit-todo-btn');
	const deleteBtn = div.querySelector('.delete-todo-btn');

	console.log(
		'Creating todo element for:',
		todo.id,
		'Edit button found:',
		!!editBtn,
		'Delete button found:',
		!!deleteBtn
	);

	checkbox.addEventListener('click', (e) => {
		console.log('✅ Checkbox clicked for todo:', todo.id);
		console.log('✅ Event target:', e.target);
		console.log('✅ Event target classes:', e.target.classList);
		console.log('✅ Event target parent element:', e.target.parentElement);
		console.log('✅ Event target parent classes:', e.target.parentElement?.classList);
		console.log('✅ Checkbox computed style pointer-events:', getComputedStyle(e.target).pointerEvents);

		// Check if parent has loading class
		const parentTodoItem = e.target.closest('.todo-item');
		if (parentTodoItem?.classList.contains('loading')) {
			console.log('⚠️ Parent todo item has loading class, preventing click');
			return;
		}

		toggleTodo(todo.id);
	});
	if (editBtn) {
		editBtn.addEventListener('click', (e) => {
			console.log('✏️ EDIT BUTTON CLICKED for todo:', todo.id);
			console.log('✏️ Event target:', e.target);
			console.log('✏️ Event target classes:', e.target.classList);
			console.log('✏️ Event target data-todo-id:', e.target.dataset.todoId);
			e.stopPropagation();
			e.preventDefault();
			openTodoModal(null, todo.id);
		});
	} else {
		console.error('❌ Edit button not found for todo:', todo.id);
	}
	if (deleteBtn) {
		deleteBtn.addEventListener('click', (e) => {
			console.log('🗑️ DELETE BUTTON CLICKED for todo:', todo.id);
			console.log('🗑️ Event target:', e.target);
			console.log('🗑️ Event target classes:', e.target.classList);
			console.log('🗑️ Event target data-todo-id:', e.target.dataset.todoId);
			e.stopPropagation();
			e.preventDefault();
			deleteTodo(todo.id);
		});
	} else {
		console.error('❌ Delete button not found for todo:', todo.id);
	}

	return div;
}

async function toggleTodo(todoId) {
	console.log('🔄 toggleTodo called with ID:', todoId);
	const todos = $todos.get();
	console.log('📊 All todos in store:', todos);
	const todo = todos.find((t) => t.id === todoId);
	console.log('🎯 Found todo:', todo);

	// Add immediate visual feedback
	const todoElements = document.querySelectorAll(`[data-todo-id="${todoId}"]`);
	console.log('📋 Todo elements found:', todoElements.length);

	if (todoElements.length === 0) {
	  console.error('❌ No todo elements found with data-todo-id:', todoId);
	  return;
	}

	if (todo) {
	  console.log('✅ Todo found, updating completion status');
	  try {
	    const todoElements = document.querySelectorAll(
	      `[data-todo-id="${todoId}"]`,
	    );
	    console.log('📋 Todo elements found:', todoElements.length);

	    // Immediate visual feedback
	    todoElements.forEach((element) => {
	      const checkbox = element.querySelector('.todo-checkbox');
	      const todoText = element.querySelector('.todo-text');

	      if (todo.completed) {
	        // If completing a task
	        element.classList.add('completing');
	        element.classList.remove('completed');
	        if (checkbox) checkbox.classList.remove('checked');
	        if (todoText) todoText.classList.remove('completed');
	      } else {
	        // If marking as completed
	        element.classList.add('completing');
	        element.classList.add('completed');
	        if (checkbox) checkbox.classList.add('checked');
	        if (todoText) todoText.classList.add('completed');
	      }
	    });

	    // Wait for animation
	    await new Promise((resolve) => setTimeout(resolve, 300));

	    // Remove animation class and finalize state
	    todoElements.forEach((element) => {
	      element.classList.remove('completing');
	    });

	    // Update the todo in database
	    console.log('🔥 Updating todo in database...');
	    await updateDoc(doc(db, 'todos', todoId), {
	      completed: !todo.completed,
	      updatedAt: serverTimestamp(),
	    });
	    console.log('✅ Todo updated successfully in database');

	    if (!todo.completed) {
	      showNotification('Task completed! 🎉', 'success');
	    } else {
	      showNotification('Task marked as pending', 'info');
	    }
		} catch (error) {
			console.error('❌ Error updating todo:', error);
			showNotification('Error updating task', 'error');
		}
	} else {
		console.error('❌ Todo not found in store with ID:', todoId);
	}
}

async function deleteTodo(todoId) {
	console.log('deleteTodo called with ID:', todoId);

	if (!confirm('Are you sure you want to delete this task?')) {
		console.log('Delete cancelled by user');
		return;
	}

	try {
		console.log('Attempting to delete todo from database:', todoId);
		// First delete from database
		await deleteDoc(doc(db, 'todos', todoId));
		console.log('Successfully deleted todo from database:', todoId);

		// Then handle UI updates
		const todoElements = document.querySelectorAll(
			`[data-todo-id="${todoId}"]`,
		);

		// Animate removal
		todoElements.forEach((element) => {
			element.classList.add('removing');

			// Remove element after animation
			setTimeout(() => {
				if (element?.parentNode) {
					element.parentNode.removeChild(element);
				}
			}, 500);
		});

		showCustomNotification('Task deleted successfully!', 'success');

		// Update progress after a brief delay to ensure DOM is updated
		setTimeout(() => {
			// Update progress bar for the active tab
			const currentActiveTab = document.querySelector('.tab-btn.active');
			if (currentActiveTab) {
				const activeTabText = currentActiveTab.textContent.trim();
				let tabName = 'my-tasks'; // default

				if (activeTabText.includes('My Tasks')) {
					tabName = 'my-tasks';
				} else if (activeTabText.includes('Partner')) {
					tabName = 'partner-tasks';
				} else if (activeTabText.includes('Shared')) {
					tabName = 'shared-tasks';
				}

				updateProgress(tabName);
			}
		}, 600);
	} catch (error) {
		console.error('Error deleting todo:', error);
		showNotification('Error deleting task', 'error');
		// Revert animation if deletion fails
		const todoElements = document.querySelectorAll(
			`[data-todo-id="${todoId}"]`,
		);
		todoElements.forEach((element) => {
			element.classList.remove('removing');
		});
	}
}

function showThemeModal() {
	openModal('themeModal');

	// Add event listeners for theme cards to prevent race condition errors
	setTimeout(() => {
		document.querySelectorAll('.theme-card').forEach((card) => {
			// Remove any existing event listeners first
			const newCard = card.cloneNode(true);
			if (card.parentNode) {
				card.parentNode.replaceChild(newCard, card);
			}

			// Add proper event listener
			newCard.addEventListener('click', async () => {
				const theme = newCard.dataset.theme;
				await setTheme(theme);
			});
		});
	}, 100); // Small delay to ensure modal is fully rendered
}

async function setTheme(themeName) {
	const currentUser = $currentUser.get();
	if (!currentUser) return;

	try {
		// Update theme in database
		await updateDoc(doc(db, 'users', currentUser.uid), {
			theme: themeName,
		});

		// Update UI
		document.body.setAttribute('data-theme', themeName);

		// Update active state in theme modal
		document.querySelectorAll('.theme-card').forEach((card) => {
			card.classList.toggle('active', card.dataset.theme === themeName);
		});

		// Save to localStorage for persistence
		localStorage.setItem('selectedTheme', themeName);

		showNotification('Theme updated! 🎨', 'success');
	} catch (error) {
		console.error('Error updating theme:', error);
		showNotification('Error updating theme', 'error');
	}
}

// Load saved theme on startup
function loadSavedTheme() {
	// Check for saved theme in localStorage
	const savedTheme = localStorage.getItem('selectedTheme');
	// Set cosmic as default if no theme is saved
	const themeToApply = savedTheme || 'cosmic';
	document.body.setAttribute('data-theme', themeToApply);

	// Update theme in user settings if logged in
	const currentUser = auth.currentUser;
	if (currentUser) {
		getDoc(doc(db, 'users', currentUser.uid))
			.then((userDoc) => {
				if (userDoc.exists() && !userDoc.data().theme) {
					updateDoc(doc(db, 'users', currentUser.uid), {
						theme: themeToApply,
					});
				}
			})
			.catch((error) => {
				console.error('Error checking user theme:', error);
			});
	}
}

// Invite System
function showInviteModal() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.id = 'invite-modal';

    const inviteCode = document.getElementById('invite-code-text').textContent;

    const content = `
        <div class="modal-content invite-modal-content">
            <div class="modal-header">
                <h3 class="modal-title">✨ Share Your Special Space ✨</h3>
                <button class="close-btn" onclick="closeModal('invite-modal')">&times;</button>
            </div>
            <div class="invite-content">
                <div class="invite-illustration">
                    <div class="envelope">
                        <div class="envelope-heart">💌</div>
                    </div>
                </div>
                <div class="invite-section">
                    <h4>Invite Code</h4>
                    <div class="invite-code-display">
                        <span id="invite-code-display">${inviteCode}</span>
                        <button class="copy-btn" onclick="copyInviteCode()">
                            <span class="copy-icon">📋</span>
                            <span class="copy-text">Copy</span>
                        </button>
                    </div>
                </div>
                <div class="invite-section">
                    <h4>Send Email Invitation</h4>
                    <form id="email-invite-form" class="email-invite-form">
                        <div class="form-group">
                            <input 
                                type="email" 
                                id="invite-email" 
                                placeholder="Enter email address"
                                required
                            >
                            <button type="submit" class="btn btn-primary">
                                <span>Send Invitation</span>
                                <span class="button-loader" style="display: none;"></span>
                            </button>
                        </div>
                    </form>
                </div>
                <div class="invite-section">
                    <h4>Pending Invitations</h4>
                    <div id="pending-invites" class="pending-invites">
                        <!-- Pending invites will be inserted here -->
                        <div class="no-invites-message">
                            No pending invitations
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;

    modal.innerHTML = content;

    // Add styles
    const style = document.createElement('style');
    style.textContent = `
        .invite-modal-content {
            max-width: 500px;
            background: rgba(255, 255, 255, 0.95);
            padding: 30px;
        }

        .invite-content {
            display: flex;
            flex-direction: column;
            gap: 25px;
        }

        .invite-illustration {
            text-align: center;
            margin: 20px 0;
        }

        .envelope {
            font-size: 4rem;
            animation: float 3s ease-in-out infinite;
        }

        @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
            100% { transform: translateY(0px); }
        }

        .invite-section {
            background: rgba(255, 255, 255, 0.1);
            border-radius: 15px;
            padding: 20px;
            border: 1px solid rgba(0, 0, 0, 0.1);
        }

        .invite-section h4 {
            margin: 0 0 15px 0;
            color: var(--text-primary);
            font-family: "Space Grotesk", sans-serif;
        }

        .invite-code-display {
            display: flex;
            align-items: center;
            gap: 10px;
            background: rgba(0, 0, 0, 0.05);
            padding: 12px;
            border-radius: 8px;
            font-family: monospace;
            font-size: 1.2rem;
        }

        .copy-btn {
            background: var(--secondary-gradient);
            color: white;
            border: none;
            padding: 8px 15px;
            border-radius: 20px;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 5px;
            transition: all 0.3s ease;
        }

        .copy-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .email-invite-form .form-group {
            display: flex;
            gap: 10px;
        }

        .email-invite-form input {
            flex: 1;
            padding: 12px;
            border: 1px solid rgba(0, 0, 0, 0.1);
            border-radius: 8px;
            font-size: 1rem;
            font-family: "Space Grotesk", sans-serif;
        }

        .email-invite-form .btn-primary {
            background: var(--secondary-gradient);
            color: white;
            border: none;
            padding: 12px 24px;
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.3s ease;
            font-family: "Space Grotesk", sans-serif;
            font-size: 1rem;
        }

        .email-invite-form .btn-primary:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        .pending-invites {
            max-height: 200px;
            overflow-y: auto;
        }

        .pending-invite {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px;
            border-bottom: 1px solid rgba(0, 0, 0, 0.1);
        }

        .invite-status {
            background: rgba(var(--primary-rgb), 0.1);
            color: var(--primary);
            padding: 4px 8px;
            border-radius: 12px;
            font-size: 0.8rem;
        }

        .no-invites-message {
            text-align: center;
            padding: 20px;
            color: var(--text-secondary);
            font-style: italic;
        }

        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }

        .pending-invite {
            animation: fadeIn 0.3s ease-out forwards;
        }
    `;

    document.head.appendChild(style);
    document.body.appendChild(modal);
    
    // Show the modal
    setTimeout(() => openModal('invite-modal'), 10);

    // Load pending invitations
    loadPendingInvitations();
}

function showJoinModal() {
	openModal('join-modal');
}

document.getElementById('join-form').addEventListener('submit', async (e) => {
	const currentUser = $currentUser.get();

	e.preventDefault();

	const inviteCode = document
		.getElementById('join-code')
		.value.toUpperCase()
		.trim();

	try {
		showButtonLoading(e.target.querySelector('button[type="submit"]'), true);

		// Find workspace with this invite code
		const workspaces = await getDocs(
			query(
				collection(db, 'workspaces'),
				where('inviteCode', '==', inviteCode),
			),
		);

		if (workspaces.empty) {
			showNotification('Invalid invite code', 'error');
			return;
		}

		const workspaceDoc = workspaces.docs[0];
		const workspaceData = workspaceDoc.data();

		// Check if already a member
		if (workspaceData.members.includes(currentUser.uid)) {
			showNotification('You are already a member of this workspace', 'error');
			return;
		}

		// Add user to workspace
		await updateDoc(doc(db, 'workspaces', workspaceDoc.id), {
			members: [...workspaceData.members, currentUser.uid],
		});

		// Update user document
		await setDoc(doc(db, 'users', currentUser.uid), {
			displayName: currentUser.displayName || currentUser.email,
			email: currentUser.email,
			workspaceId: workspaceDoc.id,
			joinedAt: serverTimestamp(),
		});

		currentWorkspace = workspaceDoc.id;
		await loadWorkspace();

		closeModal('join-modal');
		showNotification('Successfully joined workspace!', 'success');
	} catch (error) {
		console.error('Error joining workspace:', error);
		showNotification('Error joining workspace', 'error');
	} finally {
		showButtonLoading(e.target.querySelector('button[type="submit"]'), false);
	}
});

function copyInviteCode() {
    const codeText = document.getElementById('invite-code-display').textContent;
    navigator.clipboard
        .writeText(codeText)
        .then(() => {
            showNotification('Invite code copied! 📋', 'success');
            
            // Visual feedback on button
            const copyBtn = document.querySelector('.copy-btn');
            if (copyBtn) {
                const originalText = copyBtn.innerHTML;
                copyBtn.innerHTML = '<span class="copy-icon">✓</span><span class="copy-text">Copied!</span>';
                copyBtn.style.background = 'var(--success-gradient)';
                
                setTimeout(() => {
                    copyBtn.innerHTML = originalText;
                    copyBtn.style.background = 'var(--secondary-gradient)';
                }, 2000);
            }
        })
        .catch(() => {
            showNotification('Failed to copy code', 'error');
        });
}

async function loadPendingInvitations() {
    const pendingInvites = document.getElementById('pending-invites');
    if (!pendingInvites) return;

    try {
        const invitesQuery = query(
            collection(db, 'invitations'),
            where('workspaceId', '==', currentWorkspace),
            where('status', '==', 'pending'),
            orderBy('createdAt', 'desc')
        );

        const snapshot = await getDocs(invitesQuery);

        if (snapshot.empty) {
            pendingInvites.innerHTML = `
                <div class="no-invites-message">
                    No pending invitations
                </div>
            `;
            return;
        }

        pendingInvites.innerHTML = '';
        snapshot.forEach(doc => {
            const invite = doc.data();
            const inviteElement = document.createElement('div');
            inviteElement.className = 'pending-invite';
            inviteElement.innerHTML = `
                <span class="invite-email">${invite.email}</span>
                <span class="invite-status">Pending</span>
                <span class="invite-date">${formatDate(invite.createdAt?.toDate())}</span>
            `;
            pendingInvites.appendChild(inviteElement);
        });

    } catch (error) {
        console.error('Error loading pending invitations:', error);
        pendingInvites.innerHTML = `
            <div class="error-message">
                Error loading invitations
            </div>
        `;
    }
}

function formatDate(date) {
    if (!date) return 'Just now';
    
    const now = new Date();
    const diff = now - date;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor(diff / (1000 * 60));

    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return 'Just now';
}

// Email invitation with Firebase
document
    .getElementById('email-invite-form')
    .addEventListener('submit', async (e) => {
        e.preventDefault();
        const emailInput = document.getElementById('invite-email');
        const email = emailInput.value.trim();
        const inviteCode = document.getElementById('invite-code-text').textContent;
        const currentUser = $currentUser.get();
        const button = e.target.querySelector('button[type="submit"]');

        if (!email) {
            showNotification('Please enter an email address', 'error');
            return;
        }

        try {
            showButtonLoading(button, true);

            // Get workspace details for the invitation
            const workspaceDoc = await getDoc(doc(db, 'workspaces', currentWorkspace));
            const workspaceData = workspaceDoc.data();

            // Create invitation record in Firebase
            const inviteData = {
                email: email,
                inviteCode: inviteCode,
                workspaceId: currentWorkspace,
                workspaceName: workspaceData.name,
                invitedBy: currentUser.uid,
                invitedByName: currentUser.displayName || currentUser.email,
                status: 'pending',
                createdAt: serverTimestamp(),
                expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days expiry
            };

            await addDoc(collection(db, 'invitations'), inviteData);

            // Send email using Firebase Cloud Functions (you'll need to set this up)
            const sendEmailFunction = httpsCallable(functions, 'sendInviteEmail');
            await sendEmailFunction({
                to: email,
                inviteCode: inviteCode,
                workspaceName: workspaceData.name,
                invitedByName: currentUser.displayName || currentUser.email
            });

            // Clear input and show success message
            emailInput.value = '';
            showNotification('Invitation sent successfully! 💌', 'success');

            // Update UI to show pending invitation
            const pendingInvites = document.getElementById('pending-invites');
            if (pendingInvites) {
                const inviteElement = document.createElement('div');
                inviteElement.className = 'pending-invite';
                inviteElement.innerHTML = `
                    <span class="invite-email">${email}</span>
                    <span class="invite-status">Pending</span>
                    <span class="invite-date">Just now</span>
                `;
                pendingInvites.insertBefore(inviteElement, pendingInvites.firstChild);
            }

        } catch (error) {
            console.error('Error sending invitation:', error);
            showNotification('Failed to send invitation. Please try again.', 'error');
        } finally {
            showButtonLoading(button, false);
        }
    });

// Utility Functions
function generateInviteCode() {
	return Math.random().toString(36).substr(2, 6).toUpperCase();
}

function updateUserAvatar() {
	const currentUser = $currentUser.get();
	const avatar = document.getElementById('current-user-avatar');
	if (currentUser.displayName) {
		avatar.textContent = currentUser.displayName.charAt(0).toUpperCase();
	} else if (currentUser.email) {
		avatar.textContent = currentUser.email.charAt(0).toUpperCase();
	}

	// Make avatar clickable to open settings
	avatar.style.cursor = 'pointer';
	avatar.onclick = () => openSettings();
}

async function openSettings() {
	const currentUser = $currentUser.get();
	if (!currentUser) return;

	try {
		// Fetch user data
		const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
		const userData = userDoc.data();

		if (userData) {
			document.getElementById('settings-name').value =
				userData.displayName || currentUser.displayName || '';
			document.getElementById('settings-birthday').value =
				userData.birthday || '';
			document.getElementById('settings-bio').value = userData.bio || '';
		}

		openModal('settingsModal');
	} catch (error) {
		console.error('Error loading settings:', error);
		showNotification('Error loading settings', 'error');
	}
}

// Theme switching
document.querySelectorAll('.theme-card').forEach((card) => {
	card.addEventListener('click', async () => {
		const theme = card.dataset.theme;
		const currentUser = $currentUser.get();

		try {
			// Update theme in database
			await updateDoc(doc(db, 'users', currentUser.uid), {
				theme: theme,
			});

			// Update UI
			document.body.setAttribute('data-theme', theme);
			document
				.querySelectorAll('.theme-card')
				.forEach((c) => c.classList.remove('active'));
			card.classList.add('active');

			showNotification('Theme updated! 🎨', 'success');
		} catch (error) {
			console.error('Error updating theme:', error);
			showNotification('Error updating theme', 'error');
		}
	});
});

function showMembersModal() {
	openModal('membersModal');
	renderMembersList();
}

async function renderMembersList() {
	const membersList = document.getElementById('membersList');
	membersList.innerHTML = '';

	try {
		// Get current workspace data
		const workspaceDoc = await getDoc(doc(db, 'workspaces', currentWorkspace));
		const workspaceData = workspaceDoc.data();

		// Get member details
		const memberPromises = workspaceData.members.map(async (memberId) => {
			const memberDoc = await getDoc(doc(db, 'users', memberId));
			return {
				id: memberId,
				...memberDoc.data(),
			};
		});

		const members = await Promise.all(memberPromises);
		const isOwner = workspaceData.createdBy === auth.currentUser.uid;

		members.forEach((member) => {
			const initials = member.displayName
				? member.displayName
						.split(' ')
						.map((n) => n[0])
						.join('')
						.toUpperCase()
				: member.email[0].toUpperCase();

			const memberItem = document.createElement('div');
			memberItem.className = 'member-item';
			memberItem.innerHTML = `
                <div class="member-info">
                    <div class="member-avatar">${initials}</div>
                    <div class="member-details">
                        <h4>${member.displayName || member.email}</h4>
                        <p>${member.email}</p>
                    </div>
                </div>
                ${
									isOwner && member.id !== auth.currentUser.uid
										? `<button class="remove-member-btn" onclick="removeMember('${member.id}')">
                        Remove
                    </button>`
										: ''
								}
            `;

			membersList.appendChild(memberItem);
		});
	} catch (error) {
		console.error('Error rendering members:', error);
		showNotification('Error loading members', 'error');
	}
}

async function removeMember(memberId) {
	try {
		const workspaceDoc = await getDoc(doc(db, 'workspaces', currentWorkspace));

		if (!workspaceDoc.exists()) {
			throw new Error('Workspace not found');
		}

		if (workspaceDoc.data().createdBy !== auth.currentUser.uid) {
			throw new Error('Only workspace owner can remove members');
		}

		// Remove member from workspace
		await updateDoc(doc(db, 'workspaces', currentWorkspace), {
			members: workspaceDoc.data().members.filter((id) => id !== memberId),
		});

		// Clear workspace ID from removed user's document
		await updateDoc(doc(db, 'users', memberId), {
			workspaceId: null,
		});

		showNotification('Member removed successfully', 'success');
		renderMembersList(); // Refresh the list
	} catch (error) {
		console.error('Error removing member:', error);
		showNotification('Error removing member', 'error');
	}
}

// Profile settings form
document
	.getElementById('profile-settings-form')
	.addEventListener('submit', async (e) => {
		e.preventDefault();
		const currentUser = $currentUser.get();
		const button = e.target.querySelector('button');

		try {
			showButtonLoading(button, true);

			const profileData = {
				displayName: document.getElementById('settings-name').value,
				birthday: document.getElementById('settings-birthday').value,
				bio: document.getElementById('settings-bio').value,
				updatedAt: serverTimestamp(),
			};

			await updateProfile(currentUser, {
				displayName: profileData.displayName,
			});
			await updateDoc(doc(db, 'users', currentUser.uid), profileData);

			// Update displayed name and avatar
			const userAvatar = document.getElementById('current-user-avatar');
			if (userAvatar) {
				const displayName = profileData.displayName || currentUser.displayName || 'U';
				userAvatar.textContent = displayName.charAt(0).toUpperCase();
			}
			closeModal('settingsModal');
			showNotification('Profile updated successfully! 👤', 'success');
			updateUserAvatar();
		} catch (error) {
			console.error('Error updating profile:', error);
			showNotification('Error updating profile', 'error');
		} finally {
			showButtonLoading(button, false);
		}
	});

function getErrorMessage(error) {
	switch (error.code) {
		case 'auth/user-not-found':
			return 'No account found with this email';
		case 'auth/wrong-password':
			return 'Incorrect password';
		case 'auth/email-already-in-use':
			return 'Email already in use';
		case 'auth/weak-password':
			return 'Password should be at least 6 characters';
		case 'auth/invalid-email':
			return 'Invalid email address';
		case 'auth/popup-closed-by-user':
			return 'Sign-in popup was closed';
		case 'permission-denied':
			return 'Permission denied. Please check Firebase security rules.';
		default:
			return error.message || 'An error occurred';
	}
}

function showButtonLoading(button, loading) {
	const text = button.querySelector('span:not(.button-loader)');
	const loader = button.querySelector('.button-loader');

	if (loading) {
		button.disabled = true;
		if (text) text.style.display = 'none';
		if (loader) loader.style.display = 'inline-block';
	} else {
		button.disabled = false;
		if (text) text.style.display = 'inline';
		if (loader) loader.style.display = 'none';
	}
}

// Notification system
function showNotification(message, type = 'info') {
	const notification = document.createElement('div');
	notification.className = `notification ${type}`;
	notification.textContent = message;
	document.body.appendChild(notification);

	// Show notification
	setTimeout(() => {
		notification.classList.add('show');
	}, 100);

	// Hide and remove notification
	setTimeout(() => {
		notification.classList.remove('show');
		setTimeout(() => {
			if (document.body.contains(notification)) {
				document.body.removeChild(notification);
			}
		}, 300);
	}, 3000);
}

// Custom in-app notification system
function showCustomNotification(message, type = 'success', duration = 2000) {
	// Remove any existing custom notifications
	const existing = document.querySelector('.custom-notification');
	if (existing) {
		existing.remove();
	}

	const notification = document.createElement('div');
	notification.className = `custom-notification ${type}`;
	notification.textContent = message;
	document.body.appendChild(notification);

	// Show notification with animation
	setTimeout(() => {
		notification.classList.add('show');
	}, 10);

	// Hide notification after duration
	setTimeout(() => {
		notification.classList.add('hide');
		setTimeout(() => {
			if (document.body.contains(notification)) {
				document.body.removeChild(notification);
			}
		}, 400);
	}, duration);
}

// Click outside modal to close
document.addEventListener('click', (e) => {
	if (
		e.target.classList.contains('modal') &&
		!e.target.classList.contains('auth-modal')
	) {
		e.target.classList.remove('active');
	}
});

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
	if (e.key === 'Escape') {
		const activeModal = document.querySelector(
			'.modal.active:not(#auth-modal)',
		);
		if (activeModal) {
			activeModal.classList.remove('active');
		}
	}

	if (e.key === '1' && e.ctrlKey) {
		e.preventDefault();
		switchTab('calendar').catch(console.error);
	}

	if (e.key === '2' && e.ctrlKey) {
		e.preventDefault();
		switchTab('my-tasks').catch(console.error);
	}

	if (e.key === '3' && e.ctrlKey) {
		e.preventDefault();
		switchTab('partner-tasks').catch(console.error);
	}

	if (e.key === '4' && e.ctrlKey) {
		e.preventDefault();
		switchTab('shared-tasks').catch(console.error);
	}
});

// Fallback event listener for delete buttons
document.addEventListener('click', (e) => {
	if (e.target.classList.contains('delete-todo-btn')) {
		console.log('🎯 Fallback delete handler triggered!');
		console.log('🎯 Event target:', e.target);
		console.log('🎯 Event target classes:', e.target.classList);
		console.log('🎯 Event target data-todo-id:', e.target.dataset.todoId);
		e.stopPropagation();
		e.preventDefault();

		const todoId =
			e.target.dataset.todoId ||
			e.target.closest('[data-todo-id]')?.dataset.todoId;

		console.log('🎯 Extracted todoId:', todoId);
		if (todoId) {
			console.log('Fallback delete handler triggered for todo:', todoId);
			deleteTodo(todoId);
		} else {
			console.error('❌ Could not extract todoId from delete button');
		}
	}
});

// Touch/swipe support for mobile
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', (e) => {
	touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', (e) => {
	touchEndX = e.changedTouches[0].screenX;
	handleSwipe();
});

function handleSwipe() {
	const threshold = 50;
	const diff = touchStartX - touchEndX;

	if (Math.abs(diff) > threshold) {
		const activeTab = document.querySelector('.tab-btn.active');
		if (!activeTab) return;

		const activeTabText = activeTab.textContent.trim();

		if (diff > 0) {
			// Swipe left - next tab
			if (activeTabText.includes('Calendar')) {
				switchTab('my-tasks').catch(console.error);
			} else if (activeTabText.includes('My Tasks')) {
				switchTab('partner-tasks').catch(console.error);
			} else if (activeTabText.includes('Partner')) {
				switchTab('shared-tasks').catch(console.error);
			}
		} else {
			// Swipe right - previous tab
			if (activeTabText.includes('My Tasks')) {
				switchTab('calendar').catch(console.error);
			} else if (activeTabText.includes('Partner')) {
				switchTab('my-tasks').catch(console.error);
			} else if (activeTabText.includes('Shared')) {
				switchTab('partner-tasks').catch(console.error);
			}
		}
	}
}

// Connection status monitoring
function _updateConnectionStatus(status) {
	const statusEl = document.getElementById('connection-status');
	const statusText = document.getElementById('status-text');

	statusEl.className = `connection-status ${status}`;
	statusEl.style.display = 'block';

	switch (status) {
		case 'connected':
			statusText.textContent = 'Connected';
			setTimeout(() => {
				statusEl.style.display = 'none';
			}, 2000);
			break;
		case 'connecting':
			statusText.textContent = 'Connecting...';
			break;
		case 'error':
			statusText.textContent = 'Connection Error';
			break;
	}
}

// Auto-save functionality (for forms)
function setupAutoSave() {
	const inputs = document.querySelectorAll(
		'#eventForm input, #eventForm textarea, #todoForm input, #todoForm textarea',
	);

	inputs.forEach((input) => {
		let timeout;
		input.addEventListener('input', () => {
			clearTimeout(timeout);
			timeout = setTimeout(() => {
				// Auto-save to memory as backup
				const formData = {
					[input.id]: input.value,
					timestamp: Date.now(),
				};
				console.log('Auto-saved:', formData);
			}, 1000);
		});
	});
}

// Date validation function
function setupDateValidation() {
    const startDateInput = document.getElementById('eventStartDate');
    const endDateInput = document.getElementById('eventEndDate');

    if (!startDateInput || !endDateInput) return;

    function validateDates() {
        const startDate = new Date(startDateInput.value);
        const endDate = new Date(endDateInput.value);

        // Remove existing error messages
        const existingError = document.querySelector('.date-error');
        if (existingError) {
            existingError.remove();
        }

        // Remove error styling
        startDateInput.classList.remove('input-error');
        endDateInput.classList.remove('input-error');

        // Validate if both dates are provided
        if (startDateInput.value && endDateInput.value) {
            if (startDate > endDate) {
                startDateInput.classList.add('input-error');
                endDateInput.classList.add('input-error');

                // Add error message
                const errorDiv = document.createElement('div');
                errorDiv.className = 'date-error form-error';
                errorDiv.textContent = 'Start date cannot be after end date';
                endDateInput.parentNode.appendChild(errorDiv);
            }
        }
    }

    startDateInput.addEventListener('change', validateDates);
    endDateInput.addEventListener('change', validateDates);
}

// Initialize auto-save when app loads
document.addEventListener('DOMContentLoaded', setupAutoSave);

// Event Colors Management
let eventColors = {};
let colorsInitialized = false;

// Enhanced color initialization with promise-based loading
function initializeEventColors() {
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

// Helper function to wait for colors to be ready
function waitForColors(maxWaitMs = 3000) {
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

// Default colors for event categorization
const defaultEventColors = {
	user1: '#667eea', // My events - purple/blue
	user2: '#ff9a8b', // Partner's events - pink/coral
	shared: 'var(--secondary-gradient)'  // Shared events - theme gradient
};

// Colors are now initialized in window load listener
console.log('🎨 Event colors will be initialized on DOM load');

function showEventColorsModal() {
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

	openModal('eventColorsModal');

	console.log('🎨 Personal event colors modal opened successfully');
}

function openEventColorPicker(userType) {
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

function closeEventColorPicker() {
	const overlay = document.getElementById('color-picker-overlay');
	if (overlay) {
		overlay.classList.remove('active');
		setTimeout(() => overlay.remove(), 300);
	}
}

function applyEventColor(userType) {
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

function saveEventColors() {
	console.log('🎨 saveEventColors function called');

	const currentUser = $currentUser.get();
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
			generateCalendar(currentDate);
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

function cleanupSharedEventColors() {
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

function resetEventColors() {
	console.log('🔄 Resetting event colors to defaults');

	try {
		eventColors = {};
		localStorage.setItem('eventColors', JSON.stringify({}));
		console.log('✅ Event colors reset in localStorage');

		showEventColorsModal(); // Refresh the modal with defaults
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

// Function to map user IDs to event types for color determination
function getEventTypeForUser(event) {
	// If event is shared, use shared color
	if (event.shared) {
		return 'shared';
	}

	// If event is personal, map creator to appropriate user type
	const currentUser = $currentUser.get();
	if (!event.createdBy || !currentUser || !workspaceMembers || workspaceMembers.length === 0) {
		return 'user1'; // fallback
	}

	try {
		// Use stored workspace members to determine user type
		// For now, use first member as user1, second as user2
		const currentUserIndex = workspaceMembers.indexOf(currentUser.uid);
		const eventCreatorIndex = workspaceMembers.indexOf(event.createdBy);

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

// Function to get the color for a specific event type
function getEventColor(eventType) {
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

// Enhanced function to synchronize color updates across the app
function updateAllEventColors() {
	console.log('🔄 Synchronizing all event colors...');

	// Force refresh calendar with current colors
	if (typeof generateCalendar === 'function') {
		console.log('🔄 Regenerating calendar with updated colors');
		generateCalendar(currentDate);
	}

	// Update any open event modals or previews
	if (document.getElementById('eventColorsModal') && document.getElementById('eventColorsModal').classList.contains('active')) {
		console.log('🔄 Refreshing event colors modal');
		showEventColorsModal();
	}

	console.log('✅ Event colors synchronized');
}


// Enhanced Global Function Exposure System
(function enhanceGlobalFunctionExposure() {
    console.log('🚀 Enhancing global function exposure with safety controls...');

    // Core app initialization functions
    const coreFunctions = {
        showEventColorsModal,
        showThemeModal,
        setTheme,
        showMembersModal,
        showInviteModal,
        showJoinModal,
        openEventModal,
        openModal,
        closeModal,
        showNotification,
        getEventColor,
        getEventTypeForUser,
        generateCalendar,
        getEventsForDate,
        changeMonth,
        switchTab,
        openTodoModal,
        signOut,
        saveEventColors,
        resetEventColors,
        cleanupSharedEventColors,
        testSharedColorCustomization,
        applyEventColor,
        closeEventColorPicker,
        openEventColorPicker,
        deleteEvent,
        openEventDetails,
        toggleEventType
    };

    // Enhanced exposure with backup and overwrite protection
    Object.entries(coreFunctions).forEach(([functionName, functionRef]) => {
        // Store original placeholder function if exists
        if (window[functionName] && typeof window[functionName] !== 'function') {
            window[`_${functionName}Bak`] = window[functionName];
        }

        // Override placeholder with real function
        window[functionName] = functionRef;

        console.log(`✅ Enhanced global exposure: ${functionName}`);
    });

    // Dispatch multiple events to ensure all listeners are notified
    const eventNames = [
        'functionsReady',
        'appFunctionsReady',
        'scriptFunctionsLoaded',
        'modalFunctionsReady'
    ];

    eventNames.forEach(eventName => {
        setTimeout(() => {
            document.dispatchEvent(new CustomEvent(eventName, {
                detail: { functions: coreFunctions }
            }));
            console.log(`📡 Dispatched ${eventName} event`);
        }, 10);
    });

    console.log('🎉 All core functions successfully exposed globally with recovery mechanisms');
})();

// Application ready indicator
window.appReady = true;
console.log('🎯 Application functions fully loaded and ready');

// Force refresh colors when workspace loads
window.addEventListener('workspace-loaded', () => {
	console.log('🔄 Workspace loaded, ensuring color synchronization');
	setTimeout(() => {
		updateAllEventColors();
		// Generate calendar after colors are synced
		console.log('📅 Generating calendar after workspace loaded');
		generateCalendar(currentDate);
	}, 500);
});

// Test function to verify shared events use theme gradients
function testSharedColorCustomization() {
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
// Add newline for separation
// Event Type Toggle Functionality
async function toggleEventType(eventId) {
    console.log('🔄 toggleEventType called with eventId:', eventId);

    if (!eventId) {
        console.error('❌ No eventId provided to toggleEventType');
        return;
    }

    try {
        // Find the event in the global events array
        const eventIndex = events.findIndex(event => event.id === eventId);
        if (eventIndex === -1) {
            console.error('❌ Event not found in events array:', eventId);
            return;
        }

        const event = events[eventIndex];
        const wasShared = event.shared;
        const newShared = !wasShared;

        console.log(`🔄 Toggling event "${event.title}": ${wasShared ? 'Shared → Personal' : 'Personal → Shared'}`);

        // Immediate visual update - find the badge element
        const badgeElement = document.querySelector(`.shared-tag[data-event-id="${eventId}"], .personal-tag[data-event-id="${eventId}"]`);

        console.log('🔍 Looking for badge element with selector:', `.shared-tag[data-event-id="${eventId}"], .personal-tag[data-event-id="${eventId}"]`);
        console.log('🔍 Badge element found:', !!badgeElement);

        if (badgeElement) {
            console.log('🔍 Badge element details:', {
                tagName: badgeElement.tagName,
                className: badgeElement.className,
                dataEventId: badgeElement.dataset.eventId,
                textContent: badgeElement.textContent
            });
            // Add transition class for smooth animation
            badgeElement.classList.add('tag-transitioning');
            badgeElement.style.transition = 'all 0.3s ease';

            // Update the badge content immediately
            if (newShared) {
                badgeElement.className = 'shared-tag';
                badgeElement.textContent = '💑 Together';
                badgeElement.style.background = 'var(--secondary-gradient)';
            } else {
                badgeElement.className = 'personal-tag';
                badgeElement.textContent = '📝 Personal';
                badgeElement.style.background = '#FFFACD';
                badgeElement.style.color = '#8B4513';
                badgeElement.style.border = '1px solid #F0E68C';
            }

            // Remove transition class after animation
            setTimeout(() => {
                if (badgeElement) {
                    badgeElement.classList.remove('tag-transitioning');
                    console.log('🎨 Badge color verified:', {
                        isPersonal: badgeElement.classList.contains('personal-tag'),
                        isShared: badgeElement.classList.contains('shared-tag'),
                        backgroundColor: badgeElement.style.background,
                        textColor: badgeElement.style.color,
                        computedColor: getComputedStyle(badgeElement).color,
                        border: badgeElement.style.border
                    });
                }
            }, 300);
        } else {
            console.warn('⚠️ Badge element not found for immediate update');
        }

        // Update event in database
        console.log('🔧 Updating event in database...');
        await updateDoc(doc(db, 'events', eventId), {
            shared: newShared,
            updatedAt: serverTimestamp()
        });

        // Update local events array
        events[eventIndex].shared = newShared;
        console.log('✅ Event shared status updated in local array');

        // Show notification
        const eventType = newShared ? 'Together' : 'Personal';
        showNotification(`✨ Event changed to "${eventType}"`, 'success');

        // Regenerate calendar to reflect color changes
        console.log('🔄 Regenerating calendar with updated event type');
        setTimeout(() => {
            generateCalendar(currentDate);
        }, 100);

    } catch (error) {
        console.error('❌ Error toggling event type:', error);
        showNotification('Error updating event type', 'error');
    }
}

// Workspace Title Editing Functionality
function initializeWorkspaceTitleEditing() {
	console.log('🔧 Initializing workspace title editing functionality');

	const editBtn = document.getElementById('edit-workspace-name-btn');
	const workspaceTitle = document.getElementById('workspace-title');
	const workspaceContainer = document.querySelector('.workspace-title-container');

	if (!editBtn || !workspaceTitle || !workspaceContainer) {
		console.warn('⚠️ Necessary DOM elements not found for workspace editing');
		return;
	}

	// Add click event to edit button
	editBtn.addEventListener('click', startWorkspaceTitleEditing);

	console.log('✅ Workspace title editing initialized');
}

function startWorkspaceTitleEditing() {
	console.log('✏️ Starting workspace title editing');

	const workspaceTitle = document.getElementById('workspace-title');
	const editBtn = document.getElementById('edit-workspace-name-btn');
	const workspaceContainer = document.querySelector('.workspace-title-container');

	if (!workspaceTitle || !editBtn) return;

	// Store original values
	const originalHtml = workspaceTitle.innerHTML;
	const originalText = workspaceTitle.textContent.trim();

	// Hide edit button temporarily
	editBtn.style.display = 'none';

	// Create input element
	const input = document.createElement('input');
	input.type = 'text';
	input.value = originalText;
	input.className = 'workspace-edit-input';
	input.style.cssText = `
		font-family: var(--font-family-primary);
		font-size: 2rem;
		font-weight: 600;
		color: var(--text-primary);
		background: rgba(255, 255, 255, 0.1);
		border: 2px solid var(--secondary-gradient);
		border-radius: 8px;
		padding: 4px 8px;
		margin-bottom: 5px;
		min-width: 200px;
		transition: all 0.3s ease;
	`;

	input.focus();
	input.select(); // Auto select all text

	// Replace h1 with input
	workspaceTitle.innerHTML = '';
	workspaceTitle.appendChild(input);

	// Handle save (Enter key or click outside)
	function saveTitle(newTitle) {
		const trimmedTitle = newTitle.trim();

		if (!trimmedTitle) {
			showNotification('Workspace name cannot be empty', 'error');
			cancelEditing();
			return;
		}

		if (trimmedTitle.length > 100) {
			showNotification('Workspace name must be less than 100 characters', 'error');
			cancelEditing();
			return;
		}

		workspaceTitle.textContent = trimmedTitle;
		editBtn.style.display = 'flex';
		showNotification('Saving workspace name...', 'info');
		updateWorkspaceName(trimmedTitle);
	}

	// Handle cancel (Escape key)
	function cancelEditing() {
		workspaceTitle.innerHTML = originalHtml;
		editBtn.style.display = 'flex';
		showNotification('Edit cancelled', 'info');
	}

	// Input event handlers
	input.addEventListener('keydown', (e) => {
		if (e.key === 'Enter') {
			e.preventDefault();
			saveTitle(input.value);
		} else if (e.key === 'Escape') {
			e.preventDefault();
			cancelEditing();
		}
	});

	input.addEventListener('blur', () => {
		saveTitle(input.value);
	});

	// Prevent the workspace container from triggering other click events
	workspaceContainer.addEventListener('click', (e) => {
		e.stopPropagation();
	});

	console.log('✏️ Workspace title editing started');
}

async function updateWorkspaceName(newName) {
	console.log('💾 Updating workspace name to:', newName);

	try {
		const userDoc = await getDoc(doc(db, 'users', $currentUser.get().uid));
		const workspaceId = userDoc.data().workspaceId;

		// Update workspace document
		await updateDoc(doc(db, 'workspaces', workspaceId), {
			name: newName,
			updatedAt: serverTimestamp(),
		});

		// Update the UI immediately (already done in save function)
		console.log('✅ Workspace name updated successfully');
		showNotification('✨ Workspace name updated successfully!', 'success');

	} catch (error) {
		console.error('❌ Error updating workspace name:', error);
		showNotification('Error updating workspace name', 'error');

		// Restore original name on error
		const workspaceTitle = document.getElementById('workspace-title');
		if (workspaceTitle) {
			const originalTitle = await getOriginalWorkspaceName();
			workspaceTitle.textContent = originalTitle;
		}
	}
}

async function getOriginalWorkspaceName() {
	try {
		const userDoc = await getDoc(doc(db, 'users', $currentUser.get().uid));
		const workspaceId = userDoc.data().workspaceId;

		const workspaceDoc = await getDoc(doc(db, 'workspaces', workspaceId));
		return workspaceDoc.data().name;
	} catch (error) {
		console.error('Error getting original workspace name:', error);
		return 'Together'; // fallback
	}
}

// Initialize workspace title editing when workspace loads
document.addEventListener('DOMContentLoaded', () => {
	// Wait for workspace to be loaded before initializing editing
	setTimeout(() => {
		initializeWorkspaceTitleEditing();
	}, 1000); // Give time for workspace to load
});
