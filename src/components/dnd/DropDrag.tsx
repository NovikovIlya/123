import { FunctionComponent, useEffect, useState } from 'react'
import { Responsive, WidthProvider } from 'react-grid-layout'
import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'

import { RootState, useAppSelector } from '../../store'

import './DropDrag.scss'
import { anotherElements, studElements } from './defaultElement'

interface IDropDragProps {
	edit: boolean
	layouts: { [index: string]: any[] }
	setLayouts: (value: { [index: string]: any[] }) => void
}

const ResponsiveReactGridLayout = WidthProvider(Responsive)
const DropDrag: FunctionComponent<IDropDragProps> = ({
	edit,
	layouts,
	setLayouts
}) => {
	const role = useAppSelector((state: RootState) => state.InfoUser.role)

	const [currentBreakpoint, setCurrentBreakpoint] = useState<string>('lg')
	const [mounted, setMounted] = useState(false)
	const [toolbox, setToolbox] = useState<{ [index: string]: any[] }>({
		lg: []
	})
	const [cards, changeCards] = useState<
		{ index: string; element: JSX.Element }[] | null
	>(null)

	useEffect(() => {
		setMounted(true)
		changeCards(role === 'STUD' ? studElements : anotherElements)
	}, [])

	useEffect(() => {
		localStorage.setItem('dashboard', JSON.stringify(layouts))
	}, [layouts])

	const onBreakpointChange = (breakpoint: any) => {
		setCurrentBreakpoint(breakpoint)
		setToolbox({
			...toolbox,
			[breakpoint]: toolbox[breakpoint] || toolbox[currentBreakpoint] || []
		})
	}

	const onLayoutChange = (layout: any, layouts: any) => {
		setLayouts({ ...layouts })
	}

	const generateDOM = layouts.lg.map((item, i) => (
		<div key={item.i} className="bg-white/70 rounded-[20px] customShadow">
			<div className="w-full h-full">{cards && cards[i].element}</div>
		</div>
	))

	return (
		<div className=" mt-[40px] w-[min(1600px, 100%)] mb-[100px]">
			<ResponsiveReactGridLayout
				className="layout "
				cols={{ lg: 3, md: 2, sm: 2, xs: 1, xxs: 1 }}
				rowHeight={150}
				containerPadding={[0, 0]}
				margin={[20, 20]}
				layouts={layouts}
				measureBeforeMount={true}
				useCSSTransforms={mounted}
				onLayoutChange={onLayoutChange}
				onBreakpointChange={onBreakpointChange}
				isDraggable={false}
				isResizable={false}
			>
				{generateDOM}
			</ResponsiveReactGridLayout>
		</div>
	)
}

export default DropDrag
