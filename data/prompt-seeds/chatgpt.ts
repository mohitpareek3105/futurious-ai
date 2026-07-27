export type PromptSeed = {
  title: string;
  slug: string;
  description: string;
  prompt: string;
  category: string;
  tags: string[];
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  ai_models: string[];
  variables: string[];
  example_input: string;
  example_output: string;
  tips: string[];
  featured: boolean;
  published: boolean;
};

export const chatGptPromptSeeds: PromptSeed[] = [
  {
    title: "Professional Email Writer",
    slug: "professional-email-writer",
    description:
      "Create clear, professional and appropriately toned business emails for clients, colleagues, managers or vendors.",
    prompt: `Act as an experienced business communication specialist.

Write a professional email using the information below:

Purpose: [PURPOSE]
Recipient: [RECIPIENT]
Relationship with recipient: [RELATIONSHIP]
Important details: [DETAILS]
Desired action: [DESIRED_ACTION]
Tone: [TONE]
Deadline, if any: [DEADLINE]

Requirements:
1. Write a clear and specific subject line.
2. Start with an appropriate greeting.
3. Explain the purpose in the opening paragraph.
4. Present important information in a logical order.
5. Clearly state the requested action and deadline.
6. Keep the email concise, polite and professional.
7. End with an appropriate closing.
8. Avoid unnecessary jargon, repetition and exaggerated language.

Return the result in this format:

Subject:
Email:
Optional shorter version:`,
    category: "ChatGPT",
    tags: [
      "email writing",
      "business communication",
      "professional email",
      "workplace",
    ],
    difficulty: "Beginner",
    ai_models: ["ChatGPT", "Claude", "Gemini"],
    variables: [
      "PURPOSE",
      "RECIPIENT",
      "RELATIONSHIP",
      "DETAILS",
      "DESIRED_ACTION",
      "TONE",
      "DEADLINE",
    ],
    example_input:
      "Purpose: Request payment of an overdue invoice; Recipient: Client accounts manager; Details: Invoice INV-1042, ₹85,000, overdue by 12 days; Tone: Polite but firm.",
    example_output:
      "A professional payment follow-up email with a clear subject, invoice details, payment request and courteous closing.",
    tips: [
      "Provide exact dates, invoice numbers and required actions.",
      "Use a firm tone only after earlier reminders have been ignored.",
      "Review names and financial details before sending.",
    ],
    featured: true,
    published: true,
  },
  {
    title: "Meeting Minutes Generator",
    slug: "meeting-minutes-generator",
    description:
      "Convert rough meeting notes or transcripts into structured minutes with decisions, action items, owners and deadlines.",
    prompt: `Act as a professional meeting secretary.

Convert the following raw meeting notes into accurate and well-structured meeting minutes.

Meeting title: [MEETING_TITLE]
Date and time: [DATE_TIME]
Attendees: [ATTENDEES]
Agenda: [AGENDA]
Raw notes or transcript: [RAW_NOTES]

Create the minutes with these sections:

1. Meeting Overview
2. Attendees
3. Agenda Items
4. Key Discussion Points
5. Decisions Made
6. Action Items
7. Open Issues
8. Next Meeting, if mentioned

For every action item, include:
- Task
- Responsible person
- Deadline
- Status or dependency

Rules:
- Do not invent facts, decisions, names or deadlines.
- Clearly mark missing information as "Not specified".
- Remove repetition and informal conversation.
- Preserve important numbers, dates and commitments.
- Use concise professional language.

End with a compact action-item table.`,
    category: "ChatGPT",
    tags: [
      "meeting minutes",
      "summarization",
      "action items",
      "productivity",
    ],
    difficulty: "Beginner",
    ai_models: ["ChatGPT", "Claude", "Gemini"],
    variables: [
      "MEETING_TITLE",
      "DATE_TIME",
      "ATTENDEES",
      "AGENDA",
      "RAW_NOTES",
    ],
    example_input:
      "Weekly sales meeting. Mohit will submit the July sales report by Friday. The team approved a 5% introductory discount for the new product.",
    example_output:
      "Structured meeting minutes showing the approved discount and Mohit's report submission as a dated action item.",
    tips: [
      "Include speaker names in the raw notes whenever possible.",
      "Check all deadlines and responsible persons before circulation.",
      "Use transcripts for more accurate summaries.",
    ],
    featured: true,
    published: true,
  },
  {
    title: "Business Proposal Writer",
    slug: "business-proposal-writer",
    description:
      "Generate a persuasive and structured business proposal tailored to a client, project or commercial opportunity.",
    prompt: `Act as a senior business proposal consultant.

Create a persuasive business proposal using the details below:

Business or provider: [BUSINESS_NAME]
Client or prospect: [CLIENT_NAME]
Client problem: [CLIENT_PROBLEM]
Proposed solution: [SOLUTION]
Scope of work: [SCOPE]
Deliverables: [DELIVERABLES]
Timeline: [TIMELINE]
Pricing or budget: [PRICING]
Competitive advantages: [ADVANTAGES]
Call to action: [CALL_TO_ACTION]

Use this structure:

1. Proposal Title
2. Executive Summary
3. Understanding of the Client's Needs
4. Proposed Solution
5. Scope and Deliverables
6. Implementation Plan
7. Timeline
8. Pricing and Commercial Terms
9. Why Choose Us
10. Assumptions and Exclusions
11. Next Steps

Requirements:
- Focus on client outcomes rather than generic claims.
- Connect each feature to a practical benefit.
- Use measurable results where information is available.
- Do not invent certifications, clients or performance data.
- Keep the language confident, specific and professional.
- Highlight missing information that should be confirmed.`,
    category: "ChatGPT",
    tags: [
      "business proposal",
      "client proposal",
      "sales document",
      "business writing",
    ],
    difficulty: "Intermediate",
    ai_models: ["ChatGPT", "Claude", "Gemini"],
    variables: [
      "BUSINESS_NAME",
      "CLIENT_NAME",
      "CLIENT_PROBLEM",
      "SOLUTION",
      "SCOPE",
      "DELIVERABLES",
      "TIMELINE",
      "PRICING",
      "ADVANTAGES",
      "CALL_TO_ACTION",
    ],
    example_input:
      "A transport company proposing monthly vehicle-hiring services to a manufacturing plant, including drivers, maintenance and replacement vehicles.",
    example_output:
      "A client-focused commercial proposal covering service scope, operating model, timeline, pricing and next steps.",
    tips: [
      "Add quantified benefits such as time saved or downtime reduced.",
      "State exclusions clearly to prevent scope disputes.",
      "Customise the executive summary for every client.",
    ],
    featured: true,
    published: true,
  },
  {
    title: "Customer Complaint Response Writer",
    slug: "customer-complaint-response-writer",
    description:
      "Draft empathetic and solution-focused responses to customer complaints without making unsupported promises.",
    prompt: `Act as an experienced customer service manager.

Write a professional response to the following customer complaint:

Customer name: [CUSTOMER_NAME]
Complaint: [COMPLAINT]
Relevant order or service details: [ORDER_DETAILS]
What happened: [KNOWN_FACTS]
Available resolution: [RESOLUTION]
Company policy or limitation: [POLICY]
Desired tone: [TONE]

The response must:

1. Address the customer respectfully.
2. Acknowledge the specific problem.
3. Show empathy without admitting unsupported legal liability.
4. Explain verified facts clearly.
5. Offer the available resolution and next steps.
6. Provide a realistic timeline where supplied.
7. Avoid blaming the customer, employees or third parties.
8. Avoid promises not supported by the provided information.
9. End with a courteous invitation to respond.

Return:
- Suggested subject line
- Full response
- Short response suitable for chat or social media`,
    category: "ChatGPT",
    tags: [
      "customer complaint",
      "customer service",
      "response writing",
      "support",
    ],
    difficulty: "Beginner",
    ai_models: ["ChatGPT", "Claude", "Gemini"],
    variables: [
      "CUSTOMER_NAME",
      "COMPLAINT",
      "ORDER_DETAILS",
      "KNOWN_FACTS",
      "RESOLUTION",
      "POLICY",
      "TONE",
    ],
    example_input:
      "Customer received a damaged product. A replacement can be dispatched within two working days after photo verification.",
    example_output:
      "An empathetic apology that explains photo verification and confirms the replacement process without making unsupported commitments.",
    tips: [
      "Provide only verified facts.",
      "Offer a specific next action.",
      "Avoid defensive or legalistic wording in the first response.",
    ],
    featured: false,
    published: true,
  },
  {
    title: "Product Description Generator",
    slug: "product-description-generator",
    description:
      "Write persuasive, accurate and platform-ready product descriptions based on features, benefits and target customers.",
    prompt: `Act as an e-commerce copywriter and product marketing specialist.

Create a product description using these details:

Product name: [PRODUCT_NAME]
Category: [CATEGORY]
Target customer: [TARGET_CUSTOMER]
Main features: [FEATURES]
Customer benefits: [BENEFITS]
Material or specifications: [SPECIFICATIONS]
Size or quantity: [SIZE_QUANTITY]
Use cases: [USE_CASES]
Brand voice: [BRAND_VOICE]
Sales platform: [PLATFORM]
Restricted or unsupported claims to avoid: [CLAIMS_TO_AVOID]

Produce:

1. SEO-friendly product title
2. One-line value proposition
3. Short description
4. Five benefit-focused bullet points
5. Detailed product description
6. Specifications section
7. Suggested search keywords
8. Usage or care instructions, if relevant

Rules:
- Do not invent specifications or certifications.
- Do not make medical, environmental or performance claims without evidence.
- Convert technical features into customer benefits.
- Avoid keyword stuffing and repetitive adjectives.
- Adapt formatting and length for the specified platform.`,
    category: "ChatGPT",
    tags: [
      "product description",
      "ecommerce",
      "copywriting",
      "online selling",
    ],
    difficulty: "Beginner",
    ai_models: ["ChatGPT", "Claude", "Gemini"],
    variables: [
      "PRODUCT_NAME",
      "CATEGORY",
      "TARGET_CUSTOMER",
      "FEATURES",
      "BENEFITS",
      "SPECIFICATIONS",
      "SIZE_QUANTITY",
      "USE_CASES",
      "BRAND_VOICE",
      "PLATFORM",
      "CLAIMS_TO_AVOID",
    ],
    example_input:
      "UrbanKart India garbage bags, 24 × 32 inches, 15 bags per roll, suitable for household dustbins, leak-resistant material.",
    example_output:
      "A marketplace-ready title, concise bullets, detailed description, specifications and search terms.",
    tips: [
      "Mention exact dimensions, quantity and material.",
      "Follow the listing rules of the selected marketplace.",
      "Use benefits that are directly supported by product features.",
    ],
    featured: true,
    published: true,
  },
  {
    title: "SEO Blog Outline Creator",
    slug: "seo-blog-outline-creator",
    description:
      "Create a search-focused article outline covering user intent, subtopics, FAQs and internal-link opportunities.",
    prompt: `Act as an SEO content strategist.

Create a comprehensive blog outline using:

Primary keyword: [PRIMARY_KEYWORD]
Secondary keywords: [SECONDARY_KEYWORDS]
Target audience: [TARGET_AUDIENCE]
Search intent: [SEARCH_INTENT]
Country or market: [MARKET]
Business or website: [WEBSITE_CONTEXT]
Desired word count: [WORD_COUNT]
Competitor topics or gaps: [COMPETITOR_INSIGHTS]

Deliver:

1. Recommended SEO title
2. Search intent summary
3. Suggested URL slug
4. Meta description under 160 characters
5. Article introduction angle
6. Complete H1, H2 and H3 outline
7. Key points to cover under each section
8. Recommended examples, tables or checklists
9. Frequently asked questions
10. Internal-link opportunities
11. Suggested conclusion and call to action

Requirements:
- Match the specified search intent.
- Avoid duplicate or overlapping sections.
- Cover the topic comprehensively without unnecessary filler.
- Use keywords naturally.
- Mark claims that require reliable external sources.
- Do not invent search volume, ranking difficulty or competitor data.`,
    category: "ChatGPT",
    tags: [
      "SEO",
      "blog outline",
      "content strategy",
      "keyword research",
    ],
    difficulty: "Intermediate",
    ai_models: ["ChatGPT", "Claude", "Gemini"],
    variables: [
      "PRIMARY_KEYWORD",
      "SECONDARY_KEYWORDS",
      "TARGET_AUDIENCE",
      "SEARCH_INTENT",
      "MARKET",
      "WEBSITE_CONTEXT",
      "WORD_COUNT",
      "COMPETITOR_INSIGHTS",
    ],
    example_input:
      "Primary keyword: best AI tools for accountants; Audience: Indian accountants and small businesses; Intent: Commercial investigation.",
    example_output:
      "An SEO-focused hierarchy covering tool categories, evaluation criteria, comparisons, pricing considerations and FAQs.",
    tips: [
      "Specify whether intent is informational, commercial or transactional.",
      "Review current search results before publishing.",
      "Add original examples and first-hand insights to the final article.",
    ],
    featured: false,
    published: true,
  },
  {
    title: "LinkedIn Post Writer",
    slug: "linkedin-post-writer",
    description:
      "Turn an idea, professional lesson or business update into an engaging LinkedIn post with a strong opening and call to action.",
    prompt: `Act as a professional LinkedIn content strategist.

Write a LinkedIn post using:

Topic: [TOPIC]
Main insight: [MAIN_INSIGHT]
Personal experience or evidence: [EXPERIENCE]
Target audience: [TARGET_AUDIENCE]
Desired tone: [TONE]
Call to action: [CALL_TO_ACTION]
Maximum length: [MAX_LENGTH]

Structure:
1. A strong first-line hook.
2. A short setup explaining the context.
3. The central insight or lesson.
4. Practical takeaways in readable formatting.
5. A natural closing question or call to action.
6. Three to five relevant hashtags.

Rules:
- Avoid fake personal stories or invented statistics.
- Do not use exaggerated claims or excessive emojis.
- Keep paragraphs short for mobile readability.
- Sound credible, conversational and specific.
- Avoid generic motivational language.
- Provide two alternative hooks after the main post.`,
    category: "ChatGPT",
    tags: [
      "LinkedIn",
      "social media",
      "personal branding",
      "content writing",
    ],
    difficulty: "Beginner",
    ai_models: ["ChatGPT", "Claude", "Gemini"],
    variables: [
      "TOPIC",
      "MAIN_INSIGHT",
      "EXPERIENCE",
      "TARGET_AUDIENCE",
      "TONE",
      "CALL_TO_ACTION",
      "MAX_LENGTH",
    ],
    example_input:
      "Topic: Automating monthly accounting reports; Insight: Automation saves time but human review remains essential; Audience: Accountants and business owners.",
    example_output:
      "A concise professional post with a practical hook, personal context, three lessons and a discussion question.",
    tips: [
      "Include a genuine observation or example.",
      "Use a clear point of view instead of broad advice.",
      "Edit the generated post to match your natural voice.",
    ],
    featured: false,
    published: true,
  },
  {
    title: "SWOT Analysis Generator",
    slug: "swot-analysis-generator",
    description:
      "Produce a structured SWOT analysis supported by supplied business facts, market conditions and competitive information.",
    prompt: `Act as a strategic business analyst.

Create a SWOT analysis for:

Business, product or project: [SUBJECT]
Industry: [INDUSTRY]
Target market: [TARGET_MARKET]
Business model: [BUSINESS_MODEL]
Current capabilities: [CAPABILITIES]
Known challenges: [CHALLENGES]
Competitors: [COMPETITORS]
Market trends: [MARKET_TRENDS]
Objectives: [OBJECTIVES]

Prepare:

1. Executive summary
2. Strengths
3. Weaknesses
4. Opportunities
5. Threats
6. Strategic implications
7. Recommended actions for the next 90 days

For every SWOT item:
- Explain why it belongs in that category.
- State its likely business impact.
- Identify supporting evidence or mark it as an assumption.

Rules:
- Internal factors belong under strengths or weaknesses.
- External factors belong under opportunities or threats.
- Do not invent market data.
- Prioritise the five most important items in each category.
- Highlight connections between strengths and opportunities, and between weaknesses and threats.`,
    category: "ChatGPT",
    tags: [
      "SWOT analysis",
      "business strategy",
      "market analysis",
      "planning",
    ],
    difficulty: "Intermediate",
    ai_models: ["ChatGPT", "Claude", "Gemini"],
    variables: [
      "SUBJECT",
      "INDUSTRY",
      "TARGET_MARKET",
      "BUSINESS_MODEL",
      "CAPABILITIES",
      "CHALLENGES",
      "COMPETITORS",
      "MARKET_TRENDS",
      "OBJECTIVES",
    ],
    example_input:
      "A new AI tools directory targeting Indian professionals, monetised through affiliate links and sponsored listings.",
    example_output:
      "A prioritised SWOT analysis distinguishing internal capabilities from external market conditions and recommending 90-day actions.",
    tips: [
      "Provide actual competitors and operational constraints.",
      "Validate assumptions with market research.",
      "Convert the final SWOT into specific decisions and actions.",
    ],
    featured: false,
    published: true,
  },
  {
    title: "Project Plan Generator",
    slug: "project-plan-generator",
    description:
      "Turn a project objective into a structured delivery plan with milestones, tasks, dependencies, risks and ownership.",
    prompt: `Act as a senior project manager.

Develop a practical project plan using:

Project name: [PROJECT_NAME]
Objective: [OBJECTIVE]
Scope: [SCOPE]
Deliverables: [DELIVERABLES]
Start date: [START_DATE]
Target completion date: [END_DATE]
Team and roles: [TEAM]
Budget or resource constraints: [CONSTRAINTS]
Known dependencies: [DEPENDENCIES]
Known risks: [RISKS]
Success criteria: [SUCCESS_CRITERIA]

Create:

1. Project summary
2. Scope and exclusions
3. Key deliverables
4. Milestones and target dates
5. Work breakdown structure
6. Task owners
7. Dependencies
8. Required resources
9. Risk register with mitigation actions
10. Communication and reporting plan
11. Quality checks
12. Launch or handover checklist

Present the task plan in a table with:
- Task
- Owner
- Start date
- Due date
- Dependency
- Status

Rules:
- Do not invent team members or dates.
- Mark missing information clearly.
- Keep tasks specific and measurable.
- Identify critical dependencies and likely bottlenecks.
- Ensure the plan is realistic for the stated resources and timeline.`,
    category: "ChatGPT",
    tags: [
      "project planning",
      "task management",
      "milestones",
      "productivity",
    ],
    difficulty: "Intermediate",
    ai_models: ["ChatGPT", "Claude", "Gemini"],
    variables: [
      "PROJECT_NAME",
      "OBJECTIVE",
      "SCOPE",
      "DELIVERABLES",
      "START_DATE",
      "END_DATE",
      "TEAM",
      "CONSTRAINTS",
      "DEPENDENCIES",
      "RISKS",
      "SUCCESS_CRITERIA",
    ],
    example_input:
      "Launch Futurious.AI MVP within seven days with three hours of work per day, including public pages, Supabase content and admin CRUD.",
    example_output:
      "A phased plan with milestones, dependencies, ownership, risk controls and a launch checklist.",
    tips: [
      "State available working hours and team capacity.",
      "Separate required MVP work from optional enhancements.",
      "Update task status and risks throughout execution.",
    ],
    featured: true,
    published: true,
  },
  {
    title: "Executive Summary Generator",
    slug: "executive-summary-generator",
    description:
      "Condense a report, proposal or business document into a concise executive summary focused on decisions and outcomes.",
    prompt: `Act as an executive communications specialist.

Create an executive summary from the following source material:

Document type: [DOCUMENT_TYPE]
Target reader: [TARGET_READER]
Primary objective: [OBJECTIVE]
Source content: [SOURCE_CONTENT]
Required length: [LENGTH]
Decision or action required: [DECISION_REQUIRED]

The summary should include:

1. Purpose and context
2. Main findings
3. Important financial or operational figures
4. Key risks or constraints
5. Recommended action
6. Expected outcome
7. Immediate next steps

Requirements:
- Prioritise information needed for decision-making.
- Preserve important figures, dates and conclusions.
- Remove repetition, background detail and technical complexity.
- Do not add facts not present in the source.
- Clearly distinguish facts, assumptions and recommendations.
- Use professional language suitable for senior management.

After the main summary, provide:
- A five-bullet key-points version
- A one-sentence decision statement`,
    category: "ChatGPT",
    tags: [
      "executive summary",
      "report summarization",
      "management",
      "business writing",
    ],
    difficulty: "Intermediate",
    ai_models: ["ChatGPT", "Claude", "Gemini"],
    variables: [
      "DOCUMENT_TYPE",
      "TARGET_READER",
      "OBJECTIVE",
      "SOURCE_CONTENT",
      "LENGTH",
      "DECISION_REQUIRED",
    ],
    example_input:
      "A solar power feasibility report comparing APDCL supply, open-access power and a captive solar plant for an industrial unit.",
    example_output:
      "A management-level summary covering cost implications, operational risks, recommendation and next steps.",
    tips: [
      "Paste complete source material for accurate summarisation.",
      "Specify the decision expected from the reader.",
      "Verify every financial figure against the original document.",
    ],
    featured: false,
    published: true,
  },
];