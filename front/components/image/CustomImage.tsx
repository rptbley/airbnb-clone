

interface IProps {
    className?: string | undefined;
    subClassName?: string | undefined;
    onClick?: () => void;
    src: string | undefined;
}

const CustomImage: React.FC<IProps> = ({ className, subClassName, onClick ,src }) => {
    return (
        <div className={className}>
            <img className={subClassName} onClick={onClick} src={src} />
        </div>
    )
}

export default CustomImage;