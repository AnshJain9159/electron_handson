/* eslint-disable prettier/prettier */
import {
  Content,
  DraggableTopBar,
  RootLayout,
  Sidebar,
  ActionButtonsRow,
  NotePreviewList,
  FloatingNoteTitle,
  MarkdownEditor,
} from './components';
import { useRef } from 'react';

const App = () => {
  const contentContainerRef = useRef<HTMLDivElement>(null);

  // Resets scroll to the top of the content container
  const resetScroll = () => {
    contentContainerRef.current?.scrollTo(0, 0);
  };

  return (
    <>
      {/* Top Bar that can be dragged */}
      <DraggableTopBar />

      {/* Main Layout */}
      <RootLayout>
        {/* Sidebar Section */}
        <Sidebar className="p-2">
          {/* Action Buttons Row */}
          <ActionButtonsRow className="flex justify-between mt-1" />

          {/* List of Note Previews */}
          <NotePreviewList 
            className="mt-3 space-y-1" 
            onSelect={resetScroll} 
          />
        </Sidebar>

        {/* Main Content Section */}
        <Content className="border-blue-500 bg-zinc-900/50 border-l border-l-white/20">
          {/* Floating Note Title */}
          <FloatingNoteTitle className="pt-2" />

          {/* Markdown Editor for Note Content */}
          <MarkdownEditor />
        </Content>
      </RootLayout>
    </>
  );
};

export default App;
