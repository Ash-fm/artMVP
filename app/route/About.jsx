import React from "react";
import styled from "styled-components";

const AboutContainer = styled.div`
  height: calc(100vh - 140px);
  display: grid;
  grid-template-columns: 1fr 3fr 3fr 1fr;
  grid-template-rows: 1fr 2fr repeat(5, 3fr) 1fr;
`;

const FAQs = styled.div`
  grid-column: 2 / 4;
  grid-row: 3 / 8;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: repeat(5, 1fr);

  div {
    display: flex;
    flex-direction: column;
    h3 {
      text-align: center;
    }
    p {
      text-align: center;
    }
  }
`;

const AboutText = styled.div`
  text-align: center;
  grid-column: 2 / 4;
  grid-row: 2 / 3;
  font-size: 20px;
`;

export default function About() {
  return (
    <AboutContainer>
      <AboutText>
        At ArtNode we're bringing the world of crypto and traditional art closer
        together.
        <br /><br />
        Art needs texture. NFTs have none. Not everything is better on-chain. 
         Crypto has utility. Art is better off-screen. We're proving it.
      </AboutText>
      <FAQs>
      <div>
        <h3>Will Nano be the only source of your art?</h3>
        <p>
          Almost definitely not (Surprisingly we have a Bitcoin Maxi working on the project), but Nano will always be the first & will always be known as the crypto that started it all. 
        </p>
      </div>
      <div>
        <h3>Should I delegate vote weight to your node?</h3>
        <p>
           We're fortunate enough to have enough funds to keep the node running outside of the ArtNode project. 
           You can delegate votes without worry that the node will go off-line for any significant periods of time. 
            And well try to let you know on socials if the node is ever going to be out for maintenance.
            Of course if we end up lucky enough to be trusted by the community to hold a significant amount of weight you should consider delegating elsewhere. 
        </p>
      </div>
      <div>
        <h3>I bought a piece of art, when will it arrive?</h3>
        <p>
          All our work is custom made to order. So shipping times are variable depending on the series in question. 
          You should have received a confirmation e-mail as soon as the piece was purchased with shipping and other information. 
          Feel free to contact us if you want us to look at your specific case.
        </p>
      </div>
      <div>
        <h3>How did you come up with such a good idea?</h3>
        <p>
          This is just the start. Ask again in a year!
        </p>
      </div>
      <div>
        <h3>Your art is too expensive</h3>
        <p>
          You know Justin Sun bought a JPEG for $80m, right?
        </p>
      </div>
      <div>
        <h3>Will you ever make an NFT?</h3>
        <p>
          Maybe. But never as a piece of art
        </p>
      </div>
      <div>
        <h3>Is my data safe?</h3>
        <p>
          We only share your data with out specialist art couriers.
        </p>
      </div>

      </FAQs>
    </AboutContainer>
  );
}
