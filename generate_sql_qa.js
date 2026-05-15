const fs = require('fs');

const theoryQAs = [
  {
    q: "What is ADO.NET Architecture?",
    a: "ADO.NET is like a **Water Pipe System**. The **Connection** is the pipe, the **Command** is the valve, and the **DataReader** is the water flowing through. You can also have a **DataSet**, which is like a **Water Tank** that stores data even when the pipe is disconnected.",
    diagram: `graph LR
    DB[(Database)] --- Conn[Connection]
    Conn --- Cmd[Command]
    Cmd --> Reader[DataReader - Stream]
    Cmd --> Adapter[DataAdapter]
    Adapter --> Set[DataSet - Tank]`,
    code: `using (var conn = new SqlConnection(str)) {
    conn.Open();
    var cmd = new SqlCommand("SELECT...", conn);
    var reader = cmd.ExecuteReader();
}`
  },
  {
    q: "Difference between Clustered and Non-Clustered Index?",
    a: "A **Clustered Index** is like an **Address Book** where the names are actually sorted alphabetically on the pages. A **Non-Clustered Index** is like the **Index at the back of a book**—it tells you the page number but doesn't change the order of the actual pages.",
    diagram: `graph TD
    subgraph Clustered [Clustered - Data is Sorted]
    C1[Row 1]
    C2[Row 2]
    C3[Row 3]
    end
    subgraph NonClustered [Non-Clustered - Separate List]
    N1[Key A -> Page 5]
    N2[Key B -> Page 2]
    end`,
    code: `CREATE CLUSTERED INDEX IX_ID ON Users(Id);
CREATE INDEX IX_Name ON Users(Name); // Non-Clustered`
  },
  {
    q: "What is Normalization?",
    a: "Normalization is like **Organizing a Closet**. Instead of keeping everything in one big messy pile (one big table), you put shirts in one box, shoes in another, and socks in a third. This prevents duplicates and makes things easy to find.",
    diagram: `graph LR
    BigTable[Messy Big Table] -->|Normalize| T1[Users]
    BigTable -->|Normalize| T2[Orders]
    BigTable -->|Normalize| T3[Addresses]`,
    code: `// Move 'City' out of 'Users' into a 'Cities' table 
// to avoid repeating "New York" 1,000 times.`
  },
  {
    q: "Difference between INNER JOIN and LEFT JOIN?",
    a: "**INNER JOIN** is like a 'Double Date'—only couples where both people show up are included. **LEFT JOIN** is like a 'Party'—everyone on the guest list (Left Table) is included, even if they didn't bring a date (Right Table).",
    diagram: `graph LR
    subgraph InnerJoin [Inner Join]
    A[A] --- B[B]
    end
    subgraph LeftJoin [Left Join]
    L[Left Table] --- R[Match?]
    L --- Empty[NULL]
    end`,
    code: `SELECT * FROM Users u INNER JOIN Orders o ON u.Id = o.UserId;
SELECT * FROM Users u LEFT JOIN Orders o ON u.Id = o.UserId;`
  },
  {
    q: "What is a SQL Transaction (ACID)?",
    a: "A Transaction is like a **Bank Transfer**. If you move $100 from Account A to Account B, either **both** happen, or **nothing** happens. You can't have the money leave A but never arrive at B.",
    diagram: `graph TD
    Start[Start Transaction] --> Op1[Subtract $100]
    Op1 --> Op2[Add $100]
    Op2 --> Commit[Success - Save Both]
    Op1 -- Fail --> Rollback[Undo Everything]`,
    code: `BEGIN TRANSACTION;
UPDATE Acc SET Bal = Bal - 100;
UPDATE Acc SET Bal = Bal + 100;
COMMIT;`
  }
];

const scenarioQAs = [
  {
    q: "A query that used to be fast is now very slow. Why?",
    a: "It's likely because the 'Closet' (Table) has become too full and you don't have enough 'Labels' (Indexes). I would check if the database is doing a **Table Scan** (looking through every single row) instead of an **Index Seek**.",
    diagram: `graph LR
    Scan[Table Scan - Slow Search]
    Seek[Index Seek - Fast Find]`,
    code: `// Check execution plan for "Table Scan"`
  },
  {
    q: "Someone tried to 'Drop' your users table via a search box. How to prevent?",
    a: "This is **SQL Injection**. I would use **Parameters**. It's like a 'Security Slot' that only accepts data, not commands. Even if an attacker types 'DROP TABLE', the database just treats it as a name, not a command.",
    diagram: `graph TD
    Input[Bad Input] -->|Blocked| Parameter[SQL Parameter]
    Parameter -->|Safe| DB`,
    code: `cmd.CommandText = "SELECT * FROM Users WHERE Name = @Name";
cmd.Parameters.AddWithValue("@Name", userInput);`
  }
];

let html = `
<!-- Section 16 -->
<section id="sec16" class="doc-section">
    <div class="section-badge"><span class="num">16</span><span class="title">Deep Dive: ADO.NET & SQL Server</span></div>
    <h2>Database & Data Access Scenarios</h2>
    <p>This section provides simplified explanations with diagrams for SQL and ADO.NET concepts.</p>

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

// SMART REPLACE: Look for existing Section 16 and replace it
const sectionStart = '<!-- Section 16 -->';
const sectionEnd = '</section>';
const startIdx = content.indexOf(sectionStart);
const endIdx = content.indexOf(sectionEnd, startIdx);

if (startIdx !== -1 && endIdx !== -1) {
    // If it exists, replace it
    content = content.substring(0, startIdx) + html + content.substring(endIdx + sectionEnd.length);
    fs.writeFileSync(indexHtmlPath, content);
    console.log("Successfully UPDATED Section 16 (No duplicates created).");
} else {
    // If it doesn't exist, append it before </main>
    const endToken = '</main>';
    const endIndex = content.indexOf(endToken);
    if (endIndex !== -1) {
        const before = content.substring(0, endIndex);
        const after = content.substring(endIndex);
        fs.writeFileSync(indexHtmlPath, before + html + after);
        console.log("Successfully ADDED Section 16.");
    } else {
        console.error("</main> not found.");
    }
}
