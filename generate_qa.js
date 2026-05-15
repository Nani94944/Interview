const fs = require('fs');

const questions = [
  {
    category: "C# & .NET Fundamentals",
    qas: [
      { q: "What are the different types of classes in C#?", a: "Abstract (cannot be instantiated, can have abstract methods), Sealed (cannot be inherited), Static (cannot be instantiated, only static members), and Partial (split across multiple files)." },
      { q: "Difference between String and StringBuilder?", a: "String is immutable (creates a new object on every change). StringBuilder is mutable (modifies the same buffer), making it much faster for heavy string concatenation in loops." },
      { q: "Value Types vs. Reference Types?", a: "Value types (int, float, struct) are stored on the Stack and hold their value directly. Reference types (class, string, array) are stored on the Heap, and the Stack holds a pointer to their memory address." },
      { q: "What are 'ref' and 'out' parameters?", a: "Both pass arguments by reference. 'ref' requires the variable to be initialized before passing it. 'out' does not require prior initialization but must be assigned a value inside the called method before it returns." },
      { q: "What is Boxing and Unboxing?", a: "Boxing is the process of converting a Value Type to a Reference Type (object). Unboxing is extracting the Value Type back from the object. Both carry a performance penalty." },
      { q: "Difference between 'readonly' and 'const'?", a: "'const' is evaluated at compile-time and must be initialized at declaration. 'readonly' is evaluated at runtime and can be initialized in the constructor." },
      { q: "IEnumerable vs. IQueryable?", a: "IEnumerable executes queries in-memory (client-side) and is best for LINQ-to-Objects. IQueryable executes queries out-of-memory (server-side, like SQL Server) and is best for LINQ-to-SQL/EF, as it sends filters directly to the database." },
      { q: "Explain the async and await keywords.", a: "They are used for asynchronous programming. 'await' yields control back to the calling thread until the awaited Task completes, preventing thread blocking (crucial for UI responsiveness and web server throughput)." },
      { q: "Task vs. Thread?", a: "A Thread is a low-level OS construct. A Task is a higher-level concept representing an asynchronous operation, managed by the ThreadPool, which is more lightweight and efficient." },
      { q: "How does Garbage Collection work in .NET?", a: "It manages memory allocation and release. It operates on three generations (Gen 0, Gen 1, Gen 2). Short-lived objects die in Gen 0. Long-lived objects survive to Gen 2. It runs non-deterministically when memory pressure occurs." },
      { q: "What is the IDisposable interface?", a: "Used to deterministically release unmanaged resources (like file handles or DB connections) when the object is no longer needed, typically invoked via the 'using' block." },
      { q: "What are Extension Methods?", a: "Static methods defined in a static class that allow you to 'add' methods to existing types without creating a new derived type or modifying the original type (e.g., LINQ methods on IEnumerable)." },
      { q: "Delegates vs. Events?", a: "A Delegate is a type-safe function pointer. An Event is a wrapper around a delegate that restricts outside classes from invoking it directly or clearing its subscriber list (Provides publisher/subscriber encapsulation)." },
      { q: "Func vs. Action vs. Predicate?", a: "Func returns a value. Action returns void. Predicate is a specialized Func that takes one parameter and always returns a boolean." },
      { q: "Difference between 'throw' and 'throw ex'?", a: "'throw' preserves the original stack trace. 'throw ex' resets the stack trace to the current line, losing the original error location. Always use 'throw'." }
    ]
  },
  {
    category: "ASP.NET MVC & Web API",
    qas: [
      { q: "What is the ASP.NET MVC Application Life Cycle?", a: "Routing -> Controller Initialization -> Action Execution -> Result Execution -> View Rendering." },
      { q: "What are the types of Filters in MVC?", a: "Authentication, Authorization, Action, Result, and Exception filters. They run at different stages of the request pipeline." },
      { q: "Convention-based vs. Attribute Routing?", a: "Convention-based routing defines global URL patterns in RouteConfig. Attribute routing maps URLs directly above the controller or action using [Route(\"...\")] attributes." },
      { q: "ViewData vs. ViewBag vs. TempData?", a: "ViewData is a dictionary. ViewBag is a dynamic wrapper around ViewData. TempData uses session to persist data across a single redirect (subsequent request)." },
      { q: "Partial Views vs. View Components?", a: "Partial views are simple reusable Razor snippets. View Components (in Core) have their own backend logic class, making them self-contained and better for things like shopping carts or dynamic menus." },
      { q: "ActionResult vs. IActionResult?", a: "ActionResult is an abstract base class. IActionResult is an interface (prominent in .NET Core) allowing you to return HTTP status codes (Ok(), NotFound()) easily without coupling to a specific class." },
      { q: "What is Model Binding?", a: "The process where ASP.NET maps data from HTTP requests (query string, form data, route data) to controller action parameters or C# object models." },
      { q: "What is an Anti-Forgery Token (RVT)?", a: "A token generated by @Html.AntiForgeryToken() and validated by [ValidateAntiForgeryToken] to prevent Cross-Site Request Forgery (CSRF) attacks." },
      { q: "Web API vs. MVC?", a: "MVC is designed to return HTML views to a browser. Web API is designed to return raw data (JSON/XML) to various clients (browsers, mobile apps, desktop apps)." },
      { q: "What is Content Negotiation?", a: "The mechanism in Web API where the server returns data in the format requested by the client's 'Accept' header (e.g., application/json or application/xml)." },
      { q: "Explain the Middleware Pipeline in ASP.NET Core.", a: "A sequence of components (middleware) that process incoming HTTP requests and outgoing responses. Order matters (e.g., Authentication must come before MVC)." },
      { q: "What is Razor?", a: "A server-side markup syntax for embedding C# code into HTML using the @ symbol." },
      { q: "Dependency Injection Lifecycles in .NET Core?", a: "Transient (new instance every time), Scoped (one instance per HTTP request), Singleton (one instance for the lifetime of the application)." }
    ]
  },
  {
    category: "WCF & ASMX (Legacy Services)",
    qas: [
      { q: "What is WCF?", a: "Windows Communication Foundation. A framework for building service-oriented applications that send data as asynchronous messages from one service endpoint to another." },
      { q: "What are the ABCs of WCF?", a: "Address (Where is it?), Binding (How do we talk to it? e.g., basicHttpBinding, netTcpBinding), Contract (What can it do? e.g., ServiceContract)." },
      { q: "DataContract vs. MessageContract?", a: "DataContract defines the shape of the data (the payload). MessageContract gives you full control over the SOAP header and body structure." },
      { q: "WCF vs. Web API?", a: "WCF is protocol-agnostic (HTTP, TCP, Named Pipes) and heavily uses SOAP/XML. Web API is strictly HTTP-based and typically uses JSON, making it lighter and better for web/mobile clients." },
      { q: "What is ASMX?", a: "Active Server Methods. The legacy ASP.NET Web Services technology that preceded WCF, strictly relying on HTTP and SOAP." }
    ]
  },
  {
    category: "ADO.NET & SQL Server",
    qas: [
      { q: "Connected vs. Disconnected Architecture in ADO.NET?", a: "Connected (SqlDataReader) requires an active DB connection while reading data. Disconnected (SqlDataAdapter/DataSet) fetches data into memory, closes the connection, and works offline." },
      { q: "What is Connection Pooling?", a: "A technique where database connections are cached and reused to avoid the massive performance overhead of opening and closing physical connections for every query." },
      { q: "Advantages of Stored Procedures?", a: "Precompiled execution plans (faster), reduced network traffic (only the call is sent, not the whole query), and security (prevents SQL injection, grants execution rights without table access)." },
      { q: "Clustered vs. Non-Clustered Indexes?", a: "Clustered index physically sorts the table data on disk (only 1 per table, typically the PK). Non-Clustered creates a separate lookup tree with pointers to the data (can have multiple)." },
      { q: "Primary Key vs. Unique Key?", a: "Both enforce uniqueness. PK cannot be NULL and automatically creates a clustered index. Unique Key allows exactly one NULL value and creates a non-clustered index by default." },
      { q: "What is SQL Injection and how to prevent it?", a: "A malicious technique where an attacker appends SQL commands to input fields. Prevent it by using Parameterized Queries (SqlParameter) or an ORM like Entity Framework." },
      { q: "INNER JOIN vs. LEFT JOIN?", a: "INNER JOIN returns only rows with a match in both tables. LEFT JOIN returns all rows from the left table, and the matched rows from the right table (or NULL if no match)." },
      { q: "ACID Properties?", a: "Atomicity (all or nothing), Consistency (valid state before and after), Isolation (concurrent transactions don't interfere), Durability (committed data is saved permanently)." },
      { q: "Normalization (1NF, 2NF, 3NF)?", a: "Organizing data to reduce redundancy. 1NF: Atomic columns. 2NF: 1NF + no partial dependencies on a composite PK. 3NF: 2NF + no transitive dependencies (non-key columns depending on other non-key columns)." }
    ]
  },
  {
    category: "Angular & Frontend",
    qas: [
      { q: "What are Angular Custom Elements?", a: "Angular components packaged as standard Web Components, allowing them to be embedded in non-Angular applications (like legacy MVC pages)." },
      { q: "Signals vs. RxJS?", a: "Signals are a new synchronous, glitch-free reactive primitive in Angular for managing UI state. RxJS is an asynchronous library using Observables, better suited for complex event streams and HTTP calls." },
      { q: "Key Angular Lifecycle Hooks?", a: "ngOnChanges (inputs change), ngOnInit (component initialization), ngAfterViewInit (view/children initialized), ngOnDestroy (cleanup before destruction)." },
      { q: "ViewChild vs. ContentChild?", a: "ViewChild accesses an element/component defined directly in the component's own template. ContentChild accesses an element projected into the component via <ng-content>." },
      { q: "Advantages of Standalone Components?", a: "Introduced in Angular 14+, they remove the need for NgModules, making components self-contained, easier to understand, and simpler to lazy-load." },
      { q: "Types of Directives in Angular?", a: "Component (directives with a template), Structural (change DOM layout, e.g., *ngIf, *ngFor), Attribute (change appearance/behavior, e.g., ngClass, ngStyle)." },
      { q: "What are Pipes?", a: "Functions used in templates to format data for display (e.g., date, currency, uppercase) without changing the underlying data model." },
      { q: "Event Binding vs. Property Binding?", a: "Property Binding [property]=\"value\" sends data from the component to the DOM. Event Binding (event)=\"handler()\" sends data from the DOM (user action) to the component." },
      { q: "How to prevent Cross-Site Scripting (XSS)?", a: "Angular automatically sanitizes all values bound to the DOM. If rendering raw HTML, you must explicitly use DomSanitizer to mark it as safe." }
    ]
  },
  {
    category: "Architecture & General Design",
    qas: [
      { q: "What are Micro-frontends?", a: "An architectural style where independently deliverable frontend applications are composed into a greater whole, avoiding a monolithic frontend codebase." },
      { q: "Advantages of N-Tier Architecture?", a: "Separation of concerns, improved maintainability, independent scalability of layers, and the ability to update one layer (e.g., UI) without touching the others (e.g., DB)." },
      { q: "What are the SOLID principles?", a: "Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, Dependency Inversion. They aim to make software designs more understandable, flexible, and maintainable." },
      { q: "Repository Pattern?", a: "Mediates between the domain and data mapping layers using a collection-like interface for accessing domain objects, abstracting away the database logic." },
      { q: "Singleton Pattern?", a: "Ensures a class has only one instance and provides a global point of access to it." },
      { q: "SOAP vs. REST?", a: "SOAP is a strict protocol using XML. REST is an architectural style primarily using JSON over HTTP, operating on resources via standard HTTP verbs (GET, POST, PUT, DELETE)." }
    ]
  }
];

