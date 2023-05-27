import React from 'react';
import { Button, Loader, Table, Title } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';

dayjs.extend(localizedFormat);

export const Dashboard = () => {
  const navigate = useNavigate();
  const { data, isLoading } = useQuery(['invoices'], async () => {
    const data = await fetch('/invoices.json');
    return data.json();
  });
  if (isLoading || !(data instanceof Array)) {
    return <Loader />;
  }
  return (
    <>
      <Title order={1}>Invoices</Title>
      <Button component={Link} to="/invoices/new">
        New Invoice
      </Button>
      <Table striped highlightOnHover>
        <thead>
          <tr>
            <th>Amount</th>
            <th>Status</th>
            <th>Due date</th>
          </tr>
        </thead>
        <tbody>
          {data.map((record) => (
            <tr
              key={record.id}
              style={{ cursor: 'pointer' }}
              onClick={() => navigate(`/invoices/${record.id}`)}
            >
              <td>{record.amount || 0}</td>
              <td>{record.status}</td>
              <td>{record.due_at && dayjs(record.due_at).format('L')}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Outlet />
    </>
  );
};
