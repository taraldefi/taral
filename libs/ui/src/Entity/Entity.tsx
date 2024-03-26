// Generated with util/create-component.js
import React, { useEffect, useState } from 'react';
import { EntityType } from './Entity.types';
import './Entity.scss';
import Button from '../Button';
import { ArrowRight } from 'react-feather';

export function Entity({
	entityData,
	modal,
	fetchLogo,
	onClickViewApplications,
}: EntityType) {
	const [logo, setLogo] = useState<string>();
	useEffect(() => {
		async function fetchLogoAndSet() {
			const src = await fetchLogo(entityData.logo);
			setLogo(src);
		}

		fetchLogoAndSet();
	}, [entityData]);
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
					<h4>REGISTRATION NUMBER</h4>
					<span>{entityData.registrationNumber}</span>
				</div>
				<div className='applications--container'>
					<Button
						primary
						backgroundColor='#1ab98b'
						icon={<ArrowRight size={'12px'} />}
						onClick={() => {
							onClickViewApplications();
						}}
						label={'Go to applications'}
					></Button>
				</div>
			</div>
		</div>
	);
}
