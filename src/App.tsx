import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import Router from './Router';
import GlobalStyle from './styles/GlobalStyle';

const queryClient = new QueryClient();

function App() {
  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <GlobalStyle />
        <Router />
      </QueryClientProvider>
    </div>
  );
}

export default App;
