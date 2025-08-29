/**
 * Event Color Persistence Test
 * Run this in the browser console to test if event colors persist after page refresh
 */

function testEventColorPersistence() {
    console.log('\n🧪 EVENT COLOR PERSISTENCE TEST STARTED\n');

    // Test 1: Check if colors are loaded from localStorage
    const savedColors = localStorage.getItem('eventColors');
    console.log('📋 Test 1: localStorage check');

    try {
        console.log('   Raw localStorage value:', savedColors);

        if (savedColors) {
            const parsedColors = JSON.parse(savedColors);
            console.log('   Parsed colors:', parsedColors);
            console.log('   ✅ Colors found in localStorage');

            // Check if all expected keys exist
            const expectedKeys = ['user1', 'user2', 'shared'];
            const missingKeys = expectedKeys.filter(key => !(key in parsedColors));
            if (missingKeys.length > 0) {
                console.log('   ⚠️ Missing keys in localStorage:', missingKeys);
            } else {
                console.log('   ✅ All expected event types have colors');
            }
        } else {
            console.log('   ⚠️ No colors found in localStorage');
        }
    } catch (error) {
        console.log('   ❌ Error parsing localStorage colors:', error);
    }

    // Test 2: Check current eventColors object
    console.log('\n📊 Test 2: Current eventColors object');
    if (typeof window.eventColors !== 'undefined') {
        console.log('   window.eventColors exists:', window.eventColors);
        console.log('   ✅ eventColors object exists');

        if (Object.keys(window.eventColors).length > 0) {
            console.log('   ✅ eventColors contains data');
            console.log('   eventColors keys:', Object.keys(window.eventColors));
        } else {
            console.log('   ⚠️ eventColors is empty');
        }

        // Compare with localStorage
        if (savedColors) {
            const localParsed = JSON.parse(savedColors);
            const windowMatches = JSON.stringify(window.eventColors) === JSON.stringify(localParsed);
            console.log(`   Window colors match localStorage: ${windowMatches}`);
        }
    } else {
        console.log('   ❌ window.eventColors object not found');
        console.log('   Available window keys with "color" in name:', Object.keys(window).filter(key => key.toLowerCase().includes('color')));
    }

    // Test 3: Test saveEventColors function accessibility
    console.log('\n💾 Test 3: Function accessibility');
    if (typeof window.saveEventColors !== 'undefined') {
        console.log('   ✅ window.saveEventColors function exists');

        // Test if function has debugging output
        const originalConsole = console.log;
        let loggedSomething = false;
        console.log = function(...args) {
            loggedSomething = true;
            originalConsole.apply(this, args);
        };
        // We'll restore console after testing
    } else {
        console.log('   ❌ window.saveEventColors function not found');
        console.log('   Available functions in window:', Object.keys(window).filter(key => typeof window[key] === 'function' && key.toLowerCase().includes('color')).slice(0, 5));
    }

    // Test 4: Test calendar existence and event rendering
    console.log('\n📅 Test 4: Calendar and event analysis');
    const calendarGrid = document.getElementById('calendarGrid');
    if (calendarGrid) {
        console.log('   ✅ Calendar grid exists');
        const calendarDays = calendarGrid.querySelectorAll('.calendar-day');
        console.log(`   Found ${calendarDays.length} calendar days`);

        // Count events on calendar
        const eventElements = calendarGrid.querySelectorAll('.event-pill, .event-span');
        console.log(`   Found ${eventElements.length} events rendered on calendar`);

        if (eventElements.length > 0) {
            // Analyze event colors
            const eventsByType = {};
            eventElements.forEach((eventEl, index) => {
                const computedStyle = window.getComputedStyle(eventEl);
                const backgroundColor = computedStyle.backgroundColor || computedStyle.background;
                const borderColor = computedStyle.borderColor || computedStyle.borderLeftColor;

                // Try to get event type from data attributes or title
                const dataType = eventEl.getAttribute('data-event-type');
                const title = eventEl.textContent || eventEl.innerText || '';

                console.log(`   Event ${index + 1}: type=${dataType || 'unknown'}, title="${title.slice(0, 20)}...", bg=${backgroundColor}, border=${borderColor}`);

                // Group by type if possible
                const type = dataType || 'unknown';
                if (!eventsByType[type]) eventsByType[type] = [];
                eventsByType[type].push({ title, backgroundColor, borderColor });
            });

            console.log('   Events grouped by type:', eventsByType);

            // Check for color consistency within types
            Object.keys(eventsByType).forEach(type => {
                const colors = [...new Set(eventsByType[type].map(e => e.backgroundColor))];
                if (colors.length > 1) {
                    console.log(`   ⚠️ ${type} events have inconsistent colors:`, colors);
                } else {
                    console.log(`   ✅ ${type} events have consistent color: ${colors[0]}`);
                }
            });
        } else {
            console.log('   ℹ️ No events currently rendered on calendar');
        }
    } else {
        console.log('   ❌ Calendar grid not found');
        console.log('   Available calendar-related elements:');
        ['calendar-view', 'calendarGrid', 'monthYear'].forEach(id => {
            const el = document.getElementById(id);
            console.log(`   ${id}: ${el ? 'exists' : 'not found'}`);
        });
    }

    // Test 5: Test expected default colors
    console.log('\n🎨 Test 5: Default color comparison');
    const defaultEventColors = {
        user1: '#667eea', // My events - purple/blue
        user2: '#ff9a8b', // Partner's events - pink/coral
        shared: '#f77171'  // Shared events - red/pink
    };

    console.log('   Expected default colors:', defaultEventColors);

    if (typeof window.eventColors !== 'undefined') {
        Object.entries(defaultEventColors).forEach(([type, expected]) => {
            const current = window.eventColors[type];
            const matches = current === expected;
            console.log(`   ${type}: current=${current}, expected=${expected}, matches=${matches}`);
        });
    }

    console.log('\n🧪 EVENT COLOR PERSISTENCE TEST COMPLETED\n');

    // Enhanced Recommendations
    console.log('💡 Diagnosis and Recommendations:');

    if (typeof window.eventColors === 'undefined') {
        console.log('   🚨 CRITICAL: eventColors not accessible globally');
        console.log('   → Fix: Check module scope and window assignments in script.js');
    }

    if (typeof window.saveEventColors === 'undefined') {
        console.log('   🚨 CRITICAL: saveEventColors function not accessible');
        console.log('   → Fix: Module scope issue - function not exported to window');
    }

    if (window.eventColors && savedColors) {
        const localParsed = JSON.parse(savedColors);
        const windowMatches = JSON.stringify(window.eventColors) === JSON.stringify(localParsed);
        if (!windowMatches) {
            console.log('   🚨 CRITICAL: window.eventColors differs from localStorage');
            console.log('   → Fix: Synchronization issue between memory and storage');
        }
    }

    if (eventElements && eventElements.length > 0) {
        const uniqueTypes = [...new Set(Array.from(eventElements).map(el => el.getAttribute('data-event-type') || 'unknown'))];
        console.log(`   📊 Event types found on calendar: ${uniqueTypes.join(', ')}`);

        const expectedTypes = ['user1', 'user2', 'shared'];
        const missingExpected = expectedTypes.filter(type => !uniqueTypes.includes(type));
        if (missingExpected.length > 0) {
            console.log(`   ℹ️ Missing expected event types: ${missingExpected.join(', ')}`);
        }
    }

    console.log('\n🔧 Test completed. Copy and share the above output for debugging support.');

    // Restore console.log if we modified it
    if (typeof originalConsole !== 'undefined') {
        console.log = originalConsole;
    }

    return {
        localStorage: savedColors ? JSON.parse(savedColors) : null,
        currentColors: window.eventColors || {},
        functionsAvailable: {
            saveEventColors: typeof window.saveEventColors !== 'undefined',
            showEventColorsModal: typeof window.showEventColorsModal !== 'undefined',
            getEventColor: typeof window.getEventColor !== 'undefined'
        },
        calendarExists: !!calendarGrid,
        eventCount: eventElements ? eventElements.length : 0,
        expectedDefaults: defaultEventColors
    };
}

// Make function globally accessible
window.testEventColorPersistence = testEventColorPersistence;

console.log('🎨 Event Color Persistence Test loaded.');
console.log('Run: testEventColorPersistence() in console to test persistence.');
console.log('🐛 Enhanced debugging for module scope and persistence issues.');