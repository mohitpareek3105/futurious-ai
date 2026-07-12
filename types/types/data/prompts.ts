import { Prompt } from "@/types/prompt";

export const prompts: Prompt[] = [

{
id:1,

title:"YouTube Script Generator",

slug:"youtube-script-generator",

category:"YouTube",

description:"Generate engaging YouTube video scripts.",

prompt:
`Act as an expert YouTube script writer.

Write a 10-minute engaging Hindi YouTube video script about:

[TOPIC]

The script should have:

Hook

Storytelling

Examples

Call to Action`,

tags:["YouTube","Content"],

featured:true,

},

{
id:2,

title:"Excel Formula Expert",

slug:"excel-formula-expert",

category:"Excel",

description:"Generate Excel formulas.",

prompt:
`Act as an Excel Expert.

Help me solve this Excel problem:

[YOUR QUESTION]

Explain step-by-step.`,

tags:["Excel"],

featured:true,

},

{
id:3,

title:"Resume Builder",

slug:"resume-builder",

category:"Career",

description:"Professional resume prompt.",

prompt:
`Act as an HR Manager.

Create an ATS-friendly resume using this information:

[DETAILS]`,

tags:["Resume"],

featured:true,

},

];