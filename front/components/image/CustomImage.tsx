

interface IProps {
    className?: string | undefined;
    subClassName?: string | undefined;
    onClick?: () => void;
    src: string | undefined;
    type?: "svg" | "img";
}

const CustomImage: React.FC<IProps> = ({ className, subClassName, onClick ,src, type = "svg" }) => {
    return (
        <>
            {type === "svg" && (<img className={subClassName} onClick={onClick} src={`${process.env.NEXT_PUBLIC_IMG_URL}${src}`} />)}
            {type === "img" && (<img className={subClassName} onClick={onClick} src={`${process.env.NEXT_PUBLIC_IMG_URL_2}${src}`} />)}
        </>
    )
}

export default CustomImage;