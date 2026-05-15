const fs = require('fs');
const path = 'C:\\Users\\anveshj\\.gemini\\antigravity\\scratch\\talent-gateway-docs\\index.html';
let content = fs.readFileSync(path, 'utf8');

// List of all section IDs to check for duplicates
const sections = ['sec13', 'sec14', 'sec15', 'sec16', 'sec17', 'sec18'];

sections.forEach(id => {
    const regex = new RegExp('<section id="' + id + '"[\\s\\S]*?<\\/section>', 'g');
    const matches = content.match(regex);
    
    if (matches && matches.length > 1) {
        console.log(`Found ${matches.length} copies of ${id}. Keeping only the latest one.`);
        // Remove all occurrences
        content = content.replace(regex, '');
        // We'll put the latest one back at the end of the <main> tag later or just let the generators do it
    }
});

fs.writeFileSync(path, content);
console.log("Global cleanup complete.");
