import React, { useState } from 'react';
import { useMutation } from 'react-query';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();
const submitFormHandler = async ({ name }) => {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    body: JSON.stringify({
      userId: name,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
  const result = res.json();
  return result;
};

function UseMutation() {
  const mutation = useMutation(submitFormHandler, {
    onSuccess: () => {
      alert('Successfully Posted');
    },
  });
  const [name, SetName] = useState('');

  if (mutation.isLoading) {
    return <h2>POSTING YOUR DATA.....</h2>;
  }
  const formHandler = async (e) => {
    e.preventDefault();
    try {
      await mutation.mutate({ name });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ margin: '50px 100px' }}>
      <form onSubmit={formHandler}>
        <input
          style={{ width: '100%', height: '40px', fontSize: '20px' }}
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={(e) => SetName(e.target.value)}
        />
        <br />
        <button
          style={{ marginTop: '10px', height: '30px', width: '150px' }}
          type="submit"
        >
          Submit
        </button>
      </form>
      {mutation.status === 'success' && (
        <strong style={{ marginTop: '20px' }}>
          response :{mutation.data.userId}
        </strong>
      )}
    </div>
  );
}

// Higher order function
const hof = (WrappedComponent) => {
  // Its job is to return a react component warpping the baby component
  return (props) => (
    <QueryClientProvider client={queryClient}>
      <WrappedComponent {...props} />
    </QueryClientProvider>
  );
};

export default hof(UseMutation);
