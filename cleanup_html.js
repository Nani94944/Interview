const fs = require('fs');
const path = 'C:\\Users\\anveshj\\.gemini\\antigravity\\scratch\\talent-gateway-docs\\index.html';
let content = fs.readFileSync(path, 'utf8');

// Remove all existing Section 15 blocks
const sectionToken = '<!-- Section 15 -->';
while (content.includes(sectionToken)) {
    const startIdx = content.indexOf(sectionToken);
    const endIdx = content.indexOf('</section>', startIdx);
    if (startIdx !== -1 && endIdx !== -1) {
        content = content.substring(0, startIdx) + content.substring(endIdx + '</section>'.length);
    } else {
        break;
    }
}

fs.writeFileSync(path, content);
console.log("Cleaned up duplicates from index.html");
