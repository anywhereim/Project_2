import React from 'react';
import CartItem from '../components/CartItem';
import { BsFillPlusCircleFill } from 'react-icons/bs';
import { FaEquals } from 'react-icons/fa';
import PriceCard from '../components/PriceCard';
import Button from '../components/ui/Button';
import useCart from '../hooks/useCart';

const SHIPPING = 3000;
export default function MyCart() {
	const {
		cartQuery: { isLoading, data: products },
	} = useCart();

	if(isLoading) return <p>Loading...</p>

	const hasProducts = products && products.length > 0;

	//장바구니에 추가된 제품 합계금액 구하기
	const totalPrice = 
	products && 
	products.reduce(
		(prev, current) => prev + parseInt(current.price) * current.quantity,0);
	return (
		<section className='p-8 flex flex-col'>
			<p className='text-2xl text-center  font-bold pb-4 border-b border-gray-300'>내 장바구니</p>
			{!hasProducts && <p className='text-center mt-40 text-2xl'>장바구니에 상품이 없습니다.</p>}
			{hasProducts && 
			<>
				<ul className='border-b border-gray-300 mb-8 p-4 px-8 lg:px-16'>
					{products && products.map((product) => (
					<CartItem key={product.id} product={product} />))}
				</ul>
				<div className='flex justify-between items-center mb-8 px-0 md:px-8'>
					< PriceCard text="상품 총 금액" price={totalPrice} /> 
					< BsFillPlusCircleFill className='shrink-0'/>
					< PriceCard text="배송비" price={3000} /> 
					< FaEquals className='shrink-0'/>
					< PriceCard text="합계금액" price={totalPrice + SHIPPING} /> 
				</div>
				<Button text='주문하기' />
			</>}
		</section>
	);
}

