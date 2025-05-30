"use client"
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Center } from "@repo/ui/center";
import { TextInput } from "@repo/ui/textinput";
import { useState } from "react";
import userToMerchantTransfer from "../app/lib/actions/merchTransfer";


export function MerchantCard() {
    const [mid, setMid] = useState("");
    const [amount, setAmount] = useState("");

    return <div className=" w-[70%] h-[90vh]">
        <Center >
            <Card title="Merchant Transfer">
                <div className="min-w-72 pt-2">
                    <TextInput placeholder={"Merchant's ID"} label="Merchant's ID" onChange={(value) => {
                        setMid(value)
                    }} />
                    <TextInput placeholder={"Amount"} label="Amount" onChange={(value) => {
                        setAmount(value)
                    }} />
                    <div className="pt-4 flex justify-center">
                        <Button onClick={async () => {
                            await userToMerchantTransfer(Number(mid), Number(Number(amount) * 100));
                        }}>Pay</Button>
                    </div>
                </div>
            </Card>
        </Center>
    </div>
}