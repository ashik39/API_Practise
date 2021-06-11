// react-query fetch with axios
import React from 'react';
import axios from 'axios';
import { useQuery, QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

const getData = () => {
  const response = axios.get('http://swapi.dev/api/people/1/');
  return response;
};
function ReactQuery() {
  const { isLoading, error, data } = useQuery('fetchLuke', getData);
  console.log(data);
  return (
    <div className="App">
      <h1>React Query example with API fetch using axios</h1>
      {error && <div>Something went wrong ...</div>}

      {isLoading ? (
        <div>Retrieving Luke Skywalker Information ...</div>
      ) : (
        <div>
          <h4>DATA</h4>
          <h5>Name : {data.data.name}</h5>
          <h5>Gender: {data.data.gender}</h5>
          <h5>DOB: {data.data.birth_year}</h5>
          <h5>Height: {data.data.height}</h5>
        </div>
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

export default hof(ReactQuery);
