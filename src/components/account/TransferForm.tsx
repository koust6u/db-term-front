// src/components/TransferForm.tsx
import React, { useState } from 'react';
import axios from 'axios';

const TransferForm: React.FC = () => {
    const [toMemberId, setToMemberId] = useState<string>('');
    const [amount, setAmount] = useState<number | ''>(0);

    const handleTransfer = async () => {
        if (!toMemberId || amount === '' || amount <= 0) {
            alert('상대 아이디와 0원 이상의 금액을 입력하세요.');
            return;
        }

        try {
            await axios.post('http://35.216.75.115:8080/account/transfer/' + toMemberId, { amount });
            alert('송금이 성공적으로 이루어졌습니다.');
            setToMemberId('');
            setAmount(0);
        } catch (error) {
            alert('송금 중 오류가 발생했습니다. 잠시 후 다시 시도 해주세요.');
        }
    };

    return (
        <div className="max-w-md mx-auto bg-white p-8 border rounded-lg shadow-md mt-4">
            <label className="block mb-4">
                상대 아이디:
                <input
                    type="text"
                    className="w-full mt-2 p-3 border border-gray-300 rounded"
                    value={toMemberId}
                    onChange={(e) => setToMemberId(e.target.value)}
                />
            </label>
            <label className="block mb-4">
                송금 금액:
                <input
                    type="number"
                    className="w-full mt-2 p-3 border border-gray-300 rounded"
                    value={amount === '' ? '' : amount}
                    onChange={(e) => setAmount(e.target.value === '' ? '' : Math.max(0, Number(e.target.value)))}
                />
            </label>
            <button onClick={handleTransfer} className="w-full p-3 bg-blue-500 text-white rounded">
                송금하기
            </button>
        </div>
    );
};

export default TransferForm;
