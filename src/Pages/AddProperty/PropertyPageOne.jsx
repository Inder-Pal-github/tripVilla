import React from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
} from "@chakra-ui/react";
import states from "../../utils/states.json";
import countries from "../../utils/countries.json";
import { useState } from "react";
import { useSelector } from "react-redux";
const PropertyPageOne = () => {
  const [countryCode, setCountryCode] = useState("");
  const [details, setDetails] = useState({
    country:addPropertyForm.country||"",
    state:addPropertyForm.state||"",
    city:addPropertyForm.city||"",

  });
  const addPropertyForm = useSelector(
    (store) => store.appReducer.addPropertyForm
  );
  const handleInput = (e) => {
    const { value, name } = e.target;
    setDetails({ ...details, [name]: value });
  };
  const handleFormOne = (e) => {
    e.preventDefault();
    console.log(details);
  };
  return (
    <Box position="relative" height={"100vh"}>
      <Box
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%,-50%)"
        border="2px solid gray"
        padding="1rem"
        borderRadius="1rem"
      >
        <form onSubmit={handleFormOne}>
          <FormControl>
            <FormLabel>Country</FormLabel>
            <Select
              onChange={(e) => {
                setCountryCode(
                  countries.find((item) => item.country_name === e.target.value)
                );
                handleInput(e);
              }}
              name="country"
            >
              {countries?.map((item, index) => (
                <option
                  title={item.country_id}
                  key={index}
                  value={item.country_name}
                >
                  {item.country_name}
                </option>
              ))}
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel>State</FormLabel>
            <Select name="state" onChange={(e) => handleInput(e)}>
              {states
                ?.filter((item) => item.country_id == countryCode.country_id)
                .map((item, index) => (
                  <option key={index} value={item.state_name}>
                    {item.state_name}
                  </option>
                ))}
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel>City</FormLabel>
            <Input
              name="city"
              onChange={(e) => handleInput(e)}
              placeholder="Enter city name"
              type="text"
            />
          </FormControl>
          <Box textAlign={"right"} m="1rem">
            <Button type="submit" colorScheme="linkedin">
              Next
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default PropertyPageOne;
