import { PropsWithChildren } from "react"

export type ContainerProps = PropsWithChildren<{

}>
export const Container = ({ children }: ContainerProps) => {
    return <div
        className="w-[100vw] h-[100vh] flex items-center justify-center"
    >
        {children}
    </div>
}