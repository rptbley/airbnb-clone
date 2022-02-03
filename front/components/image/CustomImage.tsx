

interface IProps {
    className?: string | undefined;
    subClassName?: string | undefined;
    onClick?: () => void;
    src: string | undefined;
    type?: "svg" | "img";
    alt?: string;
}

const CustomImage: React.FC<IProps> = ({ className, subClassName, onClick ,src, type = "svg", alt }) => {
    return (
        <>
            {type === "svg" && (<img className={subClassName} onClick={onClick} src={`${process.env.NEXT_PUBLIC_IMG_URL}${src}`} />)}
            {type === "img" && (<img className={subClassName} onClick={onClick} src={`${process.env.NEXT_PUBLIC_IMG_URL_2}${src}`} alt={alt}/>)}
        </>
    )
}

export default CustomImage;