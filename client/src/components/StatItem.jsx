// StatsItem.js
import React from "react";
import styled from "styled-components";

const StatsItem = ({ title, count, color, bcg, icon }) => {
  return (
    <Wrapper bcg={bcg}>
      <Icon color={color}>{icon}</Icon>
      <Count>{count}</Count>
      <Title>{title}</Title>
    </Wrapper>
  );
};

const Wrapper = styled.article`
  background: ${({ bcg }) => bcg};
  border-radius: 5px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Icon = styled.div`
  font-size: 2rem;
  color: ${({ color }) => color};
  margin-bottom: 0.5rem;
`;

const Count = styled.h3`
  font-size: 2rem;
  margin: 0;
`;

const Title = styled.p`
  font-size: 1rem;
  margin: 0;
  color: #555;
`;

export default StatsItem;
