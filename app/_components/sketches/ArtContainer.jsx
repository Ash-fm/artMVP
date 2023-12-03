import React from "react";
import SketchWrapper from "./SketchWrapper";
import styled from "styled-components";

import { RenderSidePanel } from "./SidePanel";

const SketchContainer = styled.div`
  border: 1px solid black;
  overflow: hidden;
  flex-grow: 1;
`;

const LeftContent = styled.div`
  display: flex;
  align-items: stretch;
  height: auto;
  width: 80%;
  max-height: 70vh;
  aspect-ratio: 9/16;
  padding: 1.6rem 0.9rem;
  justify-self: end;
  border: 2px solid black;
  border-radius: 5px;
  box-shadow: 20px 20px #222;
`;

export default function ArtContainer() {
  console.log("Art Container");

  return (
    <>
      <LeftContent>
        <SketchContainer id="sketchContainer">
          <SketchWrapper />
        </SketchContainer>
      </LeftContent>
      <RenderSidePanel />
    </>
  );
}

