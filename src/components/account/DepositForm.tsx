// src/components/DepositForm.tsx
import React, { useState } from 'react';
import axios from 'axios';

const DepositForm: React.FC = () => {
    const [credit, setCredit] = useState<number | ''>(0);

    const handleDeposit = async () => {
        if (credit === '' || credit <= 0) {
            alert('0원 이상의 금액을 충전해주세요.');
            return;
        }

        try {
            await axios.post('http://localhost:8080/account/deposit', { credit });
            alert('계좌 충전이 성공적으로 이루어졌습니다.');
            setCredit(0);
        } catch (error) {
            alert('계좌 충전 중 오류가 발생했습니다:');
        }
    };

    return (
        <div className="container mx-auto mt-8 flex flex-col items-center">
            <h1 className="text-2xl font-bold mb-4">계좌 충전</h1>
            <div className="max-w-md mx-auto bg-white p-8 border rounded-lg shadow-md">
                <label className="block mb-4">
                    충전 금액:
                    <input
                        type="number"
                        className="w-full mt-2 p-3 border border-gray-300 rounded"
                        value={credit === '' ? '' : credit}
                        onChange={(e) => setCredit(e.target.value === '' ? '' : Math.max(0, Number(e.target.value)))}
                    />
                </label>
                <button onClick={handleDeposit} className="w-full p-3 bg-blue-500 text-white rounded">
                    충전하기
                </button>
            </div>
        </div>
    );
};

export default DepositForm;
