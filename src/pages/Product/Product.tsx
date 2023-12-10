import { Await, useLoaderData } from 'react-router-dom';
import { Product } from '../../interfaces/product.interface';
import { Suspense } from 'react';
import { ErrorPage } from '../Error/ErrorPage';

export function Product(){
	const data = useLoaderData() as {data: Product};


	return <>
		<Suspense fallback={'Loading..'}>
			<Await errorElement={<ErrorPage/>} resolve={data.data}>
				{({data}: {data: Product})=> (
					<>Product name: {data.name}</>
				)}
			</Await>
		</Suspense>
	</>;
}