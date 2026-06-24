import "dotenv/config"
import { OpenAIAgentsProvider } from "@corsair-dev/mcp";
import { Agent, tool } from "@openai/agents";
import { corsair } from "~/server/corsair";
import { SYSTEM_PROMPT } from "./systemPrompt"; 

const provider = new OpenAIAgentsProvider();

const tools = provider.build({
    corsair,
    tool,
});

console.log("TOOLS:", tools);
console.log("TOOLS COUNT:", Array.isArray(tools) ? tools.length : "not array");

export const createAgent = (name: string, email: string) =>
    new Agent({
        name: "yugoma-ai",
        model: "gpt-4.1-mini",
        instructions: SYSTEM_PROMPT(name, email),
        tools,
        modelSettings: {
            temperature: 0,
        },
    });