import React from 'react';
import { 
  Target, Users, ShoppingBag, Globe, PenTool, Zap, ExternalLink, ArrowRight, BookOpen, 
  LayoutGrid, MessageSquare, Bot, FileText, PlusCircle, Search, Cpu, BarChart, X, Send, Brain, Trash2
} from 'lucide-react';

export const Icon: React.FC<{ name: string; className?: string }> = ({ name, className }) => {
  switch (name) {
    case 'target': return <Target className={className} />;
    case 'users': return <Users className={className} />;
    case 'shopping-bag': return <ShoppingBag className={className} />;
    case 'globe': return <Globe className={className} />;
    case 'pen-tool': return <PenTool className={className} />;
    case 'zap': return <Zap className={className} />;
    case 'external-link': return <ExternalLink className={className} />;
    case 'arrow-right': return <ArrowRight className={className} />;
    case 'book-open': return <BookOpen className={className} />;
    case 'layout-grid': return <LayoutGrid className={className} />;
    case 'message-square': return <MessageSquare className={className} />;
    case 'bot': return <Bot className={className} />;
    case 'file-text': return <FileText className={className} />;
    case 'plus-circle': return <PlusCircle className={className} />;
    case 'search': return <Search className={className} />;
    case 'cpu': return <Cpu className={className} />;
    case 'bar-chart': return <BarChart className={className} />;
    case 'x': return <X className={className} />;
    case 'send': return <Send className={className} />;
    case 'brain': return <Brain className={className} />;
    case 'trash-2': return <Trash2 className={className} />;
    default: return <ExternalLink className={className} />;
  }
};