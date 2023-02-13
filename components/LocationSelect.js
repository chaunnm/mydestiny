import { View, Text } from "react-native";
import RNPickerSelect from "react-native-picker-select";
import { useTailwind } from "tailwind-rn";
import React, { useState, useEffect } from "react";

const LocationSelect = ({ type, setValue, options }) => {
  const tailwind = useTailwind();
  const [name, setName] = useState("");

  useEffect(() => {
    setValue(name);
  }, [name]);

  let provinces = [];
  let district = [];
  let village = [];
  if (type == "provinces") {
    options?.map((i) => {
      provinces.push({
        label: i.province_name,
        value: { id: i.province_id, name: i.province_name },
      });
    });
  } else if (type == "districts") {
    options?.map((i) => {
      district.push({
        label: i.district_name,
        value: { id: i.district_id, name: i.district_name },
      });
    });
  } else if ((type = "villages")) {
    options?.map((i) => {
      village.push({
        label: i.ward_name,
        value: { id: i.ward_id, name: i.ward_name },
      });
    });
  }

  return (
    <View>
      {type == "provinces" ? (
        <>
          <RNPickerSelect
            style={tailwind(
              "w-full h-11 mt-2 mb-2 rounded-full border border-gray-300 pl-4 text-lg"
            )}
            onValueChange={(value) => {
              setName(value);
            }}
            items={provinces}
          />
        </>
      ) : type == "districts" ? (
        <>
          <RNPickerSelect
            style={tailwind(
              "w-full h-11 mt-2 mb-2 rounded-full border border-gray-300 pl-4 text-lg"
            )}
            onValueChange={(value) => {
              setName(value);
            }}
            items={district}
          />
        </>
      ) : (
        <>
          <RNPickerSelect
            style={tailwind(
              "w-full h-11 mt-2 mb-2 rounded-full border border-gray-300 pl-4 text-lg"
            )}
            onValueChange={(value) => {
              setName(value);
            }}
            items={village}
          />
        </>
      )}
    </View>
  );
};

export default LocationSelect;
