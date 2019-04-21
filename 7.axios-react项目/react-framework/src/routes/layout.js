import React from 'react'
import Loadable from "react-loadable"
import Layout from 'components/BaseLayout'

// default
const defaultLoad = () => <div/>
let layout = {
		path: '/admin',
		component: Layout,
		routes: [
			// backtracking
			{
				path: '/admin/user-list',
				component: Loadable({
					loader: () => import('pages/admin/user-manager/index.js'),
					loading: defaultLoad
				}),
			}
		]
	}

export default layout