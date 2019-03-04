import React from 'react';
import { FlatList, Alert, TouchableOpacity } from 'react-native';
import { Text, Button, SwipeRow, Icon } from 'native-base';
import SQL from '../../components/SQL';

export default class AuthorsList extends React.Component {
	render() {
		const authorsSong = function(item) {
			this.props.navigation.navigate('AuthorsSongs', {
				authorId: item.id,
				authorName: item.aName
			});
		};
		const deleteDialog = function(item) {
			Alert.alert(
				'Delete',
				`Are you sure that you want to delete:\n${item.aName}`,
				[
					{
						text: 'OK',
						onPress: () => {
							SQL.DeleteAuthor(item.id);
							this.props.update();
						}
					},
					{
						text: 'Cancel',
						style: 'cancel'
					}
				],
				{ cancelable: false }
			);
		};

		return (
			<FlatList
				data={this.props.authors}
				extraData={this.props.refresh}
				keyExtractor={(item) => item.id}
				renderItem={({ item }) => (
					<SwipeRow
						rightOpenValue={-75}
						disableRightSwipe={true}
						body={
							<TouchableOpacity
								style={{
									paddingLeft: 10,
									borderBottom: 'none',
									flex: 1,
									flexDirection: 'row'
								}}
								onPress={authorsSong.bind(this, item)}
							>
								<Text
									style={{
										fontSize: 18,
										fontWeight: '600',
										color: '#1fa6f2'
									}}
								>
									{item.aName}
								</Text>
							</TouchableOpacity>
						}
						right={
							<Button danger>
								<Icon active name="trash" onPress={deleteDialog.bind(this, item)} />
							</Button>
						}
					/>
				)}
			/>
		);
	}
}
