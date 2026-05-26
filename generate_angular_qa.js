const fs = require('fs');
const path = require('path');

const rawQuestionBank = `
# Angular Scenario-Based Interview Questions (3-7 Years Experience)
## Routing & Navigation
1. How would you preserve search filters and scroll position when navigating back from a details page?
2. User manually changes URL to /admin. How do you prevent unauthorized access?
3. How do you handle dynamic breadcrumb generation in nested routes?
4. How would you implement role-based routing for Admin/User/SuperAdmin?
5. How do you lazy load modules in a large enterprise application?
6. What problems occur if all modules are eagerly loaded?
7. How would you implement route-level feature toggles?
8. How do you prevent duplicate API calls during route changes?
9. How would you restore page state after browser refresh?
10. How do you handle route reuse strategy for performance optimization?
## Auth Guards / Security
11. JWT token expired while user is active. How do you handle it?
12. How do you refresh JWT token automatically?
13. How would you implement session timeout warning?
14. How do you secure Angular routes and backend APIs together?
15. What is the difference between CanActivate and CanLoad in real projects?
16. How would you prevent direct API access without frontend?
17. How do you store sensitive tokens securely?
18. How do you handle multiple tab logout synchronization?
19. How would you implement SSO login flow in Angular?
20. How do you prevent unauthorized component rendering?
## Change Detection / Performance
21. Large table rendering is slow. How do you optimize it?
22. Explain a real scenario where OnPush improved performance.
23. How do you detect unnecessary change detection cycles?
24. What problems happen with too many subscriptions?
25. How would you optimize a dashboard with multiple API calls?
26. Why does AngularJS watcher architecture become slow?
27. How do signals improve performance compared to RxJS-only approaches?
28. How would you optimize infinite scrolling?
29. What causes ExpressionChangedAfterItHasBeenCheckedError?
30. How do you debug memory leaks in Angular?
## RxJS / Async Handling
31. Difference between switchMap and mergeMap in real projects?
32. How would you cancel previous API calls during search typing?
33. How do you prevent nested subscriptions?
34. How would you handle dependent API calls?
35. How do you retry failed API calls with exponential backoff?
36. How would you share API response across components?
37. Difference between Subject, BehaviorSubject, ReplaySubject?
38. How do you avoid race conditions in Angular?
39. How would you implement polling for live dashboard updates?
40. How do you unsubscribe automatically in Angular 19?
## Forms
41. How do you build dynamic forms from backend JSON?
42. How do you implement cross-field validation?
43. How would you validate duplicate values inside FormArray?
44. How do you optimize huge reactive forms?
45. How do you track dirty fields only?
46. How would you autosave form data?
47. Difference between setValue and patchValue?
48. How do you handle server-side validation errors?
49. How would you create reusable custom validators?
50. How do you prevent accidental form navigation?
## Component Communication
51. How do sibling components communicate?
52. When should you use Input/Output vs shared service?
53. How would you avoid prop drilling in Angular?
54. How do you share state across lazy-loaded modules?
55. How do signals simplify component communication?
56. How would you implement global notification service?
57. How do you avoid tight coupling between components?
58. When would you use ViewChild in enterprise apps?
59. How do you dynamically create components?
60. How would you implement reusable modal architecture?
## Real-Time Enterprise Scenarios
61. Users report duplicate API calls. How do you debug?
62. Application becomes slow after long usage. How do you investigate?
63. API response structure changes unexpectedly. How do you handle it?
64. Backend is slow. How do you improve frontend experience?
65. How do you implement centralized error handling?
66. Production build works differently than local. How do you debug?
67. Large ATS search page has thousands of records. How do you optimize?
68. How would you implement caching strategy?
69. How do you handle feature-based deployments?
70. How do you implement audit logging in frontend?
## Angular Architecture
71. How do you structure enterprise Angular applications?
72. How do you split modules in microfrontend architecture?
73. Smart component vs dumb component real usage?
74. How do you implement shared UI library?
75. How do you manage environment configurations?
76. How do you implement scalable folder structure?
77. How do you avoid circular dependencies?
78. How do you design reusable services?
79. How do you manage application-wide state?
80. How do you migrate AngularJS to Angular incrementally?
## API / HTTP / Interceptors
81. How do HTTP interceptors work internally?
82. How do you add JWT token to every request?
83. How do you handle global API errors?
84. How do you implement request timeout?
85. How do you prevent duplicate requests?
86. How would you handle file upload with progress bar?
87. How do you implement API retry strategy?
88. How do you debug CORS issues?
89. How do you implement optimistic UI updates?
90. How do you handle API versioning in frontend?
## Advanced Angular
91. Difference between signals and observables?
92. How do computed signals work internally?
93. How does Angular hydration work?
94. What problems does zone.js solve?
95. How do standalone components improve architecture?
96. How would you implement SSR in Angular?
97. How do you optimize bundle size?
98. What is tree shaking and how does Angular use it?
99. How do you debug production performance issues?
100. Explain a complex Angular issue you solved in a real project.

# Advanced Angular Scenario-Based Interview Questions (Data Handling + Real-Time Enterprise)
## API & Data Handling
1. How would you handle API response transformation before displaying UI?
2. Backend returns nested JSON with huge data. How do you optimize mapping?
3. How would you handle null/undefined values safely in enterprise applications?
4. API response structure changes frequently. How do you make frontend stable?
5. How do you implement centralized data mapping?
6. How do you handle partial API failures in dashboard pages?
7. Multiple APIs depend on each other. How do you sequence them?
8. How do you cache master data like countries/states/skills?
9. How would you prevent repeated API calls when revisiting a page?
10. How do you handle stale cached data?
## Search & Filtering
11. How would you implement server-side filtering?
12. Difference between client-side and server-side pagination?
13. How do you optimize global search with large datasets?
14. How do you implement debouncing in search?
15. User types very fast causing multiple API calls. How do you solve it?
16. How do you preserve filters after navigation?
17. How do you implement advanced multi-filter search?
18. How would you implement keyword suggestion system like LinkedIn?
19. How do you highlight matched keywords dynamically?
20. How would you implement recent search history?
## Table/Grid Handling
21. Large table with 50k records becomes slow. What will you do?
22. How do you implement virtual scrolling?
23. How would you handle dynamic columns from backend?
24. How do you export huge grid data efficiently?
25. How do you implement row-level permissions?
26. How do you implement sticky headers in large tables?
27. How do you optimize AG-Grid or Material Table?
28. How do you implement dynamic sorting?
29. How would you handle inline editing in grids?
30. How do you preserve table state during navigation?
## State Management
31. When should you use signals vs RxJS?
32. How would you manage application-wide shared data?
33. How do you restore state after refresh?
34. How do you avoid unnecessary state duplication?
35. How do you manage complex filter states?
36. How do you synchronize state across tabs?
37. How would you implement undo/redo functionality?
38. How do you manage form state in multi-step forms?
39. How do you persist user preferences?
40. How do you manage state in lazy-loaded modules?
## Real-Time & Live Data
41. How do you implement live notifications?
42. How do you update UI without full refresh?
43. How would you implement WebSocket handling?
44. How do you prevent UI flickering during live updates?
45. How do you handle reconnect logic in real-time apps?
46. How do you merge old data with incoming live data?
47. How would you implement live chat architecture?
48. How do you avoid duplicate messages in real-time systems?
49. How do you handle out-of-order real-time events?
50. How do you implement real-time dashboards?
## File Handling
51. How would you upload large files chunk by chunk?
52. How do you show upload progress?
53. How would you validate file type and size?
54. How do you implement drag-and-drop upload?
55. How do you securely download files?
56. How do you preview files before upload?
57. How would you handle upload failure retry?
58. How do you process Excel/CSV files in Angular?
59. How do you prevent duplicate file uploads?
60. How would you implement bulk upload validation?
## Forms & Data Validation
61. Dynamic form generated from backend config - how will you implement?
62. How do you validate dependent fields?
63. How do you dynamically add/remove form controls?
64. How do you handle very large forms efficiently?
65. How would you autosave form drafts?
66. How do you implement reusable form components?
67. How do you display backend validation errors properly?
68. How do you implement conditional validations?
69. How do you prevent duplicate submissions?
70. How do you optimize reactive forms performance?
## Error Handling & Edge Cases
71. API suddenly becomes slow. How do you improve UX?
72. User loses internet during form submit. What happens?
73. How do you handle API timeout globally?
74. How do you implement fallback UI?
75. How do you show meaningful errors to users?
76. How do you log frontend errors?
77. How do you debug random production issues?
78. How do you prevent white screen crashes?
79. How do you recover application state after crash?
80. How do you handle version mismatch after deployment?
## Security & Enterprise Scenarios
81. How do you prevent XSS attacks in Angular?
82. How do you sanitize dynamic HTML?
83. How do you secure localStorage/sessionStorage?
84. How do you implement role-based UI rendering?
85. How do you prevent API manipulation from browser?
86. How do you secure file uploads?
87. How do you implement audit tracking?
88. How do you prevent route tampering?
89. How do you implement secure logout?
90. How do you handle concurrent login sessions?
## Architecture & Scalability
91. How would you design scalable Angular architecture for ATS systems?
92. How do you structure reusable modules?
93. How do you build reusable shared components?
94. How do you implement microfrontend architecture?
95. How do you reduce initial bundle size?
96. How do you split application by features?
97. How do you optimize lazy loading strategy?
98. How do you manage multiple environment deployments?
99. How do you implement feature flags?
100. How do you prepare Angular applications for millions of users?

# More Advanced Angular Real-Time Scenario Questions
## Debugging & Production Issues
1. Application works locally but fails in production. How do you debug?
2. User reports random blank screen issue. Where do you start investigation?
3. One component re-renders continuously. How do you identify cause?
4. How do you debug intermittent API failures?
5. Production build size suddenly increased. How do you analyze?
6. How do you identify memory leaks in Angular applications?
7. How do you debug slow initial page load?
8. Browser freezes after opening dashboard for long time. What could be reasons?
9. How do you trace performance bottlenecks in Angular?
10. How do you debug route navigation issues?
## Component Design Questions
11. How do you design highly reusable components?
12. When should component logic move into service?
13. How do you avoid gigantic components?
14. How do you break large pages into reusable modules?
15. How do you design configurable components?
16. How do you handle dynamic templates?
17. How do you implement reusable card/grid/list systems?
18. How do you prevent duplicate business logic across components?
19. How do you build enterprise-level shared component library?
20. How do you design scalable modal architecture?
## Signals & Modern Angular
21. When should signals NOT be used?
22. Signals vs NgRx - which is better and when?
23. How do computed signals improve performance?
24. How do effects work internally?
25. How do signals avoid unnecessary rendering?
26. How would you migrate RxJS-based code to signals?
27. How do you combine signals with observables?
28. How do you debug signal dependency issues?
29. What problems can occur with excessive effects?
30. How do signals behave during component destruction?
## Enterprise ATS / Job Portal Scenarios
31. How do you implement saved jobs feature?
32. How do you handle huge job search result pages?
33. How do you preserve filters after login/logout?
34. How do you implement infinite scrolling for jobs?
35. How do you optimize resume upload workflows?
36. How do you implement candidate comparison screens?
37. How do you implement advanced keyword matching?
38. How do you handle duplicate candidate applications?
39. How do you implement dynamic job recommendations?
40. How do you restore previous candidate search session?
## Microfrontend / Large Organization Questions
41. How do multiple Angular apps communicate?
42. How do you share authentication across microfrontends?
43. How do you avoid dependency conflicts in microfrontends?
44. How do you deploy modules independently?
45. How do you share common UI library across teams?
46. How do you handle version mismatches?
47. How do you implement centralized state in microfrontends?
48. How do you handle routing between micro apps?
49. How do you optimize performance in large enterprise portals?
50. How do you structure monorepo Angular projects?
## Advanced RxJS Scenarios
51. When would switchMap cause issues?
52. How do you avoid subscription nesting in complex flows?
53. How do you share latest API result across components?
54. How do you handle API cancellation?
55. How do you combine multiple live streams?
56. How do you throttle high-frequency events?
57. How do you avoid duplicate emissions?
58. How do you debug RxJS pipelines?
59. How do you handle sequential async workflows?
60. How do you implement offline queue synchronization?
## Browser / DOM / UI Questions
61. How do you optimize DOM-heavy applications?
62. How do you detect viewport visibility?
63. How do you implement lazy image loading?
64. How do you optimize animations?
65. How do you reduce layout shifts?
66. How do you implement responsive enterprise dashboards?
67. How do you dynamically render components from JSON?
68. How do you handle browser back/forward navigation state?
69. How do you preserve scroll position in complex pages?
70. How do you optimize rendering of nested accordions/tabs?
## Integration Questions
71. How do you integrate Angular with .NET backend efficiently?
72. How do you implement SignalR in Angular?
73. How do you consume GraphQL APIs?
74. How do you integrate third-party authentication providers?
75. How do you handle large payload API responses?
76. How do you implement secure payment integration?
77. How do you integrate Angular with legacy AngularJS systems?
78. How do you embed Angular apps inside other applications?
79. How do you integrate analytics tracking?
80. How do you handle API schema evolution?
## Testing & Quality
81. How do you unit test complex reactive forms?
82. How do you test route guards?
83. How do you mock HTTP requests?
84. How do you test signals?
85. How do you test dynamic components?
86. How do you perform end-to-end testing?
87. How do you test lazy-loaded modules?
88. How do you ensure enterprise code quality?
89. How do you reduce flaky tests?
90. How do you test complex RxJS logic?
## Architecture Decision Questions
91. Why would you choose Angular over React for enterprise apps?
92. When would you choose NgRx?
93. When should business logic stay in frontend?
94. How much validation should frontend do?
95. How do you decide between SSR and CSR?
96. When should APIs aggregate data vs frontend aggregation?
97. How do you decide component boundaries?
98. How do you choose between signals and observables?
99. What architectural mistakes slow down enterprise Angular apps?
100. If redesigning an old Angular app, what would you improve first?
`;

