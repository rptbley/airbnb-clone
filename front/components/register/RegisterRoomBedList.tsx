import styled from "styled-components";
import { useSelector } from "../../store";
import RegisterRoomBedTypes from "./RegisterRoomBedTypes";
import RegisterRoomPublicTypes from "./RegisterRoomPublicBedTypes";

const Container = styled.div`
    width: 548px;
`;


const RegisterRoomBedList: React.FC = () => {
    const bedList = useSelector(state => state.registerRoom.bedList);

    return (
        <Container>
            <ul className="register-room-bed-type-list">
                {bedList.map((bedroom, index) => (
                        <RegisterRoomBedTypes bedroom={bedroom} key={index}/>
                    ))}
                <RegisterRoomPublicTypes/>
            </ul>
        </Container>
    )
}

export default RegisterRoomBedList;