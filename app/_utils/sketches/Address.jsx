import React, { useEffect, useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import tt from "@tomtom-international/web-sdk-services";

const FormWrapper = styled.form`
  display: grid;
  justify-content: start;
  align-content: start;
  height: 100%;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: 16px repeat(7, 1fr);
  grid-column-gap: 5px;
  grid-row-gap: 5px;
`;

const InputContainer = styled.div`
  width: 100%;
  height: 100%;

  &.address {
    grid-column: 2 / 6;
  }
  &.district {
    grid-column: 2 / 6;
  }
  &.city_town {
    grid-column: 2 / 6;
  }
  &.postcode {
    grid-column: 2 / 5;
  }
  &.reigon {
    grid-column: 2 / 6;
  }
  &.country {
    grid-column: 5 / 6;
  }
`;

const AddressSearchInput = styled.input`
  -webkit-appearance: none;
  -ms-appearance: none;
  -moz-appearance: none;
  appearance: none;
  height: 65%;
  grid-column: 2 / 6;
  font-size: 14px;
  padding: 0 10px;
  background-color: transparent;
  border: 2px solid;
  border-radius: 4px;
  &:focus {
    outline: none;
  }
`;

const AddressInput = styled.input`
  -webkit-appearance: none;
  -ms-appearance: none;
  -moz-appearance: none;
  appearance: none;
  height: 65%;
  font-size: 14px;
  padding: 0 10px;
  width: calc(100% - 24px);
  background-color: transparent;
  border: 2px solid;
  border-radius: 4px;
  &:focus {
    outline: none;
  }
`;

const AddressError = styled.div`
  padding: 1px 0 0 6px;
  color: #6f153e;
  font-size: 12px;
  text-decoration: underline;
`;

const SubmitAddressButton = styled.button`
  border-radius: 5px;
  grid-column: 2 / 6;
  background: transparent;
  color: #000000;
  border: 2px solid black;
`;

const ManualFormToggle = styled.div`
  grid-column: 3 / 6;
  justify-self: end;
  align-self: end;
  font-size: 12px;
  &:hover {
    color: #0f5179;
    text-decoration: underline;
  }
`;

const AddressSearchResults = styled.ul`
grid-column: 1 / 7;
grid-row: 3 / 8;
display: flex;
flex-direction: column;
justify-content: flex-start;
  align-items: center;
  padding: 0;
  margin: 0;
  list-style-type: none;

  a {
    text-decoration: none;
    font-size: 14px;


  }
  li {
    color: gray;
    padding: 5px 0;
    &:hover {
      color: #000000;
    }
  }

  }
`;

export default function AddressStep(props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const [autocompleteResults, setAutocompleteResults] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [displayForm, setDisplayForm] = useState(false);

  const fetchData = useCallback(() => {
    console.log("usecallback");
    return tt.services
      .fuzzySearch({
        key: "cLY4Xm4jQmpo6bN5NtffdznJlZo4aX7X",
        query: searchQuery,
        language: "en_GB",
        countrySet: props.country,
        idxSet: "PAD,Addr,Str",
        limit: 5,
      })
      .then(function (response) {
        return response;
      })
      .catch(function (reason) {
        console.log("autocomplete", reason);
      });
  }, [searchQuery]);

  useEffect(() => {
    console.log("useeffect-fetch");
    fetchData()
      .then((results) => {
        return setAutocompleteResults(results);
      })
      .catch((error) => {
        console.log(error);
        return setAutocompleteResults(null);
      });
  }, [fetchData]);

  const RenderBlankManualFormToggle = () => {
    console.log("RenderBlankManualFormToggle")
    return (
      <ManualFormToggle onClick={() => handleSetDisplayBlankForm()}>
        {displayForm ? "Reset Form" : "Enter Address Manually"}
      </ManualFormToggle>
    );
  };

  const RenderForm = () => {
    if (displayForm) {
      const entriesDefault = [
        ["address", null, { required: "Address Required" }, false],
        ["district", null, {}, false],
        ["city_town", null, { required: "City Required" }, false],
        ["reigon", null, {}, false],
        ["postcode", null, {}, false],
        ["country", props.country, {}, true],
      ];

      let entries = entriesDefault;

      if (selectedAddress) {
        console.log(selectedAddress);
        for (const [key, value] of Object.entries(selectedAddress)) {
          switch (key) {
            case "streetNumber":
              entries[0][1] = value;
              break;
            case "streetName":
              entries[0][1]
                ? (entries[0][1] += `, ${value}`)
                : (entries[0][1] = value);
              break;

            case "municipalitySubdivision":
              entries[1][1] = value;
              break;
            case "municipality":
              entries[1][1] ? null : (entries[1][1] = value);
              break;

            case "countrySecondarySubdivision":
              entries[2][1] = value;
              break;
            case "countryTertiarySubdivision":
              entries[2][1] = value;
              break;
            case "localName":
              entries[2][1] = value;
              break;

            case "countrySubdivision":
              entries[3][1] = value;
              break;
            case "countrySubdivisionName":
              entries[3][1] = value;
              break;

            case "postalCode":
              entries[4][1] = value;
              break;
            case "extendedPostalCode":
              entries[4][1] = value;
              break;

            // case "countryCode" : entries[5][1] = value;
            // break;
            case "countryCodeISO3":
              entries[5][1] = value;
              break;
            // case "country" : entries[5][1] = value;
            // break;
          }
        }
      }

      return entries.map(([key, value, required, disabled]) => (
        <InputContainer className={key} key={key}>
          <label htmlFor={key}></label>
          <AddressInput
            defaultValue={value}
            type="text"
            placeholder={key}
            id={key}
            disabled={disabled}
            {...register(key, required)}
          ></AddressInput>
          {errors[key] && <AddressError>{errors[key].message}</AddressError>}
        </InputContainer>
      ));
    }
    return null;
  };

  const handleGeoSearchOnfocus = () => {
    setDisplayForm(false);
    setSelectedAddress(null);
  };

  const handleSetDisplayBlankForm = () => {
    reset();
    setSelectedAddress(null);
    setDisplayForm(true);
  };

  const RenderFormSubmit = () => {
    if (displayForm) {
      return (
        <SubmitAddressButton type="submit">Submit Address</SubmitAddressButton>
      );
    }
    return null;
  };

  const handleAddressSelected = (data) => {
    reset();
    const address = { id: data.id, ...data.address };
    setSelectedAddress(address);
    setDisplayForm(true);
    // setSearchQuery("");
  };

  const RenderAutocompleteResults = () => {
    if (autocompleteResults && autocompleteResults.results && !displayForm) {
      return (
        <AddressSearchResults>
          {autocompleteResults.results.map((result, index) => {
            return (
              <li key={index} onClick={() => handleAddressSelected(result)}>
                {result.address.freeformAddress}
              </li>
            );
          })}
        </AddressSearchResults>
      );
    }
    return null;
  };

  return (
    <FormWrapper onSubmit={handleSubmit(props.submit)}>
      <RenderBlankManualFormToggle />

      <AddressSearchInput
        defaultValue={searchQuery}
        key="keyed"
        type="text"
        placeholder="Search for your address"
        onChange={(e) => setSearchQuery(e.target.value)}
        onFocus={() => handleGeoSearchOnfocus()}
      ></AddressSearchInput>

      <RenderAutocompleteResults />

      <RenderForm />
      <RenderFormSubmit />
    </FormWrapper>
  );
}

/*
order details - painting name, edition, price?

deliver to "please let us know who will be receiving the order"
country
find address / enter manually
postcode
phone
*/