const answerPatterns = [
  {
    match: /jwt|token|sso|auth|unauthor|logout|login|session|role|xss|sanitize|secure|cors|route tampering|payment/i,
    answer: 'Secure it in layers: validate identity in Angular for UX, enforce authorization again on the API, keep tokens short-lived, refresh safely, and never trust hidden UI alone. For enterprise apps I also add audit logs, central error handling, and clear logout/session behavior across tabs.',
    example: `export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);
  return auth.hasValidSession() ? true : router.createUrlTree(['/login']);
};`,
    diagram: `sequenceDiagram
  participant User
  participant Angular
  participant API
  User->>Angular: Open protected page
  Angular->>Angular: Check guard/role
  Angular->>API: Request with token
  API->>API: Validate token and permission
  API-->>Angular: Allowed or 401/403`
  },
  {
    match: /route|routing|breadcrumb|navigation|scroll|refresh|browser back|canactivate|canload|lazy load|feature toggle/i,
    answer: 'I keep routing predictable by putting permission, feature flag, resolver, and state restoration logic near the route definition. Query params hold shareable state, services hold temporary UI state, and guards protect navigation before the component loads.',
    example: `{
  path: 'admin',
  canMatch: [roleGuard],
  data: { roles: ['Admin'], breadcrumb: 'Admin' },
  loadChildren: () => import('./admin/admin.routes').then(m => m.ADMIN_ROUTES)
}`,
    diagram: `graph LR
  URL[URL change] --> Guard[Guard or canMatch]
  Guard -->|allowed| Resolver[Resolver/state]
  Resolver --> Component[Feature component]
  Guard -->|blocked| Login[Login or access denied]`
  },
  {
    match: /rxjs|observable|subject|switchmap|mergemap|subscription|polling|race|cancel|async|streams|emissions|throttle|queue/i,
    answer: 'I model the workflow as one RxJS pipeline instead of nested subscriptions. The operator choice depends on behavior: switchMap cancels old work, concatMap preserves order, mergeMap allows parallel work, and shareReplay prevents repeated HTTP calls.',
    example: `results$ = this.search.valueChanges.pipe(
  debounceTime(300),
  distinctUntilChanged(),
  switchMap(term => this.api.search(term)),
  shareReplay({ bufferSize: 1, refCount: true })
);`,
    diagram: `graph LR
  Input[User/input stream] --> Operators[RxJS operators]
  Operators --> HTTP[HTTP/live source]
  HTTP --> State[Shared state]
  State --> UI[Template async pipe]`
  },
  {
    match: /form|validator|validation|formarray|dirty|autosave|submit|draft|duplicate/i,
    answer: 'I build forms with typed reactive forms, isolate validation rules, and keep expensive work out of every valueChanges event. Dynamic forms come from backend config, but the frontend still maps that config into explicit controls, validators, and display rules.',
    example: `form = this.fb.group({
  start: ['', Validators.required],
  end: ['', Validators.required]
}, { validators: dateRangeValidator('start', 'end') });`,
    diagram: `graph TD
  Config[Backend field config] --> Builder[Form builder]
  Builder --> Controls[Form controls]
  Controls --> Validators[Sync/async validators]
  Validators --> Submit[DTO submit]`
  },
  {
    match: /table|grid|50k|virtual|pagination|sorting|filter|search|ats|records|infinite|sticky|export/i,
    answer: 'For large data I avoid rendering everything. I use server-side paging/filtering/sorting, virtual scroll for visible rows only, trackBy for stable DOM nodes, and cache filter state so users can return without losing context.',
    example: `items$ = this.filters.valueChanges.pipe(
  debounceTime(250),
  switchMap(filter => this.api.getJobs({ ...filter, page: this.page() }))
);`,
    diagram: `graph LR
  Filters[Filters/search] --> API[Server paging API]
  API --> Cache[Page cache]
  Cache --> Virtual[Virtual scroll viewport]
  Virtual --> Rows[Visible rows only]`
  },
  {
    match: /performance|slow|bundle|memory|leak|change detection|onpush|watcher|hydration|ssr|tree shaking|freeze|layout|dom|animations/i,
    answer: 'I measure first, then optimize the biggest cost. Common Angular fixes are lazy loading, OnPush or signals for smaller render scope, virtual scroll, trackBy, unsubscribing with DestroyRef, and bundle analysis for unused libraries.',
    example: `@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: '<li *ngFor="let user of users(); trackBy: trackById">{{ user.name }}</li>'
})
export class UsersComponent { users = signal<User[]>([]); }`,
    diagram: `graph TD
  Measure[Profiler/bundle analyzer] --> Cause[Find real bottleneck]
  Cause --> Render[Reduce rendering]
  Cause --> Network[Reduce network/bundle]
  Cause --> Memory[Clean subscriptions/listeners]`
  },
  {
    match: /signal|computed|effect|ngrx|state|preferences|undo|redo|shared data|lazy-loaded modules|restore state/i,
    answer: 'I choose state tools by scope. Component-local state is great with signals, async server streams stay natural in RxJS, and complex cross-page workflows may need a store. The key is one source of truth and persistence only for state that must survive refresh.',
    example: `private readonly users = signal<User[]>([]);
readonly activeUsers = computed(() => this.users().filter(u => u.active));
setUsers(value: User[]) { this.users.set(value); }`,
    diagram: `graph LR
  Component[Component state] --> Signals[Signals/computed]
  Server[Server stream] --> RxJS[Observable]
  Signals --> UI[Template]
  RxJS --> Store[Shared store/service]`
  },
  {
    match: /component|input|output|sibling|prop drilling|viewchild|dynamic component|modal|reusable|ui library|smart|dumb|template/i,
    answer: 'I keep components small and purpose-driven. Parent-child communication uses Input/Output, sibling or cross-feature communication uses a shared service/store, and reusable UI components expose configuration without owning business rules.',
    example: `@Component({ selector: 'app-user-card', template: '{{ user().name }}' })
export class UserCardComponent {
  user = input.required<User>();
  selected = output<number>();
}`,
    diagram: `graph TD
  Smart[Smart/container component] --> Dumb[Reusable presentational component]
  Dumb -->|output event| Smart
  Smart --> Service[Feature service/store]
  Service --> API[Backend API]`
  },
  {
    match: /api|http|interceptor|request|response|mapping|cache|timeout|retry|version|optimistic|backend|payload|graphql|schema/i,
    answer: 'I keep API handling centralized: interceptors add headers and handle common failures, services own endpoints, mappers convert DTOs into UI models, and retry/cache rules are explicit so the app does not hide stale or broken data.',
    example: `export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = inject(AuthService).accessToken();
  return next(req.clone({ setHeaders: { Authorization: \`Bearer \${token}\` } }));
};`,
    diagram: `sequenceDiagram
  participant Component
  participant Service
  participant Interceptor
  participant API
  Component->>Service: call method
  Service->>Interceptor: HttpClient request
  Interceptor->>API: headers/retry/timeout
  API-->>Service: DTO
  Service-->>Component: UI model`
  },
  {
    match: /websocket|signalr|live|real-time|notification|chat|dashboard|reconnect|out-of-order|duplicate messages/i,
    answer: 'For real-time screens I separate connection management from UI state. The service handles reconnect, heartbeat, deduplication, ordering, and backoff; components only subscribe to clean view models so live updates do not flicker.',
    example: `messages$ = this.socket.events$.pipe(
  scan((all, msg) => upsertById(all, msg), [] as Message[]),
  shareReplay({ bufferSize: 1, refCount: true })
);`,
    diagram: `sequenceDiagram
  participant Server
  participant SocketService
  participant Store
  participant UI
  Server-->>SocketService: event
  SocketService->>Store: dedupe/order/merge
  Store-->>UI: render view model`
  },
  {
    match: /file|upload|download|excel|csv|drag-and-drop|preview|bulk/i,
    answer: 'I validate files on the client for fast feedback and validate again on the server for security. Large uploads should be chunked, resumable, and tracked with progress; downloads should use authorized URLs or blob responses.',
    example: `this.http.post('/api/files', formData, {
  reportProgress: true,
  observe: 'events'
}).subscribe(event => this.progress.set(getUploadPercent(event)));`,
    diagram: `graph LR
  Pick[Select/drop file] --> Validate[Type/size validation]
  Validate --> Upload[Chunked upload]
  Upload --> Progress[Progress UI]
  Upload --> Server[Server virus scan/storage]`
  },
  {
    match: /architecture|microfrontend|monorepo|module|folder|environment|circular|scalable|millions|deploy|feature flag|angularjs|legacy/i,
    answer: 'I structure Angular by business features, with shared UI kept dependency-light and core services kept singleton. For large organizations I prefer clear boundaries, lazy feature routes, typed contracts, feature flags, and incremental migration instead of big rewrites.',
    example: `src/app/
  core/        // auth, interceptors, app shell
  shared/ui/   // reusable presentational components
  features/jobs/
  features/admin/`,
    diagram: `graph TD
  App[App shell] --> Core[Core services]
  App --> Features[Lazy feature areas]
  Features --> Shared[Shared UI]
  Features --> API[Typed API services]`
  },
  {
    match: /test|unit|mock|quality|e2e|flaky/i,
    answer: 'I test behavior at the right level: pure validators and mappers with unit tests, guards/interceptors with Angular testing utilities, RxJS with controlled schedulers, and critical user journeys with e2e tests.',
    example: `it('blocks admin route for normal users', () => {
  auth.role.set('User');
  expect(guard(routeWithRole('Admin'), state)).toEqual(router.createUrlTree(['/denied']));
});`,
    diagram: `graph LR
  Unit[Unit tests] --> Integration[Angular TestBed]
  Integration --> E2E[Critical e2e flows]
  E2E --> CI[CI quality gate]`
  }
];

