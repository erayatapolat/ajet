"use client";

import React from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

interface Props {
    selectedDate: Date | undefined;
    onSelect: (date: Date | undefined) => void;
}

const getRandomPrice = (day: Date): string => {
    const price = 40 + (day.getDate() % 20);
    return `${price} €`;
};

export default function DatePickerWithPrices({ selectedDate, onSelect }: Props) {
    return (
        <div className="bg-white rounded border shadow p-4">
            <DayPicker
                mode="single"
                selected={selectedDate}
                onSelect={onSelect}
                modifiersClassNames={{
                    selected: "bg-blue-600 text-white rounded",
                    today: "font-bold underline",
                }}
                showOutsideDays
                styles={{
                    caption: { textAlign: "center", fontWeight: "bold" },
                    head_cell: { fontWeight: "normal" },
                }}
                // Gün altına fiyatı gömme işlemi burada yapılır
                components={{
                    Day: (props) => {
                        const date = props.date;
                        const price = getRandomPrice(date);

                        return (
                            <div
                                {...props}
                                className={`flex flex-col items-center justify-center text-xs`}
                            >
                                <span>{date.getDate()}</span>
                                <span className="text-blue-600">{price}</span>
                            </div>
                        );
                    },
                }}
                footer={
                    selectedDate ? (
                        <p className="text-center mt-2 text-sm text-gray-600">
                            Seçilen fiyat: <strong>{getRandomPrice(selectedDate)}</strong>
                        </p>
                    ) : (
                        <p className="text-center mt-2 text-sm text-gray-400">Tarih seçin</p>
                    )
                }
            />
        </div>
    );
}
