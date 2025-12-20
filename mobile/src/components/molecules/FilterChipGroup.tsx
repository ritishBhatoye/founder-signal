/**
 * FilterChipGroup - Horizontal scrollable filter chips
 * Usage: <FilterChipGroup options={options} selected={selected} onSelect={setSelected} />
 */
import { tva } from "@/utils/tva";
import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

interface FilterOption {
  label: string;
  value: string;
  count?: number;
}

interface FilterChipGroupProps {
  options: FilterOption[];
  selected?: string;
  onSelect: (value: string) => void;
  className?: string;
}

const chipStyle = tva({
  base: "px-4 py-2 rounded-full mr-2 flex-row items-center",
  variants: {
    active: {
      true: "bg-primary-500",
      false: "bg-neutral-100 dark:bg-neutral-800",
    },
  },
  defaultVariants: {
    active: false,
  },
});

const textStyle = tva({
  base: "text-sm font-medium",
  variants: {
    active: {
      true: "text-white",
      false: "text-neutral-700 dark:text-neutral-300",
    },
  },
  defaultVariants: {
    active: false,
  },
});

const FilterChipGroup: React.FC<FilterChipGroupProps> = ({
  options,
  selected,
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
      {options.map((option) => {
        const isActive = selected === option.value;
        return (
          <TouchableOpacity
            key={option.value}
            onPress={() => onSelect(option.value)}
            className={chipStyle({ active: isActive })}
            activeOpacity={0.7}
          >
            <Text className={textStyle({ active: isActive })}>{option.label}</Text>
            {option.count !== undefined && (
              <View
                className={`ml-2 px-1.5 py-0.5 rounded-full ${
                  isActive ? "bg-white/20" : "bg-neutral-200 dark:bg-neutral-700"
                }`}
              >
                <Text
                  className={`text-xs ${
                    isActive ? "text-white" : "text-neutral-600 dark:text-neutral-400"
                  }`}
                >
                  {option.count}
                </Text>
              </View>
            )}
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

export default FilterChipGroup;
