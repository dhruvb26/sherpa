"use client";
import React, { useCallback, useState } from "react";
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  BackgroundVariant,
  Node,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { ColorPicker } from "@/components/ui/color-picker";
import { Textarea } from "@/components/ui/textarea";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { edgeTypes } from "@/utils/react-flow";
import CustomNode from "@/components/react-flow/custom-node";
import CustomGroup from "@/components/react-flow/custom-group";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

import { Input } from "@/components/ui/input";
import { UploadButton } from "@/utils/uploadthing";
const proOptions = { hideAttribution: true };
export const nodeTypes = {
  custom: CustomNode,
  group: CustomGroup,
};

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const initialNodes: Node[] = [
  {
    id: "1",
    type: "custom",
    position: {
      x: 100,
      y: 50,
    },
    data: {
      title: "Paper Title",
      description:
        "CoMAL: Collaborative Multi-Agent Large Language Models for Mixed-Autonomy Traffic",
    },
    style: {
      backgroundColor: "hsl(0, 0%, 100%)",
      color: "hsl(0, 0%, 0%)",
      borderRadius: "0.5rem",
    },
  },
  {
    id: "2",
    type: "custom",
    position: {
      x: 100,
      y: 150,
    },
    data: {
      title: "Authors",
      description:
        "Huaiyuan Yao, Longchao Da, Vishnu Nandam, Justin Turnau, Zhiwei Liu, Linsey Pang, Hua Wei",
    },
    style: {
      backgroundColor: "hsl(0, 0%, 100%)",
      color: "hsl(0, 0%, 0%)",
      borderRadius: "0.5rem",
    },
  },
  {
    id: "3",
    type: "custom",
    position: {
      x: 100,
      y: 250,
    },
    data: {
      title: "Affiliations",
      description: "1: Arizona State University, 2: Salesforce",
    },
    style: {
      backgroundColor: "hsl(0, 0%, 100%)",
      color: "hsl(0, 0%, 0%)",
      borderRadius: "0.5rem",
    },
  },
  {
    id: "4",
    type: "custom",
    position: {
      x: 100,
      y: 350,
    },
    data: {
      title: "Abstract",
      description:
        "CoMAL is a framework that integrates autonomous vehicles into urban traffic using collaborative multi-agent large language models to optimize traffic flow. It includes a perception module, a memory module, a collaboration module, a reasoning engine, and an execution module. CoMAL shows superior performance on the Flow benchmark and demonstrates the strong cooperative capability of LLM agents.",
    },
    style: {
      backgroundColor: "hsl(0, 0%, 100%)",
      color: "hsl(0, 0%, 0%)",
      borderRadius: "0.5rem",
    },
  },
  {
    id: "5",
    type: "custom",
    position: {
      x: 100,
      y: 500,
    },
    data: {
      title: "Key Contributions",
      description:
        "1) First integration of collaborative multi-agent language models in autonomous driving, 2) Introduction of CoMAL framework for enhancing traffic control, 3) Performance evaluation on Flow benchmark showing improvements in traffic metrics, 4) Experiments with different LLM models demonstrating adaptability.",
    },
    style: {
      backgroundColor: "hsl(0, 0%, 100%)",
      color: "hsl(0, 0%, 0%)",
      borderRadius: "0.5rem",
    },
  },
  {
    id: "6",
    type: "custom",
    position: {
      x: 100,
      y: 650,
    },
    data: {
      title: "Publication Date",
      description: "18 Oct 2024",
    },
    style: {
      backgroundColor: "hsl(0, 0%, 100%)",
      color: "hsl(0, 0%, 0%)",
      borderRadius: "0.5rem",
    },
  },
];

const initialEdges = [
  {
    id: "e1-2",
    source: "1",
    target: "2",
    type: edgeTypes.bezier,
    animated: true,
  },
  { id: "e1-3", source: "1", target: "3", type: edgeTypes.bezier },
  { id: "e2a-4a", source: "2a", target: "4a", type: edgeTypes.bezier },
  { id: "e3-4b", source: "3", target: "4b", type: edgeTypes.bezier },
  { id: "e4a-4b1", source: "4a", target: "4b1", type: edgeTypes.bezier },
  { id: "e4a-4b2", source: "4a", target: "4b2", type: edgeTypes.bezier },
  { id: "e4b1-4b2", source: "4b1", target: "4b2", type: edgeTypes.bezier },
];

const defaultViewport = { x: 0, y: 0, zoom: 0.5 };

