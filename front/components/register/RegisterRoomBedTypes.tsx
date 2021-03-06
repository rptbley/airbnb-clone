import { useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { bedTypes } from "../../lib/staticData";
import { registerRoomActions } from "../../store/registerRoom";
import palette from "../../styles/palette";
import { BedType } from "../../types/room";
import Button from "../common/Button";
import Counter from "../common/Counter";
import Selector from "../common/Selector";


const Container = styled.li`
    width: 100%;
    padding: 28px 0;
    border-top: 1px solid ${palette.gray_dd};
    &:last-child {
        border-bottom: 1px solid ${palette.gray_dd};
    }

    .register-room-bed-type-top {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .register-room-bed-type-bedroom {
        font-size: 19px;
        color: ${palette.gray_48};
    }

    .register-room-bed-type-selector-wrapper {
        width: 320px;
    }

    .register-room-bed-type-counters {
        width: 320px;
        margin-top: 28px;
    }

    .register-room-bed-type-counter {
        width: 290px;
        margin-bottom: 18px;
    }

    .register-room-bed-type-bedroom-counts {
        font-size: 19px;
        color: ${palette.gray_76};
    }
`;

interface IProps {
    bedroom: {
        id: number;
        beds: {
            type: BedType;
            count: number;
        }[]
    };
}

const RegisterRoomBedTypes: React.FC<IProps> = ({ bedroom }) => {
    const intialBedOptions = bedroom.beds.map((bed) => bed.type);

    const [opened, setOpened] = useState(false);
    const [activedBedOptions, setActivedBedOptions] = useState<BedType[]>(intialBedOptions);

    const dispatch = useDispatch();

    const totalBedsCount = useMemo(() => {
        let total = 0;
        bedroom.beds.forEach((bed) => {
            total += bed.count;
        })
        return total;
    }, [bedroom])

    const toggleOpened = () => setOpened(!opened);

    const lastBedOptions = useMemo(() => {
        return bedTypes.filter((bedType) => !activedBedOptions.includes(bedType));
    }, [activedBedOptions ,bedroom])

    const bedsText = useMemo(() => {
        const texts = bedroom.beds.map((bed) => `${bed.type} ${bed.count}???`);
        return texts.join(", ");
    }, [bedroom])

    return (
        <Container>
            <div className="register-room-bed-type-top">
                <div className="regsiter-room-bed-type-bedroom-texts">
                    <p className="register-room-bed-type-bedroom">{bedroom.id}??? ??????</p>
                    <p className="register-room-bed-type-bedroom-counts">?????? {totalBedsCount}???<br/>{bedsText}</p>
                </div>
                <Button
                    width="280px"
                    color="bittersweet"
                    onClick={toggleOpened}
                >
                    {opened && "??????"}
                    {!opened && (totalBedsCount === 0 ? "?????? ????????????" : "?????? ????????????")}
                </Button>
            </div>
            {opened && (
                <>
                    <div className="register-room-bed-type-counters">
                        {activedBedOptions.map((type) => (
                            <div className="register-room-bed-type-counter" key={type}>
                                <Counter
                                    label={type}
                                    value={bedroom.beds.find((bed) => bed.type === type)?.count || 0}
                                    key={type}
                                    onChange={(value) =>
                                        dispatch(registerRoomActions.setBedTypeCount({
                                            bedroomId: bedroom.id,
                                            type,
                                            count: value
                                        }))
                                    }
                                />
                            </div>
                        ))}
                    </div>
                    <div className="register-room-bed-type-selector-wrapper">
                        <Selector
                            type="register"
                            options={lastBedOptions}
                            defaultValue="?????? ?????? ??????"
                            disabledOptions={["?????? ?????? ??????"]}
                            useValidation={false}
                            onChange={(e) => 
                                setActivedBedOptions([
                                    ...activedBedOptions,
                                    e.target.value as BedType
                                ])
                            }
                        />
                    </div>
                </>
            )}
        </Container>
    )
}

export default RegisterRoomBedTypes;