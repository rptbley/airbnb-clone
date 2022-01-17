

interface IProps {
    className?: string | undefined;
    subClassName?: string | undefined;
    onClick?: () => void;
    src: string | undefined;
}

const CustomImage: React.FC<IProps> = ({ className, subClassName, onClick ,src }) => {
    return (
        <>
            <img className={subClassName} onClick={onClick} src={src} />
        </>
    )
}

export default CustomImage;