const fs = require('fs');
const path = require('path');

const sections = [
  {
    id: 'sec14',
    number: 14,
    title: 'Deep Dive: ASP.NET MVC & .NET Core',
    h2: 'ASP.NET MVC, Web API & .NET Core Interview Questions',
    intro: 'Expanded scenario-based interview questions with answers, examples, and diagrams for MVC, Web API, and ASP.NET Core.',
    questions: [
      'What is ASP.NET MVC and why is it used?',
      'Explain the MVC request lifecycle.',
      'Difference between ASP.NET MVC and ASP.NET Core MVC?',
      'What is middleware in ASP.NET Core?',
      'How does dependency injection work in .NET Core?',
      'What is model binding?',
      'Difference between ViewBag, ViewData, TempData, and strongly typed models?',
      'What are filters in MVC?',
      'Difference between action filter, authorization filter, exception filter, and result filter?',
      'How does routing work in ASP.NET Core?',
      'Attribute routing vs conventional routing?',
      'What is Web API and how is it different from MVC?',
      'How do you version Web APIs?',
      'How do you implement global exception handling?',
      'How do you validate models in Web API?',
      'How do you handle 401 and 403 errors?',
      'How do you implement JWT authentication in ASP.NET Core?',
      'How do you implement role-based authorization?',
      'How do you secure APIs from direct browser manipulation?',
      'What is CORS and how do you configure it?',
      'What is appsettings.json used for?',
      'How do environment-specific settings work?',
      'What is the difference between singleton, scoped, and transient services?',
      'When can singleton services cause bugs?',
      'How do you use HttpClientFactory?',
      'How do you avoid socket exhaustion?',
      'How do you implement retry and circuit breaker policies?',
      'How do you improve slow API performance?',
      'How do you cache data in ASP.NET Core?',
      'Memory cache vs distributed cache?',
      'How do you implement Redis caching?',
      'How do you handle file upload in Web API?',
      'How do you stream large file downloads?',
      'How do you implement logging in .NET Core?',
      'How do you implement correlation IDs?',
      'How do you debug production API failures?',
      'How do you implement health checks?',
      'How do you create background services?',
      'HostedService vs Hangfire vs Windows Service?',
      'How do you implement rate limiting?',
      'How do you prevent duplicate form submissions?',
      'How do you protect MVC apps from CSRF?',
      'How do you prevent XSS in Razor views?',
      'How do you implement pagination and sorting in APIs?',
      'How do you design DTOs vs entities?',
      'How do you handle AutoMapper safely?',
      'How do you implement repository and unit of work patterns?',
      'When should you avoid repository pattern over EF Core?',
      'How do you handle database transactions in Web API?',
      'How do you implement async/await correctly in controllers?',
      'How do you avoid deadlocks in ASP.NET?',
      'How do you test controllers and services?',
      'How do you mock dependencies in unit tests?',
      'How do you implement API documentation with Swagger?',
      'How do you deploy ASP.NET Core to IIS?',
      'Kestrel vs IIS hosting?',
      'How do you optimize startup time?',
      'How do you handle breaking API changes?',
      'How do you design clean architecture in .NET Core?',
      'Explain a real production issue you solved in ASP.NET Core.'
    ]
  },
  {
    id: 'sec15',
    number: 15,
    title: 'Deep Dive: WCF & ASMX Services',
    h2: 'WCF, ASMX, SOAP & Legacy Service Interview Questions',
    intro: 'Expanded enterprise interview questions focused on WCF, ASMX, SOAP, bindings, security, troubleshooting, and modernization.',
    questions: [
      'What is WCF?',
      'What is ASMX service?',
      'Difference between WCF and Web API?',
      'What is SOAP?',
      'Difference between SOAP and REST?',
      'What is endpoint in WCF?',
      'Explain ABC in WCF.',
      'What is binding?',
      'What is ServiceContract?',
      'What is OperationContract?',
      'What is DataContract?',
      'What is FaultContract?',
      'What is WSDL?',
      'What is BasicHttpBinding?',
      'What is WSHttpBinding?',
      'What is NetTcpBinding?',
      'When should you use NetNamedPipeBinding?',
      'What is duplex communication?',
      'What is one-way operation in WCF?',
      'What is request-reply operation in WCF?',
      'What is transport security?',
      'What is message security?',
      'Transport security vs message security?',
      'How do you implement Windows authentication in WCF?',
      'How do you implement certificate authentication?',
      'How do you handle username/password authentication?',
      'What are service behaviors?',
      'What are endpoint behaviors?',
      'What is throttling in WCF?',
      'What are maxReceivedMessageSize and reader quotas?',
      'How do you handle large SOAP payloads?',
      'How do you enable WCF tracing?',
      'How do you debug SOAP request issues?',
      'How do you handle WCF serialization errors?',
      'What are KnownType and ServiceKnownType?',
      'How do you handle circular references?',
      'What causes CommunicationObjectFaultedException?',
      'How do you close WCF client proxies safely?',
      'How do you handle timeouts in WCF?',
      'OpenTimeout vs SendTimeout vs ReceiveTimeout?',
      'How do you implement centralized error handling with IErrorHandler?',
      'How do you return safe errors without leaking stack traces?',
      'How do you version WCF contracts?',
      'How do you support multiple clients with different contracts?',
      'How do you expose multiple endpoints for one service?',
      'How do you host WCF in IIS?',
      'How do you host WCF in Windows Service?',
      'How do you migrate ASMX to WCF?',
      'How do you migrate WCF to ASP.NET Core Web API?',
      'How do you create a REST wrapper over SOAP service?',
      'How do you improve slow WCF services?',
      'How do you handle intermittent service unavailable errors?',
      'How do you troubleshoot XML namespace mismatch?',
      'How do you secure WCF over HTTPS?',
      'How do you implement MTOM for binary transfer?',
      'How do you consume WCF from .NET Core?',
      'What problems happen after updating service reference?',
      'How do you design DTOs for WCF services?',
      'How do you avoid breaking legacy SOAP clients?',
      'Explain a real WCF production issue and solution.'
    ]
  },
  {
    id: 'sec16',
    number: 16,
    title: 'Deep Dive: MSSQL & ADO.NET',
    h2: 'MSSQL, SQL Server & Data Access Interview Questions',
    intro: 'Expanded MSSQL interview questions with practical answers, SQL examples, and diagrams for performance, transactions, indexes, procedures, and production debugging.',
    questions: [
      'What is SQL Server?',
      'What is ADO.NET architecture?',
      'Difference between DataReader and DataSet?',
      'Difference between stored procedure and function?',
      'What is normalization?',
      'Explain 1NF, 2NF, and 3NF.',
      'What is denormalization and when is it useful?',
      'Primary key vs unique key?',
      'Foreign key vs check constraint?',
      'Clustered index vs non-clustered index?',
      'How many clustered indexes can a table have and why?',
      'What is covering index?',
      'What is included column in SQL Server index?',
      'What is index fragmentation?',
      'Rebuild index vs reorganize index?',
      'What is execution plan?',
      'Index seek vs index scan?',
      'Table scan vs clustered index scan?',
      'What are statistics in SQL Server?',
      'How do stale statistics affect performance?',
      'What is parameter sniffing?',
      'How do you fix parameter sniffing?',
      'What are transactions?',
      'Explain ACID properties.',
      'What is isolation level?',
      'Read committed vs read uncommitted?',
      'Repeatable read vs serializable?',
      'What is snapshot isolation?',
      'What is deadlock?',
      'How do you debug deadlocks?',
      'How do you prevent deadlocks?',
      'What is blocking?',
      'Blocking vs deadlock?',
      'What is SQL injection?',
      'How do you prevent SQL injection?',
      'What is dynamic SQL and when is it risky?',
      'What is sp_executesql?',
      'What is CTE?',
      'CTE vs temp table vs table variable?',
      'What are window functions?',
      'How do ROW_NUMBER, RANK, and DENSE_RANK differ?',
      'How do you find duplicate records?',
      'How do you delete duplicates safely?',
      'How do you implement pagination in SQL Server?',
      'OFFSET FETCH vs ROW_NUMBER pagination?',
      'How do you optimize slow stored procedures?',
      'How do you handle large data exports?',
      'How do you import bulk data?',
      'What is bulk insert?',
      'What is SQL Server Agent?',
      'What are jobs and schedules?',
      'How do you monitor long-running queries?',
      'What is Query Store?',
      'How do you find missing indexes?',
      'How do you avoid over-indexing?',
      'What is tempdb and why does it become a bottleneck?',
      'What is locking?',
      'What are shared, update, and exclusive locks?',
      'What is NOLOCK and why can it be dangerous?',
      'How do you handle millions of records in a search page?',
      'How do you design audit tables?',
      'How do you implement soft delete?',
      'How do you handle schema changes safely?',
      'How do you backup and restore SQL Server database?',
      'Full backup vs differential backup vs log backup?',
      'What is point-in-time recovery?',
      'What is replication?',
      'What is Always On availability group?',
      'How do you secure SQL Server access?',
      'How do you use least privilege in SQL Server?',
      'What is connection pooling?',
      'How do you prevent connection leaks in ADO.NET?',
      'How do you handle timeout errors?',
      'How do you design tables for high write volume?',
      'How do you archive old data?',
      'How do you tune a report query?',
      'How do you troubleshoot high CPU in SQL Server?',
      'How do you troubleshoot high memory usage?',
      'Explain a real SQL performance issue you solved.'
    ]
  }
];

