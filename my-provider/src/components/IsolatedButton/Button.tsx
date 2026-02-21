import React from 'react';
import styles from './Button.module.css';

interface Props {
	label?: string;
	onClick?: () => void;
}

export default function Button({ label = 'Click me', onClick }: Props) {
	return (
		<div>
			<button className={styles.button} onClick={onClick}>
				{label}
			</button>
			<p className={styles.title}>From Provider</p>
		</div>
	);
}