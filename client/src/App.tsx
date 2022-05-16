import React from 'react';
import { Routes } from './Routes';
import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink, from, ApolloLink, NormalizedCacheObject } from '@apollo/client';
import { onError } from '@apollo/client/link/error';

import './App.css';
import IndicatorProvider from './providers/IndicatorProvider';

function App() {
	// TODO implement appolloClient.ts
	const errorLink: ApolloLink = onError(({ graphQLErrors, networkError }) => {
		if (graphQLErrors) {
			// TODO log errors to server
		}
	});

	const link: ApolloLink = from([
		errorLink,
		new HttpLink({ uri: "http://localhost:8080/graphql" }),
	]);

	const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
		cache: new InMemoryCache(),
		link: link,
	});


	return (
		<ApolloProvider client={client}>
			<IndicatorProvider>
				<Routes />
			</ IndicatorProvider>
		</ApolloProvider>
	);
}

export default App;
