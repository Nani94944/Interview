const fs = require('fs');

const theoryQAs = [
  {
    q: "What is ASP.NET MVC?",
    a: "MVC is like a **Restaurant**. The **Controller** is the waiter (takes orders), the **Model** is the kitchen (prepares data), and the **View** is the plated meal (what the customer sees).",
    diagram: `graph LR
    User -->|Order| Controller
    Controller -->|Fetch| Model
    Model -->|Data| Controller
    Controller -->|Render| View
    View -->|Meal| User`,
    code: `public class HomeController : Controller {
    public IActionResult Index() {
        var model = new User { Name = "John" };
        return View(model); 
    }
}`
  },
  {
    q: "Explain MVC lifecycle.",
    a: "It's like a **Conveyor Belt**. A request comes in, the Router picks the right Controller, the Controller does some work, and finally, the View Engine creates the HTML page.",
    diagram: `graph TD
    A[URL Request] --> B[Routing]
    B --> C[Controller]
    C --> D[Action Method]
    D --> E[View Engine]
    E --> F[HTML Response]`,
    code: `// Route: /Home/Index -> HomeController.Index()`
  },
  {
    q: "Difference between ViewBag, ViewData, TempData?",
    a: "**ViewBag** and **ViewData** are like a 'Post-it Note' for the current page. **TempData** is like a 'Lunchbox' that carries data safely to the **next** page (useful during redirects).",
    diagram: `graph TD
    ViewBag[ViewBag - Current Page]
    ViewData[ViewData - Current Page]
    TempData[TempData - Next Page Redirect]`,
    code: `ViewBag.Name = "John";
TempData["Status"] = "Saved!"; // Survives a RedirectToAction`
  },
  {
    q: "What is Model Binding?",
    a: "Model Binding is like a **Translator**. It takes messy data from a website form or URL and automatically converts it into clean C# objects that your code can understand.",
    diagram: `graph LR
    Form[HTML Form Data] -->|Model Binder| Object[C# User Object]`,
    code: `[HttpPost]
public IActionResult Save(User user) { ... } // Automatically populated`
  },
  {
    q: "What is Middleware?",
    a: "Middleware is like a **Security Checkpoint** at an airport. Every request must pass through multiple checks (Logging, Security, Routing) before it reaches the destination.",
    diagram: `graph LR
    Req[Request] -->|Log| M1[M1]
    M1 -->|Auth| M2[M2]
    M2 -->|Route| M3[M3]
    M3 --> Target[Controller]`,
    code: `app.UseAuthentication();
app.UseAuthorization();
app.UseStaticFiles();`
  }
];

const scenarioQAs = [
  {
    q: "API returns 401 Unauthorized. What is the first thing you check?",
    a: "I check if the **'Key' (Token)** is missing or expired. It's like trying to enter a VIP room without a badge. I check if the 'Authorization' header is sent correctly.",
    diagram: `graph TD
    Client -->|No Token| Server
    Server -->|401 Stop| Client`,
    code: `// Ensure header is:
// Authorization: Bearer <token>`
  },
  {
    q: "Your website is slow because it's loading too many images. How to fix?",
    a: "I would use **Caching**. Instead of the server 'baking a new cake' for every customer, it keeps a few ready on the counter (Memory Cache) to serve them instantly.",
    diagram: `graph LR
    Request -->|Check| Cache{In Cache?}
    Cache -->|Yes| Result[Fast Delivery]
    Cache -->|No| DB[Slow DB Query]`,
    code: `[ResponseCache(Duration = 60)]
public IActionResult Gallery() { ... }`
  }
];

let html = `
<!-- Section 14 -->
<section id="sec14" class="doc-section">
    <div class="section-badge"><span class="num">14</span><span class="title">Deep Dive: ASP.NET MVC & Web API</span></div>
    <h2>Modern Web Development Scenarios</h2>
    <p>This section provides simplified explanations with diagrams for ASP.NET Core and Web API.</p>

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
                <div class="mono card-mono code-block">${qa.code.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</div>
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
                <div class="mono card-mono code-block">${qa.code.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</div>
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

// SMART REPLACE: Look for existing Section 14 and replace it
const sectionStart = '<!-- Section 14 -->';
const sectionEnd = '</section>';
const startIdx = content.indexOf(sectionStart);
const endIdx = content.indexOf(sectionEnd, startIdx);

if (startIdx !== -1 && endIdx !== -1) {
    // If it exists, replace it
    content = content.substring(0, startIdx) + html + content.substring(endIdx + sectionEnd.length);
    fs.writeFileSync(indexHtmlPath, content);
    console.log("Successfully UPDATED Section 14 (No duplicates created).");
} else {
    // If it doesn't exist, append it before </main>
    const endToken = '</main>';
    const endIndex = content.indexOf(endToken);
    if (endIndex !== -1) {
        const before = content.substring(0, endIndex);
        const after = content.substring(endIndex);
        fs.writeFileSync(indexHtmlPath, before + html + after);
        console.log("Successfully ADDED Section 14.");
    } else {
        console.error("</main> not found.");
    }
}
