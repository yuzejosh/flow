'use client'

import { useState } from 'react'
import '../globals.css'
import Image from 'next/image'
interface ColumnProps {
  children?: React.ReactNode
  index: number
  items: Items[]
  colour: string
}

interface ItemProps {
  person: string
  task: string
  cardid: number
  columnid: number
}

interface Items {
  id: number
  content: string
}

const LoginPage = () => {
  const [cardid, setCardid] = useState(0)

  function Column({ children, index, items, colour }: ColumnProps) {
    return (
      <div className="p-3 bg-slate-100 h-100">
        <div>
          <h1 className="press-start p-2" style={{ background: colour }}>
            {columns[columns.findIndex((column) => column.id === index)].title}
          </h1>
          <button
            onClick={() => {
              const updatedColumns = [...columns]
              // get the column
              const colidx = updatedColumns.findIndex(
                (column) => column.id === index
              )

              // add a task to the tasklist
              updatedColumns[colidx].cards.push({
                id: cardid,
                content: 'some task',
              })
              setCardid(cardid + 1)
              setColumns(updatedColumns)
            }}
            className="bg-slate-200 mt-1 px-2 rounded-full"
            style={{}}
          >
            Create Task
          </button>
        </div>
        {items.map((item, ix: number) => {
          return (
            <Item
              person="yay"
              task={item.content}
              key={ix}
              cardid={item.id}
              columnid={index}
            ></Item>
          )
        })}
        {children}
      </div>
    )
  }

  const [columns, setColumns] = useState([
    {
      id: 1,
      colour: '#D9D9D9',
      title: 'To Do',
      cards: [],
    },
    { id: 2, title: 'In Progress', cards: [], colour: '#F9B9FF' },
    { id: 3, title: 'Blocked', cards: [], colour: '#FD6666' },
    { id: 4, title: 'Completed', cards: [], colour: '#00FF0A' },
  ])

  const moveCard = (
    sourceColumnId: number,
    destinationColumnId: number,
    cardId: number
  ) => {
    // Find the source and destination columns
    const sourceColumnIndex = columns.findIndex(
      (column) => column.id === sourceColumnId
    )
    const destinationColumnIndex = columns.findIndex(
      (column) => column.id === destinationColumnId
    )

    if (sourceColumnIndex !== -1 && destinationColumnIndex !== -1) {
      const cardIndex = columns[sourceColumnIndex].cards.findIndex(
        (card) => card.id === cardId
      )
      if (cardIndex !== -1) {
        const card = columns[sourceColumnIndex].cards.splice(cardIndex, 1)[0]
        columns[destinationColumnIndex].cards.push(card)
        setColumns([...columns])
      }
    }
  }

  function Item({ person, task, cardid, columnid }: ItemProps) {
    return (
      <div
        className="w-full h-32 py-2 px-3 my-2 rounded-lg flex flex-col justify-between"
        style={{ background: '#B9F2FF' }}
      >
        <div>
          <span className="font-bold">Task:</span> {`Sample Task ${cardid}`}
        </div>
        <div className="flex justify-between">
          <div>
            <span className="font-bold">Assigned: </span>
            {`Person ${cardid}`}
          </div>
          <div>
            <button
              onClick={() => {
                // move the card

                moveCard(columnid, columnid - 1, cardid)
              }}
            >
              <Image
                src="/arrow-left.svg"
                alt="SVG Left"
                width={30}
                height={30}
              />
            </button>
            <button
              onClick={() => {
                // move the card

                moveCard(columnid, columnid + 1, cardid)
              }}
            >
              <Image
                src="/arrow-right.svg"
                alt="SVG Right"
                width={30}
                height={30}
              />
            </button>
          </div>
        </div>
      </div>
    )
  }
  return (
    <div className="animated-gradient h-screen w-screen">
      <div className="container mx-auto h-full">
        <div className="p-6 flex items-center justify-center">
          <div className="press-start text-3xl">Kanban</div>
        </div>
        <div className="grid grid-cols-4 gap-8 h-[70%] my-auto">
          {columns.map((col, index) => {
            return (
              <Column
                key={index}
                index={col.id}
                items={col.cards}
                colour={col.colour}
              ></Column>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default LoginPage
