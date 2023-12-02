import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import UserInformation from '../components/UserInformation';
import { useEffect, useRef, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { gql, useMutation } from '@apollo/client';

const ADD_POST = gql`
	mutation AddPost($post: NewPost) {
		addPost(post: $post) {
			_id
			content
			tags
			imgUrl
			authorId
		}
	}
`;

const CreateFormPost = ({ query }) => {
	const { navigate } = useNavigation();
	const [addPost, { data, loading, error }] = useMutation(ADD_POST, {
		refetchQueries: [query, 'Posts'],
	});
	const [imgUrl, setImgUrl] = useState('');
	const [content, setContent] = useState('');
	const [tagInput, setTagInput] = useState('');
	const tagInputRef = useRef(null);
	const [tags, setTags] = useState(['tailwindcss', 'react-native']);

	const addTag = () => {
		// console.log(e.nativeEvent);
		const trimmedInput = tagInput.trim();
		if (trimmedInput) {
			setTags((prev) => [...prev, trimmedInput]);
		}
	};

	const removeTag = (index) => {
		const newArr = [...tags];
		newArr.splice(index, 1);
		setTags(newArr);
	};

	useEffect(() => {
		setTagInput('');

		if (tagInputRef.current) {
			// console.log('clear');
			tagInputRef.current.clear();
		}
	}, [tags]);

	const handleOnSubmit = async () => {
		try {
			// console.log(imgUrl, tags, content);
			const response = await addPost({
				variables: {
					post: {
						imgUrl,
						content,
						tags,
					},
				},
			});
			navigate('Home');
			console.log(response, '>>> response add post');
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<View
			style={{
				gap: 10,
				padding: 20,
				flex: 1,
				justifyContent: 'flex-start',
				backgroundColor: 'white',
			}}
		>
			<UserInformation />
			<TextInput
				style={{
					// width: '100%',
					paddingVertical: 6,
					paddingHorizontal: 20,
					borderWidth: 1,
					borderColor: 'lightgray',
					borderRadius: 10,
					marginTop: 20,
				}}
				value={imgUrl}
				onChangeText={(text) => setImgUrl(text)}
				placeholder="Image URL"
				autoCapitalize="none"
			/>
			<View
				style={{
					// width: '100%',
					paddingVertical: 10,
					paddingHorizontal: 20,
					borderWidth: 1,
					borderColor: 'lightgray',
					borderRadius: 10,
					flexDirection: 'row',
					flexWrap: 'wrap',
					gap: 10,
				}}
			>
				{tags.map((val, index) => {
					return (
						<TouchableOpacity
							key={index}
							style={{
								flexDirection: 'row',
								alignItems: 'center',
								gap: 5,
								backgroundColor: '#1877f2',
								paddingHorizontal: 8,
								paddingVertical: 6,
								borderRadius: 8,
							}}
							onPress={() => removeTag(index)}
						>
							<Text style={{ color: 'white', fontWeight: 'bold' }}>{val}</Text>
							<View
								style={{
									paddingVertical: 1,
									paddingHorizontal: 2,
									backgroundColor: 'white',
									borderRadius: 20,
									justifyContent: 'center',
									alignItems: 'center',
								}}
							>
								<Icon name="remove" color={'#1877f2'} size={10} />
							</View>
						</TouchableOpacity>
					);
				})}
				<TextInput
					placeholder="Press space to add tags"
					ref={tagInputRef}
					value={tagInput}
					onChangeText={(text) => setTagInput(text)}
					onKeyPress={(e) => (e.nativeEvent.key === ' ' ? addTag(e) : null)}
				/>
			</View>
			<TextInput
				multiline={true}
				numberOfLines={10}
				maxLength={40}
				style={{
					paddingVertical: 10,
					paddingHorizontal: 20,
					borderWidth: 1,
					borderColor: 'lightgray',
					borderRadius: 10,
					// flexGrow: 1,
					textAlignVertical: 'top',
				}}
				value={content}
				onChangeText={(text) => setContent(text)}
				autoCapitalize="none"
				placeholder="What's on your mind?"
			></TextInput>
			<TouchableOpacity
				style={{
					width: '100%',
					backgroundColor: '#1877f2',
					paddingVertical: 10,
					borderRadius: 10,
				}}
				onPress={handleOnSubmit}
			>
				<Text style={{ color: 'white', fontSize: 16, textAlign: 'center' }}>
					POST
				</Text>
			</TouchableOpacity>
		</View>
	);
};

export default CreateFormPost;