const patterns = [
  {
    match: /auth|jwt|role|cors|csrf|xss|secure|security|https|certificate|username|password|least privilege/i,
    answer: 'Security should be enforced at the server boundary, not only in the UI. I validate identity, authorize each protected operation, use HTTPS, avoid exposing sensitive errors, and log security-relevant events for audit.',
    example: `[Authorize(Roles = "Admin")]
[HttpGet("users")]
public IActionResult GetUsers() => Ok(_service.GetUsers());`,
    diagram: `sequenceDiagram
  participant Client
  participant App
  participant API
  Client->>App: Request protected action
  App->>API: Token/credentials
  API->>API: Authenticate + authorize
  API-->>Client: 200 or 401/403`
  },
  {
    match: /middleware|routing|route|lifecycle|controller|mvc|filter|model binding|viewbag|viewdata|tempdata|razor/i,
    answer: 'In MVC/Core I keep the request flow clean: routing selects an endpoint, model binding builds inputs, filters/middleware handle cross-cutting concerns, the controller calls services, and the view/API response is returned.',
    example: `app.UseRouting();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllerRoute("default", "{controller=Home}/{action=Index}/{id?}");`,
    diagram: `graph LR
  Request --> Middleware
  Middleware --> Routing
  Routing --> Controller
  Controller --> Service
  Service --> Response`
  },
  {
    match: /dependency|singleton|scoped|transient|repository|unit of work|service|clean architecture|dto|automapper/i,
    answer: 'I separate responsibilities: controllers stay thin, services hold business logic, repositories/data access handle persistence, and DTOs protect API contracts. Dependency lifetime matters because wrong lifetimes can create stale state or threading bugs.',
    example: `builder.Services.AddScoped<IOrderService, OrderService>();
builder.Services.AddScoped<IOrderRepository, OrderRepository>();`,
    diagram: `graph TD
  Controller --> Service
  Service --> Repository
  Repository --> Database
  Controller --> DTO[DTO/ViewModel]`
  },
  {
    match: /cache|redis|performance|slow|startup|rate limiting|pagination|sorting|health|logging|correlation|production|debug|cpu|memory/i,
    answer: 'I measure first, then optimize the bottleneck. Common fixes are caching, pagination, async I/O, query tuning, compression, background work, correlation IDs, and dashboards/health checks for production visibility.',
    example: `var value = await cache.GetOrCreateAsync("countries", entry => {
  entry.AbsoluteExpirationRelativeToNow = TimeSpan.FromHours(6);
  return service.LoadCountriesAsync();
});`,
    diagram: `graph TD
  Measure[Logs/metrics/profiler] --> Cause[Find bottleneck]
  Cause --> Cache[Cache hot data]
  Cause --> Tune[Tune query/code]
  Cause --> Scale[Scale or background work]`
  },
  {
    match: /httpclient|socket|retry|circuit|timeout|api|swagger|version|breaking|file|upload|download|stream/i,
    answer: 'For APIs I make contracts explicit, handle failures centrally, use HttpClientFactory for outbound calls, document endpoints with Swagger, and protect large payloads with streaming, limits, and timeouts.',
    example: `builder.Services.AddHttpClient<IPaymentClient, PaymentClient>()
  .SetHandlerLifetime(TimeSpan.FromMinutes(5));`,
    diagram: `sequenceDiagram
  participant Controller
  participant Service
  participant HttpClient
  participant ExternalAPI
  Controller->>Service: call
  Service->>HttpClient: typed client
  HttpClient->>ExternalAPI: timeout/retry policy`
  },
  {
    match: /wcf|asmx|soap|endpoint|binding|contract|wsdl|basichttp|wshttp|nettcp|namedpipe|duplex|one-way|request-reply|mtom|service reference/i,
    answer: 'In WCF I focus on ABC: Address, Binding, and Contract. Most real issues come from mismatched bindings, namespaces, serialization contracts, quotas, timeouts, or client proxy handling.',
    example: `<endpoint address="net.tcp://server/OrderService"
          binding="netTcpBinding"
          contract="IOrderService" />`,
    diagram: `graph TD
  Client --> Endpoint
  Endpoint --> Address
  Endpoint --> Binding
  Endpoint --> Contract
  Contract --> Service`
  },
  {
    match: /fault|error|exception|trace|tracing|serialization|knowntype|circular|communicationobjectfaulted|proxy|intermittent|namespace|version/i,
    answer: 'For legacy service troubleshooting I capture the exact request, enable tracing/logging, compare client config with service config, and return typed/safe faults. Faulted WCF channels should be aborted, not reused.',
    example: `try { client.Close(); }
catch { client.Abort(); throw; }`,
    diagram: `graph LR
  Failure --> Logs[Trace/message logs]
  Logs --> Config[Compare config/WSDL]
  Config --> Fix[Binding/contract/timeout fix]
  Fix --> Test[Replay request]`
  },
  {
    match: /index|execution plan|seek|scan|statistics|parameter sniffing|fragmentation|query store|missing indexes|over-index/i,
    answer: 'For SQL performance I read the actual execution plan and wait stats before changing code. I check seeks vs scans, stale statistics, bad parameter sniffing, missing indexes, over-indexing, and expensive key lookups.',
    example: `SET STATISTICS IO, TIME ON;
-- Include actual execution plan, then test the query`,
    diagram: `graph TD
  SlowQuery --> Plan[Actual execution plan]
  Plan --> Index[Index seek/scan]
  Plan --> Stats[Statistics]
  Plan --> Sniff[Parameter sniffing]
  Plan --> Fix[Tested fix]`
  },
  {
    match: /transaction|acid|isolation|deadlock|blocking|lock|nolock|snapshot/i,
    answer: 'Transactions protect consistency, but isolation and locking must be chosen carefully. I keep transactions short, access objects in a consistent order, add useful indexes, and use snapshot isolation only when it fits the workload.',
    example: `BEGIN TRAN;
UPDATE Accounts SET Balance -= 100 WHERE Id = 1;
UPDATE Accounts SET Balance += 100 WHERE Id = 2;
COMMIT;`,
    diagram: `graph LR
  Transaction --> Locks
  Locks --> Blocking
  Blocking --> Deadlock
  Deadlock --> Retry[Retry + shorter transaction]`
  },
  {
    match: /sql injection|dynamic sql|sp_executesql|connection pooling|connection leaks|ado.net|datareader|dataset|stored procedure|function/i,
    answer: 'For data access I use parameterized queries, dispose connections/commands/readers, avoid string-concatenated SQL, and choose streaming or disconnected models based on memory and workflow needs.',
    example: `using var cmd = new SqlCommand(
  "SELECT * FROM Users WHERE Email = @Email", conn);
cmd.Parameters.Add("@Email", SqlDbType.NVarChar).Value = email;`,
    diagram: `graph LR
  App --> Connection
  Connection --> Command
  Command --> Parameters
  Parameters --> SQLServer`
  },
  {
    match: /cte|temp table|table variable|window|row_number|rank|duplicates|pagination|bulk|export|import|agent|backup|restore|replication|always on|archive|audit|soft delete/i,
    answer: 'I pick the SQL feature based on data size and operational needs. CTEs are good for readable one-shot logic, temp tables help larger staged processing, window functions solve ranking/paging, and jobs/backups handle operations.',
    example: `WITH Ranked AS (
  SELECT *, ROW_NUMBER() OVER(PARTITION BY Email ORDER BY Id) AS rn
  FROM Users
)
SELECT * FROM Ranked WHERE rn = 1;`,
    diagram: `graph TD
  DataNeed --> Query[CTE/window function]
  DataNeed --> Temp[Temp table]
  DataNeed --> Job[SQL Agent job]
  DataNeed --> Backup[Backup/restore plan]`
  }
];

