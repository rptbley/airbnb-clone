

interface IProps {
    className?: string | undefined;
    subClassName?: string | undefined;
    onClick?: () => void;
    src: string | undefined;
}

const CustomImage: React.FC<IProps> = ({ className, subClassName, onClick ,src }) => {
    return (
        <>
            <img className={subClassName} onClick={onClick} src={`${process.env.NEXT_PUBLIC_IMG_URL}${src}`} />
        </>
    )
}

export default CustomImage;