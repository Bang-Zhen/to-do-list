// Script to check all styles applied to personal-event-btn
console.log("Inspecting styles for personal-event-btn");

// Function to find all CSS rules that apply to a selector
function findCSSRules(selector) {
  const matchedRules = [];
  
  // Loop through all stylesheets
  for (let i = 0; i < document.styleSheets.length; i++) {
    try {
      const styleSheet = document.styleSheets[i];
      // Skip if the stylesheet is not accessible (e.g., from a different origin)
      if (!styleSheet.cssRules) continue;
      
      // Loop through all rules in the stylesheet
      for (let j = 0; j < styleSheet.cssRules.length; j++) {
        const rule = styleSheet.cssRules[j];
        // Check if the rule applies to our selector
        if (rule.selectorText && 
            rule.selectorText.includes(selector)) {
          matchedRules.push({
            selector: rule.selectorText,
            cssText: rule.cssText,
            styleSheet: styleSheet.href || 'inline style',
            index: j
          });
        }
      }
    } catch (e) {
      console.log('Error accessing stylesheet:', e);
    }
  }
  
  return matchedRules;
}

// Find all rules for our button
const personalEventRules = findCSSRules('personal-event-btn');
console.log('Found', personalEventRules.length, 'CSS rules for personal-event-btn:');
personalEventRules.forEach((rule, i) => {
  console.log(`Rule ${i + 1}:`, rule.selector);
  console.log(rule.cssText);
  console.log('------------------');
});

// Check the actual computed style of the button if it exists in the DOM
const personalEventBtn = document.querySelector('.personal-event-btn');
if (personalEventBtn) {
  const computedStyle = window.getComputedStyle(personalEventBtn);
  console.log('Computed background:', computedStyle.background);
  console.log('Computed background-image:', computedStyle.backgroundImage);
  console.log('Computed color:', computedStyle.color);
  console.log('Element has inline style?', personalEventBtn.hasAttribute('style'));
  if (personalEventBtn.hasAttribute('style')) {
    console.log('Inline style:', personalEventBtn.getAttribute('style'));
  }
} else {
  console.log('No personal-event-btn found in the current DOM');
}
