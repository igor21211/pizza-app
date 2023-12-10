import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter, defer } from 'react-router-dom';
import { Card } from './pages/Card/Card';
import { ErrorPage } from './pages/Error/ErrorPage.tsx';
import './index.css';
import { Layout } from './components/layout/Layout/Layout.tsx';
import { Product } from './pages/Product/Product.tsx';
import axios from 'axios';
import { PREFIX } from './helpers/API.ts';
import { AuthLayout } from './components/layout/Auth/AuthLayout.tsx';
import { Login } from './pages/Login/Login.tsx';
import { Register } from './pages/Register/Register.tsx';
import { RequireAuth } from './helpers/RequireAuth.tsx';
import { Provider } from 'react-redux';
import { store } from './store/store.ts';
import Success from './pages/Success/Success.tsx';


const Menu = lazy(()=> import('./pages/Menu/Menu'));


const router = createBrowserRouter([
	{
		path: '/',
		element: <RequireAuth><Layout/></RequireAuth>,
		children: [
			{
				path:'/',
				element: <Suspense fallback={<>Loading...</>}><Menu/></Suspense>
			},
			{
				path:'/card',
				element:<Card/>
			},
			{
				path:'/success',
				element:<Success/>
			},
			{
				path:'*',
				element: <ErrorPage/>
			},
			{
				path: '/product/:id',
				element: <Product />,
				errorElement: <ErrorPage/>,
				loader:async ({params}) => {
					return defer({
						data: axios.get(`${PREFIX}/products/${params.id}`).then(data => data)
					});
					/* const {data} = await axios.get(`${PREFIX}/products/${params.id}`);
					return data; */
				}
			}
		]
	},
	{
		path: '/auth',
		element: <AuthLayout/>,
		children: [
			{
				path: 'login',
				element: <Login/>
			},
			{
				path:'register',
				element: <Register/>
				
			}
		]
	}
]);
ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<Provider store={store}>
			<RouterProvider router={router} />
		</Provider>
	</React.StrictMode>
);
