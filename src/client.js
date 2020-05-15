import { ApolloClient, InMemoryCache } from "apollo-boost";
import { WebSocketLink } from 'apollo-link-ws';
import { split } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { getMainDefinition } from 'apollo-utilities';

const httpLink = new HttpLink({
    uri: 'http://localhost:8000/graphql'
});
const cache = new InMemoryCache({ addTypename: false });

// Create a WebSocket link:
const wsLink = new WebSocketLink({
    uri: `ws://localhost:8000/graphql`,
    options: {
        reconnect: true
    }
});

wsLink.subscriptionClient.maxConnectTimeGenerator.duration = () =>
    wsLink.subscriptionClient.maxConnectTimeGenerator.max;

const link = split(
    // split based on operation type
    ({ query }) => {
        const definition = getMainDefinition(query);
        return (
            definition.kind === 'OperationDefinition' &&
            definition.operation === 'subscription'
        );
    },
    wsLink,
    httpLink,
);

const client = new ApolloClient({
    cache,
    link: link,
    defaultOptions: {
        watchQuery: {
            fetchPolicy: "network-only",
        },
        query: {
            fetchPolicy: "network-only",
        },
    },
});
export default client;