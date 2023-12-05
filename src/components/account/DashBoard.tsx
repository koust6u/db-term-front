// src/components/Dashboard.tsx
import React, { useState } from 'react';
import LogInfo from './LogInfo';
import DepositForm from './DepositForm';
import TransferForm from './TransferForm'; // Import the new component

const Dashboard: React.FC = () => {
    const [selectedOption, setSelectedOption] = useState<string>('logInfo');

    const renderSelectedComponent = () => {
        switch (selectedOption) {
            case 'logInfo':
                return <LogInfo />;
            case 'depositForm':
                return <DepositForm />;
            case 'transferForm': // Add case for the new option
                return <TransferForm />;
            default:
                return null;
        }
    };

    return (
        <div className="container mx-auto mt-8">
            <h1 className="text-2xl font-bold mb-4">계좌 관리 대시보드</h1>
            <label className="block mb-4">
                기능 선택:
                <select
                    className="ml-2 p-2 border border-gray-300 rounded"
                    value={selectedOption}
                    onChange={(e) => setSelectedOption(e.target.value)}
                >
                    <option value="logInfo">계좌 조회</option>
                    <option value="depositForm">계좌 충전</option>
                    <option value="transferForm">계좌 송금</option> {/* Add the new option */}
                    {/* Add more options for additional components */}
                </select>
            </label>

            {renderSelectedComponent()}
        </div>
    );
};

export default Dashboard;
