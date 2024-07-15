import { motion } from 'framer-motion';
import { MutableRefObject, ReactElement, createContext, useRef } from 'react';

export type AnimatedSectionProps = {
    height: string;
    children: ReactElement | ReactElement[]
}

export const sectionCtx = createContext<{ ref: MutableRefObject<HTMLDivElement | null> | null }>({ ref: null });
export const AnimatedSection = (props: AnimatedSectionProps) => {
    const { height = '100vh', } = props;
    const ref = useRef<HTMLDivElement | null>(null);
    return <section className="w-full" ref={ref} style={{ height }}>
        <sectionCtx.Provider value={{ ref }}>
            <div className='h-[100vh] w-full max-w-[100vw] sticky top-0 flex gap-0 justify-center items-center overflow-hidden' >
                {props.children}
            </div>
        </sectionCtx.Provider>
    </section >
}