const DashboardPage = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [numPages, setNumPages] = useState<number>(1);
  const [pageNumber, setPageNumber] = useState<number>(1);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  const onConnect = useCallback(
    (params: any) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onNodeClick = useCallback((event: any, node: any) => {
    setSelectedNode(node.id);
  }, []);

  const updateNodeProperty = useCallback(
    (nodeId: string, updates: any) => {
      setNodes((nds) =>
        nds.map((node) => {
          if (node.id === nodeId) {
            const currentNode = node;
            const newStyle = updates.style
              ? { ...currentNode.style, ...updates.style }
              : currentNode.style;

            return {
              ...currentNode,
              ...updates,
              style: newStyle,
              type: currentNode.type,
            };
          }
          return node;
        })
      );

      if ("hidden" in updates) {
        setEdges((eds) =>
          eds.map((edge) => {
            if (edge.source === nodeId || edge.target === nodeId) {
              return {
                ...edge,
                hidden: updates.hidden,
              };
            }
            return edge;
          })
        );
      }
    },
    [setNodes, setEdges]
  );
  const selectedNodeData = nodes.find((n) => n.id === selectedNode);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [selectedText, setSelectedText] = useState<string>("");
  return (
    <div className="flex flex-row w-full h-screen">
      <div className="w-1/2 p-4 border-r">
        <UploadButton
          className="ut-button:bg-primary ut-button:ut-uploading:bg-primary ut-allowed-content:uppercase ut-button:text-primary-foreground ut-button:hover:bg-primary/90 ut-button:border-none ut-button:shadow-none ut-button:text-sm ut-button:h-9"
          endpoint="pdfUploader"
          onClientUploadComplete={(res) => {
            if (res?.[0]?.url) {
              setPdfUrl(res[0].url);
            }
          }}
        />
        {pdfUrl && (
          <div className="mt-4">
            <div className="flex flex-col gap-4">
              <div className="h-[80vh] overflow-y-auto">
                <Document
                  file={pdfUrl}
                  onLoadSuccess={onDocumentLoadSuccess}
                  className="flex flex-col items-center"
                  loading={<div>Loading...</div>}
                >
                  {Array.from(new Array(numPages), (_, index) => (
                    <div className="mb-4" key={`page_${index + 1}`}>
                      <Page
                        pageNumber={index + 1}
                        className="border border-border"
                        width={600}
                      />
                    </div>
                  ))}
                </Document>
              </div>

              <div className="w-full">
                <Textarea
                  value={selectedText}
                  onChange={(e) => setSelectedText(e.target.value)}
                  placeholder="Selected text will appear here..."
                  className="w-full h-32"
                />
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="flex-1 h-full relative">
        {selectedNode && selectedNodeData?.type !== "group" && (
          <div className="absolute z-10 top-4 right-4 p-4 bg-background/80 backdrop-blur-sm rounded-lg border w-fit">
            <div className="space-y-4">
              <div className="space-y-2 w-full">
                <Input
                  type="text"
                  className="w-full p-2 rounded border"
                  // @ts-ignore
                  value={selectedNodeData?.data?.title || ""}
                  onChange={(evt) =>
                    updateNodeProperty(selectedNode, {
                      data: {
                        ...selectedNodeData?.data,
                        title: evt.target.value,
                      },
                    })
                  }
                  placeholder="Node Title"
                />
                <Textarea
                  className="h-20 overflow-wrap"
                  // @ts-ignore
                  value={selectedNodeData?.data?.description || ""}
                  onChange={(evt) =>
                    updateNodeProperty(selectedNode, {
                      data: {
                        ...selectedNodeData?.data,
                        description: evt.target.value,
                      },
                    })
                  }
                  placeholder="Node Description"
                />
              </div>

              <div className="space-y-2 w-full">
                <div className="flex flex-row items-end justify-center space-x-2">
                  <div className="flex flex-col space-y-1">
                    <span className="text-xs">Background</span>
                    <ColorPicker
                      color={
                        selectedNodeData?.style?.backgroundColor ||
                        "hsl(0, 0%, 93%)"
                      }
                      onChange={(color) =>
                        updateNodeProperty(selectedNode, {
                          style: { backgroundColor: color },
                        })
                      }
                    />
                  </div>
                  <div className="flex flex-col space-y-1">
                    <span className="text-xs">Text</span>
                    <ColorPicker
                      color={selectedNodeData?.style?.color || "hsl(0, 0%, 0%)"}
                      onChange={(color) =>
                        updateNodeProperty(selectedNode, {
                          style: { color: color },
                        })
                      }
                    />
                  </div>
                  <Button
                    className="rounded-full"
                    size="icon"
                    variant="ghost"
                    onClick={() =>
                      updateNodeProperty(selectedNode, {
                        hidden: !selectedNodeData?.hidden,
                      })
                    }
                  >
                    {selectedNodeData?.hidden ? (
                      <EyeOff className="h-4 w-4 hover:text-primary" />
                    ) : (
                      <Eye className="h-4 w-4 hover:text-primary" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="flex justify-end items-center space-x-2"></div>
            </div>
          </div>
        )}

        <ReactFlow
          proOptions={proOptions}
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={onNodeClick}
          defaultViewport={defaultViewport}
          minZoom={0.2}
          maxZoom={4}
          fitView
          nodeTypes={nodeTypes}
          fitViewOptions={{ padding: 0.5 }}
        >
          <Controls />
          <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
          <MiniMap />
        </ReactFlow>
      </div>
    </div>
  );
};

export default DashboardPage;
