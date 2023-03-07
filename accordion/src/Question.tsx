import React, { Dispatch, useState } from 'react';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';

//type 정의
interface IProps {
	title: string;
	info: string;
	id: number;
	setIndex: Dispatch<React.SetStateAction<number>>;
	index: number;
}

const Question = ({ title, info, id, setIndex, index }: IProps) => {
	//toggle 상태 관리를 위해서 useState 상태관리
	const [toggle, setToggle] = useState<boolean>(false);

	//클릭시 toggle 상태를 바꿔주고 index에 현재 id 값 상태를 넣어준다.
	const onClickShow = (id: number) => {
		setToggle((prev) => !prev);
		setIndex(id);
	};

	return (
		<article className="question">
			<header>
				<h4>{title}</h4>
				<button className="btn" onClick={() => onClickShow(id)}>
					{!!toggle && id === index ? <AiOutlineMinus /> : <AiOutlinePlus />}
				</button>
			</header>
			{/* toggle 상태가 true고 id값하고 index값이 같은 info만 보이기  */}
			{!!toggle && id === index && <p>{info}</p>}
		</article>
	);
};

export default Question;
