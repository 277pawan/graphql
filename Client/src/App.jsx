import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import Displaydata from "./Displaydata/Displaydata";

function App() {
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: "http://localhost:4000/graphql",
  });
  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Displaydata />
      </div>
    </ApolloProvider>
  );
}

export default App;
