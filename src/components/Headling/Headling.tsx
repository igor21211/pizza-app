import styles from './Headling.module.css';
import { HeadlingProps } from './Headling.props';
import classNames from 'classnames';

function Headling({children , className, ...props}:HeadlingProps) {
	return (
		<h1 {...props} className={classNames(className, styles['h1'])} >{children}</h1>
	);
}

export default Headling;