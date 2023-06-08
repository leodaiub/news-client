import { RangeDatepicker } from "chakra-dayzed-datepicker";
import { useStore } from "@/store";
import { shallow } from "zustand/shallow";

export default function DateRangePicker() {
  const [dateRange, updateDateRange] = useStore(
    (state) => [state.dateRange, state.updateDateRange],
    shallow
  );

  return (
    <RangeDatepicker
      selectedDates={dateRange as any}
      onDateChange={updateDateRange as any}
      propsConfigs={{
        inputProps: {
          role: "datePicker",
          placeholder: "Select date range...",
        },
      }}
    />
  );
}
