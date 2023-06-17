import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function ProductCard({
	product,
		product: { id, image, title, category, price },
	}) {
		const navigate = useNavigate();

	return  (
		<li onClick={() => {navigate(`/products/${id}`, {state: { product }} )}} 
		className='rounded-lg shadow-md overflow-hidden transition-all hover:scale-105' >
			<img className='w-full' src={image} alt={title} />
			<div className='mt-2 px-2 text-lg text-center text-sm ' >
				<h3 className='truncate' >{title}</h3>
				<p>{`￦${price}`}</p>
			</div>
			<p className='mb-2 px-2 text-center text-sm'>{category}</p>
		</li>
	);
}

