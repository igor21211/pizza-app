import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button/Button';
import styles from './Success.module.css';

function Success() {
	const navigate = useNavigate();
	return (
		<div className={styles['success']}>
			<img src="/pizza.png" alt="pizza-image" />
			<div className={styles['text']}>Ваш Заказ успешно оформлен!</div>
			<Button appearence="big" onClick={() => navigate('/')}>Сделать Новый</Button>
		</div>
	);
}

export default Success;