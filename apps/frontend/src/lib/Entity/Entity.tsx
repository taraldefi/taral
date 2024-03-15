// Generated with util/create-component.js
import React, { useEffect, useState } from 'react';
import { EntityType } from './Entity.types';
import './Entity.module.scss';

export function Entity({ entityData, modal, fetchLogo }: EntityType) {
	const [logo, setLogo] = useState<string>();
	useEffect(() => {
		async function fetchLogoAndSet() {
			if (fetchLogo) {
				const src = await fetchLogo(entityData.logo);
				setLogo(src);
			}
		}

		fetchLogoAndSet();
	}, [entityData, fetchLogo]);
	return (
		<div className='entity--wrapper'>
			<div className='entity--top--content'>
				<div className='entity--image--container'>
					<img
						className='images'
						src={logo}
						alt=''
						width='100%'
						height='100%'
					></img>
				</div>
				<div className='entity--title--box'>
					<span>{entityData.name}</span>
					<span>{entityData.abbreviation}</span>
				</div>
				<div className='options--container'>{modal}</div>
			</div>
			<div className='bottom--content'>
				<div className='registration--container'>
					<span>REGISTRATION NUMBER</span>
					<span>{entityData.registrationNumber}</span>
				</div>
				<div className='product--container'>
					<span>PRODUCTS</span>
					<span>{entityData.products}</span>
				</div>
				<div className='applications--container'>
					<span>APPLICATIONS</span>
					<span>{entityData.applications}</span>
				</div>
			</div>
		</div>
	);
}
