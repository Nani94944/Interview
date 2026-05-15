const fs = require('fs');

const theoryQAs = [
  {
    q: "What is Normal Class?",
    a: "Basic class used for creating objects and storing behavior/data.",
    diagram: `classDiagram
    class Employee{
        +string Name
        +GetDetails()
    }`,
    code: `public class Employee
{
    public string Name;

    public void GetDetails()
    {
        Console.WriteLine(Name);
    }
}`
  },
  {
    q: "What is Static Class?",
    a: "Static class cannot be instantiated. Used for helper methods.",
    diagram: `graph TD
    A["User"] --> B["MathHelper Static Class"]
    B --> C["Add Method"]
    B --> D["Subtract Method"]`,
    code: `public static class MathHelper
{
    public static int Add(int a, int b)
    {
        return a + b;
    }
}`
  },
  {
    q: "What is Sealed Class?",
    a: "Sealed class cannot be inherited.",
    diagram: `graph TD
    A["Sealed Class"]
    B["Child Class"]
    B -. "Cannot Inherit" .-> A`,
    code: `public sealed class Utility
{
    public void Print()
    {
        Console.WriteLine("Utility");
    }
}`
  },
  {
    q: "What is Abstract Class?",
    a: "Abstract class is incomplete and must be inherited.",
    diagram: `classDiagram
    Vehicle <|-- Car
    Vehicle : +Start()
    Vehicle : +Drive()*`,
    code: `public abstract class Vehicle
{
    public abstract void Drive();
}

public class Car : Vehicle
{
    public override void Drive()
    {
        Console.WriteLine("Driving");
    }
}`
  },
  {
    q: "What is Partial Class?",
    a: "Partial class splits class into multiple files.",
    diagram: `graph LR
    A["Employee Part1.cs"]
    B["Employee Part2.cs"]
    A --> C["Combined Employee Class"]
    B --> C`,
    code: `// File1
public partial class Employee
{
    public void Method1(){}
}

// File2
public partial class Employee
{
    public void Method2(){}
}`
  },
  {
    q: "What is Nested Class?",
    a: "Class inside another class.",
    diagram: `classDiagram
    class Outer{
    }

    class Inner{
    }

    Outer *-- Inner`,
    code: `public class Outer
{
    public class Inner
    {
    }
}`
  },
  {
    q: "What is Singleton Class?",
    a: "Singleton ensures only one object exists.",
    diagram: `graph TD
    A[Application]
    B[Singleton Instance]

    A --> B`,
    code: `public sealed class Logger
{
    private static readonly Logger instance = new Logger();

    private Logger(){}

    public static Logger Instance => instance;
}`
  },
  {
    q: "What is Generic Class?",
    a: "Generic class works with any datatype.",
    diagram: `graph TD
    A[Generic<T>]
    A --> B[int]
    A --> C[string]
    A --> D[Employee]`,
    code: `public class MyClass<T>
{
    public T Data;
}`
  },
  {
    q: "What is Derived Class?",
    a: "Child class inheriting parent class.",
    diagram: `classDiagram
    Animal <|-- Dog`,
    code: `public class Animal
{
}

public class Dog : Animal
{
}`
  },
  {
    q: "What is Base Class?",
    a: "Parent class from which child classes inherit.",
    diagram: `classDiagram
    Vehicle <|-- Bike
    Vehicle <|-- Car`,
    code: `public class Vehicle
{
}`
  },
  {
    q: "What is Concrete Class?",
    a: "Fully implemented class that can create objects.",
    diagram: `graph TD
    A[Concrete Class]
    A --> B[Methods]
    A --> C[Properties]`,
    code: `public class Car
{
    public void Drive()
    {
        Console.WriteLine("Driving");
    }
}`
  },
  {
    q: "What is Internal Class?",
    a: "Accessible only inside same assembly/project.",
    diagram: `graph TD
    A[Same Assembly] --> B[Internal Class]
    C[Other Assembly] -. Cannot Access .-> B`,
    code: `internal class Test
{
}`
  },
  {
    q: "What is Record Class?",
    a: "Immutable modern data model class.",
    diagram: `graph TD
    A[Record]
    A --> B[Immutable Data]`,
    code: `public record Employee(string Name, int Age);`
  },
  {
    q: "What is Immutable Class?",
    a: "Object values cannot change after creation.",
    diagram: `graph TD
    A[Create Object]
    B[Readonly Properties]
    A --> B`,
    code: `public class Person
{
    public string Name { get; }

    public Person(string name)
    {
        Name = name;
    }
}`
  },
  {
    q: "What is Anonymous Class?",
    a: "Temporary unnamed object.",
    diagram: `graph TD
    A[var obj]
    A --> B[Anonymous Object]`,
    code: `var obj = new
{
    Name = "Anvesh",
    Age = 25
};`
  },
  {
    q: "What is POCO Class?",
    a: "Simple Plain Old CLR Object class.",
    diagram: `graph TD
    A[POCO]
    A --> B[Properties Only]`,
    code: `public class User
{
    public int Id { get; set; }
}`
  },
  {
    q: "What is DTO Class?",
    a: "Used for transferring data between layers.",
    diagram: `graph LR
    A[Database]
    --> B[DTO]
    --> C[API Response]`,
    code: `public class UserDto
{
    public string Name { get; set; }
}`
  },
  {
    q: "What is Entity Class?",
    a: "Represents database table in Entity Framework.",
    diagram: `graph TD
    A[Employee Table]
    <--> B[Employee Entity]`,
    code: `public class Employee
{
    public int Id { get; set; }
}`
  },
  {
    q: "What is Service Class?",
    a: "Contains business logic.",
    diagram: `graph TD
    A[Controller]
    --> B[Service Layer]
    --> C[Repository]`,
    code: `public class UserService
{
    public void Save()
    {
    }
}`
  },
  {
    q: "What is Repository Class?",
    a: "Handles DB operations separately.",
    diagram: `graph TD
    A[Service]
    --> B[Repository]
    --> C[Database]`,
    code: `public class UserRepository
{
    public void GetUsers()
    {
    }
}`
  },
  {
    q: "What is Factory Class?",
    a: "Creates objects without exposing creation logic.",
    diagram: `graph TD
    A[Factory]
    --> B[Car]
    --> C[Bike]`,
    code: `public class VehicleFactory
{
    public IVehicle GetVehicle(string type)
    {
        return new Car();
    }
}`
  },
  {
    q: "What is Helper Class?",
    a: "Contains reusable common methods.",
    diagram: `graph TD
    A[Application]
    --> B[Helper Class]`,
    code: `public static class CommonHelper
{
    public static void Log()
    {
    }
}`
  },
  {
    q: "What is Extension Class?",
    a: "Contains extension methods.",
    diagram: `graph TD
    A[String]
    --> B[Extension Method]`,
    code: `public static class StringExtensions
{
    public static string Upper(this string text)
    {
        return text.ToUpper();
    }
}`
  },
  {
    q: "What is CLR?",
    a: "Common Language Runtime (CLR) is the **heart** of .NET. Think of it as a 'manager' that supervises your code while it runs. It handles memory (Garbage Collection), security, and converts your code into a language the computer's CPU understands.",
    diagram: `graph TD
    A[C# Code] -->|Compile| B[MSIL - Intermediate Language]
    B -->|JIT Compiler| C[Machine Code]
    subgraph CLR [Common Language Runtime]
    C --> D[Execution]
    D --> E[Garbage Collection]
    D --> F[Exception Handling]
    end`,
    code: `// The CLR automatically handles execution and memory.
Console.WriteLine("Managed by CLR");`
  },
  {
    q: "What is CTS and CLS?",
    a: "CTS (Common Type System) is the **standard dictionary** of data types (like int, string) that all .NET languages use so they can talk to each other. CLS (Common Language Specification) is the **rulebook** that ensures a library written in C# can be used in VB.NET without errors.",
    diagram: `graph LR
    subgraph CTS [Common Type System]
    A[Int32]
    B[String]
    C[Boolean]
    end
    CTS --> D[C# Language]
    CTS --> E[VB.NET Language]
    CTS --> F[F# Language]`,
    code: `// CTS ensures System.Int32 in C# is the same as Integer in VB.NET
int myNumber = 10; // System.Int32`
  },
  {
    q: "Difference between .NET Framework and .NET Core?",
    a: ".NET Framework is the **old classic version** designed only for Windows. .NET Core (now just .NET 5+) is the **modern, fast version** that runs anywhere (Linux, Mac, Windows) and is built for cloud apps.",
    diagram: `graph TD
    A[.NET Ecosystem] --> B[.NET Framework - Windows Only]
    A --> C[.NET Core / .NET 5+ - Cross Platform]
    C --> D[Linux]
    C --> E[macOS]
    C --> F[Windows]`,
    code: `// .NET Core allows running this on Linux
app.MapGet("/", () => "Hello from .NET Core on Linux!");`
  },
  {
    q: "What is managed and unmanaged code?",
    a: "Managed code is code that runs **under the supervision** of the CLR (like a child with a babysitter). Unmanaged code runs **directly on the OS** without the CLR's help (like C++), meaning you have to manually clean up memory yourself.",
    diagram: `graph LR
    A[Source Code] --> B{Managed?}
    B -->|Yes| C[CLR Management - Auto Cleanup]
    B -->|No| D[Direct OS - Manual Cleanup]`,
    code: `// Unmanaged code example using P/Invoke
[DllImport("user32.dll")]
public static extern int MessageBox(IntPtr hWnd, String text, String caption, uint type);`
  },
  {
    q: "What is garbage collection?",
    a: "Garbage Collection (GC) is like a **cleaning crew** that automatically visits your computer's memory. It looks for objects that your program isn't using anymore and 'throws them away' to free up space.",
    diagram: `graph TD
    A[Heap Memory] --> B[Object In Use]
    A --> C[Object Not Referenced]
    C -->|GC Scan| D[Free Memory]`,
    code: `// Creating an object
var obj = new MyClass();
// Removing reference allows GC to collect it later
obj = null; 
// GC will now see this object is 'trash' and remove it.`
  },
  {
    q: "Difference between value type and reference type?",
    a: "Value types (int, bool) store the **actual data** in a small, fast memory area called the **Stack**. Reference types (classes, strings) store a **'map' or address** to the data which is kept in a larger memory area called the **Heap**.",
    diagram: `graph LR
    subgraph Stack
    A[int x = 10]
    B[Pointer to Obj]
    end
    subgraph Heap
    C[Actual Object Data]
    end
    B --> C`,
    code: `int a = 10; // Value stored on Stack
var obj = new MyClass(); // Pointer on Stack, Data on Heap`
  },
  {
    q: "What is boxing and unboxing?",
    a: "Boxing is wrapping a small value type (like an int) into a box (an object) so it can be stored on the Heap. Unboxing is taking it out of the box. It's like moving a toy from your pocket (Stack) into a storage box (Heap) and back.",
    diagram: `graph LR
    A[Value Type - Stack] -->|Boxing| B[Object - Heap]
    B -->|Unboxing| A`,
    code: `int num = 123;
object boxed = num; // Boxing (Slow)
int unboxed = (int)boxed; // Unboxing`
  },
  {
    q: "Difference between class and struct?",
    a: "A **Class** is like a complex blueprint for a house (Reference Type). A **Struct** is like a small sticky note with a coordinate on it (Value Type). Use classes for big, complex things and structs for tiny, simple pieces of data.",
    diagram: `graph TD
    A[Data Type] --> B[Class - Reference/Heap]
    A --> C[Struct - Value/Stack]`,
    code: `public class Customer { public string Name; } // Class (Big)
public struct Point { public int X, Y; }      // Struct (Small)`
  },
  {
    q: "What is inheritance?",
    a: "Inheritance is like **family traits**. A 'Child' class gets all the features (methods/properties) of a 'Parent' class automatically, so you don't have to write the same code twice.",
    diagram: `classDiagram
    Animal <|-- Dog
    Animal : +Eat()
    Dog : +Bark()`,
    code: `public class Animal { public void Eat() { } }
public class Dog : Animal { public void Bark() { } }
// Dog can now Eat() because its parent (Animal) can.`
  },
  {
    q: "What is polymorphism?",
    a: "Polymorphism means **'One name, many actions'**. It's like a 'Play' button. On a CD player, it plays music. On a DVD player, it plays a movie. The command is the same (Play), but the result is different based on what you're using.",
    diagram: `graph TD
    A[Shape.Draw] --> B[Circle.Draw]
    A --> C[Square.Draw]
    A --> D[Triangle.Draw]`,
    code: `public virtual void Draw() { } // Base
public override void Draw() { Console.WriteLine("Drawing Circle"); } // Overridden`
  },
  {
    q: "Difference between method overloading and overriding?",
    a: "**Overloading** is having multiple methods with the same name but different 'ingredients' (parameters). **Overriding** is when a child class decides to 're-write' a method it inherited from its parent.",
    diagram: `graph TD
    subgraph Overloading
    A[Add int, int]
    B[Add double, double]
    end
    subgraph Overriding
    C[Parent: Speak]
    D[Child: Speak - Updated]
    end`,
    code: `// Overloading: Add(1, 2) vs Add(1, 2, 3)
// Overriding: base.Move() vs child.Move() (changes behavior)`
  },
  {
    q: "What is abstraction?",
    a: "Abstraction is **hiding the messy details**. When you drive a car, you only care about the steering wheel and pedals (the interface). you don't need to see how the engine's internal pistons are moving (the implementation).",
    diagram: `graph LR
    User -->|Steer/Brake| Interface
    subgraph Implementation [Hidden Details]
    Interface --> Engine
    Interface --> Transmission
    end`,
    code: `public abstract class Car { 
    public abstract void Drive(); // User sees this
} // Internal engine logic is hidden inside subclasses`
  },
  {
    q: "What is a static class?",
    a: "A static class is a helper class that **cannot be instantiated**. 'Instantiated' means you cannot use the 'new' keyword to create a copy of it. It's like a public library—everyone uses the same one, you don't create your own personal copy of the library to read a book.",
    diagram: `graph TD
    A[Static Class] -->|Direct Access| B[Method 1]
    A -->|Direct Access| C[Method 2]
    D[User] -.->|CANNOT| E[new StaticClass]`,
    code: `// You don't do: var math = new Math(); 
// You just use it: Math.Sqrt(16);`
  },
  {
    q: "What is dependency injection?",
    a: "Instead of a class 'buying' its own tools (creating dependencies with 'new'), someone else 'hands' the tools to the class (injects them). This makes it easy to swap a 'Real Database' tool for a 'Fake Test Database' tool later.",
    diagram: `graph LR
    DI[DI Container] -->|Injects| Service[My Service]
    Tool[Database Tool] --> DI`,
    code: `public UserService(IDatabase db) { _db = db; } // db is handed to the service`
  },
  {
    q: "What is constructor chaining?",
    a: "Constructor chaining is when one constructor calls another constructor **before** doing its own work. It's like a 'relay race' where the first constructor passes the baton (data) to the second one to ensure the object is set up correctly.",
    diagram: `graph LR
    A[Constructor 1] -->|this()| B[Constructor 2]
    B -->|base()| C[Parent Constructor]`,
    code: `public Person() : this("Unknown") { } // Chains to another constructor`
  },
  {
    q: "Difference between ref and out?",
    a: "**ref** is like giving someone a box that **already has something inside** for them to change. **out** is like giving someone an **empty box** and telling them they MUST put something inside it before they give it back.",
    diagram: `graph TD
    A[ref] -->|Input| B[Method] -->|Modified| C[Output]
    D[out] -->|Empty| B -->|MUST Assign| E[Result]`,
    code: `void AddTen(ref int x) { x += 10; } // x must have a value
void GetNew(out int y) { y = 100; } // y starts empty`
  },
  {
    q: "Difference between const and readonly?",
    a: "**const** is a value set in stone when the program is written (Compile-time). **readonly** is a value that can be set **once** when the object is first created (Runtime), like a stamp on a passport when you enter a country.",
    diagram: `graph LR
    A[const] -->|Hardcoded| B[Binary File]
    C[readonly] -->|Set once| D[Object Creation]`,
    code: `public const string Version = "1.0";
public readonly DateTime CreatedAt = DateTime.Now;`
  },
  {
    q: "What is async and await?",
    a: "Async/await is like **ordering coffee**. You place your order (async), you get a buzzer (Task), and you go sit down to do other work. When the buzzer goes off (await), you go pick up your coffee. You aren't standing at the counter doing nothing while waiting.",
    diagram: `sequenceDiagram
    Caller->>Service: Start Async Work
    Service-->>Caller: Return Task (Buzzer)
    Note right of Caller: Continue other work
    Service->>Caller: Task Complete
    Caller->>Service: Await Result`,
    code: `var result = await _api.GetAsync(); // Wait without blocking`
  },
  {
    q: "Difference between Task and Thread?",
    a: "A **Thread** is like a physical worker. A **Task** is like a 'To-Do' list item. Tasks are smarter because they use a 'Pool' of workers (ThreadPool) to get work done more efficiently without hiring a new worker every time.",
    diagram: `graph LR
    Task[Task 1] --> Pool[Thread Pool]
    Task2[Task 2] --> Pool
    Pool --> T1[Worker 1]
    Pool --> T2[Worker 2]`,
    code: `Task.Run(() => DoWork()); // Smarter than 'new Thread()'`
  },
  {
    q: "What is delegate and event?",
    a: "A **Delegate** is a contract for a 'call-back' function. An **Event** is like a **Radio Station**. The station (Publisher) sends out a signal, and any Radio (Subscriber) that is tuned in will hear it. The station doesn't care who is listening.",
    diagram: `graph LR
    Pub[Publisher] -->|Fire Event| Bus[Event Bus]
    Bus --> Sub1[Subscriber A]
    Bus --> Sub2[Subscriber B]`,
    code: `public event EventHandler OnClick; // Broadcaster`
  },
  {
    q: "What is LINQ?",
    a: "LINQ is like **SQL inside C#**. It allows you to filter, sort, and search through lists of data using simple, readable commands instead of writing complex loops.",
    diagram: `graph LR
    Data[List of Users] -->|Where| Filtered[Adults Only]
    Filtered -->|OrderBy| Sorted[Sorted by Name]`,
    code: `var results = users.Where(u => u.Age > 18).ToList();`
  },
  {
    q: "Difference between IEnumerable and IQueryable?",
    a: "**IEnumerable** is like filtering a bucket of water **in your kitchen** (Client-side). **IQueryable** is like telling the **water company** to only send you filtered water (Server-side/Database), which saves a lot of time and effort.",
    diagram: `graph TD
    subgraph Client [IEnumerable]
    A[Get ALL Data] --> B[Filter locally]
    end
    subgraph Server [IQueryable]
    C[Send Filter Command] --> D[Get ONLY needed data]
    end`,
    code: `// IQueryable translates to SQL!
var slow = list.AsEnumerable().Where(...);
var fast = db.Users.AsQueryable().Where(...);`
  }

];

