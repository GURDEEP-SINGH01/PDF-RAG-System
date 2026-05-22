import {
    StateGraph,
    START,
    END,
} from "@langchain/langgraph";

import { Annotation } from "@langchain/langgraph";
import { generateNode, retrieveNode } from "./node";

export const GraphState = Annotation.Root({
    messages: Annotation({
        reducer: (x, y) => x.concat(y),
        default: () => [],
    }),
    retrievedDocs: Annotation({
        reducer: (_, y) => y,
        default: () => [],
    }),
});


const graphBuilder = new StateGraph(GraphState);
graphBuilder.addNode("retrive", retrieveNode);
graphBuilder.addNode("generate", generateNode);
graphBuilder.addEdge(START, "retrive");
graphBuilder.addEdge("retrive", "generate");
graphBuilder.addEdge("generate", END);

export const graph = graphBuilder.compile();