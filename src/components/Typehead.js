import React from "react";
import Suggestion from "./Suggestion";
import styled from "styled-components";

const InputData = styled.input`
  border-radius: 5px;
  border: solid 1px black;
  width: 300px;
  padding: 10px;
`;

const ClearBtn = styled.button`
  background-color: blue;
  color: white;
  font-weight: bold;
  border-radius: 5px;
  border: white 1px solid;
  height: 35px;
  width: 90px;
  margin-left: 10px;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 80px;
`;
const Btn = styled.div`
  display: inline-block;
  position: relative;
  height: 37px;
  width: 90px;
`;
const List = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 10px;
  margin: 10px auto;
  max-width: 500px;
`;

const Typehead = ({ suggestions, handleSelect }) => {
  const [userValue, setUserValue] = React.useState("");
  const [selectedSuggestion, setSelectedSuggestion] = React.useState(0);
  const [dropDown, setDropDown] = React.useState(false);

  const book = React.useRef();

  const matchedSuggestions = (book) => {
    if (book.length > 1) {
      return suggestions.filter((suggestion) =>
        suggestion.title.toLowerCase().includes(book)
      );
    }
    return [];
  };

  let listMatchedSuggestions = matchedSuggestions(userValue);
  return (
    <>
      <Wrapper>
        <InputData
          type="text"
          onChange={(ev) => {
            if (!dropDown) setDropDown(true);
            setUserValue(ev.target.value);
          }}
          value={userValue}
          onKeyDown={(ev) => {
            switch (ev.key) {
              case "Enter": {
                handleSelect(listMatchedSuggestions[selectedSuggestion].title);
                return;
              }
              case "ArrowUp": {
                if (selectedSuggestion - 1 > -1) {
                  setSelectedSuggestion(selectedSuggestion - 1);
                }
                return;
              }
              case "ArrowDown": {
                if (selectedSuggestion + 1 < listMatchedSuggestions.length) {
                  setSelectedSuggestion(selectedSuggestion + 1);
                }
                return;
              }

              default: {
                return;
              }
            }
          }}
        />
        <Btn>
          <ClearBtn onClick={(ev) => setUserValue("")}>Clear</ClearBtn>
        </Btn>
      </Wrapper>

      {listMatchedSuggestions.length > 0 && dropDown && (
        <List>
          {listMatchedSuggestions.map((matchedSuggestion, index) => (
            <Suggestion
              ref={book}
              key={matchedSuggestion.id}
              matchedSuggestion={matchedSuggestion}
              userValue={userValue}
              handleSelect={handleSelect}
              setSelectedSuggestion={setSelectedSuggestion}
              index={index}
              isSelected={selectedSuggestion === index ? true : false}
            />
          ))}
        </List>
      )}
    </>
  );
};

export default Typehead;
