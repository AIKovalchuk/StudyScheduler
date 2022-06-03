import { StyleSheet } from "react-native";
import React from "react";
import { Button } from "native-base";
import DatePicker from "react-native-date-picker";

type Props = {
  label: string;
  date: Date;
  setDate: (date: Date) => void;
};

const DatePickerCustom: React.FC<Props> = ({ label, date, setDate }) => {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Button variant="ghost" onPress={() => setOpen(true)}>
        {label}
      </Button>
      <DatePicker
        modal
        mode="datetime"
        open={open}
        date={date}
        onConfirm={date => {
          setOpen(false);
          setDate(date);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </>
  );
};

export default DatePickerCustom;

const styles = StyleSheet.create({});
