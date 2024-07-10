import styled from "@emotion/styled";
import wave from "../img/wave.svg";
export const WaveWrapper = styled("div")`
  position: fixed;
  z-index: -1;
  right: 0px;
`;

export const BackgroundWrapper = styled("div")`
  margin: 0px;
  display: flex;
  flex-direction: row;
`;

const Background: React.FC = () => {
  return (
    <BackgroundWrapper>
      <WaveWrapper style={{}}>
        <img src={wave} alt="wave" />
      </WaveWrapper>
    </BackgroundWrapper>
  );
};

export default Background;
