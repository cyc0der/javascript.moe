import clsx from 'clsx';
import { MutableRefObject, ReactElement, createContext, useRef } from 'react';

export type AnimatedSectionProps = {
    height: string;
    children: ReactElement | ReactElement[],
    fullScreen?: boolean
}

export const sectionCtx = createContext<{ ref: MutableRefObject<HTMLDivElement | null> | null }>({ ref: null });
export const AnimatedSection = (props: AnimatedSectionProps) => {
    const { height = '100vh', fullScreen } = props;
    const ref = useRef<HTMLDivElement | null>(null);
    return <sectionCtx.Provider value={{ ref }}>
        <section className="w-full" ref={ref} style={{ height }}>
            <div className={clsx(
                fullScreen ? 'h-[100lvh]' : 'h-[100svh]',
                'w-full max-w-[100vw] sticky top-0 flex gap-0 justify-center items-center overflow-hidden'
            )}>
                {props.children}
            </div>
        </section >
    </sectionCtx.Provider >
}