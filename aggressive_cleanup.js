const fs = require('fs');
const path = 'C:\\Users\\anveshj\\.gemini\\antigravity\\scratch\\talent-gateway-docs\\index.html';
let content = fs.readFileSync(path, 'utf8');

// Aggressively remove any section with id="sec15"
// This handles cases where the comment tag might be missing or different
const regex = /<section id="sec15"[\s\S]*?<\/section>/g;
content = content.replace(regex, '');

// Also remove any stray "Section 15" comments
content = content.replace(/<!-- Section 15 -->/g, '');

fs.writeFileSync(path, content);
console.log("Aggressively cleaned up all sec15 entries.");
