const fs = require('fs');

const theoryQAs = [
  {
    q: "What is WCF?",
    a: "Windows Communication Foundation (WCF) is a framework for building service-oriented applications. It allows sending data as asynchronous messages from one service endpoint to another using various protocols (HTTP, TCP, Named Pipes).",
    diagram: `graph TD
    A["Client App"] -->| "HTTP / TCP / Named Pipes" | B["WCF Service"]
    B --> C["Service Logic"]
    C -->| "Response" | A
    style B fill:#0d9488,color:#fff
    style A fill:#1e3a5f,color:#fff
    style C fill:#374151,color:#fff`,
    code: `// Define a WCF Service Contract
[ServiceContract]
public interface IMyService {
    [OperationContract]
    string GetData(int value);
}`
  },
  {
    q: "What is ASMX service?",
    a: "ASMX (Active Server Methods) is a legacy XML Web Services technology in .NET that preceded WCF. It strictly relies on HTTP and SOAP.",
    diagram: `graph LR
    Client -->| "HTTP + SOAP" | ASMX["ASMX WebService"]
    ASMX --> Handler[".asmx Handler"]
    Handler -->| "XML Response" | Client
    style ASMX fill:#b45309,color:#fff
    style Handler fill:#374151,color:#fff`,
    code: `[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
public class LegacyService : System.Web.Services.WebService {
    [WebMethod]
    public string HelloWorld() { return "Hello World"; }
}`
  },
  {
    q: "Difference between WCF and Web API?",
    a: "WCF supports multiple protocols (HTTP, TCP, MSMQ) and heavily uses SOAP/XML. Web API is strictly HTTP-based, embraces REST, and typically uses JSON, making it lightweight and ideal for web/mobile clients.",
    diagram: `graph TD
    subgraph "WCF"
      W1["HTTP"] & W2["TCP"] & W3["MSMQ"] --> WS["SOAP/XML"]
    end
    subgraph "WebAPI"
      H1["HTTP only"] --> JS["REST/JSON"]
    end
    style WS fill:#b45309,color:#fff
    style JS fill:#0d9488,color:#fff`,
    code: `// WCF (SOAP): Heavy XML envelopes
// Web API (REST): Lightweight JSON
{ "Message": "Hello World" }`
  },
  {
    q: "What is SOAP?",
    a: "Simple Object Access Protocol (SOAP) is a messaging protocol specification for exchanging structured information (XML) in the implementation of web services.",
    diagram: `graph TD
    A["SOAP Message"] --> B["Envelope"]
    B --> C["Header"]
    B --> D["Body"]
    D --> E["Payload / Fault"]
    style A fill:#1e3a5f,color:#fff
    style B fill:#0d9488,color:#fff
    style D fill:#374151,color:#fff`,
    code: `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/">
   <soapenv:Header/>
   <soapenv:Body>
      <GetData xmlns="http://tempuri.org/"><value>5</value></GetData>
   </soapenv:Body>
</soapenv:Envelope>`
  },
  {
    q: "Difference between SOAP and REST?",
    a: "SOAP is a strict protocol requiring XML and rigid schemas (WSDL). REST is a flexible architectural style using standard HTTP verbs and typically JSON. SOAP offers built-in WS-Security; REST relies on HTTPS and tokens.",
    diagram: `graph LR
    subgraph "SOAP"
      S1["XML Envelope"] --> S2["WSDL Schema"] --> S3["WS-Security"]
    end
    subgraph "REST"
      R1["HTTP Verbs"] --> R2["JSON Payload"] --> R3["HTTPS + Tokens"]
    end`,
    code: `// SOAP Request requires building XML Envelopes
// REST Request: GET /api/users/5`
  },
  {
    q: "What is endpoint in WCF?",
    a: "An endpoint defines how clients can communicate with the WCF service. A service can have multiple endpoints, each composed of an Address, Binding, and Contract (ABC).",
    diagram: `graph TD
    SVC["WCF Service"] --> EP1["Endpoint 1: basicHttpBinding"]
    SVC --> EP2["Endpoint 2: netTcpBinding"]
    EP1 --> | "Address + Binding + Contract" | C1["HTTP Client"]
    EP2 --> | "Address + Binding + Contract" | C2["TCP Client"]
    style SVC fill:#0d9488,color:#fff`,
    code: `<endpoint address="http://localhost:8000/MyService"
          binding="basicHttpBinding"
          contract="IMyService" />`
  },
  {
    q: "Explain ABC in WCF.",
    a: "A = Address (Where is the service?). B = Binding (How to talk to the service, e.g., HTTP/TCP). C = Contract (What can the service do, defined by interfaces).",
    diagram: `graph TD
    EP[Endpoint] --> A[A: Address\nWhere is it?]
    EP --> B[B: Binding\nHow to talk?]
    EP --> C[C: Contract\nWhat does it do?]
    style EP fill:#1e3a5f,color:#fff
    style A fill:#0d9488,color:#fff
    style B fill:#b45309,color:#fff
    style C fill:#374151,color:#fff`,
    code: `// A: net.tcp://localhost:9000/MyService
// B: netTcpBinding
// C: IMyService`
  },
  {
    q: "What is binding?",
    a: "A binding specifies the communication details (protocol, security, encoding) necessary to connect to the WCF endpoint.",
    diagram: `graph LR
    Binding --> Protocol[Protocol\nHTTP / TCP / MSMQ]
    Binding --> Security[Security\nNone / Transport / Message]
    Binding --> Encoding[Encoding\nText / MTOM / Binary]
    style Binding fill:#0d9488,color:#fff`,
    code: `<bindings>
  <netTcpBinding>
    <binding name="SecureTcp" portSharingEnabled="true">
      <security mode="Transport" />
    </binding>
  </netTcpBinding>
</bindings>`
  },
  {
    q: "What is contract in WCF?",
    a: "A contract defines the standard set of operations and data structures the service exposes. It includes Service Contracts (interfaces), Data Contracts (payloads), and Fault Contracts (errors).",
    diagram: `graph TD
    Contract --> SC[ServiceContract\nInterface / Operations]
    Contract --> DC[DataContract\nData Structures]
    Contract --> FC[FaultContract\nError Types]
    style Contract fill:#1e3a5f,color:#fff
    style SC fill:#0d9488,color:#fff
    style DC fill:#b45309,color:#fff
    style FC fill:#7c3aed,color:#fff`,
    code: `[ServiceContract] // Service Contract
public interface ICalculator {
    [OperationContract] // Operation Contract
    int Add(int a, int b);
}`
  },
  {
    q: "What is DataContract?",
    a: "An attribute applied to classes to explicitly define which types and properties are serialized and exposed to clients.",
    diagram: `classDiagram
    class Employee {
        +int Id
        +string Name
        -string InternalSecret
    }
    note for Employee "Id and Name are DataMembers\nInternalSecret is NOT serialized"`,
    code: `[DataContract]
public class Employee {
    [DataMember]
    public int Id { get; set; }
    // Not exposed to client:
    public string InternalSecret { get; set; } 
}`
  },
  {
    q: "What is ServiceContract?",
    a: "An attribute applied to an interface (or class) to define the operations the WCF service exposes to the outside world.",
    diagram: `classDiagram
    class ICustomerService {
        <<ServiceContract>>
        +GetCustomer(int id) CustomerDto
        +SaveCustomer(CustomerDto c) void
    }
    class CustomerServiceImpl {
        +GetCustomer(int id) CustomerDto
        +SaveCustomer(CustomerDto c) void
    }
    ICustomerService <|.. CustomerServiceImpl`,
    code: `[ServiceContract(Namespace = "http://mycorp.com/services")]
public interface ICustomerService { ... }`
  },
  {
    q: "What is OperationContract?",
    a: "An attribute applied to a method inside a ServiceContract to indicate that it is exposed as part of the WCF service.",
    diagram: `graph TD
    SC[ServiceContract Interface] --> OC1[OperationContract: GetCustomer]
    SC --> OC2[OperationContract: SaveCustomer]
    SC --> NEXP[Non-exposed helper method]
    style OC1 fill:#0d9488,color:#fff
    style OC2 fill:#0d9488,color:#fff
    style NEXP fill:#374151,color:#fff`,
    code: `[OperationContract]
CustomerDto GetCustomerDetails(int customerId);`
  },
  {
    q: "What is WSDL?",
    a: "Web Services Description Language (WSDL) is an XML document that acts as a contract, describing the operations a web service offers, the data it expects, and where it resides.",
    diagram: `graph LR
    Client -->|Reads WSDL| WSDL[WSDL Document]
    WSDL --> OPS[Operations]
    WSDL --> TYPES[Data Types]
    WSDL --> ADDR[Endpoint Address]
    Client -->|Auto-generate proxy| Proxy[Client Proxy Code]
    style WSDL fill:#1e3a5f,color:#fff`,
    code: `<!-- Accessible usually via ?wsdl -->
http://localhost/MyService.svc?wsdl`
  },
  {
    q: "What is serialization in WCF?",
    a: "The process of converting C# objects into XML streams for transmission. WCF primarily uses the DataContractSerializer, which is faster and more explicit than the old XmlSerializer.",
    diagram: `graph LR
    OBJ[C# Object] -->|DataContractSerializer| XML[XML Stream]
    XML -->|Over Network| REMOTE[Remote Service]
    REMOTE -->|Deserialize| OBJ2[C# Object]
    style OBJ fill:#0d9488,color:#fff
    style REMOTE fill:#b45309,color:#fff`,
    code: `// DataContractSerializer translates [DataMember] properties to XML elements automatically.`
  },
  {
    q: "What is BasicHttpBinding?",
    a: "A WCF binding designed to be backwards compatible with ASMX (WS-I Basic Profile 1.1). It uses HTTP and simple SOAP 1.1 without advanced security features by default.",
    diagram: `graph TD
    BHB[BasicHttpBinding] --> HTTP[HTTP Protocol]
    BHB --> SOAP11[SOAP 1.1]
    BHB --> COMPAT[ASMX Compatible]
    BHB --> NOSEC[No Advanced Security by default]
    style BHB fill:#b45309,color:#fff`,
    code: `<endpoint binding="basicHttpBinding" ... />`
  },
  {
    q: "What is WSHttpBinding?",
    a: "A more advanced HTTP binding that supports WS-* standards like WS-Security, WS-ReliableMessaging, and WS-Transactions. Uses SOAP 1.2.",
    diagram: `graph TD
    WHB[WSHttpBinding] --> HTTP[HTTP Protocol]
    WHB --> SOAP12[SOAP 1.2]
    WHB --> WSSEC[WS-Security]
    WHB --> WSRM[WS-ReliableMessaging]
    WHB --> WSTX[WS-Transactions]
    style WHB fill:#0d9488,color:#fff`,
    code: `<endpoint binding="wsHttpBinding" ... />`
  },
  {
    q: "What is duplex communication?",
    a: "A communication pattern in WCF where both the client and the server can send messages to each other independently (callbacks). Requires bindings like NetTcpBinding or WSDualHttpBinding.",
    diagram: `sequenceDiagram
    participant Client
    participant Server
    Client->>Server: Subscribe (with callback)
    Server-->>Client: Callback: Event A
    Server-->>Client: Callback: Event B
    Client->>Server: Unsubscribe`,
    code: `[ServiceContract(CallbackContract = typeof(IMyClientCallback))]
public interface IMyService { ... }`
  },
  {
    q: "What is fault contract?",
    a: "A typed way to return specific error information to the client in SOAP format instead of throwing a generic exception, which breaks the connection channel.",
    diagram: `graph TD
    OP[Operation Fails] --> FE{FaultException thrown}
    FE -->|Typed Fault| CLIENT[Client receives typed error]
    FE -->|Generic Exception| BREAK[Channel is broken!]
    style CLIENT fill:#0d9488,color:#fff
    style BREAK fill:#dc2626,color:#fff`,
    code: `[OperationContract]
[FaultContract(typeof(CustomErrorData))]
void DoWork();

// In service:
throw new FaultException<CustomErrorData>(new CustomErrorData(), "Error occurred");`
  },
  {
    q: "What is transport security?",
    a: "Securing the communication channel between client and server (e.g., using HTTPS or SSL over TCP). It encrypts the entire message payload end-to-end over the network.",
    diagram: `graph LR
    C[Client] -->|Encrypted Channel SSL/TLS| S[Server]
    subgraph Transport Layer
      TLS[TLS Handshake] --> ENC[Encrypted Payload]
    end
    style TLS fill:#0d9488,color:#fff
    style ENC fill:#1e3a5f,color:#fff`,
    code: `<security mode="Transport">
    <transport clientCredentialType="None" />
</security>`
  },
  {
    q: "What is message security?",
    a: "Securing the message itself regardless of the transport protocol. The SOAP message payload is encrypted and signed using WS-Security standards.",
    diagram: `graph TD
    MSG[SOAP Message] --> HDR[Header: Security Token]
    MSG --> BODY[Body: Encrypted + Signed Payload]
    HDR --> VERIFY[Server verifies signature]
    BODY --> DECRYPT[Server decrypts body]
    style MSG fill:#1e3a5f,color:#fff
    style BODY fill:#0d9488,color:#fff`,
    code: `<security mode="Message">
    <message clientCredentialType="UserName" />
</security>`
  },
  {
    q: "What is SOAP envelope?",
    a: "The root element of a SOAP message. It contains a Header (for routing, security) and a Body (for the actual payload or fault data).",
    diagram: `graph TD
    ENV[soap:Envelope] --> HDR[soap:Header\nRouting / Security tokens]
    ENV --> BODY[soap:Body\nPayload or Fault]
    style ENV fill:#1e3a5f,color:#fff
    style HDR fill:#b45309,color:#fff
    style BODY fill:#0d9488,color:#fff`,
    code: `<soap:Envelope>
  <soap:Header>...</soap:Header>
  <soap:Body>...</soap:Body>
</soap:Envelope>`
  },
  {
    q: "What are service behaviors?",
    a: "Configurations that affect the internal execution of a service, such as concurrency, instancing, throttling, and exposing metadata (WSDL).",
    diagram: `graph TD
    SB[Service Behaviors] --> META[serviceMetadata\nExpose WSDL]
    SB --> DEBUG[serviceDebug\nException details]
    SB --> THROTTLE[serviceThrottling\nLimit load]
    SB --> CONC[serviceConcurrency\nThread management]
    style SB fill:#0d9488,color:#fff`,
    code: `<serviceBehaviors>
  <behavior name="metadataBehavior">
    <serviceMetadata httpGetEnabled="true" />
    <serviceDebug includeExceptionDetailInFaults="false" />
  </behavior>
</serviceBehaviors>`
  },
  {
    q: "Difference between XML serializer and DataContract serializer?",
    a: "DataContractSerializer is the WCF default; it is opt-in (only serializes [DataMember] fields), faster, and serializes private fields. XmlSerializer (ASMX default) is opt-out, slower, and only serializes public properties.",
    diagram: `graph TD
    subgraph DataContractSerializer
      DCS1[Opt-in: DataMember only]
      DCS2[Serializes private fields]
      DCS3[Faster performance]
    end
    subgraph XmlSerializer
      XS1[Opt-out: public by default]
      XS2[Public properties only]
      XS3[Slower performance]
    end`,
    code: `// XmlSerializer requires public property:
public string Name { get; set; } 

// DataContractSerializer can serialize private fields:
[DataMember] private string _name;`
  },
  {
    q: "What is throttling in WCF?",
    a: "A service behavior used to limit resource consumption to prevent denial-of-service (DoS) attacks or server crashes under heavy load.",
    diagram: `graph TD
    REQS[Incoming Requests] --> THR[ServiceThrottling]
    THR --> CC[maxConcurrentCalls: 50]
    THR --> CS[maxConcurrentSessions: 100]
    THR --> CI[maxConcurrentInstances: 50]
    CC --> QUEUE[Excess queued or rejected]
    style THR fill:#0d9488,color:#fff
    style QUEUE fill:#dc2626,color:#fff`,
    code: `<serviceThrottling 
    maxConcurrentCalls="50" 
    maxConcurrentSessions="100" 
    maxConcurrentInstances="50" />`
  },
  {
    q: "When should we use WCF instead of REST?",
    a: "Use WCF when you need multiple protocols (TCP, Named Pipes), complex enterprise message queueing (MSMQ), or advanced WS-Security features. Otherwise, modern apps should use REST APIs.",
    diagram: `graph TD
    NEED{Use Case?} -->|Multiple protocols needed| WCF[Use WCF]
    NEED -->|Enterprise MSMQ / complex security| WCF
    NEED -->|Web / Mobile / Simple HTTP| REST[Use REST API]
    style WCF fill:#b45309,color:#fff
    style REST fill:#0d9488,color:#fff`,
    code: `// Internal enterprise network, fast binary TCP communication:
<endpoint binding="netTcpBinding" ... />`
  }
];

