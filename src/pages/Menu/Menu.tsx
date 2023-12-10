import { ChangeEvent, useEffect, useState } from 'react';
import Headling from '../../components/Headling/Headling';
import Search from '../../components/Search/Search';
import { PREFIX } from '../../helpers/API';
import { Product } from '../../interfaces/product.interface';
import styles from './Menu.module.css';
import axios, { AxiosError } from 'axios';
import { MenuList } from './MenuList/MenuList';

export function Menu(){
	const [products, setProducts] = useState<Product[]>([]);
	const [isLoading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | undefined>();
	const [filter, setFilter] = useState<string>();

	useEffect(()=>{
		getMenu(filter);
	},[filter]);

	const getMenu = async(name?: string) => {
		try{
			setLoading(true);
			const {data} = await axios.get<Product[]>(`${PREFIX}/products`, {
				params:{
					name
				}
			});
			setProducts(data);
			setLoading(false);
		}catch(e){
			console.error(e);
			if(e instanceof AxiosError){
				setError(e.message);
			}
			setLoading(false);
			return;
		}

	};

	const updateFilter = (e: ChangeEvent<HTMLInputElement>) => {
		setFilter(e.target.value);
	};



	return <>
		<div className={styles['head']}>
			<Headling>Меню</Headling>
			<Search placeholder='Введите блюдо или состав' onChange={updateFilter}/>
		</div>
		<div>
			{error && <>{error}</>}
			{!isLoading && products.length > 0 && <MenuList products={products} />}
			{isLoading && <>Loading....</>}
			{!isLoading && products.length === 0 && <>Не найденно блюд</>}
		</div>
	</>;
}

export default Menu;
