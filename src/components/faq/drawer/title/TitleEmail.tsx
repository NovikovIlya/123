import { Typography } from 'antd'
import { FC } from 'react'

import { CloseSvg } from '../../../../assets/svg'

interface ITitleEmailProps {
	onClose: () => void
}

const { Text } = Typography

export const TitleEmail: FC<ITitleEmailProps> = ({ onClose }) => {
	return (
		<div className=" pb-[25px] rounded-b">
			<div onClick={onClose} className="absolute right-0 mr-5 cursor-pointer">
				<CloseSvg />
			</div>
			<h3 className="mt-5 min-[2559px]:my-10 min-[2559px]:text-6xl">Letter</h3>
			<Text className="text-black opacity-50 text-center flex px-4 min-[2559px]:text-3xl">
				The response time depends on the load on the operators, but usually does
				not exceed 1 working day
			</Text>
		</div>
	)
}
