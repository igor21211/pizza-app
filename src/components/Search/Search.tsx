import { forwardRef } from 'react';
import styles from './Search.module.css';
import classNames from 'classnames';
import { SearchProps } from './Search.props';

const Search = forwardRef<HTMLInputElement, SearchProps>(function Search({className, isValid = true, ...props}, ref) {
	return (
		<div className={styles['input-wrapper']}>
			<input {...props} ref={ref}  className={classNames(className, styles['search'], {
				[styles['invalid']] : !isValid
			})} />
			<img className={styles['icon']} src="/search-icon.svg" alt="search-icon" />
		</div>
		
	);
});

export default Search;