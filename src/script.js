// Firebase imports - these are loaded from the HTML
import { auth, db } from './lib/fb';

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

import { $todos, setTodos, $currentUser, setCurrentUser } from './lib/stores';

const currentDate = new Date();

// App State
// let currentUser = null;
let currentWorkspace = null;
let events = [];
// let todos = [];
let unsubscribeEvents = null;
let unsubscribeTodos = null;
let unsubscribeWorkspace = null;

$todos.subscribe((todos) => {
	renderTodos(todos);
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

window.addEventListener('load', () => {
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

    // Add event listener for form submission
    document.getElementById('profile-form').addEventListener('submit', async (e) => {
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
                updatedAt: serverTimestamp()
            };

            await updateProfile(currentUser, { displayName: profileData.displayName });
            await setDoc(doc(db, 'users', currentUser.uid), profileData, { merge: true });

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
		showNotification('Error checking workspace: ' + error.message, 'error');
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
			(doc) => {
				if (doc.exists()) {
					const workspace = doc.data();
					console.log('Workspace data loaded:', workspace);
					document.getElementById('workspace-title').textContent =
						workspace.name;
					document.getElementById('workspace-subtitle').textContent =
						`${workspace.members.length} member(s)`;
					document.body.setAttribute(
						'data-theme',
						workspace.theme || 'default',
					);

					// Update invite code
					document.getElementById('invite-code-text').textContent =
						workspace.inviteCode;

					// Update partner avatar if there are 2 members
					updatePartnerInfo(workspace.members);
				}
			},
		);

		setupEventListener();
		setupTodoListener();
		showMainApp();
		hideAuthModal();

		generateCalendar(currentDate);
		console.log('Workspace loaded successfully');
	} catch (error) {
		console.error('Error loading workspace:', error);
		showNotification('Error loading workspace: ' + error.message, 'error');
	}
}

function updatePartnerInfo(members) {
	const partnerAvatar = document.getElementById('partner-avatar');
	if (members.length > 1) {
		partnerAvatar.style.display = 'flex';
		partnerAvatar.classList.add('online');
		// In a real app, you'd fetch partner info here
	} else {
		partnerAvatar.style.display = 'none';
	}
}

// Real-time Event Listener
function setupEventListener() {
	const eventsQuery = query(
		collection(db, 'events'),
		where('workspaceId', '==', currentWorkspace),
		orderBy('date', 'asc'),
	);

	unsubscribeEvents = onSnapshot(eventsQuery, (snapshot) => {
		events = snapshot.docs.map((doc) => ({
			id: doc.id,
			...doc.data(),
		}));

		if (
			!document.getElementById('calendar-view').classList.contains('hidden')
		) {
			generateCalendar(currentDate);
		}
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
		let _todos = snapshot.docs.map((doc) => ({
			id: doc.id,
			...doc.data(),
		}));

		setTodos(_todos);
	});
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
        
        if (year === today.getFullYear() && month === today.getMonth() && day === today.getDate()) {
            dayElement.classList.add('today');
        }

        dayElement.innerHTML = `
            <div class="day-number">${day}</div>
            <div class="day-events"></div>
        `;

        dayElement.addEventListener('click', (e) => {
            if (!e.target.classList.contains('event-pill') && !e.target.classList.contains('event-span')) {
                openEventModal(currentDateStr);
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
        calendarDays.push(dayElement);
    }

    // Add all days to the grid
    calendarDays.forEach(day => grid.appendChild(day));

    // Render single-day events
    events.forEach(event => {
        if (!event.endDate || event.startDate === event.endDate) {
            const dayElement = grid.querySelector(`[data-date="${event.startDate}"]`);
            if (dayElement) {
                const eventsContainer = dayElement.querySelector('.day-events');
                const eventElement = document.createElement('div');
                eventElement.className = `event-pill ${event.shared ? 'shared' : ''} ${event.attachmentUrl ? 'has-attachment' : ''}`;
                eventElement.textContent = event.title;
                eventElement.onclick = () => openEventDetails(event.id);
                eventsContainer.appendChild(eventElement);
            }
        }
    });

    // Render multi-day events
    events.filter(event => event.endDate && event.startDate !== event.endDate).forEach(event => {
        const startDate = new Date(event.startDate);
        const endDate = new Date(event.endDate);
        
        let currentDate = new Date(startDate);
        let weekStart = null;
        let weekEnd = null;
        let currentWeekSpan = null;

        while (currentDate <= endDate) {
            const dateStr = currentDate.toISOString().split('T')[0];
            const dayElement = grid.querySelector(`[data-date="${dateStr}"]`);
            
            if (dayElement) {
                const dayIndex = Array.from(grid.children).indexOf(dayElement) - 7; // Subtract header row
                const weekIndex = Math.floor(dayIndex / 7);
                
                if (weekStart === null) {
                    weekStart = dayIndex;
                    weekEnd = weekStart + (6 - (weekStart % 7));
                    
                    currentWeekSpan = document.createElement('div');
                    currentWeekSpan.className = `event-span ${event.shared ? 'shared' : ''} start`;
                    currentWeekSpan.style.top = `${30 + (weekIndex * 80)}px`; // Adjust based on your calendar cell height
                    currentWeekSpan.textContent = event.title;
                    currentWeekSpan.onclick = () => openEventDetails(event.id);
                    grid.appendChild(currentWeekSpan);
                }
                
                // If we've reached the end of the week or the end date
                if (dayIndex === weekEnd || dateStr === event.endDate) {
                    currentWeekSpan.style.left = `${(weekStart % 7) * 14.28}%`;
                    currentWeekSpan.style.width = `${((dayIndex - weekStart + 1) * 14.28)}%`;
                    if (dateStr === event.endDate) currentWeekSpan.classList.add('end');
                    
                    weekStart = null;
                    currentWeekSpan = null;
                }
            }
            
            currentDate.setDate(currentDate.getDate() + 1);
        }
    });
}

function changeMonth(direction) {
	currentDate.setMonth(currentDate.getMonth() + direction);
	generateCalendar(currentDate);
}

// Tab Switching
function switchTab(tab) {
    const calendarView = document.getElementById('calendar-view');
    const todoView = document.getElementById('todo-view');
    const sharedView = document.getElementById('shared-view');
    const tabBtns = document.querySelectorAll('.tab-btn');

    // Remove active class from all views and tabs
    calendarView.classList.add('hidden');
    todoView.classList.remove('active');
    sharedView.classList.remove('active');
    tabBtns.forEach((btn) => btn.classList.remove('active'));

    // Activate the selected tab
    switch(tab) {
        case 'calendar':
            calendarView.classList.remove('hidden');
            tabBtns[0].classList.add('active');
            break;
        case 'todo':
            todoView.classList.add('active');
            tabBtns[1].classList.add('active');
            break;
        case 'shared':
            sharedView.classList.add('active');
            tabBtns[2].classList.add('active');
            break;
    }
}

// Modal Functions
function openModal(modalId) {
	document.getElementById(modalId).classList.add('active');
}

function closeModal(modalId) {
	document.getElementById(modalId).classList.remove('active');

	// Reset forms
	const modal = document.getElementById(modalId);
	const forms = modal.querySelectorAll('form');
	forms.forEach((form) => form.reset());

	// Clear file inputs
	const fileInputs = modal.querySelectorAll('input[type="file"]');
	fileInputs.forEach((input) => {
		input.value = '';
	});
}

function openEventModal(selectedDate = null) {
    if (selectedDate) {
        document.getElementById('eventStartDate').value = selectedDate;
        document.getElementById('eventEndDate').value = selectedDate;
    }
    document.getElementById('event-modal-title').textContent = 'Add Event';
    // Clear form fields
    document.getElementById('eventTitle').value = '';
    document.getElementById('eventStartDate').value = selectedDate || '';
    document.getElementById('eventEndDate').value = selectedDate || '';
    document.getElementById('eventTime').value = '';
    document.getElementById('eventLocation').value = '';
    document.getElementById('eventNotes').value = '';
    document.getElementById('eventShared').checked = true;
    document.getElementById('isMultiDay').checked = false;
    openModal('eventModal');
}

function openTodoModal(assignee = null) {
	if (assignee) {
		document.getElementById('todoAssignee').value =
			assignee === 'user1' ? $currentUser.get()?.uid : 'shared';
	}
	openModal('todoModal');
}

function openEventDetails(eventId) {
	const event = events.find((e) => e.id === eventId);
	if (event) {
		// Fill form with event data for editing
		document.getElementById('eventTitle').value = event.title;
		document.getElementById('eventDate').value = event.date;
		document.getElementById('eventTime').value = event.time || '';
		document.getElementById('eventLocation').value = event.location || '';
		document.getElementById('eventNotes').value = event.notes || '';
		document.getElementById('eventShared').checked = event.shared;
		document.getElementById('event-modal-title').textContent = 'Edit Event';

		// Store event ID for updating
		document.getElementById('eventForm').dataset.editingId = eventId;

		openModal('eventModal');
	}
}

// Event Form Handler
// addEvent
document.getElementById('eventForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const currentUser = $currentUser.get();
    const button = e.target.querySelector('button[type="submit"]');

    try {
        showButtonLoading(button, true);
        const eventData = {
            title: document.getElementById('eventTitle').value,
            startDate: document.getElementById('eventStartDate').value,
            endDate: document.getElementById('isMultiDay').checked ? document.getElementById('eventEndDate').value : document.getElementById('eventStartDate').value,
            time: document.getElementById('eventTime').value,
            location: document.getElementById('eventLocation').value,
            notes: document.getElementById('eventNotes').value,
            shared: document.getElementById('eventShared').checked,
            workspaceId: currentWorkspace,
            createdBy: currentUser.uid,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
        };

        const editingId = e.target.dataset.editingId;

        if (editingId) {
            // Update existing event
            await updateDoc(doc(db, 'events', editingId), eventData);
            showNotification('Event updated!', 'success');
        } else {
            // Create new event
            const docRef = await addDoc(collection(db, 'events'), eventData);
            showNotification('Event created!', 'success');
        }

        closeModal('eventModal');
        delete e.target.dataset.editingId;
    } catch (error) {
        console.error('Error saving event:', error);
        showNotification('Error saving event', 'error');
    } finally {
        showButtonLoading(button, false);
    }

	try {
		showButtonLoading(e.target.querySelector('button[type="submit"]'), true);

		const editingId = e.target.dataset.editingId;

		if (editingId) {
			// Update existing event
			await updateDoc(doc(db, 'events', editingId), eventData);
			showNotification('Event updated!', 'success');
		} else {
			// Create new event
			eventData.createdAt = serverTimestamp();
			await addDoc(collection(db, 'events'), eventData);
			showNotification('Event created!', 'success');
		}

		closeModal('eventModal');
		delete e.target.dataset.editingId;
	} catch (error) {
		console.error('Error saving event:', error);
		showNotification('Error saving event', 'error');
	} finally {
		showButtonLoading(e.target.querySelector('button[type="submit"]'), false);
	}
});

// Todo Form Handler
// addTodo
document.getElementById('todoForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const currentUser = $currentUser.get();

    if (!currentUser) {
        showNotification('Please log in to add tasks', 'error');
        return;
    }

    const todoData = {
        title: document.getElementById('todoTitle').value,
        dueDate: document.getElementById('todoDueDate').value,
        notes: document.getElementById('todoNotes').value,
        assignee: document.getElementById('todoAssignee').value,
        completed: false,
        workspaceId: currentWorkspace,
        createdBy: currentUser.uid,
        createdAt: serverTimestamp(),
    };

    try {
        const button = e.target.querySelector('button[type="submit"]');
        showButtonLoading(button, true);

        const docRef = await addDoc(collection(db, 'todos'), todoData);
        
        // Create and animate the new task element
        const todoElement = createTodoElement({ ...todoData, id: docRef.id });
        todoElement.style.opacity = '0';
        todoElement.style.transform = 'translateY(20px)';
        
        // Add to appropriate container
        const container = todoData.assignee === 'shared' 
            ? document.getElementById('shared-todos')
            : (todoData.assignee === currentUser.uid 
                ? document.getElementById('user1-todos')
                : document.getElementById('user2-todos'));
        
        if (container) {
            container.insertBefore(todoElement, container.firstChild);
            // Trigger animation
            requestAnimationFrame(() => {
                todoElement.style.transition = 'all 0.3s ease';
                todoElement.style.opacity = '1';
                todoElement.style.transform = 'translateY(0)';
            });
        }

        showNotification('Task created! 🎉', 'success');
        closeModal('todoModal');
        updateProgress(); // Update progress bar
    } catch (error) {
        console.error('Error saving todo:', error);
        showNotification('Error saving task', 'error');
    } finally {
        showButtonLoading(e.target.querySelector('button[type="submit"]'), false);
    }
});

// Todo Functions
function updateProgress() {
    const todos = $todos.get();
    const totalTasks = todos.length;
    const completedTasks = todos.filter(todo => todo.completed).length;
    const progressPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

    const progressFill = document.querySelector('.progress-fill');
    const progressText = document.querySelector('.progress-text');
    
    if (progressFill && progressText) {
        // Animate the progress bar
        progressFill.style.transition = 'width 0.6s ease-in-out';
        progressFill.style.width = `${progressPercentage}%`;
        progressText.textContent = `${progressPercentage}% Complete (${completedTasks}/${totalTasks} tasks)`;
    }
}

function renderTodos(todos) {
    const currentUser = $currentUser.get();
    console.log('Rendering todos for user:', currentUser?.uid);

    const user1Container = document.getElementById('user1-todos');
    const user2Container = document.getElementById('user2-todos');
    const sharedContainer = document.getElementById('shared-todos');

    user1Container.innerHTML = '';
    user2Container.innerHTML = '';
    sharedContainer.innerHTML = '';

    // Update section titles with the new font
    document.getElementById('user1-todos-title').textContent = 'My Tasks';
    document.getElementById('user2-todos-title').textContent = 'Partner\'s Tasks';

    // Update progress bar
    updateProgress();

    // Calculate progress
    const totalTasks = todos.length;
    const completedTasks = todos.filter(todo => todo.completed).length;
    const progressPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

    // Update progress bar
    const progressFill = document.querySelector('.progress-fill');
    const progressText = document.querySelector('.progress-text');
    
    progressFill.style.width = `${progressPercentage}%`;
    progressText.textContent = `${progressPercentage}% Complete (${completedTasks}/${totalTasks} tasks)`;

    todos.forEach((todo) => {
        const todoElement = createTodoElement(todo);

        if (todo.assignee === currentUser.uid || todo.assignee === 'user1') {
            user1Container.appendChild(todoElement.cloneNode(true));
        } else if (todo.assignee === 'shared') {
            sharedContainer.appendChild(todoElement.cloneNode(true));
        } else {
            user2Container.appendChild(todoElement.cloneNode(true));
        }
    });
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

    const deleteButtonHtml = todo.completed 
        ? `<button class="delete-todo-btn" onclick="deleteTodo('${todo.id}')">Delete</button>`
        : '';

    div.innerHTML = `
        <div class="todo-checkbox ${todo.completed ? 'checked' : ''}" onclick="toggleTodo('${todo.id}')"></div>
        <div class="todo-text ${todo.completed ? 'completed' : ''}">
            <strong>${todo.title}</strong>
            ${todo.notes ? `<div class="todo-meta">${todo.notes}</div>` : ''}
            ${dueDateHtml}
            ${attachmentHtml}
            ${deleteButtonHtml}
        </div>
    `;
    return div;
}

async function toggleTodo(todoId) {
    const todo = $todos.get().find((t) => t.id === todoId);
    if (todo) {
        try {
            const todoElements = document.querySelectorAll(`[data-todo-id="${todoId}"]`);
            
            // Animate completion
            todoElements.forEach(element => {
                element.classList.add('completing');
            });

            // Wait for animation
            await new Promise(resolve => setTimeout(resolve, 500));

            // Update the todo
            await updateDoc(doc(db, 'todos', todoId), {
                completed: !todo.completed,
                updatedAt: serverTimestamp(),
            });

            // If completing the todo, add delete button
            if (!todo.completed) {
                todoElements.forEach(element => {
                    const todoText = element.querySelector('.todo-text');
                    const deleteBtn = document.createElement('button');
                    deleteBtn.className = 'delete-todo-btn';
                    deleteBtn.innerHTML = 'Delete';
                    deleteBtn.onclick = () => deleteTodo(todoId);
                    todoText.appendChild(deleteBtn);
                });
            }

            if (!todo.completed) {
                showNotification('Task completed! 🎉', 'success');
            }
        } catch (error) {
            console.error('Error updating todo:', error);
            showNotification('Error updating task', 'error');
        }
    }
}

async function deleteTodo(todoId) {
    try {
        const todoElements = document.querySelectorAll(`[data-todo-id="${todoId}"]`);
        
        // Animate removal
        todoElements.forEach(element => {
            element.classList.add('removing');
        });

        // Wait for animation
        await new Promise(resolve => setTimeout(resolve, 500));

        // Delete from database
        await deleteDoc(doc(db, 'todos', todoId));
        showNotification('Task deleted', 'success');

        // Update progress
        updateProgress();
    } catch (error) {
        console.error('Error deleting todo:', error);
        showNotification('Error deleting task', 'error');
    }
}

function showThemeModal() {
    openModal('themeModal');
}

async function setTheme(themeName) {
    const currentUser = $currentUser.get();
    if (!currentUser) return;

    try {
        // Update theme in database
        await updateDoc(doc(db, 'users', currentUser.uid), {
            theme: themeName
        });

        // Update UI
        document.body.setAttribute('data-theme', themeName);
        
        // Update active state in theme modal
        document.querySelectorAll('.theme-card').forEach(card => {
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
    const savedTheme = localStorage.getItem('selectedTheme');
    if (savedTheme) {
        document.body.setAttribute('data-theme', savedTheme);
    }
}

// Invite System
function showInviteModal() {
	openModal('invite-modal');
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
	const codeText = document.getElementById('invite-code-text').textContent;
	navigator.clipboard
		.writeText(codeText)
		.then(() => {
			showNotification('Invite code copied!', 'success');
		})
		.catch(() => {
			showNotification('Failed to copy code', 'error');
		});
}

// Email invitation (simplified - you'd integrate with an email service)
document
	.getElementById('email-invite-form')
	.addEventListener('submit', async (e) => {
		e.preventDefault();

		const email = document.getElementById('invite-email').value;
		const inviteCode = document.getElementById('invite-code-text').textContent;

		// In a real app, you'd send this via an email service
		showNotification(
			`Invite would be sent to ${email} with code: ${inviteCode}`,
			'success',
		);
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
            document.getElementById('settings-name').value = userData.displayName || currentUser.displayName || '';
            document.getElementById('settings-birthday').value = userData.birthday || '';
            document.getElementById('settings-bio').value = userData.bio || '';
        }

        // Set active theme
        const themeCards = document.querySelectorAll('.theme-card');
        themeCards.forEach(card => {
            card.classList.remove('active');
            if (card.dataset.theme === (userData?.theme || 'default')) {
                card.classList.add('active');
            }
        });

        openModal('settingsModal');
    } catch (error) {
        console.error('Error loading settings:', error);
        showNotification('Error loading settings', 'error');
    }
}

// Theme switching
document.querySelectorAll('.theme-card').forEach(card => {
    card.addEventListener('click', async () => {
        const theme = card.dataset.theme;
        const currentUser = $currentUser.get();
        
        try {
            // Update theme in database
            await updateDoc(doc(db, 'users', currentUser.uid), {
                theme: theme
            });

            // Update UI
            document.body.setAttribute('data-theme', theme);
            document.querySelectorAll('.theme-card').forEach(c => c.classList.remove('active'));
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
        const memberPromises = workspaceData.members.map(async memberId => {
            const memberDoc = await getDoc(doc(db, 'users', memberId));
            return {
                id: memberId,
                ...memberDoc.data()
            };
        });

        const members = await Promise.all(memberPromises);
        const isOwner = workspaceData.createdBy === auth.currentUser.uid;

        members.forEach(member => {
            const initials = member.displayName 
                ? member.displayName.split(' ').map(n => n[0]).join('').toUpperCase()
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
                ${isOwner && member.id !== auth.currentUser.uid ? 
                    `<button class="remove-member-btn" onclick="removeMember('${member.id}')">
                        Remove
                    </button>` : ''}
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
            members: workspaceDoc.data().members.filter(id => id !== memberId)
        });

        // Clear workspace ID from removed user's document
        await updateDoc(doc(db, 'users', memberId), {
            workspaceId: null
        });

        showNotification('Member removed successfully', 'success');
        renderMembersList(); // Refresh the list
    } catch (error) {
        console.error('Error removing member:', error);
        showNotification('Error removing member', 'error');
    }
}

// Profile settings form
document.getElementById('profile-settings-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const currentUser = $currentUser.get();
    const button = e.target.querySelector('button');
    
    try {
        showButtonLoading(button, true);
        
        const profileData = {
            displayName: document.getElementById('settings-name').value,
            birthday: document.getElementById('settings-birthday').value,
            bio: document.getElementById('settings-bio').value,
            updatedAt: serverTimestamp()
        };

        await updateProfile(currentUser, { displayName: profileData.displayName });
        await setDoc(doc(db, 'users', currentUser.uid), profileData, { merge: true });

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
		switchTab('calendar');
	}

	if (e.key === '2' && e.ctrlKey) {
		e.preventDefault();
		switchTab('todo');
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
		const isCalendarActive = activeTab.textContent.includes('Calendar');

		if (diff > 0 && isCalendarActive) {
			// Swipe left - go to todos
			switchTab('todo');
		} else if (diff < 0 && !isCalendarActive) {
			// Swipe right - go to calendar
			switchTab('calendar');
		}
	}
}

// Connection status monitoring
function updateConnectionStatus(status) {
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

// Initialize auto-save when app loads
document.addEventListener('DOMContentLoaded', setupAutoSave);

// Export functions for global access
window.switchTab = switchTab;
window.changeMonth = changeMonth;
window.openModal = openModal;
window.closeModal = closeModal;
window.openEventModal = openEventModal;
window.openTodoModal = openTodoModal;
window.openEventDetails = openEventDetails;
window.toggleTodo = toggleTodo;
window.signOut = signOut;
window.showInviteModal = showInviteModal;
window.showJoinModal = showJoinModal;
window.copyInviteCode = copyInviteCode;
window.showMembersModal = showMembersModal;
window.removeMember = removeMember;
window.showThemeModal = showThemeModal;
window.setTheme = setTheme;
