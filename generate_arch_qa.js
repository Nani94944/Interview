const fs = require('fs');

const theoryQAs = [
  {
    q: "Monolithic vs Microservices?",
    a: "**Monolith** is like a **Swiss Army Knife**—one single tool that does everything. **Microservices** are like a **Toolbox** where every tool (Service) is separate. If the knife's blade breaks, the whole tool is useless; but if one tool in the toolbox breaks, you can still use the others.",
    diagram: `graph LR
    subgraph Monolith
    A[UI + Logic + DB]
    end
    subgraph Microservices
    S1[User Service]
    S2[Order Service]
    S3[Payment Service]
    S1 --- S2 --- S3
    end`,
    code: `// Monolith: All code in one Project/Repo
// Microservices: Each service has its own Repo & Database`
  },
  {
    q: "What is CQRS?",
    a: "CQRS is like a **Library**. You have one process for **Donating Books** (Writing/Commands) and a completely different, optimized process for **Searching Books** (Reading/Queries). This way, people searching don't slow down people donating.",
    diagram: `graph TD
    User -->|Command| WriteDB[(Write Database)]
    User -->|Query| ReadDB[(Read Cache/DB)]
    WriteDB -.->|Sync| ReadDB`,
    code: `// Command: CreateOrder()
// Query: GetOrderHistory()`
  },
  {
    q: "What is Event-Driven Architecture?",
    a: "It's like a **Radio Station**. One service 'Broadcasts' an event (e.g., 'Order Placed'). It doesn't care who is listening. Other services (Email, Shipping) 'Tune In' and react to that event whenever they are ready.",
    diagram: `graph LR
    Pub[Order Service] -->|Event| Bus[Message Bus]
    Bus --> Sub1[Email Service]
    Bus --> Sub2[Shipping Service]`,
    code: `// RabbitMQ / Kafka
publish("OrderCreated", { id: 123 });`
  },
  {
    q: "What is Load Balancing?",
    a: "A Load Balancer is like a **Traffic Cop**. When 1,000 cars (users) arrive at once, the cop directs them to 3 different lanes (servers) so that no single lane gets jammed.",
    diagram: `graph TD
    Users[1000 Users] --> LB[Load Balancer]
    LB --> S1[Server 1]
    LB --> S2[Server 2]
    LB --> S3[Server 3]`,
    code: `// NGINX / Azure Load Balancer`
  },
  {
    q: "What are the SOLID Principles?",
    a: "SOLID is like a **Set of Rules for building a Lego Castle**. It ensures that if you want to add a new tower later, you don't have to tear down the whole castle. Each brick has one job, and they all fit together perfectly without being glued.",
    diagram: `graph TD
    S[Single Responsibility]
    O[Open/Closed]
    L[Liskov Substitution]
    I[Interface Segregation]
    D[Dependency Inversion]`,
    code: `// D: Depend on Abstractions (Interfaces), not concrete classes.`
  }
];

const scenarioQAs = [
  {
    q: "One microservice goes down and crashes the whole system. How to prevent?",
    a: "Use a **Circuit Breaker**. It's like a **Fuse Box** in your house. If one room (service) has a short circuit, the fuse 'trips' to protect the rest of the house from catching fire.",
    diagram: `graph LR
    Client -->|Check| CB{Circuit Open?}
    CB -->|Yes| Fallback[Return Error Quickly]
    CB -->|No| Service[Call Service]`,
    code: `// Using Polly library in .NET`
  },
  {
    q: "Need to handle millions of users suddenly. How?",
    a: "I would use **Horizontal Scaling**. Instead of buying one 'Giant Expensive Server', I'll just keep adding **many small cheap servers** behind a load balancer. It's like adding more cashiers at a grocery store when the line gets too long.",
    diagram: `graph TD
    LB[Load Balancer]
    LB --> S1[S1]
    LB --> S2[S2]
    LB --> S3[...]
    LB --> Sn[Sn]`
  }
];

let html = `
<!-- Section 18 -->
<section id="sec18" class="doc-section">
    <div class="section-badge"><span class="num">18</span><span class="title">Deep Dive: Architecture & System Design</span></div>
    <h2>Enterprise Architecture & Design Patterns</h2>
    <p>This section provides simplified explanations with diagrams for high-level system design.</p>

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

// SMART REPLACE: Look for existing Section 18 and replace it
const sectionStart = '<!-- Section 18 -->';
const sectionEnd = '</section>';
const startIdx = content.indexOf(sectionStart);
const endIdx = content.indexOf(sectionEnd, startIdx);

if (startIdx !== -1 && endIdx !== -1) {
    // If it exists, replace it
    content = content.substring(0, startIdx) + html + content.substring(endIdx + sectionEnd.length);
    fs.writeFileSync(indexHtmlPath, content);
    console.log("Successfully UPDATED Section 18 (No duplicates created).");
} else {
    // If it doesn't exist, append it before </main>
    const endToken = '</main>';
    const endIndex = content.indexOf(endToken);
    if (endIndex !== -1) {
        const before = content.substring(0, endIndex);
        const after = content.substring(endIndex);
        fs.writeFileSync(indexHtmlPath, before + html + after);
        console.log("Successfully ADDED Section 18.");
    } else {
        console.error("</main> not found.");
    }
}
