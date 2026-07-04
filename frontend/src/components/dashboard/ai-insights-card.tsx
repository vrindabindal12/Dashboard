"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, Loader2, Bot, AlertCircle } from "lucide-react";
import { fetchInsights } from "@/lib/api";

export function AiInsightsCard() {
  const [insight, setInsight] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [displayedText, setDisplayedText] = useState("");

  const generateInsight = async () => {
    setLoading(true);
    setInsight(null);
    setDisplayedText("");
    
    try {
      const data = await fetchInsights();
      setInsight(data.insight);
      simulateTyping(data.insight);
    } catch (error) {
      console.error(error);
      const errorMsg = "Could not connect to the ML reasoning engine. Please verify the backend service is running and try again.";
      setInsight(errorMsg);
      setDisplayedText(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const simulateTyping = (text: string) => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayedText(text.slice(0, i));
      i++;
      if (i > text.length) {
        clearInterval(interval);
      }
    }, 20); // 20ms per character to mimic streaming LLM
  };

  return (
    <Card className="bg-card border-border shadow-sm h-full flex flex-col hover:-translate-y-1 hover:shadow-md transition-all duration-300 ease-out">
      
      <CardHeader className="pb-3 border-b border-border/40">
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-primary" />
          Generative AI Insights
        </CardTitle>
        <CardDescription>Click below to have the AI engine summarize underlying trends in your data</CardDescription>
      </CardHeader>
      <CardContent>
        {!insight && !loading && (
          <div className="flex justify-center py-6">
            <Button onClick={generateInsight} className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground">
              <Sparkles className="w-4 h-4" />
              Generate Insights
            </Button>
          </div>
        )}
        
        {loading && (
          <div className="flex items-center justify-center py-6 gap-3 text-muted-foreground">
            <Loader2 className="w-5 h-5 animate-spin text-primary" />
            <span>Analyzing millions of rows...</span>
          </div>
        )}
        
        {(insight || displayedText) && !loading && (
          <div className={`bg-black/20 border border-white/5 p-4 rounded-xl flex gap-4 text-sm leading-relaxed min-h-[100px] ${insight?.includes("Could not connect") ? "border-rose-500/20 bg-rose-500/5" : ""}`}>
            <div className="mt-1">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${insight?.includes("Could not connect") ? "bg-rose-500/20 text-rose-500" : "bg-primary/20 text-primary"}`}>
                {insight?.includes("Could not connect") ? <AlertCircle className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>
            </div>
            <div className="flex-1 text-zinc-300 relative">
              {displayedText}
              {displayedText.length < (insight?.length || 0) && (
                <span className="inline-block w-1.5 h-4 ml-1 bg-primary animate-pulse" />
              )}
            </div>
          </div>
        )}
        
        {insight && !loading && displayedText.length === insight.length && (
           <div className="flex justify-end mt-4">
             <Button variant="ghost" size="sm" onClick={generateInsight} className="text-xs text-muted-foreground hover:text-white">
                Generate another insight
             </Button>
           </div>
        )}
      </CardContent>
    </Card>
  );
}
