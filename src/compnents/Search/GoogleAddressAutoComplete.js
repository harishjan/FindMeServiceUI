/*reference taken from https://codesandbox.io/s/long-wave-0tgqs?file=/src/Autocomplete.js:0-2540*/
import React , {useEffect, useState} from 'react';
import Input from "react-validation/build/input";
import usePlacesService from "react-google-autocomplete/lib/usePlacesAutocompleteService";
let YOUR_GOOGLE_MAPS_API_KEY = 'AIzaSyC39Y3k4jMSeZKcAfjQUg-QYwNpykWS8_g';

const GoogleAddressAutoComplete = ({setAdddress}) => {
    const [filteredSuggestions, setFilteredSuggestions] = useState([]);
    const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(0);
    const [showSuggestions, setShowSuggestions] = useState(false);  
    const [input, setInput] = useState("");  
    
    const {        
        placePredictions,
        getPlacePredictions,
        isPlacePredictionsLoading,
        } = usePlacesService({
        apiKey: YOUR_GOOGLE_MAPS_API_KEY,
    });
  
    const onChange = (e) => {        
        const userInput = e.target.value;        
        getPlacePredictions({userInput});      
        setInput(e.target.value);
        setAdddress(e.target.value);
        
    };

    useEffect(() => {        
        setActiveSuggestionIndex(0);
        setShowSuggestions(true);
    },[isPlacePredictionsLoading]);

    const onClick = (e) => {
        setInput(e.srcElement.innerText);
        setActiveSuggestionIndex(0);   
        
    };
    //handle click outside the body
    useEffect(() => {      
        document.addEventListener('click', handleClickOutside, true);
        return () => {            
            document.removeEventListener('click', handleClickOutside, true);
        };
    });

    const handleClickOutside = (e) => {       
        if(e.srcElement.nodeName === 'LI' && (e.srcElement.className === ("addresssuggestion-active") || 
        e.srcElement.className === ("addresssuggestion-inactive")))
        {
            setInput(e.srcElement.innerText);
            setAdddress(e.srcElement.innerText);
            setActiveSuggestionIndex(0);         
        }

        setShowSuggestions(false);
    }
    const onKeyDown = (e) => {
        // User pressed the enter key
        if (e.keyCode === 13) {
            setInput(placePredictions[activeSuggestionIndex].description);
            setAdddress(placePredictions[activeSuggestionIndex].description);
            setActiveSuggestionIndex(0);
            setShowSuggestions(false);
        }
        else if ( e.keyCode === 27 ) { // ESC
           setShowSuggestions(false);
        }

        // User pressed the up arrow
        else  if (e.keyCode === 38) {
            if (activeSuggestionIndex === 0) {
                return;
            }
            setActiveSuggestionIndex(activeSuggestionIndex - 1);
        }
        // User pressed the down arrow
        else if (e.keyCode === 40) {
            if (activeSuggestionIndex - 1 === placePredictions.length) {
                return;
            }
            setActiveSuggestionIndex(activeSuggestionIndex + 1);
        }
    };

    const SuggestionsListComponent = () => {
        return (placePredictions && placePredictions.length) ? (
        <ul class="addresssuggestions">
            {placePredictions.map((suggestion, index) => {
         //   alert(suggestion.description)
           // alert(index)
            let className;

            // Flag the active suggestion with a class
            if (index === activeSuggestionIndex) {
                className = "addresssuggestion-active";
            }
            else
                className = "addresssuggestion-inactive";

            return (
                <li className={className} key={index} onClick={onClick}>
                    {suggestion.description}
                </li>
            );
            })}
        </ul>
        ) : (
        <></>
        );
    };
    return (
        <>
        <input
            type="text"
            className="form-control"
            onChange={(evt) => {
                getPlacePredictions({ input: evt.target.value });
                setInput(evt.target.value);
                setAdddress(evt.target.value)
              }}
            onKeyDown={onKeyDown}
            value={input}
        />
        {showSuggestions && input &&  <SuggestionsListComponent/>}
        </>
    );
};




export default GoogleAddressAutoComplete;
