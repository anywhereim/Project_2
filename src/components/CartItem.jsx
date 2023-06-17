import React from 'react';
import { RiDeleteBin5Fill } from 'react-icons/ri'
import { AiOutlineMinusSquare, AiOutlinePlusSquare } from 'react-icons/ai'
import useCart from '../hooks/useCart';

const ICON_CLASS = 'transition-all cursor-pointer hover:text-brand hover:scale-105 mx-1';
export default function CartItem(
	{product, product: { id, image, title,  option, quantity, price },
}) {
	const { addOrUpdateItem, removeItem } = useCart();
	const handleMinus = () => {
		if(quantity < 2) return;
		addOrUpdateItem.mutate({...product, quantity: quantity -1 });
	}
	const handlePlus = () => 
	addOrUpdateItem.mutate({...product, quantity: quantity +1 });

	const handleDelete = () => removeItem.mutate(id);

	return (
		<li className='flex justify-between my-2 items-center'>
			<img className='w-28 md:w-60 ml-4' src={image} alt={title} />
			<div className='flex-1 flex justify-between ml-4'>
				<div className='basis-3/5'>
					<p className='text-xs md:text-lg'>{title}</p>
					<p className='text-sm md:text-xl font-bold text-brand'>{option}</p>
					<p className='text-sm md:text-xl'>￦{price}</p>
				</div>
				<div className='text-2xl flex items-center'>
					<AiOutlineMinusSquare className={ICON_CLASS} onClick={handleMinus} />
						<span>{quantity}</span>
					<AiOutlinePlusSquare className={ICON_CLASS} onClick={handlePlus} />
					<RiDeleteBin5Fill className={ICON_CLASS}  onClick={handleDelete} />
				</div>
			</div>
		</li>
	);
}

