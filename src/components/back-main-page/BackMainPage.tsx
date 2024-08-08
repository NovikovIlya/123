import { Typography } from 'antd'
import { useTranslation } from 'react-i18next'

import { ArrowLeftSvg } from '../../assets/svg'

const { Link } = Typography
export const BackMainPage = () => {
	const { t } = useTranslation()
	return (
		<div className="flex w-full items-center justify-between px-4">
			<div className=" flex w-fit items-center gap-[10px] my-[50px] ml-[50px] cursor-pointer ">
				<ArrowLeftSvg />
				<Link style={{ color: 'black' }} href="https://eng.kpfu.ru/">
					{t('backPage')}
				</Link>
			</div>
		</div>
	)
}
