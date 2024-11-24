/* eslint-disable prettier/prettier */

import { ComponentProps, forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

// Root Layout: Main container for the app
export const RootLayout = ({ children, className, ...props }: ComponentProps<'main'>) => {
  return (
    <main
      className={twMerge(
        'flex flex-row h-screen bg-gray-900 text-gray-100',
        'overflow-hidden shadow-lg border border-gray-700',
        className
      )}
      {...props}
    >
      {children}
    </main>
  );
};

// Sidebar: Fixed-width side navigation or utility area
export const Sidebar = ({ className, children, ...props }: ComponentProps<'aside'>) => {
  return (
    <aside
      className={twMerge(
        'w-[250px] h-full bg-gray-800 text-gray-200',
        'overflow-auto p-4 shadow-md border-r border-gray-700',
        'custom-scrollbar', // Add custom scroll styling (defined in Tailwind CSS extensions)
        className
      )}
      {...props}
    >
      {children}
    </aside>
  );
};

// Content: Main content area with dynamic scrolling
export const Content = forwardRef<HTMLDivElement, ComponentProps<'div'>>(
  ({ children, className, ...props }, ref) => (
    <div
      ref={ref}
      className={twMerge(
        'flex-1 p-6 overflow-auto bg-gray-950 text-gray-50',
        'rounded-lg shadow-inner border-l border-gray-700',
        'custom-scrollbar', // Add custom scroll styling (defined in Tailwind CSS extensions)
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
);

Content.displayName = 'Content';
