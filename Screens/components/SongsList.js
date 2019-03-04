import React, { Component } from 'react';
import { FlatList, Alert, TouchableOpacity } from 'react-native';
import { Text, SwipeRow, Button, Icon, View, ListItem, Left, Right, Body } from 'native-base';
import SQL from '../../components/SQL';

export default class SongsList extends Component {
	render() {
		const starSong = function(item) {
			SQL.toggleStared(item.sId);
			this.props.update();
		};

		const deleteDialog = function(item) {
			Alert.alert(
				'Delete',
				`Are you sure that you want to delete:\n${item.sName}`,
				[
					{
						text: 'OK',
						onPress: () => {
							SQL.DeleteSong(item.sId, item.id);
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
				data={this.props.songs}
				extraData={this.props.refresh}
				keyExtractor={(item) => item.id}
				renderItem={({ item }) => (
					<SwipeRow
						leftOpenValue={75}
						rightOpenValue={-75}
						disableRightSwipe={true}
						body={
							<TouchableOpacity
								icon
								onPress={() => {
									console.log(item.sName);
								}}
								style={{ borderBottom: 'none', flex: 1, flexDirection: 'row' }}
							>
								<Text
									style={{
										flex: 1,
										flexDirection: 'row',
										paddingLeft: 10,
										fontSize: 18,
										fontWeight: '600',
										color: '#1fa6f2'
									}}
								>
									{item.sName}
								</Text>
								<Right>
									<Icon
										onPress={starSong.bind(this, item)}
										style={{
											fontSize: 22,
											color: '#4af',
											display: 'block',
											width: 20
										}}
										type="MaterialIcons"
										active
										name={item.stared ? 'favorite' : 'favorite-border'}
									/>
								</Right>
							</TouchableOpacity>
						}
						right={
							<Button danger onPress={deleteDialog.bind(this, item)}>
								<Icon active name="trash" />
							</Button>
						}
					/>
				)}
			/>
		);
	}
}
