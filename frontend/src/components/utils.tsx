import styled from "@emotion/styled";

export const Flex = styled("div")`
  display: flex;
`;

export const Column = styled(Flex)`
  flex-direction: column;
`;

export const Row = styled(Flex)`
  margin: 10px;
  flex-direction: row;
  justify-content: space-between;
`;

export const Center = styled(Flex)`
  justify-content: center;
  align-items: center;
`;
