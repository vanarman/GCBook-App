import React from 'react';
import { Container, Text, Button, Input, Item, Content } from 'native-base';
import { Constants } from 'expo';
import { NavigationActions } from 'react-navigation';
import SQL from '../components/SQL';

export default class AddAuthor extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			newText: ''
		};
	}
	static navigationOptions = {
		title: 'Add New Author',
		headerTintColor: '#64b5f6',
		headerTitleStyle: {
			fontWeight: 'bold',
			fontSize: 24
		}
	};
	render() {
		const back = () => {
			this.props.navigation.dispatch(NavigationActions.back());
		};

		const saveAuthor = () => {
			if (this.state.newText !== null || this.state.newText !== '') {
				SQL.AddNewAuthor(this.state.newText);
				back();
			}
		};

		return (
			<Container style={{ marginTop: Constants.statusBarHeight }}>
				<Content>
					<Item
						rounded
						style={{
							marginBottom: 10,
							paddingLeft: 10,
							borderColor: '#1fa6f2',
							marginRight: 5,
							marginLeft: 5
						}}
					>
						<Input
							placeholder="Author Name"
							onChangeText={(e) => {
								this.setState({ newText: e });
							}}
						/>
					</Item>

					<Button
						style={{ marginBottom: 15, backgroundColor: '#1fa6f2', borderColor: '#1fa6f2' }}
						full
						onPress={saveAuthor}
					>
						<Text>Save</Text>
					</Button>

					<Button full warning bordered onPress={back}>
						<Text>Cancel</Text>
					</Button>
				</Content>
			</Container>
		);
	}
}
