import React, { useState } from 'react';
import { useDrop } from 'react-dnd';
import { useAppDispatch, useAppSelector } from '../../store';
import { selectItemAmount, setItemAmount } from '../../store/inventory';
import { DragSource } from '../../typings';
import { onUse } from '../../dnd/onUse';
import { onGive } from '../../dnd/onGive';
import { fetchNui } from '../../utils/fetchNui';
import { Locale } from '../../store/locale';
import UsefulControls from './UsefulControls';

const InventoryControl: React.FC = () => {
  const itemAmount = useAppSelector(selectItemAmount);
  const dispatch = useAppDispatch();

  const [infoVisible, setInfoVisible] = useState(false);

  const [, use] = useDrop<DragSource, void, any>(() => ({
    accept: 'SLOT',
    drop: (source) => {
      source.inventory === 'player' && onUse(source.item);
    },
  }));

  const [, give] = useDrop<DragSource, void, any>(() => ({
    accept: 'SLOT',
    drop: (source) => {
      source.inventory === 'player' && onGive(source.item);
    },
  }));

  const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.target.valueAsNumber =
      isNaN(event.target.valueAsNumber) || event.target.valueAsNumber < 0 ? 0 : Math.floor(event.target.valueAsNumber);
    dispatch(setItemAmount(event.target.valueAsNumber));
  };

  return (
    <>
      <div className="inventory-control flex items-center justify-center px-3">
        <div className="grid grid-cols-1 gap-2.5">
          <input className="w-28 2k:w-32 4k:w-40 px-1 py-2.5 2k:py-4 4k:py-6 2k:text-xl 4k:text-3xl bg-dark border-zinc-700 bg-opacity-80 rounded-md text-center mb-8 focus:outline-none hover:border-gray-500 border border-transparent focus:border-indigo-400 transition-colors duration-300" type="number" defaultValue={itemAmount} onChange={inputHandler} />

          <div className='flex items-center justify-between flex-col space-y-3'>
            <button className='inventory-control__button inventory-control__button--use' ref={use}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path className="cls-1" d="M17.07,20.61H9.79a2,2,0,0,1-2-2,2,2,0,0,1,2-2h1.87L5,9.86a2,2,0,0,1-.19-2.65,1.88,1.88,0,0,1,1.47-.68,1.84,1.84,0,0,1,1.35.55l4.06,4.06,4.08-3.06a1.91,1.91,0,0,1,2.5.18h0A17.18,17.18,0,0,1,22.42,15l.06.19"/>
                <path className="cls-1" d="M10.63,10.12A4.73,4.73,0,0,0,11,8.17,4.78,4.78,0,1,0,6.26,13a4.67,4.67,0,0,0,1.55-.26"/>
              </svg>
            </button>

            <button className='inventory-control__button' ref={give}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M21 17l-18 0"></path>
                <path d="M6 10l-3 -3l3 -3"></path>
                <path d="M3 7l18 0"></path>
                <path d="M18 20l3 -3l-3 -3"></path>
              </svg>
            </button>

            <button className='inventory-control__button inventory-control__button--close' onClick={() => fetchNui('exit')}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M18 6l-12 12"></path>
                <path d="M6 6l12 12"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default InventoryControl;
