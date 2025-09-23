import React from "react"
import {useState} from "react"


function Test(){
	const[count, setCount] = useState(0);
	
	function increment()
	{
		setCount(count+1);
	}
	return(
		<>
			<p>count: {count}</p>
			<button onClick={increment}>increment</button>
		</>
	);
}

export default Test;