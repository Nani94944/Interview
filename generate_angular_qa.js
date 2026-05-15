const fs = require('fs');

const theoryQAs = [
  {
    q: "What is Angular Component Architecture?",
    a: "An Angular Component is like a **Lego Brick**. It has its own logic (TypeScript), its own skin (HTML), and its own style (CSS). You build a website by snapping these bricks together.",
    diagram: `graph TD
    Comp[Angular Component]
    Comp --> Class[Logic - TypeScript]
    Comp --> Template[View - HTML]
    Comp --> Style[Style - CSS]`,
    code: `@Component({
  selector: 'app-user',
  template: '<h1>{{ name }}</h1>'
})
export class UserComponent { name = "John"; }`
  },
  {
    q: "What is Dependency Injection (DI)?",
    a: "DI is like a **Delivery Service**. Instead of a class 'going to the store' to buy a service (creating it with 'new'), Angular 'delivers' the service directly to the class's door (the constructor).",
    diagram: `graph LR
    DI[Angular DI Container] -->|Delivers| Service[ApiService]
    Service -->|Injects| Comp[Component]`,
    code: `constructor(private api: ApiService) { }`
  },
  {
    q: "What is an Observable (RxJS)?",
    a: "An Observable is like a **YouTube Channel**. The channel sends out videos (data) over time. You don't see the videos until you **Subscribe** to the channel. If you stop watching, you **Unsubscribe**.",
    diagram: `graph LR
    Pub[Observable] -->|Emits Data| Sub[Subscriber]
    Sub -->|Unsubscribe| Pub`,
    code: `this.api.getUsers().subscribe(data => {
  this.users = data;
});`
  },
  {
    q: "Explain Data Binding in Angular.",
    a: "Data binding is the **Glue** between your code and the screen. **Interpolation** {{ }} shows data, **Property Binding** [ ] sets values, and **Event Binding** ( ) listens for clicks.",
    diagram: `graph TD
    TS[TypeScript] -->|{{ }} Interpolation| HTML
    TS -->|[ ] Property Binding| HTML
    HTML -->|( ) Event Binding| TS`,
    code: `<h1>{{ title }}</h1>
<button (click)="save()">Save</button>`
  },
  {
    q: "What are Directives (*ngIf, *ngFor)?",
    a: "Directives are like **Magic Spells** for your HTML. **ngIf** can make an element vanish or appear. **ngFor** can clone an element multiple times to show a list.",
    diagram: `graph TD
    List[List of Data] -->|*ngFor| UI[Repeated Rows]
    Check[Boolean] -->|*ngIf| Visible[Show/Hide]`,
    code: `<div *ngIf="isLoaded">Done!</div>
<li *ngFor="let item of items">{{ item }}</li>`
  }
];

const scenarioQAs = [
  {
    q: "The app is loading very slowly. How will you optimize it?",
    a: "I will use **Lazy Loading**. Instead of loading the entire 'Library' of books at once, I only load the 'Chapter' the user is currently reading. This makes the initial start much faster.",
    diagram: `graph LR
    Main[Main Bundle] -->|User Clicks| Feature[Lazy Loaded Module]`,
    code: `{ path: 'admin', loadChildren: () => import(...) }`
  },
  {
    q: "Data is changing in the code but not updating on the screen. Why?",
    a: "This usually happens if you are **Mutating** data (changing a piece of a list) instead of **Replacing** it. Angular's 'Change Detection' is like a security guard—it only notices if you bring in a 'New Box', not if you change one small item inside an old box.",
    diagram: `graph TD
    Old[Old Array] -->|Push| Old
    Note over Old: Guard ignores!
    Old -->|New Reference| New[New Array]
    Note over New: Guard detects change!`
  }
];

let html = `
<!-- Section 17 -->
<section id="sec17" class="doc-section">
    <div class="section-badge"><span class="num">17</span><span class="title">Deep Dive: Angular & Frontend</span></div>
    <h2>Modern Frontend Architecture Scenarios</h2>
    <p>This section provides simplified explanations with diagrams for Angular reactivity and components.</p>

    <h3 class="qa-category-title">Part 1: Theory Questions</h3>
    <div class="qa-grid">
`;

let qNum = 1;
theoryQAs.forEach(qa => {
    html += `
        <div class="qa-card card-teal">
            <div class="qa-question">Q${qNum}: ${qa.q}</div>
            <div class="qa-answer">
                <p><strong>Simple Explanation:</strong> ${qa.a}</p>
                ${qa.diagram ? `<div class="mermaid">${qa.diagram}</div>` : ''}
                <div class="mono card-mono code-block">${qa.code ? qa.code.replace(/</g, '&lt;').replace(/>/g, '&gt;') : ''}</div>
            </div>
        </div>
    `;
    qNum++;
});

html += `
    </div>
    
    <h3 class="qa-category-title">Part 2: Scenario-Based Questions</h3>
    <div class="qa-grid">
`;

scenarioQAs.forEach(qa => {
    html += `
        <div class="qa-card card-blue">
            <div class="qa-question">Q${qNum}: ${qa.q}</div>
            <div class="qa-answer">
                <p><strong>Simple Explanation:</strong> ${qa.a}</p>
                ${qa.diagram ? `<div class="mermaid">${qa.diagram}</div>` : ''}
                <div class="mono card-mono code-block">${qa.code ? qa.code.replace(/</g, '&lt;').replace(/>/g, '&gt;') : ''}</div>
            </div>
        </div>
    `;
    qNum++;
});

html += `
    </div>
</section>
`;

const indexHtmlPath = 'C:\\Users\\anveshj\\.gemini\\antigravity\\scratch\\talent-gateway-docs\\index.html';
let content = fs.readFileSync(indexHtmlPath, 'utf8');

// SMART REPLACE: Look for existing Section 17 and replace it
const sectionStart = '<!-- Section 17 -->';
const sectionEnd = '</section>';
const startIdx = content.indexOf(sectionStart);
const endIdx = content.indexOf(sectionEnd, startIdx);

if (startIdx !== -1 && endIdx !== -1) {
    // If it exists, replace it
    content = content.substring(0, startIdx) + html + content.substring(endIdx + sectionEnd.length);
    fs.writeFileSync(indexHtmlPath, content);
    console.log("Successfully UPDATED Section 17 (No duplicates created).");
} else {
    // If it doesn't exist, append it before </main>
    const endToken = '</main>';
    const endIndex = content.indexOf(endToken);
    if (endIndex !== -1) {
        const before = content.substring(0, endIndex);
        const after = content.substring(endIndex);
        fs.writeFileSync(indexHtmlPath, before + html + after);
        console.log("Successfully ADDED Section 17.");
    } else {
        console.error("</main> not found.");
    }
}