// Let's generate HTML
let html = `
                    <!-- Section 12 -->
                    <section id="sec12" class="doc-section">
                        <div class="section-badge"><span class="num">12</span><span class="title">Technical Interview Q&A</span></div>
                        <h2>Comprehensive .NET & Architecture Q&A</h2>
                        <p>A highly curated list of ${questions.reduce((acc, c) => acc + c.qas.length, 0)} interview questions covering C#, ASP.NET MVC, Web Services, ADO.NET, Angular, and Architecture design principles.</p>
`;

let qNum = 1;
questions.forEach(cat => {
  html += `\n                        <h3 class="qa-category-title">${cat.category}</h3>\n`;
  html += `                        <div class="qa-grid">\n`;

  cat.qas.forEach(qa => {
    html += `                            <div class="qa-card">
                                <div class="qa-question">Q${qNum}: ${qa.q}</div>
                                <div class="qa-answer">${qa.a}</div>
                            </div>\n`;
    qNum++;
  });

  html += `                        </div>\n`;
});

html += `                    </section>\n                </main>`;

// Read existing index.html
const indexHtmlPath = 'C:\\Users\\anveshj\\.gemini\\antigravity\\scratch\\talent-gateway-docs\\index.html';
let content = fs.readFileSync(indexHtmlPath, 'utf8');

// Replace everything from <!-- Section 12 --> to the end of </main>
const startToken = '<!-- Section 12 -->';
const endToken = '</main>';

const startIndex = content.indexOf(startToken);
const endIndex = content.indexOf(endToken) + endToken.length;

if (startIndex !== -1 && endIndex !== -1) {
  const before = content.substring(0, startIndex);
  const after = content.substring(endIndex);
  fs.writeFileSync(indexHtmlPath, before + html + after);
  console.log("Successfully inserted 55 questions.");
} else {
  console.error("Tokens not found.");
}
