import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MantineProvider } from '@mantine/core';

import { Dashboard } from './components/Dashboard';
import { NewInvoice } from './components/NewInvoice';
import { ManageInvoice } from './components/ManageInvoice';
import { InvoiceAction } from './components/InvoiceAction';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <MantineProvider
        theme={{
          datesLocale: 'en-US',
          components: {
            Button: {
              styles: () => ({
                label: {
                  textTransform: 'capitalize',
                },
              }),
            },
            Modal: {
              defaultProps: {
                overlayOpacity: 0.4,
                overlayBlur: 1.5,
                overlayColor: '#012',
              },
              styles: () => ({
                modal: {
                  boxShadow: '0 0 6px rgba(0, 0, 0, .3)',
                },
              }),
            },
          },
        }}
      >
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Dashboard />}>
              <Route path="invoices/new" element={<NewInvoice />} />
              <Route path="invoices/:id" element={<ManageInvoice />}>
                <Route path=":action" element={<InvoiceAction />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </MantineProvider>
    </QueryClientProvider>
  );
};

document.addEventListener('DOMContentLoaded', () => {
  const rootEl = document.getElementById('app');
  if (rootEl) {
    const root = createRoot(rootEl);
    root.render(<App />);
  }
});