const scenarioQAs = [
  {
    q: "API performance is slow due to heavy loops. How will you optimize?",
    a: "If you're doing 1,000 tasks and they don't depend on each other, don't do them one-by-one. Use **Parallelism** to do many tasks at the exact same time using all the cores of your computer's CPU.",
    diagram: `graph TD
    subgraph SingleThread [Slow]
    A[Task 1] --> B[Task 2] --> C[Task 3]
    end
    subgraph MultiThread [Fast]
    D[Task 1]
    E[Task 2]
    F[Task 3]
    end`,
    code: `Parallel.ForEach(items, item => { Process(item); });`
  },
  {
    q: "Application crashes because of null values. How will you prevent?",
    a: "Use the **'Elvis Operator' (?.)**. It's like checking if a door is open before trying to walk through it. if the object is null, it just stops instead of crashing your app.",
    diagram: `graph LR
    A[Object] -->|Check ?.| B{Null?}
    B -->|Yes| C[Stop & Return Null]
    B -->|No| D[Access Property]`,
    code: `string name = user?.Profile?.Name ?? "Guest";`
  },
  {
    q: "Memory usage continuously increases. How will you debug memory leak?",
    a: "I would use a **Memory Profiler**. A leak usually happens when you 'forget to hang up the phone' (unhook an event) or 'leave the faucet running' (forget to dispose of a database connection).",
    diagram: `graph LR
    A[Object A] -->|Event Hook| B[Static Class]
    B -.->|Keeps alive| A
    Note over A: Object A cannot be cleaned up!`,
    code: `// Always unhook! 
myBtn.Click -= OnClick;`
  },
  {
    q: "Multiple threads updating same object. How will you handle thread safety?",
    a: "Use a **lock**. It's like a bathroom key. If someone has the key, no one else can enter until they come out and put the key back. This prevents two people from 'writing on the same page' at the same time.",
    diagram: `graph TD
    T1[Thread 1] -->|Want Key| Lock{Locked?}
    T2[Thread 2] -->|Wait| Lock
    Lock -->|Entry| Work[Safe Work]`,
    code: `lock(syncObj) { count++; } // Only one thread at a time`
  },
  {
    q: "Application startup time is very high. What possible reasons?",
    a: "Usually, it's because too many things are being **'instantiated'** (created) all at once. If you try to bake 50 cakes at 8 AM, your kitchen will be overwhelmed. Instead, bake them only when someone actually orders one (Lazy Loading).",
    diagram: `graph TD
    A[Startup] -->|Create| B[Service 1]
    A -->|Create| C[Service 2]
    A -->|Create| D[Service 3]
    Note over A: Too much work! Use Lazy Init instead.`,
    code: `services.AddTransient<BigService>(); // Only creates when needed`
  }
];

