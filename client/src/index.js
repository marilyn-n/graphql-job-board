import 'bulma/css/bulma.css';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
import App from './App';

const root = createRoot(document.getElementById('root'));

const client = new ApolloClient({
  uri: 'http://localhost:9000/graphql',
  cache: new InMemoryCache(),
});

root.render(
  <BrowserRouter>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </BrowserRouter>
);