const fallback = {
  answer: 'I would explain the concept, connect it to a real production scenario, show the common mistake, and then give the practical implementation. A strong interview answer should include correctness, performance, security, and maintainability.',
  example: `// Keep the implementation small, testable, and observable.
// Validate inputs, handle errors, log context, and measure performance.`,
  diagram: `graph LR
  Requirement --> Design
  Design --> Implementation
  Implementation --> Test
  Test --> Production`
};

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function pick(question) {
  return patterns.find(p => p.match.test(question)) || fallback;
}

function cardClass(question) {
  if (/security|auth|csrf|xss|sql injection|deadlock|fault|error|exception|production|debug/i.test(question)) return 'card-red';
  if (/architecture|lifecycle|contract|binding|index|transaction|backup|always on/i.test(question)) return 'card-teal';
  return 'card-blue';
}

function renderSection(section) {
  let html = `
<!-- Section ${section.number} -->
<section id="${section.id}" class="doc-section">
    <div class="section-badge"><span class="num">${section.number}</span><span class="title">${escapeHtml(section.title)}</span></div>
    <h2>${escapeHtml(section.h2)}</h2>
    <p>${escapeHtml(section.intro)}</p>
    <div class="qa-grid">
`;

  section.questions.forEach((question, index) => {
    const pattern = pick(question);
    html += `
        <div class="qa-card ${cardClass(question)}">
            <div class="qa-question">Q${index + 1}: ${escapeHtml(question)}</div>
            <div class="qa-answer">
                <p><strong>Answer:</strong> ${escapeHtml(pattern.answer)}</p>
                <p><strong>Example:</strong></p>
                <div class="mono card-mono code-block">${escapeHtml(pattern.example)}</div>
                <p><strong>Diagram:</strong></p>
                <div class="mermaid">${pattern.diagram}</div>
            </div>
        </div>
`;
  });

  html += `
    </div>
</section>
`;
  return html;
}

function removeSection(content, sectionNumber) {
  const marker = `<!-- Section ${sectionNumber} -->`;
  let idx = content.indexOf(marker);
  while (idx !== -1) {
    const next = content.indexOf('<!-- Section ', idx + marker.length);
    const end = next === -1 ? content.length : next;
    content = content.slice(0, idx) + content.slice(end);
    idx = content.indexOf(marker);
  }
  return content;
}

const indexPath = path.join(__dirname, 'index.html');
let content = fs.readFileSync(indexPath, 'utf8');

[14, 15, 16].forEach(num => {
  content = removeSection(content, num);
});

const insertion = sections.map(renderSection).join('\n');
const section17 = content.indexOf('<!-- Section 17 -->');
if (section17 === -1) {
  throw new Error('Could not find Section 17 insertion point.');
}

content = content.slice(0, section17) + insertion + '\n' + content.slice(section17);
fs.writeFileSync(indexPath, content, 'utf8');

console.log(`Updated backend sections with ${sections.reduce((sum, s) => sum + s.questions.length, 0)} questions.`);