const scenarioQAs = [
  {
    q: "WCF service is slow in production. What will you analyze first?",
    a: "I would check WCF Tracing and Message Logging using SvcTraceViewer.exe. I'd also check if the service is instantiating properly (InstanceContextMode) and if ServiceThrottling limits are causing requests to queue up.",
    diagram: `graph TD
    SLOW[Slow WCF Service] --> T1[Check SvcTraceViewer logs]
    SLOW --> T2[Check InstanceContextMode]
    SLOW --> T3[Check ServiceThrottling limits]
    T1 --> FIX1[Identify bottleneck operation]
    T2 --> FIX2[Switch to PerCall if needed]
    T3 --> FIX3[Increase maxConcurrentCalls]
    style SLOW fill:#dc2626,color:#fff`,
    code: `<system.diagnostics>
  <sources>
    <source name="System.ServiceModel" switchValue="Information, ActivityTracing" />
  </sources>
</system.diagnostics>`
  },
  {
    q: "SOAP request works in Postman but not from client app. Why?",
    a: "Likely a proxy generation issue or missing SOAP Headers. The client app might not be serializing the request exactly as the WSDL expects, or there is an endpoint binding mismatch (e.g., trying to use HTTP on a NetTcp endpoint).",
    diagram: `graph TD
    ISSUE[Works in Postman\nFails in App] --> C1[Check proxy binding config]
    ISSUE --> C2[Check SOAP headers match]
    ISSUE --> C3[Verify WSDL namespace match]
    C1 --> FIX[Regenerate service reference]
    C2 --> FIX2[Add missing headers]
    C3 --> FIX3[Sync namespace in contracts]
    style ISSUE fill:#dc2626,color:#fff`,
    code: `// Verify client configuration matches service:
var client = new MyServiceClient("BasicHttpBinding_IMyService");`
  },
  {
    q: "Service reference changes broke application. How will you handle versioning?",
    a: "I will implement strict Data Contract versioning. I will add new properties with 'IsRequired = false' instead of modifying existing ones, or define a new [ServiceContract] interface (e.g., IMyServiceV2) for breaking changes.",
    diagram: `graph TD
    BREAK[Breaking Change Required] --> OPT1[Add optional DataMember\nIsRequired=false]
    BREAK --> OPT2[Create IMyServiceV2\nnew endpoint]
    OPT1 --> BACK[Backwards compatible]
    OPT2 --> NEWCLIENT[New clients use V2\nOld clients use V1]
    style BREAK fill:#dc2626,color:#fff
    style BACK fill:#0d9488,color:#fff`,
    code: `[DataMember(IsRequired = false, Order = 3)]
public string NewOptionalField { get; set; }`
  },
  {
    q: "Large XML payload causing timeout. How will you optimize?",
    a: "I will increase maxReceivedMessageSize and maxBufferSize on the binding. To optimize transfer, I will enable MTOM (Message Transmission Optimization Mechanism) encoding for binary data, or stream the data instead of buffering.",
    diagram: `graph TD
    TIMEOUT[Payload Timeout] --> S1[Increase maxReceivedMessageSize]
    TIMEOUT --> S2[Enable MTOM encoding]
    TIMEOUT --> S3[Use Streaming transfer mode]
    S1 --> OK1[Large messages accepted]
    S2 --> OK2[Binary data optimized]
    S3 --> OK3[No full buffer needed]
    style TIMEOUT fill:#dc2626,color:#fff
    style OK1 fill:#0d9488,color:#fff
    style OK2 fill:#0d9488,color:#fff
    style OK3 fill:#0d9488,color:#fff`,
    code: `<basicHttpBinding>
  <binding name="LargeBinding" maxReceivedMessageSize="2147483647" messageEncoding="Mtom" />
</basicHttpBinding>`
  },
  {
    q: "Need secure communication between enterprise systems. Which binding is better?",
    a: "If both are inside a corporate intranet (.NET to .NET), I will use NetTcpBinding with Transport security and Windows Authentication for maximum speed and security. Over the internet, WSHttpBinding with HTTPS.",
    diagram: `graph TD
    Q{Where are systems?} -->|Intranet .NET to .NET| TCP[NetTcpBinding\nWindows Auth + Transport]
    Q -->|Internet / cross-platform| WS[WSHttpBinding\nHTTPS + WS-Security]
    style TCP fill:#0d9488,color:#fff
    style WS fill:#b45309,color:#fff`,
    code: `<netTcpBinding>
  <binding name="IntranetBinding">
    <security mode="Transport">
      <transport clientCredentialType="Windows" />
    </security>
  </binding>
</netTcpBinding>`
  },
  {
    q: "WCF service throws serialization error. Possible causes?",
    a: "The payload might contain objects that lack the [DataContract] attribute, missing KnownTypes for inherited classes, circular references without IsReference=true, or the payload size exceeds maxStringContentLength.",
    diagram: `graph TD
    ERR[Serialization Error] --> C1[Missing DataContract attribute]
    ERR --> C2[Missing KnownType for subclass]
    ERR --> C3[Circular reference in object graph]
    ERR --> C4[Payload exceeds maxStringContentLength]
    C1 --> F1[Add DataContract + DataMember]
    C2 --> F2[Add KnownType attribute]
    C3 --> F3[Set IsReference=true]
    C4 --> F4[Increase binding limit]
    style ERR fill:#dc2626,color:#fff`,
    code: `// Fix inheritance serialization issue:
[DataContract]
[KnownType(typeof(DerivedClass))]
public class BaseClass { }`
  },
  {
    q: "Service unavailable intermittently in IIS. What logs/checks will you do?",
    a: "I will check the IIS Event Viewer logs, configure WCF Svclog tracing, and check IIS AppPool recycling rules. Intermittent failures often point to WCF Channel exhaustion (not closing proxies).",
    diagram: `graph TD
    INT[Intermittent Unavailability] --> L1[Check IIS Event Viewer]
    INT --> L2[Enable WCF Svclog tracing]
    INT --> L3[Check AppPool recycling schedule]
    INT --> L4[Check for channel exhaustion]
    L4 --> FIX[Ensure proxies are closed properly]
    style INT fill:#dc2626,color:#fff
    style FIX fill:#0d9488,color:#fff`,
    code: `// Ensure proxies are closed properly to free connections
if (client.State != CommunicationState.Faulted) {
    client.Close();
} else { client.Abort(); }`
  },
  {
    q: "Legacy SOAP service must support new mobile app. What challenges?",
    a: "Mobile apps struggle with heavy XML payloads and rigid SOAP envelopes. I would use the Façade pattern and build a new lightweight Web API (REST/JSON) that wraps and calls the legacy SOAP service internally.",
    diagram: `graph LR
    MOB[Mobile App] -->|REST JSON| WRAP[Web API Wrapper\nFacade Layer]
    WRAP -->|SOAP XML| LEGACY[Legacy WCF / ASMX]
    style MOB fill:#0d9488,color:#fff
    style WRAP fill:#1e3a5f,color:#fff
    style LEGACY fill:#b45309,color:#fff`,
    code: `// Mobile App -> [JSON] -> Web API Wrapper -> [SOAP] -> Legacy WCF`
  },
  {
    q: "One SOAP response contains unnecessary huge data. How will you reduce?",
    a: "I will implement distinct DTOs (Data Transfer Objects) for different operations. Instead of returning full entity graphs, the operation should return a lightweight summary DTO.",
    diagram: `graph TD
    OP[Operation: GetCustomers] --> OLD[Returns full Customer entity graph\nHuge payload]
    OP --> NEW[Returns CustomerSummaryDto\nLightweight payload]
    OLD --> BAD[Performance issue]
    NEW --> GOOD[Fast response]
    style OLD fill:#dc2626,color:#fff
    style NEW fill:#0d9488,color:#fff`,
    code: `[DataContract]
public class CustomerSummaryDto {
    [DataMember] public int Id;
    [DataMember] public string Name;
}`
  },
  {
    q: "Need centralized error handling in WCF. How?",
    a: "I will implement the IErrorHandler interface. This allows intercepting all unhandled exceptions globally, logging them, and converting them into a generic FaultException to hide sensitive stack traces from clients.",
    diagram: `graph TD
    EXC[Unhandled Exception] --> IEH[IErrorHandler.ProvideFault]
    IEH --> LOG[Log the exception internally]
    IEH --> FAULT[Return safe FaultException to client]
    FAULT --> CLIENT[Client receives generic error\nNo stack trace exposed]
    style IEH fill:#0d9488,color:#fff
    style CLIENT fill:#1e3a5f,color:#fff`,
    code: `public class GlobalErrorHandler : IErrorHandler {
    public void ProvideFault(Exception error, MessageVersion version, ref Message fault) {
        // Create safe generic fault message
    }
}`
  },
  {
    q: "Service method failing only for specific client requests. How will you debug?",
    a: "I will enable WCF Message Logging to capture the exact XML SOAP request payload causing the failure. I can then replay this exact XML in a tool like SoapUI or Postman to reproduce the issue locally.",
    diagram: `graph TD
    BUG[Specific request fails] --> STEP1[Enable WCF Message Logging]
    STEP1 --> STEP2[Capture raw SOAP XML payload]
    STEP2 --> STEP3[Replay in SoapUI or Postman]
    STEP3 --> STEP4[Reproduce and fix locally]
    style BUG fill:#dc2626,color:#fff
    style STEP4 fill:#0d9488,color:#fff`,
    code: `<system.serviceModel>
  <diagnostics>
    <messageLogging logEntireMessage="true" logMalformedMessages="true" />
  </diagnostics>
</system.serviceModel>`
  },
  {
    q: "Existing ASMX service needs modernization. What migration path?",
    a: "Step 1: Convert ASMX to WCF BasicHttpBinding (requires minimal client changes). Step 2: Eventually rewrite as a modern ASP.NET Core Web API (REST) for performance and cross-platform compatibility.",
    diagram: `graph LR
    ASMX[Legacy ASMX] -->|Step 1: Same HTTP address| WCF[WCF BasicHttpBinding]
    WCF -->|Step 2: Rewrite| WEBAPI[ASP.NET Core Web API]
    style ASMX fill:#b45309,color:#fff
    style WCF fill:#1e3a5f,color:#fff
    style WEBAPI fill:#0d9488,color:#fff`,
    code: `// Step 1: Same HTTP address, modern WCF backend
<endpoint address="LegacyService.asmx" binding="basicHttpBinding" contract="INewWcfService" />`
  },
  {
    q: "XML namespace mismatch causing issue. How will you troubleshoot?",
    a: "The client expects a different XML namespace than what the server is generating. I will explicitly define the Namespace property on both [ServiceContract] and [DataContract] attributes to match the client's expectations.",
    diagram: `graph TD
    MISMATCH[Namespace Mismatch Error] --> CHECK[Compare client WSDL vs server namespace]
    CHECK --> FIX1[Set Namespace on ServiceContract]
    CHECK --> FIX2[Set Namespace on DataContract]
    FIX1 & FIX2 --> SYNC[Client and Server namespaces aligned]
    style MISMATCH fill:#dc2626,color:#fff
    style SYNC fill:#0d9488,color:#fff`,
    code: `[ServiceContract(Namespace = "http://mycorp.com/v1/services")]
public interface ICustomerService { }`
  },
  {
    q: "Multiple clients consume same WCF service with different requirements. How will you design?",
    a: "I will expose the same Service Contract over multiple endpoints. For example, a basicHttpBinding for external legacy clients, and a netTcpBinding for fast internal services.",
    diagram: `graph TD
    SVC[WCF Service\nSame Contract] --> EP1[Endpoint: basicHttpBinding\nfor external / legacy clients]
    SVC --> EP2[Endpoint: netTcpBinding\nfor fast internal services]
    EP1 --> C1[External Client]
    EP2 --> C2[Internal .NET Service]
    style SVC fill:#1e3a5f,color:#fff
    style EP1 fill:#b45309,color:#fff
    style EP2 fill:#0d9488,color:#fff`,
    code: `<service name="MyService">
  <endpoint address="http" binding="basicHttpBinding" contract="IMyService"/>
  <endpoint address="net.tcp" binding="netTcpBinding" contract="IMyService"/>
</service>`
  },
  {
    q: "SOAP service has authentication issues after deployment. What configuration areas will you check?",
    a: "I will check if the IIS authentication settings (Anonymous vs Windows Auth) match the WCF Binding security mode. For Transport security, I must verify the SSL/TLS certificate is bound correctly in IIS.",
    diagram: `graph TD
    AUTH[Auth Issues After Deploy] --> C1[IIS Auth: Anonymous vs Windows?]
    AUTH --> C2[WCF Binding security mode match?]
    AUTH --> C3[SSL certificate bound in IIS?]
    C1 & C2 --> FIX1[Align IIS + Binding settings]
    C3 --> FIX2[Bind correct cert to port 443]
    style AUTH fill:#dc2626,color:#fff
    style FIX1 fill:#0d9488,color:#fff
    style FIX2 fill:#0d9488,color:#fff`,
    code: `<security mode="TransportCredentialOnly">
  <transport clientCredentialType="Windows" />
</security>`
  }
];

