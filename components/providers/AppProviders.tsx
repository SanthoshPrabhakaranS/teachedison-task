'use client';

import { ThemeProvider } from '@/components/providers/ThemeProvider';
import ReactQueryProvider from '@/components/providers/ReactQueryProvider';
import { GlobalContextProvider } from '@/components/providers/GlobalContextProvider';
import { Toaster } from 'sonner';

interface AppProvidersProps {
  children: React.ReactNode;
}

export default function AppProviders({ children }: AppProvidersProps) {
  return (
    <ThemeProvider
      attribute='class'
      defaultTheme='system'
      enableSystem
      disableTransitionOnChange
    >
      <Toaster />
      <ReactQueryProvider>
        <GlobalContextProvider>{children}</GlobalContextProvider>
      </ReactQueryProvider>
    </ThemeProvider>
  );
}
