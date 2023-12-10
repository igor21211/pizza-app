import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import styles from './Layout.module.css';
import Button from '../../Button/Button';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../store/store';
import { getProfile, userActions } from '../../../store/user.slice';
import { useEffect } from 'react';

export function Layout(){

	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();
	const profile = useSelector((s: RootState) => s.user.profile);
	const items = useSelector((s: RootState) => s.cart.items);

	useEffect(() =>{
		dispatch(getProfile());
	} , [dispatch]);

	const logout = () => {
		dispatch(userActions.logout());
		navigate('/auth/login');
	};

	return <>
		<div className={styles['layout']}>
			<div className={styles['sidebar']}>
				<div className={styles['user']}>
					<img src="/Intersect.png" alt="photo"  className={styles['avatar']}/>
					<div className={styles['name']}>{profile?.name}</div>
					<div className={styles['email']}>{profile?.email}</div>
				</div>
				<div className={styles['menu']}>
					<NavLink to="/" className={ ({isActive}) => classNames(styles['link'], {
						[styles.active]: isActive
					})}>
						<img src="/menu-icon.svg" alt="menu-link" />
						Меню</NavLink>
					<NavLink to="/card" className={ ({isActive}) => classNames(styles['link'], {
						[styles.active]: isActive
					})}>
						<img src="/cart-icon.svg" alt="cart-link" />
						Корзина <span className={styles['count']}>{items.reduce((acc, item) => acc +=item.count,0)}</span> </NavLink>
					
				</div>
				<Button className={styles['exit']} onClick={logout}>
					<img src="/exit-icon.svg" alt="exit-icon" />
					Выход
				</Button>
			</div>
			<div className={styles['content']}>
				<Outlet/>
			</div>
		</div>
	</>;
}