let html = `
<!-- Section 15 -->
<section id="sec15" class="doc-section">
    <div class="section-badge"><span class="num">15</span><span class="title">Deep Dive: WCF & ASMX Services</span></div>
    <h2>Legacy Service Integration Scenarios</h2>
    <p>This section covers exactly 40 detailed interview questions (25 Theory, 15 Scenario-based) focused on WCF, ASMX, SOAP, and enterprise service boundaries.</p>

    <h3 class="qa-category-title">Part 1: Theory Questions (25)</h3>
    <div class="qa-grid">
`;

let qNum = 1;
theoryQAs.forEach(qa => {
  html += `
        <div class="qa-card card-teal">
            <div class="qa-question">Q${qNum}: ${qa.q}</div>
            <div class="qa-answer">
                <p><strong>Answer:</strong> ${qa.a}</p>
                <div class="mermaid">${qa.diagram}</div>
                <div class="mono card-mono code-block">${qa.code.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</div>
            </div>
        </div>
    `;
  qNum++;
});

html += `
    </div>
    
    <h3 class="qa-category-title">Part 2: Scenario-Based Questions (15)</h3>
    <div class="qa-grid">
`;

scenarioQAs.forEach(qa => {
  html += `
        <div class="qa-card card-red">
            <div class="qa-question">Q${qNum}: ${qa.q}</div>
            <div class="qa-answer">
                <p><strong>Answer:</strong> ${qa.a}</p>
                <div class="mermaid">${qa.diagram}</div>
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

// SMART REPLACE: Look for existing Section 15 and replace it
const sectionStart = '<!-- Section 15 -->';
const sectionEnd = '</section>';
const startIdx = content.indexOf(sectionStart);
const endIdx = content.indexOf(sectionEnd, startIdx);

if (startIdx !== -1 && endIdx !== -1) {
  // If it exists, replace it
  content = content.substring(0, startIdx) + html + content.substring(endIdx + sectionEnd.length);
  fs.writeFileSync(indexHtmlPath, content);
  console.log("Successfully UPDATED Section 15 (No duplicates created).");
} else {
  // If it doesn't exist, append it before </main>
  const endToken = '</main>';
  const endIndex = content.indexOf(endToken);
  if (endIndex !== -1) {
    const before = content.substring(0, endIndex);
    const after = content.substring(endIndex);
    fs.writeFileSync(indexHtmlPath, before + html + after);
    console.log("Successfully ADDED Section 15.");
  } else {
    console.error("</main> not found.");
  }
}