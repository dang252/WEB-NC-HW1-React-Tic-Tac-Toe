import { MouseEventHandler } from 'react'

const Square = ({ value, onClickHandle, className }: { value: string, onClickHandle: MouseEventHandler<HTMLDivElement>, className?: string | null }) => {
    return (
        <div onClick={onClickHandle} className={`square ${className}`}>{value}</div>
    )
}

export default Square