let html = `
<!-- Section 13 -->
<section id="sec13" class="doc-section">
    <div class="section-badge"><span class="num">13</span><span class="title">Deep Dive: C# & .NET Interview Guide</span></div>
    <h2>Comprehensive C# & .NET Scenarios</h2>
    <p>This section provides simplified explanations with diagrams for complex .NET concepts, making them easy to understand for any developer.</p>

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

// SMART REPLACE: Look for existing Section 13 and replace it
const sectionStart = '<!-- Section 13 -->';
const sectionEnd = '</section>';
const startIdx = content.indexOf(sectionStart);
const endIdx = content.indexOf(sectionEnd, startIdx);

if (startIdx !== -1 && endIdx !== -1) {
  // If it exists, replace it
  content = content.substring(0, startIdx) + html + content.substring(endIdx + sectionEnd.length);
  fs.writeFileSync(indexHtmlPath, content);
  console.log("Successfully UPDATED Section 13 (No duplicates created).");
} else {
  // If it doesn't exist, append it before </main>
  const endToken = '</main>';
  const endIndex = content.indexOf(endToken);
  if (endIndex !== -1) {
    const before = content.substring(0, endIndex);
    const after = content.substring(endIndex);
    fs.writeFileSync(indexHtmlPath, before + html + after);
    console.log("Successfully ADDED Section 13.");
  } else {
    console.error("</main> not found.");
  }
}
