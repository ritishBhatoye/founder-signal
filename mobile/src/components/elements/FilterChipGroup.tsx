import React from "react";
import { ScrollView, View } from "react-native";
import { Chip } from "../atoms";

interface FilterOption {
  label: string;
  value: string;
}

interface FilterChipGroupProps {
  options: FilterOption[];
  selectedValue?: string;
  onSelect: (value: string) => void;
  className?: string;
}

const FilterChipGroup: React.FC<FilterChipGroupProps> = ({
  options,
  selectedValue,
  onSelect,
  className = "",
}) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      className={className}
      contentContainerStyle={{ paddingHorizontal: 4 }}
    >
      <View className="flex-row space-x-2">
        {options.map((option) => (
          <Chip
            key={option.value}
            label={option.label}
            variant={selectedValue === option.value ? "filled" : "outlined"}
            color="primary"
            onPress={() => onSelect(option.value)}
            className="mr-2"
          />
        ))}
      </View>
    </ScrollView>
  );
};

export default FilterChipGroup;
