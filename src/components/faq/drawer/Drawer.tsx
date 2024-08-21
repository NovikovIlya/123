import { Button, Collapse, Divider, Drawer, Typography } from 'antd'
import { FC } from 'react'

import { EmailSvg, PhoneSvg, QuestionSvg } from '../../../assets/svg'

import './Drawer.scss'
import { EmailDrawer } from './emailDrawer/EmailDrawer'
import { TitleFaq } from './title/TitleFaq'

interface IDrawerPros {
	open: boolean
	onClose: () => void
	onChildrenDrawerClose: () => void
	showChildrenDrawer: () => void
	childrenDrawer: boolean
}

const { Panel } = Collapse
const { Link } = Typography

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`

export const DrawerEmail: FC<IDrawerPros> = ({
	open,
	onClose,
	childrenDrawer,
	onChildrenDrawerClose,
	showChildrenDrawer
}) => {
	const width = document.body.clientWidth > 2200 ? 800 : 320

	return (
		<>
			<Drawer
				title={
					<TitleFaq onClose={onClose} showChildrenDrawer={showChildrenDrawer} />
				}
				onClose={onClose}
				closable={false}
				width={width}
				open={open}
				headerStyle={{ textAlign: 'center' }}
			>
				<Collapse
					className="text-[1.5vh]"
					expandIcon={() => <QuestionSvg />}
					ghost
				>
					<Panel
						header="How to connect to the KFU Wi-Fi?"
						className="hover:bg-black hover:bg-opacity-5 rounded-md text-base"
						key="1"
					>
						<p className="text-base">{text}</p>
					</Panel>
					<Panel
						header="How do I get credentials?"
						className="hover:bg-black hover:bg-opacity-5 rounded-md my-[1vh] text-base"
						key="2"
					>
						<p className="text-base">{text}</p>
					</Panel>
					<Panel
						className="hover:bg-black hover:bg-opacity-5 rounded-md text-base"
						header="Answers to frequently asked questions"
						key="3"
					>
						<p className="text-base">{text}</p>
					</Panel>
				</Collapse>
				<Divider />
				<Button
					className="flex items-center w-full gap-2 mb-3  py-[2.5vh] h-[5vh] min-[2559px]:m-0"
					icon={<EmailSvg />}
					type="text"
				>
					<Link
						className="text-[1.5vh] text-base"
						href="mailto:deshelp@kpfu.ru"
						style={{ color: '#000' }}
					>
						Write a letter
					</Link>
				</Button>
				<Button
					className="flex w-full items-center gap-2 mb-3  py-[2.5vh] h-[5vh] min-[2559px]:m-0"
					icon={<PhoneSvg />}
					type="text"
				>
					<Link
						href="tel:+7 (843) 206-50-84"
						className="text-[1.5vh] text-base"
						style={{ color: '#000' }}
					>
						To call
					</Link>
				</Button>
				<Divider />
				<div className="flex justify-center items-center text-lg ">
					<Link
						href="mailto:deshelp@kpfu.ru"
						strong
						style={{ color: '#808080' }}
						className=" cursor-pointer text-[1.5vh] text-sm"
					>
						deshelp@kpfu.ru
					</Link>
					<Divider
						className="h-[25px] min-[2559px]:h-10 min-[2559px]:border-2"
						type="vertical"
					/>
					<Link
						href="tel:+7 (843) 206-50-84"
						style={{ color: '#808080' }}
						strong
						className="cursor-pointer text-[1.5vh] text-sm"
					>
						+7 (843) 206-50-84
					</Link>
				</div>
				<EmailDrawer
					childrenDrawer={childrenDrawer}
					onChildrenDrawerClose={onChildrenDrawerClose}
				/>
			</Drawer>
		</>
	)
}
