
import React from 'react';
import { PomodoroProvider } from '../contexts/PomodoroContext';
import Timer from '../components/Timer';
import TaskList from '../components/TaskList';
import FocusZone from '../components/FocusZone';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, ListTodo, Music } from 'lucide-react';

const Index = () => {
  return (
    <PomodoroProvider>
      <div className="min-h-screen bg-background">
        <header className="py-6 md:py-8 border-b">
          <div className="container max-w-6xl mx-auto px-4">
            <h1 className="text-2xl md:text-3xl font-bold text-center">Focus Flow</h1>
            <p className="text-center text-muted-foreground">Stay productive, one Pomodoro at a time</p>
          </div>
        </header>
        
        <main className="container max-w-6xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Timer Section */}
            <div className="flex flex-col items-center">
              <Timer />
            </div>
            
            {/* Task & Focus Zone Section (Mobile Tabs) */}
            <div className="lg:hidden">
              <Tabs defaultValue="tasks">
                <TabsList className="w-full mb-4">
                  <TabsTrigger value="tasks" className="flex-1 flex items-center justify-center gap-1">
                    <ListTodo size={16} />
                    <span>Tasks</span>
                  </TabsTrigger>
                  <TabsTrigger value="focus" className="flex-1 flex items-center justify-center gap-1">
                    <Music size={16} />
                    <span>Focus Zone</span>
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="tasks">
                  <TaskList />
                </TabsContent>
                <TabsContent value="focus">
                  <FocusZone />
                </TabsContent>
              </Tabs>
            </div>
            
            {/* Desktop Layout */}
            <div className="hidden lg:flex flex-col gap-8">
              <TaskList />
              <FocusZone />
            </div>
          </div>
        </main>
        
        <footer className="py-6 border-t">
          <div className="container max-w-6xl mx-auto px-4">
            <p className="text-center text-muted-foreground text-sm">
              Focus Flow Pomodoro - Stay focused and productive
            </p>
          </div>
        </footer>
      </div>
    </PomodoroProvider>
  );
};

export default Index;
