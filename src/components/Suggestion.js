import React from "react";
import styled from "styled-components";

const userPredict = (suggestion, input) => {
  const title = suggestion.title;
  const index = title.toLowerCase().indexOf(input);
  const suggestion1 = title.slice(0, index + input.length);
  const suggestion2 = title.slice(index + input.length);
  return { suggestion1, suggestion2 };
};

const Suggestion = ({ matchedSuggestion, handleSelect, userValue }) => {
  const { suggestion1, suggestion2 } = userPredict(
    matchedSuggestion,
    userValue
  );

  return (
    <List
      onClick={(ev) => {
        handleSelect(matchedSuggestion.title);
      }}
    >
      {suggestion1}
      <Prediction>{suggestion2}</Prediction> ;
      <Type>in {matchedSuggestion.categoryId}</Type>
    </List>
  );
};

const List = styled.li`
  text-align: center;
  padding: 5px 5px;
  width: 100%;
  &:hover {
    background-color: grey;
  }
  button {
    border: none;
    cursor: pointer;
  }
`;

const Prediction = styled.span`
  font-weight: bold;
`;

const Type = styled.span`
  font-size: 1rem;
  font-style: italic;
  color: blue;
`;

export default Suggestion;
