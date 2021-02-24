import React, { useState } from 'react'
import { Input } from 'antd';

const { Search } = Input;

function SearchFeature(props) {

	const [SearchTerms, setSearchTerms] = useState("")

	const onChangeSearch = (event) => {
		setSearchTerms(event.currentTarget.value)

		props.refreshFunction(event.currentTarget.value)

	}

	return (
		<div
			style={{
				display: 'flex',
				justifyContent: 'flex-end',
				margin: '1rem auto',
			}}
		>   
			<div>
				<Search
					value={SearchTerms}
					onChange={onChangeSearch}
					placeholder="Search By Typing..."
				/>
			</div>
		</div>
	)
}

export default SearchFeature
