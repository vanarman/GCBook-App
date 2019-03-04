import React from 'react';
import { Container, Content, Icon } from 'native-base';
import { Constants } from 'expo';
import SQL from '../components/SQL';
import AuthorsList from './components/AuthorsList';

export default class HomePage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			authors: [],
			refresh: false
		};
	}

	componentDidMount() {
		this.updateData();
		this.props.navigation.addListener('didFocus', (payload) => {
			this.updateData();
		});
	}

	async updateData() {
		let authors = await SQL.SelectAuthorsList();
		this.setState({ authors });
		this.setState({ refresh: !this.state.refresh });
	}

	static navigationOptions = ({ navigation }) => ({
		title: 'Authors',
		headerTintColor: '#64b5f6',
		headerTitleStyle: {
			fontWeight: 'bold',
			fontSize: 24
		},
		headerRight: (
			<Icon
				onPress={() => {
					navigation.navigate('AddAuthor', { go_back_key: navigation.state.key });
				}}
				style={{ color: '#64b5f6', backgroundColor: '#fff', margin: 7 }}
				type="FontAwesome"
				name="user-plus"
			/>
		)
	});

	render() {
		return (
			<Container style={{ marginTop: Constants.statusBarHeight }}>
				<Content style={{ marginTop: -20 }}>
					<AuthorsList
						authors={this.state.authors}
						refresh={this.state.refresh}
						navigation={this.props.navigation}
						update={this.updateData.bind(this)}
					/>
				</Content>
			</Container>
		);
	}
}
