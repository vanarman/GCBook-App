import { createStackNavigator, createAppContainer } from 'react-navigation';
import HomePage from '../Screens/HomePage';
import AuthorsSongs from '../Screens/AuthorSongs';
import AddAuthor from '../Screens/AddAuthor';
import AddSong from '../Screens/AddSong';

const RootStack = createStackNavigator(
	{
		Home: {
			screen: HomePage
		},
		AuthorsSongs: {
			screen: AuthorsSongs
			// params: {
			// 	authorId: 1,
			// 	authorName: 'Author 1'
			// }
		},
		AddAuthor: {
			screen: AddAuthor
		},
		AddSong: {
			screen: AddSong
		}
	},
	{
		initialRouteName: 'Home' //Default screen name
	}
);

export default createAppContainer(RootStack);
