import React from "react";
import styled from "styled-components";
import { LeftArrow, RightArrow } from "@styled-icons/boxicons-solid";
import { StyledIconBase } from "@styled-icons/styled-icon";
import BarGraph from "./graphs/test";

import { useRecoilValue, useSetRecoilState, useRecoilState } from "recoil";

import {
  infoPageSelector,
  infoSelector,
  paymentStepperToggleSelector,
} from "../shared/globalState";

const BuyContainer = styled.div`
  height: 550px;
  width: 410px;
  justify-self: start;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
  align-items: flex-start;
  border-radius: 10px;
  border: 2px solid black;
  box-shadow: 20px 20px #222;
`;

const TitleContainer = styled.div`
  width: 100%;
  display: flex;
  /* flex-direction: column; */
  justify-content: space-between;
  align-items: flex-end;
  column-gap: 20px;
  div {
    display: flex;
    flex-direction: column;
    margin: 0 16px 0 0;
    color: gray;
    /* background-color: black; */
    border-bottom: 1px solid black;
  }
`;

const BuyOriginal = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  padding: 1rem;
  width: auto;
  background: transparent;
  color: #000000;
  border: 2px solid black;
`;

const Title = styled.h1`
  margin: 16px 0 0 16px;
`;

const ButtonContainer = styled.div`
  display: flex;
  /* justify-content: flex-end; */
  justify-content: space-between;
  div {
    justify-self: right;
    flex-grow: 1;
    padding: 16px 0px 0px 155px;
  }
  ${StyledIconBase} {
    width: 12px;
    height: 12px;
    /* icon styles go here */
  }
`;

const Price = styled.div``;
const Run = styled.div``;

const DescriptionFlex = styled.div`
  flex-grow: 1;
  padding: 10px 30px;
  color: black;
  p {
  }
`;

export function InfoPanel() {
  const [infoPage, setInfoPage] = useRecoilState(infoPageSelector);
  const toggleStepper = useSetRecoilState(paymentStepperToggleSelector);
  const {
    currentName,
    currentDuration,
    currentRun,
    currentPriceInt,
    currentDescription,
    currentSold,
    nextSold,
    currentMaxSold,
  } = useRecoilValue(infoSelector);

  return (
    <BuyContainer>
      <TitleContainer>
        <Title>{currentName}</Title>
        <div>
          <Run>Run: {currentRun}</Run>
          <Price>Price: X {currentPriceInt}</Price>
        </div>
      </TitleContainer>
      <DescriptionFlex>
        {infoPage === 1 && <p>{currentDescription}</p>}
        {infoPage === 2 && <BarGraph />}
      </DescriptionFlex>
      <ButtonContainer>
        <BuyOriginal
          disabled={!currentRun}
          onClick={() => {
            toggleStepper();
          }}
        >{`Buy Edition ${nextSold} of ${currentMaxSold}`}</BuyOriginal>
        <div onClick={() => setInfoPage()}>
          Live Data <RightArrow />
        </div>
      </ButtonContainer>
    </BuyContainer>
  );
}
