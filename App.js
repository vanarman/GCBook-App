import React from 'react';
import { AppLoading } from 'expo';
import Navigation from './components/Navigation';
import SQL from './components/SQL';

export default class AnatomyExample extends React.Component {
	constructor(props) {
		super(props);
		this.state = { loading: true };
	}

	async componentWillMount() {
		await Expo.Font.loadAsync({
			Roboto: require('native-base/Fonts/Roboto.ttf'),
			Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
			Ionicons: require('@expo/vector-icons/fonts/Ionicons.ttf')
		});
		await SQL.DropAllTables();
		await SQL.InitDatabase();
		await SQL.TestData();
		this.setState({ loading: false });
	}

	render() {
		if (this.state.loading) {
			return <AppLoading />;
		}

		return <Navigation />;
	}
}
