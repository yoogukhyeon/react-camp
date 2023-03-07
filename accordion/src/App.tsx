import React, { useState } from 'react';
import { data } from './data';
import SingleQuestion from './Question';
function App() {
	// 데이터 셋한걸 useState에 상태관리
	const [question, setQuestion] = useState<any[]>(data);

	//클릭한 id값 useState에 상태관리
	const [index, setIndex] = useState<number>(0);

	return (
		<main>
			<div className="container">
				<h3>리액트 아코디언 기능</h3>
				<section className="info">
					{question.map((val) => (
						//components에 props 넘겨준다.
						<SingleQuestion key={val.id} setIndex={setIndex} index={index} {...val} />
					))}
				</section>
			</div>
		</main>
	);
}

export default App;
