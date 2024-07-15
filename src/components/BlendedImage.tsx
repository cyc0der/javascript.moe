import { useScroll, useTransform } from "framer-motion";
import { useContext, useEffect, useRef } from "react"
import { sectionCtx } from "./AnimatedSection";

function blend(bottomImageData, topImageData, alpha) {
    // continue from the above

    // get the pixel data as array
    var bottomData = bottomImageData.data;
    var topData = topImageData.data;

    // loop each pixel data, calculate the new pixel value and assign it directly
    // to the topData (to save memory)
    // if you want to keep the original data, don't do this. instead create a new
    // image data object
    for (var i = 0; i < topData.length; i += 4) {
        topData[i] = Math.sqrt(Math.pow((alpha) * topData[i], 2) + Math.pow((1 - alpha) * bottomData[i], 2))
        topData[i + 1] = Math.sqrt(Math.pow((alpha) * topData[i + 1], 2) + Math.pow((1 - alpha) * bottomData[i + 1], 2))
        topData[i + 2] = Math.sqrt(Math.pow((alpha) * topData[i + 2], 2) + Math.pow((1 - alpha) * bottomData[i + 2], 2))

    }


    // export image, discussed in the next part
    return topData
}

export const BlendedImage = ({ a, b }) => {
    const ref = useRef<HTMLCanvasElement | null>(null)

    useEffect(() => {
        if (!ref.current) {

        }
    }, [ref.current])
    const imgARef = useRef<HTMLImageElement>();
    const imgBRef = useRef<HTMLImageElement>();

    const { ref: scrollRef } = useContext(sectionCtx);
    const { scrollYProgress } = useScroll({
        target: scrollRef || undefined,
        offset: ["start start", "end end"]
    });



    const onLoadA = function () {
        console.log("ONLOAD A")

        ref?.current?.getContext('2d')?.drawImage(imgARef.current, 0, 0);

        const pixelsA = ref.current?.getContext('2d')?.getImageData(0, 0, window.innerWidth, window.innerHeight);
        ref?.current?.getContext('2d')?.drawImage(imgBRef.current, 0, 0);

        const pixelsB = ref.current?.getContext('2d')?.getImageData(0, 0, window.innerWidth, window.innerHeight);

        const pixelsC = blend(pixelsA, pixelsB, scrollYProgress.get());
        const imgData = new ImageData(window.innerWidth, window.innerHeight);
        imgData.data.set(pixelsC);
        ref?.current?.getContext('2d')?.putImageData(imgData, 0, 0);

    }

    useEffect(() => {
        scrollYProgress.on('change', onLoadA);

    }, [])
    return <>
        <img ref={imgARef} src="/images/wallpaper/3.jpg" onLoad={onLoadA} style={{ display: 'none' }} />
        <img ref={imgBRef} src="/images/wallpaper/2.jpg" onLoad={onLoadA} style={{ display: 'none' }} />
        <canvas ref={ref} width={window.innerWidth} height={window.innerHeight} />
    </>
}