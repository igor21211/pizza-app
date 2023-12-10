import styles from './Button.module.css';
import { ButtonProps } from './Button.props';
import classNames from 'classnames';

function Button({children,className,appearence, ...props}: ButtonProps) {
	return (
		<button className={classNames(styles['button'],styles['accent'], className, {
			[styles['small']]: appearence === 'small',
			[styles['big']]: appearence === 'big'
		})} {...props}>{children}</button>
	);
}

export default Button;