const fallback = {
  answer: 'I would first clarify the expected behavior, then design a small, testable Angular flow with clear ownership between component, service, state, and API. The production-ready answer should include error handling, loading states, security checks, and measurable performance.',
  example: `loadData() {
  this.vm$ = this.service.getData().pipe(
    map(dto => toViewModel(dto)),
    catchError(() => of(emptyViewModel))
  );
}`,
  diagram: `graph LR
  Component --> Service
  Service --> API
  Service --> State
  State --> UI`
};

function parseQuestionBank(markdown) {
  const banks = [];
  let bank = null;
  let category = null;

  markdown.split(/\r?\n/).forEach(line => {
    const trimmed = line.trim();
    if (!trimmed) return;

    if (trimmed.startsWith('# ')) {
      bank = { title: trimmed.slice(2), categories: [] };
      banks.push(bank);
      category = null;
      return;
    }

    if (trimmed.startsWith('## ')) {
      if (!bank) return;
      category = { title: trimmed.slice(3), questions: [] };
      bank.categories.push(category);
      return;
    }

    const match = trimmed.match(/^\d+\.\s+(.*)$/);
    if (match && category) {
      category.questions.push(match[1]);
    }
  });

  return banks;
}

function pickPattern(question, categoryTitle) {
  const text = `${categoryTitle} ${question}`;
  return answerPatterns.find(pattern => pattern.match.test(text)) || fallback;
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function cardClass(category) {
  if (/security|auth|error|debug|production/i.test(category)) return 'card-red';
  if (/architecture|advanced|microfrontend|decision/i.test(category)) return 'card-teal';
  return 'card-blue';
}

function renderQuestionCard(question, category, number) {
  const pattern = pickPattern(question, category);
  return `
        <div class="qa-card ${cardClass(category)}">
            <div class="qa-question">Q${number}: ${escapeHtml(question)}</div>
            <div class="qa-answer">
                <p><strong>Answer:</strong> ${escapeHtml(pattern.answer)}</p>
                <p><strong>Example:</strong></p>
                <div class="mono card-mono code-block">${escapeHtml(pattern.example)}</div>
                <p><strong>Diagram:</strong></p>
                <div class="mermaid">${pattern.diagram}</div>
            </div>
        </div>`;
}

function renderSection() {
  const banks = parseQuestionBank(rawQuestionBank);
  let globalNumber = 1;

  let html = `
<!-- Section 17 -->
<section id="sec17" class="doc-section">
    <div class="section-badge"><span class="num">17</span><span class="title">Deep Dive: Angular & Frontend</span></div>
    <h2>Angular Scenario-Based Interview Questions</h2>
    <p>This section contains the complete Angular scenario question bank with interview-ready answers, practical examples, and diagrams.</p>
`;

  banks.forEach((bank, bankIndex) => {
    html += `
    <h3 class="qa-category-title">Part ${bankIndex + 1}: ${escapeHtml(bank.title)}</h3>
`;

    bank.categories.forEach(category => {
      html += `
    <h4 class="qa-category-title">${escapeHtml(category.title)}</h4>
    <div class="qa-grid">
`;
      category.questions.forEach(question => {
        html += renderQuestionCard(question, category.title, globalNumber++);
      });
      html += `
    </div>
`;
    });
  });

  html += `</section>
`;

  return { html, total: globalNumber - 1 };
}

const indexHtmlPath = path.join(__dirname, 'index.html');
const { html, total } = renderSection();
let content = fs.readFileSync(indexHtmlPath, 'utf8');

const sectionStart = '<!-- Section 17 -->';
const nextSection = '<!-- Section 18 -->';
const startIdx = content.indexOf(sectionStart);
const endIdx = content.indexOf(nextSection, startIdx);

if (startIdx === -1 || endIdx === -1) {
  throw new Error('Could not find Section 17 boundaries in index.html');
}

content = content.slice(0, startIdx) + html + '\n\n' + content.slice(endIdx);
fs.writeFileSync(indexHtmlPath, content, 'utf8');
console.log(`Updated Section 17 with ${total} Angular questions.`);
