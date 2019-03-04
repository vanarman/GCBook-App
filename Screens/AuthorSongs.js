import React from 'react';
import { Container, Content, Icon } from 'native-base';
import { Constants } from 'expo';
import SQL from '../components/SQL';
import SongList from './components/SongsList';

export default class AuthorsSongs extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			songs: [],
			refresh: false
		};
	}

	static navigationOptions = ({ navigation }) => ({
		title: navigation.getParam('authorName', 'Not Defined'),
		headerTintColor: '#64b5f6',
		headerTitleStyle: {
			fontWeight: 'bold',
			fontSize: 24
		},
		headerRight: (
			<Icon
				onPress={() => {
					navigation.navigate('AddSong', {
						go_back_key: navigation.state.key,
						authorId: navigation.getParam('authorId', -1)
					});
				}}
				style={{ color: '#64b5f6', backgroundColor: '#fff', margin: 7 }}
				type="Entypo"
				name="add-to-list"
			/>
		)
	});

	componentDidMount() {
		this.updateData();
		this.props.navigation.addListener('didFocus', (payload) => {
			this.updateData();
		});
	}

	async updateData() {
		let songs = await SQL.SelectSongsOfAuthor(this.props.navigation.getParam('authorId', -1));
		this.setState({ songs });
		this.setState({ refresh: !this.state.refresh });
	}

	render() {
		return (
			<Container style={{ marginTop: Constants.statusBarHeight }}>
				<Content style={{ marginTop: -20 }}>
					<SongList
						songs={this.state.songs}
						refresh={this.state.refresh}
						navigation={this.props.navigation}
						update={this.updateData.bind(this)}
					/>
				</Content>
			</Container>
		);
	}
}
