import { useScroll } from "framer-motion";
import { useContext, useEffect, useRef } from "react"
import { sectionCtx } from "./AnimatedSection";

function blend(bottomImageData: ImageData, topImageData: ImageData, alpha: number) {
    var bottomData = bottomImageData.data;
    var topData = topImageData.data;

    for (var i = 0; i < topData.length; i += 4) {
        topData[i] = Math.sqrt(Math.pow((alpha) * topData[i], 2) + Math.pow((1 - alpha) * bottomData[i], 2))
        topData[i + 1] = Math.sqrt(Math.pow((alpha) * topData[i + 1], 2) + Math.pow((1 - alpha) * bottomData[i + 1], 2))
        topData[i + 2] = Math.sqrt(Math.pow((alpha) * topData[i + 2], 2) + Math.pow((1 - alpha) * bottomData[i + 2], 2))

    }

    return topData
}

export const BlendedImage = ({ a, b }: { a: string, b: string }) => {
    const ref = useRef<HTMLCanvasElement | null>(null)

    useEffect(() => {
        if (!ref.current) {

        }
    }, [ref.current]);

    const imgARef = useRef<HTMLImageElement>(null);
    const imgBRef = useRef<HTMLImageElement>(null);

    const { ref: scrollRef } = useContext(sectionCtx);
    const { scrollYProgress } = useScroll({
        target: scrollRef || undefined,
        offset: ["start start", "end end"]
    });

    console.log("SCROLL REF", scrollRef)

    const onLoadA = function () {
        if (!imgARef.current || !imgBRef.current) return;

        ref?.current?.getContext('2d')?.drawImage(imgARef.current, 0, 0);

        const pixelsA = ref.current?.getContext('2d')?.getImageData(0, 0, window.innerWidth, window.innerHeight) || new ImageData(0, 0);
        ref?.current?.getContext('2d')?.drawImage(imgBRef.current, 0, 0);

        const pixelsB = ref.current?.getContext('2d')?.getImageData(0, 0, window.innerWidth, window.innerHeight) || new ImageData(0, 0);

        const pixelsC = blend(pixelsA, pixelsB, scrollYProgress.get());
        const imgData = new ImageData(window.innerWidth, window.innerHeight);
        imgData.data.set(pixelsC);
        ref?.current?.getContext('2d')?.putImageData(imgData, 0, 0);

    }

    useEffect(() => {
        scrollYProgress.on('change', onLoadA);
    }, []);

    return <>
        <img ref={imgARef} src={a} onLoad={onLoadA} style={{ display: 'none' }} />
        <img ref={imgBRef} src={b} onLoad={onLoadA} style={{ display: 'none' }} />
        <canvas ref={ref} width={window.innerWidth} height={window.innerHeight} />
    </>
}