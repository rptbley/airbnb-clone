

interface IProps {
    className?: string | undefined;
    src: string | undefined;
}

const CustomImage: React.FC<IProps> = ({ className, src }) => {
    return (
        <div className={className}>
            <img src={src} />
        </div>
    )
}

export default CustomImage;